import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Lemma'lardaki conceptId'leri say
concept_dagilim = Counter(
    l.get("conceptId") for l in lex 
    if l.get("isLemma") and l.get("conceptId")
)

print(f"=== LEMMA'LARDAKİ CONCEPTID'LER ({len(concept_dagilim)} farklı) ===\n")
for cid, sayi in concept_dagilim.most_common(30):
    print(f"  {cid:25s} {sayi:5d}")
