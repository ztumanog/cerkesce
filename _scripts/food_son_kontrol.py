import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Food/Eat/Meat/Taste/Bite/Soup/Pastry/Nutrient/Drink
food_all = [l for l in lex if any(k in (l.get("conceptId") or "") for k in
            ["FOOD", "EAT", "MEAT", "TASTE", "BITE", "SOUP", "PASTRY",
             "NUTRIENT", "DRINK", "STOMACH"])]

print(f"FOOD ile ilgili toplam: {len(food_all)}")
print()

# Concept dagilimi
cid = Counter(l.get("conceptId") for l in food_all)
for c, s in cid.most_common():
    print(f"  {c}: {s}")

print("\nTum kayitlar:")
for l in sorted(food_all, key=lambda x: x.get("conceptId", "")):
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
