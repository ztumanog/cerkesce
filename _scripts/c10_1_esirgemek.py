import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

yeni = [
    {"id": "L-SHYSKHYN", "form": "щысхьын", "ipa": "/ɕǝsħǝn/",
     "literalMeaning": "esirgemek",
     "derivation": {"rootIds": [], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-SHYSKHYN", "conceptId": "SPARE",
     "dialectVariants": {"adyghe": "щысхьын", "kabardian": "щысхьын"},
     "dictionaryEvidence": {"sourceCount": 2, "sources": ["Abaze (2005)", "Huvaj (2007)"]},
     "notes": "C-10.1: esirgemek. 2 sozluk kaynagi.", "corpusFrequency": 0},
    {"id": "L-SHHASYN", "form": "шъхьасын", "ipa": "/ʂħa sǝn/",
     "literalMeaning": "esirgemek, acimak",
     "derivation": {"rootIds": [], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-SHHASYN", "conceptId": "SPARE",
     "dialectVariants": {"adyghe": "шъхьасын", "kabardian": "щхьасын"},
     "dictionaryEvidence": {"sourceCount": 2, "sources": ["Huvaj (2007)", "Hasan (1991)"]},
     "notes": "C-10.1: esirgemek. 2 sozluk kaynagi.", "corpusFrequency": 0}
]

for y in yeni:
    if not any(x["id"] == y["id"] for x in lex):
        lex.append(y)
        print(f"Eklendi: {y['id']}")

l = next((x for x in lex if x["id"] == "L-KHUMEN"), None)
if l:
    l["dictionaryEvidence"] = {"sourceCount": 2, "sources": ["Abaze (2005)", "Aşemez (2013)"],
        "meanings": {"tr": "esirgemek, korumak", "en": "to spare, to protect"}}
    l["derivedForms"] = [
        {"form": "ухъумэн", "meaning": "esirgemek", "sources": 1},
        {"form": "къэухъумэн", "meaning": "esirgemek, savunmak", "sources": 1}
    ]
    print(f"L-KHUMEN guncellendi")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam: {len(lex)}")
