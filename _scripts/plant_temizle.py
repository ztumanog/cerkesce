import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-plant-temizle-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

YANLIS = ["кърихащ", "хэсэныгъэ", "тегъэшэн", "хьэцыпэ", "хьэцыбанэ"]

temizlenen = 0
for l in lex:
    form = l.get("form", "")
    if l.get("conceptId") == "PLANT" and form in YANLIS:
        l["conceptId"] = ""
        l["subConceptId"] = ""
        l["taxonomyFamily"] = ""
        l["notes"] = (l.get("notes", "") + " [PLANT yanlis etiket temizlendi]").strip()
        temizlenen += 1
        print(f"  Temizlendi: {form}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nTemizlenen: {temizlenen}")

plant = [l for l in lex if "PLANT" in (l.get("conceptId") or "") or
         l.get("taxonomyFamily") == "Doğa & Bitki" or
         l.get("taxonomyFamily") == "Bitki"]
print(f"\nKalan PLANT ilgili: {len(plant)}")
for l in plant[:50]:
    print(f"  {l.get('form'):25s} | {l.get('conceptId', 'YOK'):25s} | {l.get('literalMeaning', '?')[:40]}")
