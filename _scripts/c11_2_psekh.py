import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-PSEKHUGHE", "form": "псэхугъуэ", "literalMeaning": "rahatlama, huzur",
     "derivation": {"rootIds": ["R-PSE"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-PSE", "conceptId": "RELIEF",
     "dialectVariants": {"adyghe": "псэхугъуэ", "kabardian": "псэхугъуэ"},
     "notes": "C-11.2.1: rahatlama, huzur. 11 sozluk.", "corpusFrequency": 0},
    {"id": "L-PSEKHUZHYN", "form": "псэхужын", "literalMeaning": "rahatlamak; olmek",
     "derivation": {"rootIds": ["R-PSE"], "morphemeIds": [], "rule": "suffix"},
     "wordFamilyId": "WF-PSE", "conceptId": "REST",
     "dialectVariants": {"adyghe": "псэхужын", "kabardian": "псэхужын"},
     "notes": "C-11.2.1: rahatlamak; olmek", "corpusFrequency": 0},
    {"id": "L-PSEKHUN", "form": "псэхун", "literalMeaning": "dinlenmek",
     "derivation": {"rootIds": ["R-PSE"], "morphemeIds": [], "rule": "suffix"},
     "wordFamilyId": "WF-PSE", "conceptId": "REST",
     "dialectVariants": {"adyghe": "псэхун", "kabardian": "псэхун"},
     "notes": "C-11.2.1: dinlenmek. 3 sozluk.", "corpusFrequency": 0},
    {"id": "L-PSEKHUNYGHE", "form": "псэхуныгъэ", "literalMeaning": "dinlenme",
     "derivation": {"rootIds": ["R-PSE"], "morphemeIds": [], "rule": "suffix"},
     "wordFamilyId": "WF-PSE", "conceptId": "REST",
     "dialectVariants": {"adyghe": "псэхуныгъэ", "kabardian": "псэхуныгъэ"},
     "notes": "C-11.2.1: dinlenme", "corpusFrequency": 0},
    {"id": "L-PSEKHUP1E", "form": "псэхупӀэ", "literalMeaning": "dinlenme yeri",
     "derivation": {"rootIds": ["R-PSE"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-PSE", "conceptId": "RESTING_PLACE",
     "dialectVariants": {"adyghe": "псэхупӀэ", "kabardian": "псэхупӀэ"},
     "notes": "C-11.2.1: dinlenme yeri", "corpusFrequency": 0},
    {"id": "L-PSEFET", "form": "псэфэт", "literalMeaning": "fitre",
     "derivation": {"rootIds": ["R-PSE"], "morphemeIds": [], "rule": "suffix"},
     "wordFamilyId": "WF-PSE", "conceptId": "CHARITY",
     "dialectVariants": {"adyghe": "псэфэт", "kabardian": "псэхуэт"},
     "notes": "C-11.2.1: fitre. Dini terim", "corpusFrequency": 0},
    {"id": "L-ZYGHEPSEKHUGHE", "form": "зыгъэпсэхугъуэ", "literalMeaning": "tatil, izin",
     "derivation": {"rootIds": ["R-PSE"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-PSE", "conceptId": "VACATION",
     "dialectVariants": {"adyghe": "зыгъэпсэхугъуэ", "kabardian": "зыгъэпсэхугъуэ"},
     "notes": "C-11.2.1: tatil, izin", "corpusFrequency": 0},
    {"id": "L-KUADZHE-NADZHE", "form": "къаджэ-наджэ", "literalMeaning": "huzur vermeyen",
     "derivation": {"rootIds": [], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-KUADZHE", "conceptId": "RESTLESS",
     "dialectVariants": {"adyghe": "къаджэ-наджэ", "kabardian": "къаджэ-наджэ"},
     "notes": "C-11.2.1: huzur vermeyen. Deyim", "corpusFrequency": 0},
]

for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        print(f"Eklendi: {y['id']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam: {len(lex)}")
