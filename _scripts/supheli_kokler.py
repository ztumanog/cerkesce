import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
rootlu = [l for l in lex if l.get("rootIds")]

root_dagilim = Counter()
for l in rootlu:
    for rid in l["rootIds"]:
        root_dagilim[rid] += 1

roots = json.loads(Path("_scripts/roots_birlesik.json").read_text(encoding="utf-8"))
root_form_map = {r["rootIds"][0]: r["form"] for r in roots if r.get("rootIds")}

print("=== ŞÜPHELİ KÖKLER (2 harfli veya >100 kelime) ===\n")
for rid, sayi in root_dagilim.most_common():
    form = root_form_map.get(rid, "?")
    if len(form) <= 2 or sayi > 100:
        ornekler = [l['form'] for l in rootlu if rid in l['rootIds']][:20]
        print(f"{rid:12s} ({form}) - {sayi} kelime")
        print(f"  {', '.join(ornekler)}")
        print()
