import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-SH1EN", "form": "шӀэн", "literalMeaning": "bilmek",
     "derivation": {"rootIds": ["R-SH1E"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-SH1E", "conceptId": "KNOW",
     "dialectVariants": {"adyghe": "шӀэн", "kabardian": "щӀэн"},
     "notes": "C-11.2.2: bilmek", "corpusFrequency": 0},
    {"id": "L-TKHEN", "form": "тхэн", "literalMeaning": "yazmak",
     "derivation": {"rootIds": ["R-TKHE"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-TKHE", "conceptId": "WRITE",
     "dialectVariants": {"adyghe": "тхэн", "kabardian": "тхэн"},
     "notes": "C-11.2.2: yazmak", "corpusFrequency": 0},
    {"id": "L-YEDZHEN", "form": "еджэн", "literalMeaning": "okumak",
     "derivation": {"rootIds": ["R-EDJE"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-EDJE", "conceptId": "READ",
     "dialectVariants": {"adyghe": "еджэн", "kabardian": "еджэн"},
     "notes": "C-11.2.2: okumak", "corpusFrequency": 0},
    {"id": "L-GUZEVAK1UE", "form": "гузэвакӀуэ", "literalMeaning": "endise",
     "derivation": {"rootIds": ["R-GU"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-GU", "conceptId": "ANXIETY",
     "dialectVariants": {"adyghe": "гузэвакӀуэ", "kabardian": "гузэвэгъуэ"},
     "notes": "C-11.2.2: endise", "corpusFrequency": 0},
]

for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        print(f"Eklendi: {y['id']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam: {len(lex)}")
