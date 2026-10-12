import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

wf = json.loads(Path("public/data/linguistic/word_families.json").read_text(encoding="utf-8"))
print(f"Toplam: {len(wf)}\n")

kat = Counter(w.get("category", "other") for w in wf)
for k, v in kat.most_common():
    print(f"  {k:15} {v}")
