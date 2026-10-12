import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
rootlu = [l for l in lex if l.get("rootIds")]

root_dagilim = Counter()
for l in rootlu:
    for rid in l["rootIds"]:
        root_dagilim[rid] += 1

print("=== TÜM KRİTİK KÖKLER ===")
kritik = [
    "R-GU", "R-HAE", "R-ADA", "R-DA", "R-NA", "R-LHA", "R-QA",
    "R-QWA", "R-ZHY", "R-DZA", "R-FA", "R-ANA", "R-SHA", "R-CHA",
    "R-YN", "R-TSY", "R-FO", "R-WAS", "R-MYL", "R-WA", "R-WAFA",
    "R-WASHKH", "R-BZA", "R-PSY", "R-PSA", "R-SHHA", "R-PA",
    "R-WNA", "R-THA", "R-KWA", "R-CHET", "R-ZHAM", "R-TET", "R-LHY"
]

for rid in kritik:
    sayi = root_dagilim.get(rid, 0)
    print(f"  {rid:12s} {sayi:5}")

print(f"\nrootIds dolu: {len(rootlu)}")
print(f"Çoklu kök: {len([l for l in rootlu if len(l['rootIds']) > 1])}")
