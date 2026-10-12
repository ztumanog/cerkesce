import json
from pathlib import Path

# 1. missing-words yükle
missing = json.loads(Path("data/corpus/missing-words.json").read_text(encoding="utf-8"))

# 2. Sözlükleri tara
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
    except:
        pass

print(f"Sözlük formu: {len(dict_map)}")

# 3. lexemes yükle
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut_forms = {l.get("form", "").lower() for l in lex if l.get("form")}
print(f"Mevcut form: {len(mevcut_forms)}")

# 4. Tüm eksik kelimeler (frekansa göre sıralı)
all_words = []
for lang in ["kbd", "ady"]:
    for item in missing.get(lang, []):
        all_words.append({"word": item["word"], "freq": item["freq"], "lang": lang})

all_words.sort(key=lambda x: -x["freq"])

# 5. Mevcut olmayanlardan ilk 10.000
yeni = []
idx = 0
for item in all_words:
    if idx >= 10000:
        break
    word = item["word"]
    if word.lower() in mevcut_forms:
        continue
    
    dict_info = dict_map.get(word, {})
    yeni.append({
        "id": f"L-CORPUS2-{idx:05d}",
        "form": word,
        "literalMeaning": dict_info.get("definition", "")[:150],
        "partOfSpeech": "noun",
        "corpusFrequency": item["freq"],
        "dialectVariants": {
            "adyghe": word if item["lang"] == "ady" else "",
            "kabardian": word if item["lang"] == "kbd" else ""
        },
        "notes": f"Corpus v1.0 batch-2 (freq: {item['freq']}, lang: {item['lang']}, source: {dict_info.get('source', 'none')})"
    })
    idx += 1

print(f"Eklenecek: {len(yeni)}")

# 6. Sözlükte eşleşen sayısı
matched = sum(1 for y in yeni if y["literalMeaning"])
print(f"Sözlükte eşleşen: {matched}")
print(f"Eşleşmeyen: {len(yeni) - matched}")

# 7. Ekle
lex.extend(yeni)
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Toplam lexeme: {len(lex)}")

# 8. Frekans dağılımı
print(f"\n=== Yeni kelimelerin frekans dağılımı ===")
for esik in [1000, 500, 100, 50, 10, 5, 1]:
    sayi = sum(1 for y in yeni if y["corpusFrequency"] >= esik)
    print(f"  freq >= {esik}: {sayi}")
