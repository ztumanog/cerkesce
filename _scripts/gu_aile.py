import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# R-GU* kökleri
root_dagilim = Counter()
for l in lex:
    for rid in (l.get("rootIds") or []):
        if rid.startswith("R-GU"):
            root_dagilim[rid] += 1

print("=== R-GU* KÖKLERİ ===")
toplam = 0
for rid, sayi in sorted(root_dagilim.items()):
    print(f"  {rid:20s} {sayi:4d} kelime")
    toplam += sayi

print(f"\nToplam: {toplam}")

# R-GU (sadece)
r_gu = [l for l in lex if "R-GU" in (l.get("rootIds") or [])]
print(f"\n=== R-GU (kalp/zihin) ===")
print(f"Kelime sayısı: {len(r_gu)}")
for l in r_gu:
    print(f"  {l.get('form', '?'):25s} conceptId={l.get('conceptId')}")
