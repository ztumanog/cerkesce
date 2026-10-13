import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
bos = [l for l in lex if not l.get("ipa")]

print(f"Kalan IPA'siz: {len(bos)}")

# 1) Cok kelimeli ifadeler
cok_kelimeli = [l for l in bos if " " in l.get("form", "")]
print(f"\nCok kelimeli: {len(cok_kelimeli)}")

# 2) Tek kelime
tek_kelime = [l for l in bos if " " not in l.get("form", "")]
print(f"Tek kelime: {len(tek_kelime)}")

# 3) Uzunluk dagilimi
from collections import Counter
len_counter = Counter(len(l.get("form", "")) for l in tek_kelime)
print(f"\n=== Tek kelime uzunlugu ===")
for length in sorted(len_counter.keys())[:15]:
    print(f"  {length:2d} harf: {len_counter[length]}")

# 4) Root var mi?
rootli = sum(1 for l in bos if l.get("rootIds"))
rootsuz = len(bos) - rootli
print(f"\nRoot'lu: {rootli}")
print(f"Root'suz: {rootsuz}")

# 5) Ornek 50
print(f"\n=== IPA'siz 50 ornek ===")
for i, l in enumerate(bos[:50], 1):
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    root = l.get("rootIds", ["-"])[0] if l.get("rootIds") else "-"
    print(f"  {i:3d}. {form:25s} | {pos:12s} | {root}")
