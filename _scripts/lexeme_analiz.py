import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam lexeme: {len(lex)}")

# ID prefix dağılımı
prefixes = Counter()
for l in lex:
    id_ = l.get("id", "")
    prefix = id_.split("-")[0] + "-" + id_.split("-")[1] if "-" in id_ else "?"
    prefixes[prefix] += 1

print(f"\n=== ID prefix dağılımı ===")
for p, c in prefixes.most_common(20):
    print(f"  {p:20s} {c}")

# Alan doluluk
print(f"\n=== Alan doluluk ===")
alanlar = ["form", "ipa", "partOfSpeech", "rootIds", "wordFamilyId", "conceptId", "conceptIds", "derivation", "meaning", "literalMeaning", "notes", "dialectVariants", "corpusFrequency"]
for alan in alanlar:
    dolu = sum(1 for l in lex if l.get(alan))
    pct = 100 * dolu / len(lex)
    bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))
    print(f"  {alan:20s} {dolu:6}/{len(lex)} ({pct:5.1f}%) {bar}")
