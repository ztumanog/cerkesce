import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-ZADELHXUEZESHYPHU", "form": "задэлъхуэзэшыпхъу", "literalMeaning": "kardes (erkek+kiz)",
     "conceptId": "SIBLING"},
    {"id": "L-ZHEGU", "form": "жьэгу", "literalMeaning": "ocak",
     "conceptId": "HEARTH"},
    {"id": "L-ZENYBZHEGHU", "form": "зэныбжьэгъу", "literalMeaning": "arkadaslar",
     "conceptId": "FRIENDS"},
    {"id": "L-ZEPEDZEN", "form": "зэпэдзэн", "literalMeaning": "olusturmak",
     "conceptId": "COMPOSE"},
    {"id": "L-ZEPEUPHCH1EN", "form": "зэпэупщӀэн", "literalMeaning": "kesmek",
     "conceptId": "CUT"},
    {"id": "L-ZEKHHESHAN", "form": "зэхэшэн", "literalMeaning": "bir araya toplamak",
     "conceptId": "GATHER"},
    {"id": "L-ZEKHKHEKHEN", "form": "зэхэхын", "literalMeaning": "duymak",
     "conceptId": "HEAR"},
    {"id": "L-1UE", "form": "Ӏуэ", "literalMeaning": "agiz, on",
     "conceptId": "MOUTH"},
    {"id": "L-1UEPE", "form": "Ӏуэпэ", "literalMeaning": "dudak",
     "conceptId": "LIP"},
    {"id": "L-KHEDZHABZ", "form": "хьэджэбз", "literalMeaning": "kiz",
     "conceptId": "GIRL"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-BASIC"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: IPA kaynakli."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
