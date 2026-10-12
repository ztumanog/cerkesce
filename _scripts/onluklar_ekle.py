import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-T1OSHCH", "form": "тӀощӀ", "literalMeaning": "yirmi",
     "partOfSpeech": "numeral", "wordFamilyId": "WF-NUM", "conceptId": "TWENTY",
     "corpusFrequency": 0, "notes": "C-11.3: yirmi."},
    {"id": "L-SHCHESHCH", "form": "щэщӀ", "literalMeaning": "otuz",
     "partOfSpeech": "numeral", "wordFamilyId": "WF-NUM", "conceptId": "THIRTY",
     "corpusFrequency": 0, "notes": "C-11.3: otuz."},
    {"id": "L-PL1YSHCH", "form": "плӀыщӀ", "literalMeaning": "kirk",
     "partOfSpeech": "numeral", "wordFamilyId": "WF-NUM", "conceptId": "FORTY",
     "corpusFrequency": 0, "notes": "C-11.3: kirk."},
    {"id": "L-TKHUSHCH", "form": "тхущӀ", "literalMeaning": "elli",
     "partOfSpeech": "numeral", "wordFamilyId": "WF-NUM", "conceptId": "FIFTY",
     "corpusFrequency": 0, "notes": "C-11.3: elli."},
    {"id": "L-KHYSHCH", "form": "хыщӀ", "literalMeaning": "altmis",
     "partOfSpeech": "numeral", "wordFamilyId": "WF-NUM", "conceptId": "SIXTY",
     "corpusFrequency": 0, "notes": "C-11.3: altmis."},
    {"id": "L-BLYSHCH", "form": "блыщӀ", "literalMeaning": "yetmis",
     "partOfSpeech": "numeral", "wordFamilyId": "WF-NUM", "conceptId": "SEVENTY",
     "corpusFrequency": 0, "notes": "C-11.3: yetmis."},
    {"id": "L-ISHCH", "form": "ищӀ", "literalMeaning": "seksen",
     "partOfSpeech": "numeral", "wordFamilyId": "WF-NUM", "conceptId": "EIGHTY",
     "corpusFrequency": 0, "notes": "C-11.3: seksen."},
    {"id": "L-BGHUSHCH", "form": "бгъущӀ", "literalMeaning": "doksan",
     "partOfSpeech": "numeral", "wordFamilyId": "WF-NUM", "conceptId": "NINETY",
     "corpusFrequency": 0, "notes": "C-11.3: doksan."},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
