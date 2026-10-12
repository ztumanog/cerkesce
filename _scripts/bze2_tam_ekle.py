import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-BZE2", "form": "бзэ", "literalMeaning": "yay (silah)",
     "partOfSpeech": "noun", "wordFamilyId": "WF-BZE2", "conceptId": "BOW",
     "notes": "C-11.3: yay (silah). Homonim: L-BZE (dil). Korpus: 0 (homonim).",
     "corpusFrequency": 0},
    {"id": "L-SHABZE", "form": "шабзэ", "ipa": "/ˈʂɑ:bzɐ/",
     "literalMeaning": "yay, ok", "partOfSpeech": "noun",
     "wordFamilyId": "WF-BZE2", "conceptId": "BOW",
     "senses": [
         {"senseId": 1, "gloss": "bow (weapon)", "tr": "yay", "ru": "лук"},
         {"senseId": 2, "gloss": "arrow", "tr": "ok", "ru": "стрела"}
     ],
     "notes": "C-11.3: yay/ok. Korpus: 83.", "corpusFrequency": 83},
    {"id": "L-BZASH1E", "form": "бзащӀэ", "literalMeaning": "yay",
     "partOfSpeech": "noun", "wordFamilyId": "WF-BZE2", "conceptId": "BOW",
     "notes": "C-11.3: yay (dogu varyanti). Korpus: 84.", "corpusFrequency": 84},
    {"id": "L-SHCHABZ", "form": "щабз", "literalMeaning": "yay",
     "partOfSpeech": "noun", "wordFamilyId": "WF-BZE2", "conceptId": "BOW",
     "notes": "C-11.3: yay (varyant). Korpus: 42.", "corpusFrequency": 42},
    {"id": "L-SHABZEPSE", "form": "шабзэпс", "ipa": "/ʂɐˈbzɐps/",
     "literalMeaning": "yay kirisi", "partOfSpeech": "noun",
     "wordFamilyId": "WF-BZE2", "conceptId": "BOWSTRING",
     "notes": "C-11.3: yay kirisi. шабзэ + пс. Korpus: 4.", "corpusFrequency": 4},
    {"id": "L-SHABZEBZE", "form": "шабзэбзэ", "literalMeaning": "yay kirisi",
     "partOfSpeech": "noun", "wordFamilyId": "WF-BZE2", "conceptId": "BOWSTRING",
     "notes": "C-11.3: yay kirisi. Korpus: 1.", "corpusFrequency": 1},
    {"id": "L-BZASH1EPSE", "form": "бзащӀэпс", "literalMeaning": "yay teli",
     "partOfSpeech": "noun", "wordFamilyId": "WF-BZE2", "conceptId": "BOWSTRING",
     "notes": "C-11.3: yay teli. бзащӀэ + пс. Korpus: 0.", "corpusFrequency": 0},
    {"id": "L-KUBZE", "form": "кубзэ", "literalMeaning": "araba yayi",
     "partOfSpeech": "noun", "wordFamilyId": "WF-BZE2", "conceptId": "SPRING",
     "notes": "C-11.3: araba yayi. Korpus: 0.", "corpusFrequency": 0},
    {"id": "L-PSHCHYNE1AKUE", "form": "пщынэӀакъу", "literalMeaning": "muzik yayi",
     "partOfSpeech": "noun", "wordFamilyId": "WF-PSHCHYNE", "conceptId": "BOW_MUSIC",
     "notes": "C-11.3: muzik yayi. Korpus: 0.", "corpusFrequency": 0},
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
