import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

for l in lex:
    if l.get("id") == "L-1ESHO":
        l["form"] = "Ӏэшъо"
        l["literalMeaning"] = "deri (ADY varyant)"
        l["dialectVariants"] = {"adyghe": "Ӏэшъо", "kabardian": "фэ"}
        l["wordFamilyId"] = "WF-SHHE"
        l["conceptId"] = "SKIN"
        l["notes"] = "C-11.2.1: deri (ADY varyant). ADY: Ӏэшъо, KBD: фэ."
        print("Guncellendi: L-1ESHO")
    if l.get("id") == "L-FE":
        l["dialectVariants"] = {"adyghe": "шъо", "kabardian": "фэ"}
        l["notes"] = "C-11.2.1: deri. ADY: шъо, KBD: фэ."
        print("Guncellendi: L-FE")
    if l.get("id") == "L-SHHO":
        l["dialectVariants"] = {"adyghe": "шъо", "kabardian": "фэ"}
        l["notes"] = "C-11.2.1: deri (ADY). ADY: шъо, KBD: фэ."
        print("Guncellendi: L-SHHO")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam: {len(lex)}")
