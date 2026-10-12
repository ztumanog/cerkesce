import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

f = Path("public/data/8.Ady-Tur_Huvaj.json")
data = json.loads(f.read_text(encoding="utf-8"))

print(f"Tip: {type(data)}")
print(f"Kayit sayisi: {len(data)}")

# Ilk kaydi goster
if isinstance(data, list):
    print("\n=== ILK KAYIT ===")
    print(json.dumps(data[0], ensure_ascii=False, indent=2)[:800])
elif isinstance(data, dict):
    print("\n=== ILK 3 ANAHTAR ===")
    for i, (k, v) in enumerate(data.items()):
        if i >= 3:
            break
        print(f"\n{k}:")
        print(json.dumps(v, ensure_ascii=False, indent=2)[:300])
