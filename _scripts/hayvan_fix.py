import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-hayvan-fix-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

DUZELT = {
    "бу": ("MOO", "ANIMAL_SOUND", "Doğa & Hayvan"),
    "гуу": ("BULL", "CATTLE", "Doğa & Hayvan"),
    "алащэ": ("GELDING", "HORSE_TYPE", "Doğa & Hayvan"),
    "джэджьей": ("CHICK", "BABY_BIRD", "Doğa & Hayvan"),
    "елыркъэш": ("CRAB", "ANIMAL", "Doğa & Hayvan"),
    "хьэндырабгъуэ": ("? ", "ANIMAL", "Doğa & Hayvan"),
    "хьэпӏацӏэ": ("?", "ANIMAL", "Doğa & Hayvan"),
    "хьэпцӏий": ("?", "ANIMAL", "Doğa & Hayvan"),
    "хьэшорэ": ("?", "ANIMAL", "Doğa & Hayvan"),
    "джэдынэ": ("?", "ANIMAL", "Doğa & Hayvan"),
}

sayac = 0
for l in lex:
    form = l.get("form", "")
    if form in DUZELT and DUZELT[form][0] != "?":
        concept, sub, family = DUZELT[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        sayac += 1
        print(f"  OK: {form} -> {concept}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {sayac} kayit guncellendi")
