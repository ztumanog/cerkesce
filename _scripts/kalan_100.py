import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

print(f"Toplam kalan: {len(kalan)}")

# Pos dagilimi
pos_counter = Counter(l.get("partOfSpeech", "?") for l in kalan)
print(f"\n=== POS Dagilimi ===")
for pos, count in pos_counter.most_common(10):
    print(f"  {pos:20s} {count}")

# Form uzunlugu
len_counter = Counter(len(l.get("form", "")) for l in kalan)
print(f"\n=== Form Uzunlugu ===")
for length in sorted(len_counter.keys())[:12]:
    print(f"  {length:2d} harf: {len_counter[length]}")

# Ilk 100 ornek
print(f"\n=== KALAN 100 ===")
for i, l in enumerate(kalan[:100], 1):
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    meaning = (l.get("literalMeaning") or "")[:35]
    print(f"  {i:3d}. {form:25s} | {pos:12s} | {meaning}")
