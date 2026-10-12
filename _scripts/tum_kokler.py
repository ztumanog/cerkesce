import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
rootlu = [l for l in lex if l.get("rootIds")]

# Kök dağılımı
root_dagilim = Counter()
for l in rootlu:
    for rid in l["rootIds"]:
        root_dagilim[rid] += 1

print("=== TÜM KÖKLER (dağılıma göre) ===")
print(f"{'Kök':12s} {'Adet':>5s}  Örnek 10 kelime")
print("-" * 80)

for rid, sayi in root_dagilim.most_common():
    ornekler = [l['form'] for l in rootlu if rid in l['rootIds']][:10]
    print(f"{rid:12s} {sayi:5d}  {', '.join(ornekler)}")
