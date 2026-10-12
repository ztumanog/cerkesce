import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

if "L-YEPEMYN" not in mevcut:
    lex.append({
        "id": "L-YEPEMYN", "form": "епэмын",
        "ipa": "/je:pɐ'mǝn/",
        "literalMeaning": "koklamak",
        "partOfSpeech": "verb",
        "wordFamilyId": "WF-SENSE",
        "conceptId": "SMELL",
        "derivation": {
            "rootIds": ["R-PE"],
            "morphemeIds": ["M-YE", "M-PEM", "M-Y", "M-N"],
            "rule": "prefix"
        },
        "senses": [
            {"senseId": 1, "gloss": "to smell, sniff", "tr": "koklamak", "ru": "понюхать"}
        ],
        "notes": "C-11.4: koklamak. е- + пэм + -ы + -н. Vikisozluk.",
        "corpusFrequency": 0
    })
    print("Eklendi: L-YEPEMYN - епэмын (koklamak)")
else:
    print("L-YEPEMYN zaten var")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam lexeme: {len(lex)}")
