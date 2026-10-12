import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-hayvan-fix2-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

DUZELT = {
    "хьэндырабгъуэ": ("BUTTERFLY", "INSECT", "Doğa & Hayvan"),
    "хьэпӏацӏэ": ("WORM_LARVA", "INSECT", "Doğa & Hayvan"),
    "хьэпцӏий": ("RYE", "GRAIN", "Doğa & Bitki"),
    "джэдынэ": ("FOLLICULITIS", "SKIN_DISEASE", "Yaşam & Sağlık"),
}

sayac = 0
for l in lex:
    form = l.get("form", "")
    if form in DUZELT:
        concept, sub, family = DUZELT[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        sayac += 1
        print(f"  OK: {form} -> {concept}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {sayac} kayit guncellendi")
