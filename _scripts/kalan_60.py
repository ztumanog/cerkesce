import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]
print(f"rootIds olmayan: {len(kalan)}")

print(f"\n=== KALAN 60 ===")
for i, l in enumerate(kalan[:60], 1):
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    meaning = (l.get("literalMeaning") or "")[:40]
    print(f"  {i:3d}. {form:25s} | {pos:12s} | {meaning}")

# Pos dagilimi
from collections import Counter
pos_counter = Counter(l.get("partOfSpeech", "?") for l in kalan)
print(f"\n=== POS Dagilimi ===")
for pos, count in pos_counter.most_common(10):
    print(f"  {pos:20s} {count}")
