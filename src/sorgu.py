import json
from pathlib import Path

DATA_DIR = Path("e:/projeler/Cerkesce/public/data")

# Aranacak Arapça kelimeler
queries = ["ماء", "بيت", "حصان", "أب", "أم", "حب"]

# Manifest dosyasını doğru yoldan yükle
with open("e:/projeler/Cerkesce/src/data/dictionaries.json", encoding="utf-8") as f:
    manifest = json.load(f)

meta_map = {m["file"]: m for m in manifest}

def run_search(query: str, mode_name: str, func):
    results = []
    for file in DATA_DIR.glob("*.json"):
        try:
            with open(file, encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, dict) and "words" in data:
                for spelling in data["words"].keys():
                    if func(spelling, query):
                        results.append((file.name, spelling))
            elif isinstance(data, list):
                for item in data:
                    word = item.get("kelime") or item.get("word") or item.get("spelling") or ""
                    if func(word, query):
                        results.append((file.name, word))
        except Exception as e:
            print(f"Hata: {file} → {e}")

    unique_files = {fname for fname, _ in results}
    print(f"=== {mode_name} Match ('{query}')")
    print(f"Toplam: {len(results)} sonuç")
    print(f"Sözlükler: {len(unique_files)}")
    for fname in sorted(unique_files):
        print(f"  - {fname}")
        meta = meta_map.get(fname)
        if meta:
            print(f"    {meta.get('title','?')} | {meta.get('author','?')} | {meta.get('year','?')} | {meta.get('total_words','?')} kelime")
    print()

def search_exact(word, q): return word.lower() == q.lower()
def search_prefix(word, q): return word.lower().startswith(q.lower())
def search_substring(word, q): return q.lower() in word.lower()

for q in queries:
    run_search(q, "Exact", search_exact)
    run_search(q, "Prefix", search_prefix)
    run_search(q, "Substring", search_substring)
