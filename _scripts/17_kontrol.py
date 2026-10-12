import json
from pathlib import Path

dict_path = Path("public/data/17.Kbd-En_Amjad.json")
data = json.loads(dict_path.read_text(encoding="utf-8"))

print(f"Üst anahtarlar: {list(data.keys())}")
print(f"Format: {data.get('format')}")
print(f"From: {data.get('fromLang')} -> To: {data.get('toLang')}")

words = data.get("words", {})
print(f"\nToplam kelime: {len(words)}")

print("\n=== İlk 5 ===")
for k, v in list(words.items())[:5]:
    print(f"\nAnahtar: {k}")
    print(f"Değer: {json.dumps(v, ensure_ascii=False)[:500]}")
