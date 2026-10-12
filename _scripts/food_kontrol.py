import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Konulan kategoriler
print("Yeni kategoriler:")
print("=" * 50)

# EAT_FOOD (gerçek FOOD)
food = [l for l in lex if l.get("conceptId") == "EAT_FOOD"]
print(f"\nEAT_FOOD: {len(food)}")
for l in food:
    print(f"  {l.get('form'):20s} | {l.get('literalMeaning', '?')}")

# FOOD_CONTAINER
fc = [l for l in lex if l.get("conceptId") == "FOOD_CONTAINER"]
print(f"\nFOOD_CONTAINER: {len(fc)}")
for l in fc:
    print(f"  {l.get('form'):20s} | {l.get('literalMeaning', '?')}")

# BOILED_MEAT
bm = [l for l in lex if l.get("conceptId") == "BOILED_MEAT"]
print(f"\nBOILED_MEAT: {len(bm)}")
for l in bm:
    print(f"  {l.get('form'):20s} | {l.get('literalMeaning', '?')}")

# MUTTON
mt = [l for l in lex if l.get("conceptId") == "MUTTON"]
print(f"\nMUTTON: {len(mt)}")
for l in mt:
    print(f"  {l.get('form'):20s} | {l.get('literalMeaning', '?')}")

# Tum FOOD ile ilgili
print("\n" + "=" * 50)
print("FOOD ile ilgili TUM kayitlar:")
food_all = [l for l in lex if "FOOD" in (l.get("conceptId") or "") or
            "MEAT" in (l.get("conceptId") or "") or
            "EAT" in (l.get("conceptId") or "") or
            "TASTE" in (l.get("conceptId") or "")]
print(f"Toplam: {len(food_all)}")
for l in food_all:
    print(f"  {l.get('form'):20s} | {l.get('conceptId'):20s} | {l.get('literalMeaning', '?')[:40]}")
