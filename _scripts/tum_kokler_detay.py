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

# Kök formlarını yükle
roots = json.loads(Path("_scripts/roots_birlesik.json").read_text(encoding="utf-8"))
root_form_map = {r["rootIds"][0]: r["form"] for r in roots if r.get("rootIds")}

print("=== TÜM KÖKLER (dağılıma göre) ===")
print(f"{'Kök':12s} {'Form':10s} {'Adet':>5s}  Örnek 8 kelime")
print("-" * 100)

for rid, sayi in root_dagilim.most_common():
    form = root_form_map.get(rid, "?")
    ornekler = [l['form'] for l in rootlu if rid in l['rootIds']][:8]
    print(f"{rid:12s} {form:10s} {sayi:5d}  {', '.join(ornekler)}")
