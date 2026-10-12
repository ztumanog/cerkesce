import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

rootlu = [l for l in lex if l.get("rootIds")]
print(f"rootIds dolu: {len(rootlu)}")

for rid in ["R-ADA", "R-NA", "R-DA"]:
    sayi = len([l for l in lex if rid in (l.get("rootIds") or [])])
    print(f"  {rid:12s} {sayi}")

print("\n=== R-ADA kelimeleri ===")
for l in lex:
    if "R-ADA" in (l.get("rootIds") or []):
        print(f"  {l.get('form', '?'):25s}")

print("\n=== R-NA kelimeleri (ilk 15) ===")
sayac = 0
for l in lex:
    if "R-NA" in (l.get("rootIds") or []):
        print(f"  {l.get('form', '?'):25s}")
        sayac += 1
        if sayac >= 15:
            break
