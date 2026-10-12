import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-body-temizle2-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Gercek BODY organlari (korunacaklar)
GERCEK = [
    "Ӏэ", "Ӏэпэ", "Ӏэгу", "Ӏэпкълъэпкъ", "лъакъуэ", "пэ", "пэкукъу",
    "пэфыкъ", "лъы", "пкъышъол", "Ӏупэ", "Ӏэблэ", "Ӏэпщэ", "ӀэфракӀэ",
    "лъапэ", "Ӏуэ", "гу", "пэщхъын", "ӀэпэмцӀий", "дзажэщӀ", "напӀащхьэ",
]

# Yanlis BODY etiketliler (temizlenecek)
YANLIS = [
    "Ӏуэпэ", "щэныкъуэ", "шэч къытехьэн", "къэхъун",
    "НэфӀэгуфӀагъэ", "КъэнэщхъыфӀэн", "Гузэвэн", "хъун",
]

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

# Ayrica gu ve Ӏуэпэ'yi duzelt
for l in lex:
    form = l.get("form", "")
    if form == "гу" and l.get("conceptId") == "BODY":
        l["conceptId"] = "HEART"
        l["subConceptId"] = "ORGAN"
        temizlenen += 1
        print(f"  Duzeltildi: гу -> HEART")
    elif form == "Ӏуэпэ" and l.get("conceptId") == "BODY":
        l["conceptId"] = "LIP"
        l["subConceptId"] = "MOUTH_BODY"
        temizlenen += 1
        print(f"  Duzeltildi: Ӏуэпэ -> LIP")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nTemizlenen: {temizlenen}")

# Kontrol
body = [l for l in lex if "BODY" in (l.get("conceptId") or "") or
        l.get("taxonomyFamily") == "İnsan & Beden"]
print(f"\nKalan BODY ilgili: {len(body)}")
for l in body:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
