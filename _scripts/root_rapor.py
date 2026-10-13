import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

root_lexeme_count = Counter()
for l in lex:
    for rid in l.get("rootIds", []):
        root_lexeme_count[rid] += 1

kategoriler = {
    "cok_verimli": [],
    "verimli": [],
    "orta": [],
    "az": [],
    "kullanilmayan": [],
}

for r in roots:
    rid = r.get("id")
    count = root_lexeme_count.get(rid, 0)
    if count >= 100:
        kategoriler["cok_verimli"].append((rid, count))
    elif count >= 10:
        kategoriler["verimli"].append((rid, count))
    elif count >= 3:
        kategoriler["orta"].append((rid, count))
    elif count >= 1:
        kategoriler["az"].append((rid, count))
    else:
        kategoriler["kullanilmayan"].append((rid, 0))

print(f"=== ROOT KATEGORILERI ===")
for kat, items in kategoriler.items():
    print(f"  {kat:15s}: {len(items)}")

print(f"\n=== EN VERIMLI 20 ROOT ===")
sorted_verimli = sorted(kategoriler["cok_verimli"] + kategoriler["verimli"], key=lambda x: -x[1])[:20]
for rid, count in sorted_verimli:
    print(f"  {rid:25s} {count:5d}")
