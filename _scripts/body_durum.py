import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# BODY ile ilgili
body = [l for l in lex if "BODY" in (l.get("conceptId") or "") or
        l.get("conceptId") == "BODY" or
        "ANATOMY" in (l.get("conceptId") or "") or
        l.get("taxonomyFamily") == "İnsan & Beden"]

print(f"BODY ile ilgili: {len(body)}")
print()

cid = Counter(l.get("conceptId") for l in body)
print("conceptId dagilimi:")
for c, s in cid.most_common(15):
    print(f"  {c}: {s}")

print("\nIlk 30:")
for l in body[:30]:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
