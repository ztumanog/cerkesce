import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "M-PA", "form": "pa-", "literalMeaning": "on ek: karsilikli eylem",
     "partOfSpeech": "preverb", "wordFamilyId": "WF-MORPHEME", "conceptId": "PREFIX"},
    {"id": "M-TAJ", "form": "taj-", "literalMeaning": "on ek: uzerinde",
     "partOfSpeech": "preverb", "wordFamilyId": "WF-MORPHEME", "conceptId": "PREFIX"},
    {"id": "M-AGHE", "form": "-aːʁ", "literalMeaning": "son ek: sifat->isim",
     "partOfSpeech": "suffix", "wordFamilyId": "WF-MORPHEME", "conceptId": "SUFFIX"},
    {"id": "M-GHUE", "form": "-ʁʷə", "literalMeaning": "son ek: meslek/faaliyet",
     "partOfSpeech": "suffix", "wordFamilyId": "WF-MORPHEME", "conceptId": "SUFFIX"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["corpusFrequency"] = 0
        y["status"] = "morpheme"
        y["notes"] = "C-11.3: dilbilgisel ek."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
