import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-plant-fix-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

DUZELT = {
    # Bitkiler
    "гуанэ": ("BRANCH", "TREE_PART", "Doğa & Bitki"),
    "гуанабэ": ("BRANCHY", "TREE_QUALITY", "Doğa & Bitki"),
    "гуанэпщӀанэ": ("BRANCHY", "TREE_QUALITY", "Doğa & Bitki"),
    "гуаным": ("PLANT", "PLANT_TYPE", "Doğa & Bitki"),
    "джэдгъалӀэ": ("NIGHTSHADE", "PLANT_TYPE", "Doğa & Bitki"),
    # Hayvan
    "хьэмаскӀэ": ("DOG", "ANIMAL", "Doğa & Hayvan"),
    # Mitoloji
    "хьэндрэфий": ("MYTHICAL_BIRD", "MYTHICAL_CREATURE", "Kültür & İnanç"),
    # Nitelik
    "хьэудз-хьэгын": ("DISGUSTING", "NEGATIVE_QUALITY", "Nitelik & Duygu"),
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if form in DUZELT:
        concept, sub, family = DUZELT[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        uygulanan += 1
        print(f"  OK: {form} -> {concept}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {uygulanan} kayit guncellendi")
