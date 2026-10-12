import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-PKHU", "form": "пхъу", "literalMeaning": "kiz (kiz cocuk)",
     "conceptId": "DAUGHTER"},
    {"id": "L-KUE", "form": "къуэ", "literalMeaning": "erkek cocuk (ogul)",
     "conceptId": "SON"},
    {"id": "L-BZYLKHUGHE", "form": "бзылъхугъэ", "literalMeaning": "kadin",
     "conceptId": "WOMAN"},
    {"id": "L-TSYXHU", "form": "цӀыхухъу", "literalMeaning": "erkek (yetiskin)",
     "conceptId": "MAN"},
    {"id": "L-L1Y", "form": "лӀы", "literalMeaning": "erkek, adam, koca",
     "conceptId": "HUSBAND"},
    {"id": "L-SABIY", "form": "сабий", "literalMeaning": "bebek, cocuk",
     "conceptId": "CHILD"},
    {"id": "L-SHCHALE", "form": "щӀалэ", "literalMeaning": "genc erkek, cocuk",
     "conceptId": "BOY"},
    {"id": "L-PSHCHASHE", "form": "пщащэ", "literalMeaning": "genc kiz",
     "conceptId": "GIRL"},
    {"id": "L-TSYXHUBZ", "form": "цӀыхубз", "literalMeaning": "kadin (kibar)",
     "conceptId": "WOMAN"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-PERSON"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: cinsiyet/yas. Kabardeyce."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
