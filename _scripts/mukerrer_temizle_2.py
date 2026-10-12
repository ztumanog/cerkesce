import json
from pathlib import Path
from datetime import datetime
from collections import defaultdict

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-mukerrer-temizle-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# щы- ile baslayanlari grupla
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
gruplar = defaultdict(list)
for l in shchy:
    gruplar[l.get("form")].append(l)

# Mukerrerleri bul
mukerrer = {k: v for k, v in gruplar.items() if len(v) > 1}
print(f"Mukerrer form sayisi: {len(mukerrer)}")

# En zengin kaydi tut, digerlerini sil
silinen = 0
for form, kayitlar in mukerrer.items():
    en_iyi = max(kayitlar, key=lambda x: sum(1 for v in x.values() if v))
    for l in kayitlar:
        if l is not en_iyi:
            lex.remove(l)
            silinen += 1

print(f"Silinen: {silinen}")
print(f"Toplam lexeme: {len(lex)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Yeni durum
shchy2 = [l for l in lex if l.get("form", "").startswith("щы")]
dolu = [l for l in shchy2 if l.get("conceptId") and l.get("conceptId") not in ("", "-")]
bos = [l for l in shchy2 if not l.get("conceptId") or l.get("conceptId") in ("", "-")]
print(f"\nщы- toplam: {len(shchy2)}")
print(f"DOLU: {len(dolu)}")
print(f"BOS: {len(bos)}")
