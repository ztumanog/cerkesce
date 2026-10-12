import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

if "L-SHEZAQUEURYUE" not in mevcut:
    lex.append({
        "id": "L-SHEZAQUEURYUE", "form": "шэзакъуэрыуэ",
        "ipa": "/ʂɐzɐqʹʷɐ'rǝwɐ/",
        "literalMeaning": "tek atimlik tufek",
        "partOfSpeech": "noun",
        "wordFamilyId": "WF-WEAPON", "conceptId": "RIFLE",
        "derivation": {
            "rootIds": ["R-SHE2"],
            "morphemeIds": ["M-SH", "M-E", "M-ZAQUE", "M-E", "M-RY", "M-U", "M-E"],
            "rule": "compound"
        },
        "senses": [
            {"senseId": 1, "gloss": "single-shot rifle", "tr": "tek atımlık tüfek", "ru": "однозарядное ружьё"}
        ],
        "notes": "C-11.3: tek atimlik tufek. шэ (mermi) + закъуэ (tek). Vikisozluk.",
        "corpusFrequency": 0
    })
    print("Eklendi: L-SHEZAQUEURYUE - шэзакъуэрыуэ")
else:
    print("L-SHEZAQUEURYUE zaten var")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam lexeme: {len(lex)}")
