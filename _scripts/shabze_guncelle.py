import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# L-SHABZE zaten var mi?
if "L-SHABZE" in mevcut:
    for l in lex:
        if l["id"] == "L-SHABZE":
            l["ipa"] = "/ˈʂɑ:bzɐ/"
            l["senses"] = [
                {"senseId": 1, "gloss": "bow (weapon)", "tr": "yay", "ru": "лук"},
                {"senseId": 2, "gloss": "arrow", "tr": "ok", "ru": "стрела"}
            ]
            l["derivation"] = {
                "rootIds": ["R-BZE2"],
                "morphemeIds": ["M-SH", "M-A", "M-BZ", "M-E"],
                "rule": "compound"
            }
            l["sources"] = ["Adygea Wiktionary", "Yamisha 2018", "Asemez 2013"]
            l["notes"] = "C-11.3: yay/ok. шабзэ + пс = шабзэпс. Korpus: ?"
            print("L-SHABZE guncellendi: 2 anlam")
else:
    lex.append({
        "id": "L-SHABZE", "form": "шабзэ",
        "ipa": "/ˈʂɑ:bzɐ/",
        "literalMeaning": "yay, ok",
        "partOfSpeech": "noun",
        "wordFamilyId": "WF-BZE2", "conceptId": "BOW",
        "derivation": {
            "rootIds": ["R-BZE2"],
            "morphemeIds": ["M-SH", "M-A", "M-BZ", "M-E"],
            "rule": "compound"
        },
        "senses": [
            {"senseId": 1, "gloss": "bow (weapon)", "tr": "yay", "ru": "лук"},
            {"senseId": 2, "gloss": "arrow", "tr": "ok", "ru": "стрела"}
        ],
        "sources": ["Adygea Wiktionary", "Yamisha 2018", "Asemez 2013"],
        "notes": "C-11.3: yay/ok. шабзэ + пс = шабзэпс. Korpus: ?",
        "corpusFrequency": 0
    })
    print("L-SHABZE eklendi: 2 anlam")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam lexeme: {len(lex)}")
