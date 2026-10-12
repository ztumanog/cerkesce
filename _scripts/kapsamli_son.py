import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
rootlu = [l for l in lex if l.get("rootIds")]

print(f"rootIds dolu: {len(rootlu)}")

root_dagilim = Counter()
for l in rootlu:
    for rid in l["rootIds"]:
        root_dagilim[rid] += 1

roots = json.loads(Path("_scripts/roots_birlesik.json").read_text(encoding="utf-8"))
root_form_map = {r["rootIds"][0]: r["form"] for r in roots if r.get("rootIds")}

print("\n=== En çok eşleşen 25 kök ===")
for rid, sayi in root_dagilim.most_common(25):
    form = root_form_map.get(rid, "?")
    print(f"  {rid:12s} ({form:8s}) {sayi:5}")

print("\n=== Kritik kökler ===")
for rid in ["R-HAE", "R-ADA", "R-NA", "R-DA", "R-LHA", "R-QA", "R-QWA", "R-CHET", "R-WAS", "R-FO", "R-DZA", "R-ZHAM", "R-TET", "R-LHY", "R-SHYGHW"]:
    sayi = root_dagilim.get(rid, 0)
    print(f"  {rid:12s} {sayi:5}")
