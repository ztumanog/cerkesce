import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
rootlu = [l for l in lex if l.get("rootIds")]

root_dagilim = Counter()
for l in rootlu:
    for rid in l["rootIds"]:
        root_dagilim[rid] += 1

print(f"rootIds dolu: {len(rootlu)}")
print(f"Çoklu kök: {len([l for l in rootlu if len(l['rootIds']) > 1])}")

print("\n=== Kritik kökler (son durum) ===")
for rid in ["R-LHA", "R-QA", "R-QWA", "R-BZA", "R-ZHY", "R-DZA",
            "R-FA", "R-ANA", "R-SHA", "R-CHA", "R-YN", "R-TSY",
            "R-FO", "R-WAS", "R-MYL", "R-WA", "R-WAFA", "R-WASHKH",
            "R-HAE", "R-ADA", "R-NA", "R-DA"]:
    sayi = root_dagilim.get(rid, 0)
    print(f"  {rid:12s} {sayi:5}")

print("\n=== En çok eşleşen 15 kök ===")
for rid, sayi in root_dagilim.most_common(15):
    print(f"  {rid:12s} {sayi:5}")
