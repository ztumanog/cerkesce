import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

rootlu = [l for l in lex if l.get("rootIds")]
print(f"rootIds dolu: {len(rootlu)}")
coklu = [l for l in rootlu if len(l["rootIds"]) > 1]
print(f"Çoklu kök (compound): {len(coklu)}")

# En çok eşleşen 15 kök
root_dagilim = Counter()
for l in rootlu:
    for rid in l["rootIds"]:
        root_dagilim[rid] += 1

print(f"\n=== En çok eşleşen 15 kök ===")
for rid, sayi in root_dagilim.most_common(15):
    print(f"  {rid:12s} {sayi:5}")

# Örnek bileşik kelimeler
print(f"\n=== Çoklu kök örnekleri (ilk 5) ===")
for l in coklu[:5]:
    print(f"  {l.get('form', '?'):20s} rootIds={l.get('rootIds')} components={l.get('derivation', {}).get('components', [])}")

# нэгу, Ӏэгу kontrol
print(f"\n=== Birleşik kontrol ===")
for hedef in ["нэгу", "Ӏэгу", "бзэгу", "тхьэмадэ"]:
    for l in lex:
        if l.get("form") == hedef:
            print(f"  {hedef}: rootIds={l.get('rootIds')} deriv={l.get('derivation')}")
            break
