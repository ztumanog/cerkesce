import json
from pathlib import Path
from datetime import datetime
from collections import defaultdict

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-renk-mukerrer-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# COLOR kayitlari
COLOR_CONCEPTS = ("RED", "BLUE", "GREEN", "WHITE", "YELLOW", "GRAY", "MULTICOLOR", "BLACKISH")

# Forma gore grupla
gruplar = defaultdict(list)
for l in lex:
    if l.get("conceptId") in COLOR_CONCEPTS or any(c in COLOR_CONCEPTS for c in (l.get("conceptIds") or [])):
        gruplar[l.get("form")].append(l)

# Mukerrerleri temizle
silinen = 0
for form, kayitlar in gruplar.items():
    if len(kayitlar) > 1:
        print(f"\n{form}: {len(kayitlar)} kayit")
        # Ilkini tut, digerlerini sil
        for i, l in enumerate(kayitlar):
            print(f"  {i+1}. ID: {l.get('id')}, anlam: {l.get('literalMeaning', 'YOK')}")

        # En zengin kaydi sec (en cok alan dolu)
        en_iyi = max(kayitlar, key=lambda x: sum(1 for v in x.values() if v))
        for l in kayitlar:
            if l is not en_iyi:
                lex.remove(l)
                silinen += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nSilinen: {silinen}")

# Kontrol
color = [l for l in lex if l.get("conceptId") in COLOR_CONCEPTS]
print(f"\nCOLOR: {len(color)}")
for l in color:
    print(f"  {l.get('form'):20s} | {l.get('conceptId'):12s} | {l.get('literalMeaning', 'YOK')}")
