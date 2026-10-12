import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-NEK1U", "form": "нэкӀу", "literalMeaning": "yanak",
     "derivation": {"rootIds": ["R-NE"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-NE", "conceptId": "CHEEK",
     "dialectVariants": {"adyghe": "нэкӀу", "kabardian": "нэкӀу"},
     "notes": "C-11.2.1: yanak. Somatik.", "corpusFrequency": 0},
    {"id": "L-TSY", "form": "цы", "literalMeaning": "sac",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-TSY", "conceptId": "HAIR",
     "dialectVariants": {"adyghe": "цы", "kabardian": "цы"},
     "notes": "C-11.2.1: sac. Somatik.", "corpusFrequency": 0},
    {"id": "L-PQY", "form": "пкъы", "literalMeaning": "kemik",
     "derivation": {"rootIds": ["R-PQY"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-PQY", "conceptId": "BONE",
     "dialectVariants": {"adyghe": "пкъы", "kabardian": "пкъы"},
     "notes": "C-11.2.1: kemik. Somatik.", "corpusFrequency": 0},
    {"id": "L-LHY", "form": "лъы", "literalMeaning": "kan",
     "derivation": {"rootIds": ["R-LHE"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-LHE", "conceptId": "BLOOD",
     "dialectVariants": {"adyghe": "лъы", "kabardian": "лъы"},
     "notes": "C-11.2.1: kan. Somatik.", "corpusFrequency": 0},
    {"id": "L-SHHO", "form": "шъо", "literalMeaning": "deri",
     "derivation": {"rootIds": ["R-SHHE"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-SHHE", "conceptId": "SKIN",
     "dialectVariants": {"adyghe": "шъо", "kabardian": "щӀы"},
     "notes": "C-11.2.1: deri. Somatik.", "corpusFrequency": 0},
]

for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        print(f"Eklendi: {y['id']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
