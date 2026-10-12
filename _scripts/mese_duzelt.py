import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

for l in lex:
    if l["id"] == "L-ZHYGEY":
        l["form"] = "жыгей"
        l["literalMeaning"] = "mese agaci"
        l["dialectVariants"] = {"adyghe": "чъыгай", "kabardian": "жыгей"}
        l["notes"] = "C-11.3: mese. Kabardeyce: жыгей. Adigece: чъыгай. Korpus: 53."
        print("L-ZHYGEY dogrulandi: жыгей (mese/Kabardeyce)")
    if l["id"] == "L-CHYGEY":
        l["dialectVariants"] = {"adyge": "чъыгай", "kabardian": "жыгей"}
        l["notes"] = "C-11.3: mese (Adigece varyant). Korpus: 6."
        print("L-CHYGEY: чъыгай (Adigece)")
    if l["id"] == "L-CHYGAE":
        l["dialectVariants"] = {"adyge": "чъыгае", "kabardian": "жыгей"}
        l["notes"] = "C-11.3: mese (Adigece varyant). Korpus: 13."
        print("L-CHYGAE: чъыгае (Adigece)")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam lexeme: {len(lex)}")
