import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# NATURE ile ilgili
nature = [l for l in lex if "NATURE" in (l.get("conceptId") or "") or
          l.get("conceptId") == "NATURE" or
          l.get("taxonomyFamily") == "Doğa"]

print(f"NATURE ile ilgili: {len(nature)}")
print()

cid = Counter(l.get("conceptId") for l in nature)
print("conceptId dagilimi:")
for c, s in cid.most_common(20):
    print(f"  {c}: {s}")

print("\nIlk 30:")
for l in nature[:30]:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
