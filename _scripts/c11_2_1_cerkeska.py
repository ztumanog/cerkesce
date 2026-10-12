import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-TSEY", "form": "цей", "literalMeaning": "cerkeska (KBD)",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-TSY", "conceptId": "CHERKESKA",
     "dialectVariants": {"adyghe": "цые", "kabardian": "цей"},
     "notes": "C-11.2.1: cerkeska. 3 sozluk.", "corpusFrequency": 0},
    {"id": "L-KHEZYR", "form": "хьэзыр", "literalMeaning": "barutluk",
     "derivation": {"rootIds": ["R-KHEZYR"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-KHEZYR", "conceptId": "CARTRIDGE_BELT",
     "dialectVariants": {"adyghe": "хьэзыр", "kabardian": "хьэзыр"},
     "notes": "C-11.2.1: barutluk", "corpusFrequency": 0},
    {"id": "L-KHEZYRYLHE", "form": "хьэзырылъэ", "literalMeaning": "barutluk cebi",
     "derivation": {"rootIds": ["R-KHEZYR"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-KHEZYR", "conceptId": "CARTRIDGE_POCKET",
     "dialectVariants": {"adyghe": "хьэзырылъэ", "kabardian": "хьэзырылъэ"},
     "notes": "C-11.2.1: barutluk cebi", "corpusFrequency": 0},
    {"id": "L-KHEZYRYPS", "form": "хьэзырыпс", "literalMeaning": "gumus zincir",
     "derivation": {"rootIds": ["R-KHEZYR"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-KHEZYR", "conceptId": "SILVER_CHAIN",
     "dialectVariants": {"adyghe": "хьэзырыпс", "kabardian": "хьэзырыпс"},
     "notes": "C-11.2.1: gumus zincir", "corpusFrequency": 0},
    {"id": "L-KHEZYR1UPE", "form": "хьэзырӀупэ", "literalMeaning": "barutluk kapagi",
     "derivation": {"rootIds": ["R-KHEZYR"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-KHEZYR", "conceptId": "CARTRIDGE_CAP",
     "dialectVariants": {"adyghe": "хьэзырӀупэ", "kabardian": "хьэзырӀупэ"},
     "notes": "C-11.2.1: barutluk kapagi", "corpusFrequency": 0},
]

for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        print(f"Eklendi: {y['id']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam: {len(lex)}")
