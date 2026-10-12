import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-KUAPELHAPE", "form": "къуапэлъапэ",
     "ipa": "/qʹʷɐpɐˈɬɑ:pɐ/",
     "literalMeaning": "koseler, kenarlar, cikintilar",
     "partOfSpeech": "noun",
     "wordFamilyId": "WF-KUAPE", "conceptId": "EDGE",
     "senses": [
         {"senseId": 1, "gloss": "corners, edges", "tr": "köşeler, kenarlar", "ru": "углы, края"}
     ],
     "notes": "C-11.3: koseler/kenarlar. къуап + лъап. Korpus: ?",
     "corpusFrequency": 0},
    {"id": "L-PSYUDZ", "form": "псыудз",
     "ipa": "/psǝˈwǝdz/",
     "literalMeaning": "atkuyrugu (bitki)",
     "partOfSpeech": "noun",
     "wordFamilyId": "WF-PSY", "conceptId": "HORSETAIL",
     "senses": [
         {"senseId": 1, "gloss": "horsetail", "tr": "atkuyruğu", "ru": "хвощ"}
     ],
     "notes": "C-11.3: atkuyrugu. пс + ы + удз. Korpus: ?",
     "corpusFrequency": 0},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
