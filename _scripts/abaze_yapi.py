import json
from pathlib import Path

p = Path("public/data/27.Tur-Ady_Abaze.json")
data = json.loads(p.read_text(encoding="utf-8"))

print(f"Anahtarlar: {list(data.keys())}")
print(f"words tipi: {type(data['words']).__name__}")

words = data["words"]
if isinstance(words, dict):
    print(f"words anahtar sayısı: {len(words)}")
    ilk_anahtar = list(words.keys())[0]
    print(f"\nİlk anahtar: {ilk_anahtar}")
    print(f"İlk değer: {json.dumps(words[ilk_anahtar], ensure_ascii=False, indent=2)[:500]}")
    
    # Örnek cümle var mı?
    sayac = 0
    for k, v in words.items():
        if isinstance(v, dict):
            for key, val in v.items():
                if isinstance(val, str) and len(val) > 50:
                    if "◊" in val or "~" in val:
                        print(f"\n  {k} [{key}]: {val[:200]}")
                        sayac += 1
                        break
        if sayac >= 3:
            break
