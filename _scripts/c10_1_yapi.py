import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

p = Path("data/corpus/frequency/c10_1_bulunmayanlar.json")
data = json.loads(p.read_text(encoding="utf-8"))
print("Anahtarlar:", list(data.keys()))
for k, v in data.items():
    if isinstance(v, list):
        print(f"  {k}: list ({len(v)} eleman)")
        if v:
            print(f"    Ilk: {v[0]}")
    elif isinstance(v, dict):
        print(f"  {k}: dict ({len(v)} anahtar)")
        for kk, vv in list(v.items())[:3]:
            print(f"    {kk}: {vv}")
    else:
        print(f"  {k}: {v}")
