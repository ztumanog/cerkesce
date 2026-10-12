import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-body-temizle3-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Yanlis BODY etiketliler (temizlenecek)
YANLIS = [
    "ирехъу", "армыхъумэ", "нахуэу", "ишхащ", "фэягъэр",
    "еджагъэшхуэ", "дахащэ", "тхыныгъэ", "хьэмбылу", "ышхыгъ",
    "зыщыпсэу", "жыжьагъ", "илъабжьэм", "жьэгупащхьэ", "унэншэ",
    "стрелкэ", "макъыншэ", "кремль", "быхъуу", "закъуэныгъэ",
    "дзыныгъэ", "щыхах", "гъэсэтеин", "электрическэ", "мыІэрысэ",
    "нэщӀэпкӀэ", "хьэӀуцэ", "хьэщхьэвылъэ",
]

# Gercek organlar (duzeltilecek)
DUZELT = {
    "гущхьэ": ("HEART", "ORGAN"),
    "гур": ("HEART", "ORGAN"),
}

temizlenen = 0
for l in lex:
    form = l.get("form", "")
    if l.get("conceptId") == "BODY" and form in YANLIS:
        l["conceptId"] = ""
        l["subConceptId"] = ""
        l["taxonomyFamily"] = ""
        l["notes"] = (l.get("notes", "") + " [BODY yanlis etiket temizlendi]").strip()
        temizlenen += 1
        print(f"  Temizlendi: {form}")

for l in lex:
    form = l.get("form", "")
    if form in DUZELT and l.get("conceptId") == "BODY":
        cid, sub = DUZELT[form]
        l["conceptId"] = cid
        l["subConceptId"] = sub
        temizlenen += 1
        print(f"  Duzeltildi: {form} -> {cid}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nTemizlenen: {temizlenen}")

# Kontrol
body = [l for l in lex if "BODY" in (l.get("conceptId") or "") or
        l.get("taxonomyFamily") == "İnsan & Beden"]
print(f"\nKalan BODY ilgili: {len(body)}")
for l in body:
    print(f"  {l.get('form'):25s} | {l.get('conceptId', 'YOK'):25s} | {l.get('literalMeaning', '?')[:40]}")
