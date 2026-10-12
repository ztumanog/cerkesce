import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-nature-temizle-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Yanlis NATURE (temizlenecek)
YANLIS = [
    "насыпыншэ", "угъурсыз", "къулейсыз", "юсыф", "-р",
    "къэгъэшын", "итхъа", "бахъсэн", "гъэшхэныгъэ", "щта",
    "гуарцэ", "бэлэрыгъауэ", "губгъуэм", "нэпкъым", "губгъом",
    "гуэлым", "хьэуам", "губгъуэр", "хьэуар", "губгъор",
    "гъуэрыгъуэ",
]

temizlenen = 0
for l in lex:
    form = l.get("form", "")
    if l.get("conceptId") == "NATURE" and form in YANLIS:
        l["conceptId"] = ""
        l["subConceptId"] = ""
        l["taxonomyFamily"] = ""
        l["notes"] = (l.get("notes", "") + " [NATURE yanlis etiket temizlendi]").strip()
        temizlenen += 1
        print(f"  Temizlendi: {form}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nTemizlenen: {temizlenen}")

# Kontrol
nature = [l for l in lex if "NATURE" in (l.get("conceptId") or "")]
print(f"\nKalan NATURE: {len(nature)}")
for l in nature:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
