import json
from pathlib import Path

DATA_DIR = Path("e:/projeler/Cerkesce/public/data")
query = "su"

def run_search(mode_name: str, func):
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
    print()

def search_exact(word, q): return word.lower() == q.lower()
def search_prefix(word, q): return word.lower().startswith(q.lower())
def search_substring(word, q): return q.lower() in word.lower()

run_search("Exact", search_exact)
run_search("Prefix", search_prefix)
run_search("Substring", search_substring)
import json
from pathlib import Path

DATA_DIR = Path("e:/projeler/Cerkesce/public/data")

files = ['26.Tu-Kbd-Jonty.json', '27.Tur-Ady_Abaze.json', '28.Tur-Ady_Huvaj.json', '29.Tur-Ady_Teshu.json', '31.Tu-Ady_Hilmi.json']
for f in files:
    with open(DATA_DIR / f, encoding='utf-8') as fp:
        d = json.load(fp)
    if isinstance(d, dict):
        keys = list(d.keys())[:3]
        has_words = 'words' in d
        print(f"{f} -> dict | has_words: {has_words} | keys: {keys}")
    else:
        print(f"{f} -> list | len: {len(d)}")

        import json
from pathlib import Path

with open("e:/projeler/Cerkesce/public/data/dictionaries.json", encoding="utf-8") as f:
    manifest = json.load(f)

targets = ['26.Tu-Kbd-Jonty', '27.Tur-Ady_Abaze', '28.Tur-Ady_Huvaj', '29.Tur-Ady_Teshu', '31.Tu-Ady_Hilmi']
files = [item.get('file', '') for item in manifest]
print("Manifest'te kayıtlı dosyalar (su için):")
for t in targets:
    found = any(t.lower() in f.lower() for f in files)
    print(f"  {t}: {'✅ VAR' if found else '❌ YOK'}")

    import json
from pathlib import Path

DATA_DIR = Path("e:/projeler/Cerkesce/public/data")

files = ['26.Tu-Kbd-Jonty.json', '27.Tur-Ady_Abaze.json', '28.Tur-Ady_Huvaj.json', '29.Tur-Ady_Teshu.json', '31.Tu-Ady_Hilmi.json']

for f in files:
    with open(DATA_DIR / f, encoding='utf-8') as fp:
        d = json.load(fp)
    words = d.get('words', {})
    # 'su' veya 'SU' anahtarını bul
    for key in words:
        if key.lower() == 'su':
            entry = words[key]
            print(f"\n{f} → key: '{key}'")
            print(f"  spelling: {entry.get('spelling')}")
            print(f"  definitions: {str(entry.get('definitions', []))[:100]}")
            print(f"  full_definition_in_html: {str(entry.get('full_definition_in_html', ''))[:80]}")
            break