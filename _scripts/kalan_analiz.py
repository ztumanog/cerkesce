import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# rootIds olmayanlar
kalan = [l for l in lex if not l.get("rootIds")]
print(f"rootIds olmayan: {len(kalan)}")

pos_counter = Counter(l.get("partOfSpeech", "?") for l in kalan)
print(f"\n=== partOfSpeech dagilimi ===")
for pos, count in pos_counter.most_common(10):
    print(f"  {pos:20s} {count}")

len_counter = Counter(len(l.get("form", "")) for l in kalan)
print(f"\n=== Form uzunlugu ===")
for length in sorted(len_counter.keys()):
    if length <= 15:
        print(f"  {length:2d} harf: {len_counter[length]}")

print(f"\n=== Ornek 20 ===")
for l in kalan[:20]:
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    print(f"  {form:25s} | {pos}")
