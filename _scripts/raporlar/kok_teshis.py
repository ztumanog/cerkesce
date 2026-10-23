# -*- coding: utf-8 -*-
import json, csv
from pathlib import Path
from collections import Counter

BASE = Path("public/data/linguistic")
OUT_DIR = Path("_scripts/raporlar")
OUT_DIR.mkdir(parents=True, exist_ok=True)

def load(p):
    p = Path(p)
    if not p.exists():
        raise SystemExit("YOK: " + str(p))
    return json.loads(p.read_text(encoding="utf-8"))

def as_list(o):
    if isinstance(o, dict): return list(o.values())
    if isinstance(o, list): return o
    return []

lexemes = as_list(load(BASE / "lexemes.json"))
roots   = as_list(load(BASE / "roots.json"))

def rid(e):
    if not isinstance(e, dict): return None
    if e.get("id"): return e["id"]
    r = e.get("root")
    if isinstance(r, dict) and r.get("id"): return r["id"]
    return None

shapes = Counter(tuple(sorted(e.keys())) for e in roots if isinstance(e, dict))
print("--- roots.json sekilleri ---")
for keys, n in shapes.most_common():
    print(n, "x", keys)

root_by_id = {}
for e in roots:
    i = rid(e)
    if i and i not in root_by_id:
        root_by_id[i] = e
root_ids = set(root_by_id)
print("roots.json benzersiz id:", len(root_ids))
print()

def refs(e):
    out = []
    for key in ("rootIds", "rootId"):
        v = e.get(key)
        if isinstance(v, str): out.append(v)
        elif isinstance(v, list): out += [x for x in v if isinstance(x, str)]
    d = e.get("derivation")
    if isinstance(d, dict):
        for key in ("rootIds", "rootId"):
            v = d.get(key)
            if isinstance(v, str): out.append(v)
            elif isinstance(v, list): out += [x for x in v if isinstance(x, str)]
    return out

count = Counter()
for e in lexemes:
    for r in set(refs(e)):
        count[r] += 1

tek   = [r for r, n in count.items() if n == 1 and r in root_ids]
eksik = [r for r in count if r not in root_ids]

print("TEK kok (kullanim=1):", len(tek))
print("EKSIK_TANIM (referans var, tanim yok):", len(eksik))
print()

def anlam_of(i):
    e = root_by_id.get(i, {})
    for k in ("meaning_tr", "primaryMeaning", "meaning", "gloss"):
        if e.get(k): return e[k]
    return ""

print("--- TEK kokler ---")
for r in sorted(tek):
    print(r, "|", anlam_of(r))
print()
print("--- EKSIK_TANIM ---")
for r in sorted(eksik):
    print(r)

csv_path = OUT_DIR / "kok_teshis.csv"
with csv_path.open("w", encoding="utf-8-sig", newline="") as f:
    w = csv.writer(f)
    w.writerow(["kok", "lexeme_ref", "durum", "anlam_tr"])
    for r, n in sorted(count.items()):
        if r not in root_ids:   durum = "EKSIK_TANIM"
        elif n == 1:            durum = "TEK"
        else:                   durum = "OK"
        w.writerow([r, n, durum, anlam_of(r)])

print()
print("CSV yazildi:", csv_path)
