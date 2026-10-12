import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-ZY", "form": "зы", "ipa": "/zǝ/",
     "literalMeaning": "bir (1)",
     "partOfSpeech": "numeral",
     "wordFamilyId": "WF-ZY", "conceptId": "ONE",
     "senses": [
         {"senseId": 1, "gloss": "one (1)", "tr": "bir", "ru": "один"},
         {"senseId": 2, "gloss": "someone, something", "tr": "birisi, bir şey", "ru": "кто-то, что-то"}
     ],
     "notes": "C-11.3: bir/sayı. Vikisozluk. Korpus: ?",
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
