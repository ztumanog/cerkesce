import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

p = Path("public/data/linguistic/embedding_vectors.jsonl")
with p.open(encoding="utf-8") as f:
    ilk = json.loads(f.readline())

print("Anahtarlar:", list(ilk.keys()))
print()
for k, v in ilk.items():
    if isinstance(v, dict):
        print(f"  {k}: dict ({len(v)} anahtar)")
    elif isinstance(v, list):
        print(f"  {k}: list ({len(v)} eleman)")
    else:
        print(f"  {k}: {type(v).__name__} = {str(v)[:50]}")
