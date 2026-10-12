import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-PYUDYN", "form": "пыудын",
     "ipa": "/pǝwǝ'dǝn/",
     "literalMeaning": "ucunu koparmak (gecisli)",
     "partOfSpeech": "verb (transitive)",
     "wordFamilyId": "WF-PYUD", "conceptId": "BREAK_OFF",
     "senses": [
         {"senseId": 1, "gloss": "knock/break off the end", "tr": "ucunu koparmak", "ru": "отбить конец"}
     ],
     "notes": "C-11.3: ucunu koparmak (gecisli). пы- + уд + -ы + -н. Korpus: ?",
     "corpusFrequency": 0},
    {"id": "L-PYUDYN2", "form": "пыудын",
     "ipa": "/pǝwǝ'dǝn/",
     "literalMeaning": "ucu kopmak (gecissiz)",
     "partOfSpeech": "verb (intransitive)",
     "wordFamilyId": "WF-PYUD", "conceptId": "BREAK_OFF",
     "senses": [
         {"senseId": 1, "gloss": "be broken off (end)", "tr": "ucu kopmak", "ru": "отколоться"}
     ],
     "notes": "C-11.3: ucu kopmak (gecissiz). Homonim: L-PYUDYN (gecisli). Korpus: ?",
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
