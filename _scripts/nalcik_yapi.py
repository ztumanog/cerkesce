import json
from pathlib import Path

p = Path("public/data/32.Rus-Kbd_Nalchik_2013.json")
data = json.loads(p.read_text(encoding="utf-8"))

print(f"Anahtarlar: {list(data.keys())}")
print(f"words tipi: {type(data['words']).__name__}")

words = data["words"]
if isinstance(words, dict):
    print(f"words anahtar sayısı: {len(words)}")
    ilk_anahtar = list(words.keys())[0]
    print(f"\nİlk anahtar: {ilk_anahtar}")
    print(f"İlk değer: {json.dumps(words[ilk_anahtar], ensure_ascii=False, indent=2)[:500]}")
