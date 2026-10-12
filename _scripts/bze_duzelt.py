import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# L-BZEBZ varsa sil
lex = [l for l in lex if l["id"] != "L-BZEBZ"]
print("L-BZEBZ silindi (bagimsiz kok degil)")

# Yeni kelimeler ekle
yeni = [
    {"id": "L-SHABZEBZE", "form": "шабзэбзэ",
     "literalMeaning": "yay kirisi",
     "partOfSpeech": "noun",
     "wordFamilyId": "WF-BZE", "conceptId": "BOWSTRING",
     "notes": "C-11.3: yay kirisi. шабзэ + бзэ. Korpus: 1.",
     "corpusFrequency": 1},
    {"id": "L-1URYBZEBZYXHYN", "form": "Ӏурыбзэбзыхьын",
     "literalMeaning": "yalvararak konusmak",
     "partOfSpeech": "verb",
     "wordFamilyId": "WF-BZE", "conceptId": "FLATTER",
     "notes": "C-11.3: yalvararak konusmak. Korpus: 1.",
     "corpusFrequency": 1},
]

for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        print(f"Eklendi: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
