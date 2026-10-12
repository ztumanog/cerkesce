import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

kalan = [l for l in lex if not l.get("rootIds")]
print(f"rootIds olmayan: {len(kalan)}")

print(f"\n=== Kalan 30 ornek ===")
for l in kalan[:30]:
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    meaning = l.get("literalMeaning", "")[:30] if l.get("literalMeaning") else "-"
    print(f"  {form:25s} | {pos:15s} | {meaning}")

# Form uzunlugu dagilimi
from collections import Counter
len_counter = Counter(len(l.get("form", "")) for l in kalan)
print(f"\n=== Form uzunlugu ===")
for length in sorted(len_counter.keys())[:12]:
    print(f"  {length:2d} harf: {len_counter[length]}")

# ID prefix
prefix_counter = Counter()
for l in kalan:
    id_ = l.get("id", "")
    parts = id_.split("-")
    if len(parts) >= 2:
        prefix = f"{parts[0]}-{parts[1]}"
        prefix_counter[prefix] += 1
print(f"\n=== ID prefix ===")
for prefix, count in prefix_counter.most_common(10):
    print(f"  {prefix:20s} {count}")
