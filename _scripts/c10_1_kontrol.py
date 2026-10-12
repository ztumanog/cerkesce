import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
data = json.loads(Path("data/corpus/frequency/c10_1_bulunmayanlar.json").read_text(encoding="utf-8"))
print("Anahtarlar:", list(data.keys()))
print(f"Liste: {len(data.get('liste', []))}")
print(f"Ilk 3:")
for s in data.get("liste", [])[:3]:
    print(f"  {s}")
