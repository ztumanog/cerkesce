import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# L-SHCHEN (satmak) guncelle
for l in lex:
    if l["id"] == "L-SHCHEN":
        l["ipa"] = "/ɕɐn/"
        l["literalMeaning"] = "satmak"
        l["senses"] = [
            {"senseId": 1, "gloss": "to sell", "tr": "satmak", "ru": "продать"}
        ]
        l["notes"] = "C-11.3: satmak. Emir: щэ = sat! Korpus: 0."
        l["sources"] = ["Adygea Wiktionary"]
        print("L-SHCHEN guncellendi: satmak")

# L-SHCHEN2 (karakter) ekle
if "L-SHCHEN2" not in mevcut:
    lex.append({
        "id": "L-SHCHEN2", "form": "щэн", "ipa": "/ɕɐn/",
        "literalMeaning": "karakter, mizac",
        "partOfSpeech": "noun",
        "wordFamilyId": "WF-SHCHEN2", "conceptId": "CHARACTER",
        "senses": [
            {"senseId": 1, "gloss": "character, nature", "tr": "karakter, mizaç", "ru": "характер; нрав"}
        ],
        "notes": "C-11.3: karakter. Homonim: L-SHCHEN (satmak), L-SHCHEN3 (dokumak). Korpus: 0.",
        "corpusFrequency": 0
    })
    print("Eklendi: L-SHCHEN2 - щэн (karakter)")

# L-SHCHEN3 (dokumak) ekle
if "L-SHCHEN3" not in mevcut:
    lex.append({
        "id": "L-SHCHEN3", "form": "щэн", "ipa": "/ɕɐn/",
        "literalMeaning": "dokumak",
        "partOfSpeech": "verb",
        "wordFamilyId": "WF-SHCHEN3", "conceptId": "WEAVE",
        "senses": [
            {"senseId": 1, "gloss": "to weave", "tr": "dokumak", "ru": "ткать"}
        ],
        "notes": "C-11.3: dokumak. Homonim: L-SHCHEN (satmak), L-SHCHEN2 (karakter). Korpus: 0.",
        "corpusFrequency": 0
    })
    print("Eklendi: L-SHCHEN3 - щэн (dokumak)")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
