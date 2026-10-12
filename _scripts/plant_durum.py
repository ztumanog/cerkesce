import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# PLANT ile ilgili
plant = [l for l in lex if "PLANT" in (l.get("conceptId") or "") or
         l.get("taxonomyFamily") == "Doğa & Bitki" or
         l.get("taxonomyFamily") == "Bitki"]

print(f"PLANT ile ilgili: {len(plant)}")
print()

cid = Counter(l.get("conceptId") for l in plant)
print("conceptId dagilimi:")
for c, s in cid.most_common(20):
    print(f"  {c}: {s}")

print("\nIlk 30:")
for l in plant[:30]:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
