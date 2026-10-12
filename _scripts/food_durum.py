import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# FOOD ile ilgili kayitlar
food = [l for l in lex if l.get("conceptId") == "FOOD"]

print(f"FOOD kayit: {len(food)}")
print()

# subConceptId dagilimi
sub = Counter(l.get("subConceptId", "YOK") for l in food)
print("subConceptId dagilimi:")
for s, n in sub.most_common(20):
    print(f"  {s}: {n}")

# taxonomyFamily dagilimi
fam = Counter(l.get("taxonomyFamily", "YOK") for l in food)
print("\ntaxonomyFamily dagilimi:")
for f, n in fam.most_common(10):
    print(f"  {f}: {n}")

# Ilk 30 ornek
print("\nIlk 30:")
for l in food[:30]:
    print(f"  {l.get('form'):20s} | {l.get('subConceptId', 'YOK'):20s} | {l.get('literalMeaning', 'YOK')[:40]}")
