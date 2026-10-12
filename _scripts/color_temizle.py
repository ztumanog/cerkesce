import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Yedek
tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-color-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Gercek renkler
GERCEK_RENKLER = [
    "плӀыжь", "щхъу", "фӀэцӀа", "хужь", "къуэлэн",
    "гъуэжь", "щӀыху", "удзышхуэ", "хъуафэ"
]

temizlenen = 0
for l in lex:
    if l.get("conceptId") == "COLOR":
        form = l.get("form", "")
        if form not in GERCEK_RENKLER:
            # Yanlis renk → temizle
            l["conceptId"] = ""
            l["subConceptId"] = ""
            l["taxonomyFamily"] = ""
            l["notes"] = (l.get("notes", "") + " [COLOR yanlis etiket temizlendi]").strip()
            temizlenen += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nTemizlenen: {temizlenen}")

# Kontrol
kalan = [l for l in lex if l.get("conceptId") == "COLOR"]
print(f"Kalan COLOR: {len(kalan)}")
for l in kalan:
    print(f"  {l.get('form')}")
