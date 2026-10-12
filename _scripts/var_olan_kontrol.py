import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
mevcut = {l.get("form", "") for l in lex if l.get("form")}

print("=== Sözlükte olan corpus formlarından lexemes'te OLMAYANLAR ===")
print(f"Mevcut lexemes: {len(mevcut)}")

# missing-words
missing = json.loads(Path("data/corpus/missing-words.json").read_text(encoding="utf-8"))

# Sözlük formları
dict_map = {}
for dict_file in Path("public/data").glob("[0-9]*.json"):
    try:
        data = json.loads(dict_file.read_text(encoding="utf-8"))
        words = data.get("words", {})
        for form in words:
            dict_map[form] = dict_file.stem
    except:
        pass

print(f"Sözlük formu: {len(dict_map)}")

# Sözlükte olup lexemes'te olmayan corpus formları
var_olan = []
for lang in ["kbd", "ady"]:
    for item in missing.get(lang, []):
        word = item["word"]
        if word in dict_map and word not in mevcut:
            var_olan.append({"word": word, "freq": item["freq"], "lang": lang})

var_olan.sort(key=lambda x: -x["freq"])
print(f"\nSözlükte olup lexemes'te olmayan: {len(var_olan)}")

print(f"\n=== En yüksek 30 ===")
for w in var_olan[:30]:
    print(f"  {w['word']:20s} freq: {w['freq']} ({w['lang']})")
