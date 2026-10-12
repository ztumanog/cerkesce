import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# Bir sözlüğü detaylı incele
f = Path("public/data/0.Ady-Ady_AIG.json")
data = json.loads(f.read_text(encoding="utf-8"))

print("=== ANAHTARLAR ===")
for k, v in data.items():
    if isinstance(v, list):
        print(f"  {k}: list ({len(v)} kayit)")
        if v:
            print(f"    Ilk kayit: {v[0]}")
    elif isinstance(v, dict):
        print(f"  {k}: dict ({len(v)} anahtar)")
        for kk, vv in list(v.items())[:3]:
            print(f"    {kk}: {str(vv)[:100]}")
    else:
        print(f"  {k}: {str(v)[:200]}")
