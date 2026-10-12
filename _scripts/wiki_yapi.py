import json
from pathlib import Path

for dosya in ["_scripts/wiktionary_veri.json", "_scripts/wiktionary_veri_v2.json"]:
    p = Path(dosya)
    if not p.exists():
        continue
    print(f"\n=== {p.name} ===")
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
        if isinstance(data, dict):
            print(f"Tip: dict, {len(data)} anahtar")
            print("Ilk 5 anahtar:")
            for k in list(data.keys())[:5]:
                v = data[k]
                print(f"  {k}: {type(v).__name__}")
                if isinstance(v, dict):
                    print(f"    alanlar: {list(v.keys())[:10]}")
        elif isinstance(data, list):
            print(f"Tip: list, {len(data)} kayit")
            print("Ilk kayit:")
            print(json.dumps(data[0], ensure_ascii=False, indent=2)[:500])
    except Exception as e:
        print(f"HATA: {e}")
