import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# COLOR ile ilgili kayitlar
color = [l for l in lex if (l.get("conceptId") == "COLOR" or
                            l.get("taxonomyFamily") == "Renk" or
                            "COLOR" in (l.get("conceptId") or ""))]

print(f"COLOR ile ilgili kayit: {len(color)}")
print()

# conceptId dagilimi
from collections import Counter
cid = Counter(l.get("conceptId", "YOK") for l in color)
print("conceptId dagilimi:")
for c, s in cid.most_common(20):
    print(f"  {c}: {s}")

# taxonomyFamily dagilimi
fam = Counter(l.get("taxonomyFamily", "YOK") for l in color)
print("\ntaxonomyFamily dagilimi:")
for f, s in fam.most_common(20):
    print(f"  {f}: {s}")

# Ilk 20 ornek
print("\nIlk 20 ornek:")
for l in color[:20]:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):15s} | {l.get('subConceptId', 'YOK')}")
