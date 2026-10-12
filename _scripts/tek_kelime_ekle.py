import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

yeni = {
    "id": "L-SHXHEGAVAGHE",
    "form": "щхьэгавагъэ",
    "literalMeaning": "болтовня; болтливость; надоедливость",
    "partOfSpeech": "noun",
    "corpusFrequency": 0,
    "dialectVariants": {
        "adyghe": "щхьэгавагъэ",
        "kabardian": ""
    },
    "notes": "Manuel eklendi (sözlükte var, lexemes'te yoktu)"
}

if not any(l.get("form") == "щхьэгавагъэ" for l in lex):
    lex.append(yeni)
    lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✅ Eklendi. Toplam: {len(lex)}")
else:
    print("⚠️ Zaten var")
