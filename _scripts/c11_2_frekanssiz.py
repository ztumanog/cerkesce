import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
sifir = [l for l in lex if not l.get("corpusFrequency") or l["corpusFrequency"] == 0]

print(f"Frekanssiz: {len(sifir)}\n")
aile_sayisi = Counter(l.get("wordFamilyId", "?") for l in sifir)
print("=== AILE BAZINDA ===")
for aile, n in aile_sayisi.most_common():
    print(f"  {aile:15} {n}")
