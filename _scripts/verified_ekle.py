import json
from pathlib import Path

# 1. Sözlükleri tara
dict_map = {}
for dict_file in Path("public/data").glob("[0-9]*.json"):
    try:
        data = json.loads(dict_file.read_text(encoding="utf-8"))
        words = data.get("words", {})
        for form, entry in words.items():
            if form not in dict_map:
                dict_map[form] = {
                    "definition": entry.get("full_definition_in_html", ""),
                    "source": dict_file.stem
                }
    except:
        pass

print(f"Sözlük formu: {len(dict_map)}")

# 2. missing-words
missing = json.loads(Path("data/corpus/missing-words.json").read_text(encoding="utf-8"))

# 3. lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut_forms = {l.get("form", "").lower() for l in lex if l.get("form")}
print(f"Mevcut: {len(mevcut_forms)}")

# 4. Sözlükte olup lexemes'te olmayanlar
var_olan = []
for lang in ["kbd", "ady"]:
    for item in missing.get(lang, []):
        word = item["word"]
        if word in dict_map and word.lower() not in mevcut_forms:
            var_olan.append({
                "word": word,
                "freq": item["freq"],
                "lang": lang,
                "dict": dict_map[word]
            })

var_olan.sort(key=lambda x: -x["freq"])
print(f"Eklenecek: {len(var_olan)}")

# 5. Lexeme formatı
yeni = []
for idx, item in enumerate(var_olan):
    word = item["word"]
    yeni.append({
        "id": f"L-VERIFIED-{idx:05d}",
        "form": word,
        "literalMeaning": item["dict"]["definition"][:200],
        "partOfSpeech": "noun",
        "corpusFrequency": item["freq"],
        "dialectVariants": {
            "adyghe": word if item["lang"] == "ady" else "",
            "kabardian": word if item["lang"] == "kbd" else ""
        },
        "notes": f"Verified (freq: {item['freq']}, {item['dict']['source']})"
    })

print(f"Anlamlı: {sum(1 for y in yeni if y['literalMeaning'])}")

# 6. Ekle
lex.extend(yeni)
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Toplam: {len(lex)}")
