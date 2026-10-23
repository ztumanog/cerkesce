# -*- coding: utf-8 -*-
import json, csv
from pathlib import Path
from collections import Counter

BASE = Path("public/data/linguistic")
OUT = Path("_scripts/raporlar"); OUT.mkdir(parents=True, exist_ok=True)

def as_list(o):
    if isinstance(o, dict): return list(o.values())
    if isinstance(o, list): return o
    return []

lex   = as_list(json.loads((BASE/"lexemes.json").read_text(encoding="utf-8")))
roots = as_list(json.loads((BASE/"roots.json").read_text(encoding="utf-8")))
root_by_id = {e.get("id"): e for e in roots if isinstance(e, dict) and e.get("id")}

def refs_all(e):
    out = list(e.get("rootIds") or [])
    d = e.get("derivation")
    if isinstance(d, dict): out += list(d.get("rootIds") or [])
    return out

allref = Counter()
for e in lex:
    for r in set(refs_all(e)):
        allref[r] += 1

orphan = sorted(i for i in root_by_id if allref.get(i, 0) == 0)

forms = []
for e in lex:
    f = e.get("form") or ""
    if f:
        forms.append((f, e.get("id",""), e.get("literalMeaning") or e.get("meaning_tr") or ""))

rows = []
for rid in orphan:
    rf = (root_by_id[rid].get("form") or "").strip()
    m = [(f,i,me) for (f,i,me) in forms if rf and (f == rf or f.startswith(rf))]
    durum = "LINK_EKSIK" if m else "GEREKSIZ_ADAY"
    rows.append({
        "kok": rid,
        "kok_form": rf,
        "durum": durum,
        "eslesen_lexeme": len(m),
        "ornek": " | ".join("%s=%s" % (i, f) for (f,i,_) in m[:3]),
    })

p = OUT/"orphan_teshis.csv"
with p.open("w", encoding="utf-8-sig", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["kok","kok_form","durum","eslesen_lexeme","ornek"])
    w.writeheader(); w.writerows(rows)

print("Orphan toplam:", len(rows))
print("LINK_EKSIK  (bag kurulacak):", sum(1 for r in rows if r["durum"]=="LINK_EKSIK"))
print("GEREKSIZ_ADAY (silme adayi):", sum(1 for r in rows if r["durum"]=="GEREKSIZ_ADAY"))
print()
print("--- LINK_EKSIK ornekleri ---")
for r in rows:
    if r["durum"]=="LINK_EKSIK":
        print("  %-12s %-12s -> %s" % (r["kok"], r["kok_form"], r["ornek"][:60]))
print()
print("CSV yazildi:", p)
