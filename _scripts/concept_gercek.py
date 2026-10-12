import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Tüm kayıtlardaki conceptId'leri say
concept_dagilim = Counter(
    l.get("conceptId") for l in lex 
    if l.get("conceptId")
)

print(f"=== TÜM KAYITLARDAKİ CONCEPTID'LER ({len(concept_dagilim)} farklı) ===\n")
for cid, sayi in concept_dagilim.most_common(30):
    print(f"  {cid:25s} {sayi:5d}")

# isLemma durumuna göre
lemma_concept = sum(1 for l in lex if l.get("isLemma") and l.get("conceptId"))
corpus_concept = sum(1 for l in lex if not l.get("isLemma") and l.get("conceptId"))
print(f"\n=== ÖZET ===")
print(f"Lemma + conceptId: {lemma_concept}")
print(f"Corpus + conceptId: {corpus_concept}")
print(f"Toplam conceptId: {lemma_concept + corpus_concept}")
