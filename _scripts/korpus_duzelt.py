import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

for l in lex:
    lid = l.get("id", "")
    if lid == "L-TETAZH":
        l["literalMeaning"] = "dede"
        l["conceptId"] = "GRANDFATHER"
        l["corpusFrequency"] = 10
        l["notes"] = "C-11.3: dede. Rusca: дедушка."
    elif lid == "L-TAT":
        l["literalMeaning"] = "dede"
        l["conceptId"] = "GRANDFATHER"
        l["corpusFrequency"] = 16
        l["notes"] = "C-11.3: dede. Rusca: дедушка."
    elif lid == "L-TATE":
        l["literalMeaning"] = "baba"
        l["conceptId"] = "FATHER"
        l["corpusFrequency"] = 4
        l["notes"] = "C-11.3: baba."
    elif lid == "L-DADE":
        l["literalMeaning"] = "dede (KBD)"
        l["conceptId"] = "GRANDFATHER"
        l["corpusFrequency"] = 122
        l["notes"] = "C-11.3: dede. KBD."
    elif lid == "L-DADESHHUE":
        l["literalMeaning"] = "dede (KBD)"
        l["conceptId"] = "GRANDFATHER"
        l["corpusFrequency"] = 42
        l["notes"] = "C-11.3: dede. KBD. Rusca: дедушка."

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
