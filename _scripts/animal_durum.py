import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

animal = [l for l in lex if "ANIMAL" in (l.get("conceptId") or "") or
          l.get("conceptId") == "ANIMAL" or
          l.get("taxonomyFamily") == "Doğa & Hayvan"]

print(f"ANIMAL ile ilgili: {len(animal)}")
print()

cid = Counter(l.get("conceptId") for l in animal)
print("conceptId dagilimi:")
for c, s in cid.most_common(20):
    print(f"  {c}: {s}")

print("\nIlk 30:")
for l in animal[:30]:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
