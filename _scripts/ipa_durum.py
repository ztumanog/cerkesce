import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Toplam lexeme: {len(lex)}")

# IPA dolu
ipa_dolu = sum(1 for l in lex if l.get("ipa"))
ipa_bos = len(lex) - ipa_dolu
print(f"IPA dolu: {ipa_dolu} ({100*ipa_dolu/len(lex):.1f}%)")
print(f"IPA bos: {ipa_bos}")

# ID prefix dagilimi (IPA'siz)
from collections import Counter
prefix_counter = Counter()
for l in lex:
    if not l.get("ipa"):
        id_ = l.get("id", "")
        parts = id_.split("-")
        if len(parts) >= 2:
            prefix = f"{parts[0]}-{parts[1]}"
            prefix_counter[prefix] += 1

print(f"\n=== IPA'siz ID prefix dagilimi ===")
for prefix, count in prefix_counter.most_common(15):
    print(f"  {prefix:20s} {count}")

# IPA'siz ornek
print(f"\n=== IPA'siz 30 ornek ===")
bos = [l for l in lex if not l.get("ipa")]
for i, l in enumerate(bos[:30], 1):
    form = l.get("form", "?")
    pos = l.get("partOfSpeech", "?")
    print(f"  {i:3d}. {form:25s} | {pos}")
