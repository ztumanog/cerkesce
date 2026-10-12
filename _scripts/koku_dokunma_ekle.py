import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    # KOKU ALMAK / KOKLAMA
    {"id": "L-ME-KYSCH1IKHEN", "form": "мэ къыщӀихьэн", "literalMeaning": "koku almak",
     "conceptId": "SMELL", "cat": "SENSE"},
    {"id": "L-PEMYN", "form": "пэмын", "literalMeaning": "koklamak",
     "conceptId": "SMELL", "cat": "SENSE"},
    {"id": "L-KHEPEMEN", "form": "хэпэмэн", "literalMeaning": "egilip icini koklama",
     "conceptId": "SMELL", "cat": "SENSE"},
    # DOKUNMA
    {"id": "L-1E-DELHEN", "form": "Ӏэ дэлъэн", "literalMeaning": "elle dokunmak",
     "conceptId": "TOUCH", "cat": "SENSE"},
    {"id": "L-1E-SHCHYHuen", "form": "Ӏэ щыхуэн", "literalMeaning": "elle dokunmak",
     "conceptId": "TOUCH", "cat": "SENSE"},
    {"id": "L-TE1EN", "form": "теӀэн", "literalMeaning": "dokunmak (uzerine)",
     "conceptId": "TOUCH", "cat": "SENSE"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "verb"
        y["wordFamilyId"] = f"WF-{y.pop('cat')}"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.4: 5 duyu organi."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
