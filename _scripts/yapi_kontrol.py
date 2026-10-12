import json
from pathlib import Path

def bak(yol, ad):
    print(f"\n{'='*70}")
    print(f"📁 {ad}")
    print('='*70)
    
    data = json.loads(Path(yol).read_text(encoding="utf-8"))
    
    if isinstance(data, list):
        print(f"Tip: LIST, uzunluk: {len(data)}")
        if data:
            print(f"Anahtarlar: {list(data[0].keys())}")
            print(f"\nİlk 2 kayıt:")
            for r in data[:2]:
                print(f"  {json.dumps(r, ensure_ascii=False)[:250]}")
    elif isinstance(data, dict):
        print(f"Tip: DICT, anahtar sayısı: {len(data)}")
        ilk = list(data.keys())[:3]
        print(f"İlk anahtarlar: {ilk}")
        print(f"\nİlk değer:")
        print(f"  {json.dumps(data[ilk[0]], ensure_ascii=False)[:400]}")

bak("public/data/linguistic/roots.json", "roots.json")
bak("public/data/linguistic/word_families.json", "word_families.json")
bak("public/data/linguistic/concept_mapping.json", "concept_mapping.json")
bak("public/data/linguistic/kabardian_roots_database.json", "kabardian_roots_database.json")
