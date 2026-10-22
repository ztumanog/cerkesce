import json
from pathlib import Path

f = Path("public/data/27.Tur-Ady_Abaze.json")
print(f"Dosya: {f.name} ({f.stat().st_size} byte)\n")

data = json.loads(f.read_text(encoding="utf-8"))
print(f"Tip: {type(data).__name__}")

if isinstance(data, list):
    print(f"Kayit sayisi: {len(data)}")
    if data:
        ilk = data[0]
        print(f"Anahtarlar: {list(ilk.keys())}")
        print(f"\n=== ILK KAYIT ===")
        for k, v in ilk.items():
            print(f"  {k}: {str(v)[:150]}")

        # examples alanı var mı?
        ex_var = sum(1 for e in data if e.get("examples"))
        print(f"\nexamples dolu kayit: {ex_var}/{len(data)}")
        if ex_var:
            for e in data:
                if e.get("examples"):
                    print(f"\n=== ORNEK examples ===")
                    print(f"  form: {e.get('form','?')}")
                    print(f"  examples: {str(e['examples'])[:300]}")
                    break

elif isinstance(data, dict):
    print(f"Anahtarlar: {list(data.keys())[:10]}")
    ilk_key = list(data.keys())[0]
    print(f"\n=== ORNEK: {ilk_key} ===")
    print(f"  {str(data[ilk_key])[:300]}")
