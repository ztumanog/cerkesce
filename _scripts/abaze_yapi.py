import json
import os
from pathlib import Path

os.chdir("E:/projeler/Cerkesce")

# 27.Tur-Ady_Abaze.json
f = Path('public/data/27.Tur-Ady_Abaze.json')
data = json.loads(f.read_text(encoding='utf-8'))

print(f"Tip: {type(data)}")
print(f"Keys: {list(data.keys()) if isinstance(data, dict) else 'Liste'}")
print()

if isinstance(data, dict):
    print(f"Title: {data.get('title', '?')}")
    print(f"ID: {data.get('id', '?')}")
    print(f"FromLang: {data.get('fromLang', '?')}")
    print(f"ToLang: {data.get('toLang', '?')}")
    print(f"Format: {data.get('format', '?')}")
    
    if 'words' in data:
        words = data['words']
        print(f"\nToplam kelime: {len(words)}")
        print()
        print("=== ORNEK KAYITLAR (ilk 5) ===")
        for i, (k, v) in enumerate(words.items()):
            if i >= 5:
                break
            print(f"Key: '{k}'")
            if isinstance(v, dict):
                print(f"  spelling: {v.get('spelling', '')[:100]}")
                print(f"  html: {v.get('full_definition_in_html', '')[:200]}")
            else:
                print(f"  Value: {str(v)[:200]}")
            print()
elif isinstance(data, list):
    print(f"Uzunluk: {len(data)}")
    print()
    print("=== ORNEK KAYITLAR (ilk 5) ===")
    for i, item in enumerate(data[:5]):
        print(f"  {i}. Tip: {type(item)}")
        if isinstance(item, dict):
            print(f"     Keys: {list(item.keys())}")
            print(f"     {json.dumps(item, ensure_ascii=False)[:300]}")
        else:
            print(f"     {str(item)[:300]}")
        print()