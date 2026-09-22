import json
import os

# Türkçe kelimeler ve İngilizce, Rusça, Arapça karşılıkları
search_map = {
    "su": {"en": "water", "ru": "вода", "ar": "ماء"},
    "ev": {"en": "house", "ru": "дом", "ar": "بيت"},
    "at": {"en": "horse", "ru": "лошадь", "ar": "حصان"},
    "baba": {"en": "father", "ru": "отец", "ar": "أب"},
    "anne": {"en": "mother", "ru": "мать", "ar": "أم"},
    "sevgi": {"en": "love", "ru": "любовь", "ar": "حب"}
}

DATA_DIR = "public/data"
META_FILE = os.path.join("src/data", "dictionaries.json")

with open(META_FILE, "r", encoding="utf-8") as f:
    metadata = json.load(f)

meta_map = {m["file"]: m for m in metadata}

def print_table(file, matches):
    meta = meta_map.get(file, {})
    title = meta.get("title", "Unknown")
    author = meta.get("author", "Unknown")
    year = meta.get("year", "Unknown")
    total_words = meta.get("total_words", "Unknown")
    print("\n=== {} ===".format(file))
    print("Bulunan kelimeler:", ", ".join(matches))
    print(f"{title} | {author} | {year} | {total_words} kelime")

for fname in sorted(os.listdir(DATA_DIR)):
    if not fname.endswith(".json"):
        continue
    path = os.path.join(DATA_DIR, fname)
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    words = data.get("words", {})
    matches = []

    # Her Türkçe kelimenin EN/RU/AR karşılıklarını arama
    for tr_word, translations in search_map.items():
        for lang, term in translations.items():
            if term in words:
                matches.append(f"{tr_word} ({lang}:{term})")
                entry = words[term]
                print(f"\n--- {tr_word} ({lang}:{term}) ({fname}) ---")
                print("spelling:", entry.get("spelling", ""))
                print("cognates:", entry.get("cognates", []))
                print("redirect:", entry.get("redirect", ""))
                print("full_definition_in_html:", entry.get("full_definition_in_html", ""))
                print("definitions:", entry.get("definitions", []))
                print("derivation:", entry.get("derivation", ""))
                print("type:", entry.get("type", ""))
                print("synonyms:", entry.get("synonyms", []))

    if matches:
        print_table(fname, matches)
