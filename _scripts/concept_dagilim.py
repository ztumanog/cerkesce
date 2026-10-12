import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

concept_dagilim = Counter()
for l in lex:
    cid = l.get("conceptId")
    if cid:
        concept_dagilim[cid] += 1

print(f"=== CONCEPT DAGILIMI (Toplam: {len(concept_dagilim)} farkli kavram) ===")
for cid, sayi in concept_dagilim.most_common(50):
    print(f"  {cid:30s} {sayi:5d}")

print(f"\nToplam conceptId dolu: {sum(concept_dagilim.values())}")
print(f"Toplam kayit: {len(lex)}")
