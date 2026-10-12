import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-K1UEN", "form": "кӀуэн", "literalMeaning": "gitmek",
     "partOfSpeech": "verb", "wordFamilyId": "WF-K1UE", "conceptId": "GO",
     "senses": [{"senseId": 1, "gloss": "to go", "tr": "gitmek", "ru": "идти"}],
     "notes": "C-11.3: gitmek. Korpus: 2921.",
     "corpusFrequency": 2921},
    {"id": "L-K1UE-IMP", "form": "кӀуэ", "literalMeaning": "git! (emir)",
     "partOfSpeech": "verb (imperative)", "wordFamilyId": "WF-K1UE", "conceptId": "GO",
     "senses": [{"senseId": 1, "gloss": "go! (imperative)", "tr": "git!", "ru": "иди!"}],
     "notes": "C-11.3: git! emir. Korpus: 18203.",
     "corpusFrequency": 18203},
    {"id": "L-K1UER", "form": "кӀуэр", "literalMeaning": "giden",
     "partOfSpeech": "participle", "wordFamilyId": "WF-K1UE", "conceptId": "GO",
     "senses": [{"senseId": 1, "gloss": "going", "tr": "giden", "ru": "идущий"}],
     "notes": "C-11.3: giden. Korpus: 1164.",
     "corpusFrequency": 1164},
    {"id": "L-K1UASHCH", "form": "кӀуащ", "literalMeaning": "gitti",
     "partOfSpeech": "verb (past)", "wordFamilyId": "WF-K1UE", "conceptId": "GO",
     "senses": [{"senseId": 1, "gloss": "went", "tr": "gitti", "ru": "пошёл"}],
     "notes": "C-11.3: gitti. Korpus: 987.",
     "corpusFrequency": 987},
    {"id": "L-K1UEZHYN", "form": "кӀуэжын", "literalMeaning": "donmek",
     "partOfSpeech": "verb", "wordFamilyId": "WF-K1UE", "conceptId": "RETURN",
     "senses": [{"senseId": 1, "gloss": "to return", "tr": "dönmek", "ru": "возвращаться"}],
     "notes": "C-11.3: donmek. Korpus: 348.",
     "corpusFrequency": 348},
    {"id": "L-KUEK1UEN", "form": "къэкӀуэн", "literalMeaning": "gelmek",
     "partOfSpeech": "verb", "wordFamilyId": "WF-K1UE", "conceptId": "COME",
     "senses": [{"senseId": 1, "gloss": "to come", "tr": "gelmek", "ru": "приходить"}],
     "notes": "C-11.3: gelmek. Korpus: 418.",
     "corpusFrequency": 418},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['corpusFrequency']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
