import json
from pathlib import Path

# Bir sözlük dosyası örneği
dict_file = Path("public/data/0.Ady-Ady_AIG.json")
data = json.loads(dict_file.read_text(encoding="utf-8"))

print("=== Sözlük yapısı ===")
print(f"Üst anahtarlar: {list(data.keys())[:10]}")

if "words" in data:
    words = data["words"]
    print(f"\nToplam kelime: {len(words)}")
    ilk5 = list(words.items())[:5]
    for k, v in ilk5:
        print(f"\n  Anahtar: {k}")
        print(f"  Değer: {json.dumps(v, ensure_ascii=False)[:200]}")
