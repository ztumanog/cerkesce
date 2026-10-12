import json
from pathlib import Path

# 1. missing-words yükle
missing = json.loads(Path("data/corpus/missing-words.json").read_text(encoding="utf-8"))

# 2. Tüm sözlükleri tara (form -> meaning map)
print("Sözlükler taranıyor...")
dict_map = {}
for dict_file in Path("public/data").glob("[0-9]*.json"):
    try:
        data = json.loads(dict_file.read_text(encoding="utf-8"))
        words = data.get("words", {})
        for form, entry in words.items():
            if form not in dict_map:
                dict_map[form] = {
                    "spelling": entry.get("spelling", form),
                    "definition": entry.get("full_definition_in_html", ""),
                    "source": dict_file.stem
                }
    except Exception as e:
        print(f"  HATA {dict_file.name}: {e}")

print(f"Toplam sözlük formu: {len(dict_map)}")

# 3. lexemes yükle
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut_forms = {l.get("form", "").lower() for l in lex if l.get("form")}

# 4. KBD + ADY birleştir
all_words = []
for lang in ["kbd", "ady"]:
    for item in missing.get(lang, []):
        all_words.append({"word": item["word"], "freq": item["freq"], "lang": lang})

all_words.sort(key=lambda x: -x["freq"])
print(f"Toplam eksik: {len(all_words)}")

# 5. Sözlükte eşleşenleri al
matched = []
for item in all_words:
    word = item["word"]
    if word.lower() in mevcut_forms:
        continue
    if word in dict_map:
        matched.append({**item, "dict": dict_map[word]})

print(f"Sözlükte eşleşen: {len(matched)}")

# 6. İlk 5000'i al
top = matched[:5000]
print(f"Eklenecek: {len(top)}")

# 7. Lexeme formatına çevir
yeni = []
for idx, item in enumerate(top):
    word = item["word"]
    dict_info = item["dict"]
    yeni.append({
        "id": f"L-CORPUS-{idx:05d}",
        "form": word,
        "literalMeaning": dict_info["definition"][:150] if dict_info["definition"] else "",
        "partOfSpeech": "noun",
        "corpusFrequency": item["freq"],
        "dialectVariants": {
            "adyghe": word if item["lang"] == "ady" else "",
            "kabardian": word if item["lang"] == "kbd" else ""
        },
        "notes": f"Corpus v1.0 (freq: {item['freq']}, lang: {item['lang']}, source: {dict_info['source']})"
    })

# 8. Kaydet
output = Path("data/corpus/corpus-5000-entries.json")
output.write_text(json.dumps(yeni, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Kaydedildi: {output}")
print(f"Toplam: {len(yeni)}")
