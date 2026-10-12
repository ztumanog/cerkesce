import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Her conceptId için ilk 3 Çerkesçe kelimeyi göster
concept_kelimeler = {}
for l in lex:
    cid = l.get("conceptId")
    kelime = l.get("kelime") or l.get("spelling") or l.get("madde")
    if cid and kelime:
        if cid not in concept_kelimeler:
            concept_kelimeler[cid] = []
        if len(concept_kelimeler[cid]) < 3:
            concept_kelimeler[cid].append(kelime)

print("=== CONCEPT ID + ÇERKESÇE KELİMELER ===")
for cid, kelimeler in sorted(concept_kelimeler.items(), key=lambda x: -len(x[1]))[:50]:
    print(f"  {cid:25s} → {', '.join(kelimeler)}")
