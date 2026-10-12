import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Yeni eklenenler
concept_dagilim = Counter()
for l in lex:
    cid = l.get("conceptId")
    if cid:
        concept_dagilim[cid] += 1

print(f"=== CONCEPT DAGILIMI (Toplam: {len(concept_dagilim)} kavram) ===")
for cid, sayi in concept_dagilim.most_common(30):
    print(f"  {cid:30s} {sayi:5d}")

# ANIMAL/COLOR kalan
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]
color = [l for l in lex if l.get("conceptId") == "COLOR"]
print(f"\nANIMAL: {len(animal)}")
print(f"COLOR: {len(color)}")
