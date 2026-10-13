import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam: {len(lex)}")
for alan in ["rootIds", "wordFamilyId", "conceptId", "derivation", "ipa", "translation", "audioUrl"]:
    dolu = sum(1 for l in lex if l.get(alan))
    pct = 100 * dolu / len(lex)
    bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))
    print(f"  {alan:20s} {dolu:6}/{len(lex)} ({pct:5.1f}%) {bar}")
