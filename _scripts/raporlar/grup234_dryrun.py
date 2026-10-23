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

GRUP2 = ["R-BZH","R-BZHYXHU","R-ETA","R-FOSH","R-GA_1","R-GUBGHWE","R-IEG","R-ILHES",
         "R-ISH","R-IUZH","R-KHU_1","R-KIY","R-KUR","R-MASHCH_1","R-NEKH","R-NEKH_2",
         "R-PK","R-PSHCHY_1","R-SHCHAB","R-SHCHIA_2","R-SHCHIY_2","R-TKH_2","R-UVY_1",
         "R-ZHYG_1","R-ZHYL_1"]
GRUP3 = ["R-DEL","R-GUENYH","R-MUR","R-NAMYS","R-SHER","R-ZHYR"]
GRUP4 = ["R-ASHCH","R-EBZ","R-KHUE","R-SHCHISH","R-SHIPLR","R-SHITE","R-T1U","R-TXU",
         "R-UE-INTJ","R-UE-PART","R-UE-PRON"]

grup_of = {}
for r in GRUP2: grup_of[r] = "2-BILESIK"
for r in GRUP3: grup_of[r] = "3-ALINTI"
for r in GRUP4: grup_of[r] = "4-GRAM"
GRUP234 = set(grup_of)

rows = []
for e in lex:
    rids = e.get("rootIds") or []
    hits = [r for r in rids if r in GRUP234]
    for r in hits:
        oneri = "ROOTID_KALDIR" if len(rids) <= 1 else "COKLU_INCELE"
        rows.append({
            "kok": r, "grup": grup_of[r],
            "lexeme_id": e.get("id",""),
            "form": e.get("form",""),
            "anlam": e.get("literalMeaning") or e.get("meaning_tr") or e.get("primaryMeaning") or "",
            "rootId_sayisi": len(rids),
            "onerilen_islem": oneri,
        })

p = OUT/"grup234_karar.csv"
with p.open("w", encoding="utf-8-sig", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["kok","grup","lexeme_id","form","anlam","rootId_sayisi","onerilen_islem"])
    w.writeheader(); w.writerows(rows)

print("Etkilenen satir:", len(rows))
print("Grup bazli:")
for g, n in sorted(Counter(r["grup"] for r in rows).items()):
    print("  ", g, n)

# Orphan analizi: tum rootlar icin rootIds kullanimi
allref = Counter()
for e in lex:
    for r in set(e.get("rootIds") or []):
        allref[r] += 1
orphan = sorted(i for i in root_by_id if allref.get(i,0) == 0)
print()
print("Hic kullanilmayan (orphan) kok:", len(orphan))
for r in orphan:
    print("  ", r)

print()
print("CSV yazildi:", p)
