import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

time_cat = [l for l in lex if "TIME" in (l.get("conceptId") or "") or
            l.get("conceptId") == "TIME" or
            l.get("taxonomyFamily") == "Zaman & Kültür"]

print(f"TIME ile ilgili: {len(time_cat)}")
print()

cid = Counter(l.get("conceptId") for l in time_cat)
print("conceptId dagilimi:")
for c, s in cid.most_common(20):
    print(f"  {c}: {s}")

print("\nIlk 30:")
for l in time_cat[:30]:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
