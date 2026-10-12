import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

rootlu = [l for l in lex if l.get("rootIds")]
coklu = [l for l in rootlu if len(l["rootIds"]) > 1]

print(f"Toplam lexemes: {len(lex)}")
print(f"rootIds dolu: {len(rootlu)}")
print(f"Çoklu kök (compound): {len(coklu)}")

# En çok eşleşen 15 kök
root_dagilim = Counter()
for l in rootlu:
    for rid in l["rootIds"]:
        root_dagilim[rid] += 1
print(f"\n=== En çok eşleşen 15 kök ===")
for rid, sayi in root_dagilim.most_common(15):
    print(f"  {rid:12s} {sayi:5}")

# R-HAE
print(f"\nR-HAE (köpek): {len([l for l in lex if 'R-HAE' in (l.get('rootIds') or [])])}")
