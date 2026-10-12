import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    # 1. GORMEK
    {"id": "L-LHEGHUN2", "form": "лъэгъун", "literalMeaning": "gormek",
     "conceptId": "SEE", "cat": "SENSE"},
    {"id": "L-PLHEGHUN2", "form": "плъэгъун", "literalMeaning": "gormek (birlikte)",
     "conceptId": "SEE", "cat": "SENSE"},
    # 2. DUYMAK
    {"id": "L-ZEKHEKHEN2", "form": "зэхэхын", "literalMeaning": "duymak, isitmek",
     "conceptId": "HEAR", "cat": "SENSE"},
    {"id": "L-YE1UN", "form": "еӀун", "literalMeaning": "duymak (kulakla)",
     "conceptId": "HEAR", "cat": "SENSE"},
    # 3. TATMAK
    {"id": "L-YEPLHEN", "form": "еплъын", "literalMeaning": "tatmak",
     "conceptId": "TASTE", "cat": "SENSE"},
    {"id": "L-KHEGHUEN", "form": "хэгъон", "literalMeaning": "tatmak, lezzet almak",
     "conceptId": "TASTE", "cat": "SENSE"},
    # 4. KOKU ALMAK
    {"id": "L-ME-YEUN", "form": "мэ еун", "literalMeaning": "koku almak",
     "conceptId": "SMELL", "cat": "SENSE"},
    {"id": "L-ME", "form": "мэ", "literalMeaning": "koku",
     "conceptId": "SMELL", "cat": "SENSE"},
    # 5. DOKUNMAK
    {"id": "L-NESYN2", "form": "нэсын", "literalMeaning": "dokunmak, degmek",
     "conceptId": "TOUCH", "cat": "SENSE"},
    {"id": "L-YE1USEN", "form": "еӀусэн", "literalMeaning": "dokunmak (elle)",
     "conceptId": "TOUCH", "cat": "SENSE"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "verb" if y["id"] not in ["L-ME"] else "noun"
        y["wordFamilyId"] = f"WF-{y.pop('cat')}"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.4: 5 duyu organi."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
