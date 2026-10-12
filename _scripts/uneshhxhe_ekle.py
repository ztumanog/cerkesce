import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-UNESHHXHE", "form": "унащхьэ",
     "literalMeaning": "cati, tavan",
     "partOfSpeech": "noun",
     "wordFamilyId": "WF-UNE", "conceptId": "ROOF",
     "senses": [
         {"senseId": 1, "gloss": "roof", "tr": "çatı", "ru": "крыша"},
         {"senseId": 2, "gloss": "ceiling", "tr": "tavan", "ru": "потолок"}
     ],
     "notes": "C-11.3: cati/tavan. унэ + щхьэ. 11 kaynak. Korpus: ?",
     "corpusFrequency": 0},
    {"id": "L-UNESHHXHEPYXHE", "form": "унащхьэпыхьэ",
     "literalMeaning": "ortak keder yasayan koy",
     "partOfSpeech": "noun",
     "wordFamilyId": "WF-UNE", "conceptId": "COMMUNITY",
     "notes": "C-11.3: ortak keder yasayan koy. Korpus: ?",
     "corpusFrequency": 0},
    {"id": "L-UNESHHXHEPAPC1E", "form": "унащхьэ папцӀэ",
     "literalMeaning": "kubbe",
     "partOfSpeech": "noun",
     "wordFamilyId": "WF-UNE", "conceptId": "DOME",
     "notes": "C-11.3: kubbe. Korpus: ?",
     "corpusFrequency": 0},
    {"id": "L-UNESHHXHESHCH1ESE", "form": "унащхьэщӀэсэ",
     "literalMeaning": "mertek (cati kerestesi)",
     "partOfSpeech": "noun",
     "wordFamilyId": "WF-UNE", "conceptId": "RAFTER",
     "notes": "C-11.3: mertek. Korpus: ?",
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
