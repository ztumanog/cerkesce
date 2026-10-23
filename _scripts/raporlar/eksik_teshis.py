# -*- coding: utf-8 -*-
import json
from pathlib import Path
from collections import defaultdict

BASE = Path("public/data/linguistic")

def as_list(o):
    if isinstance(o, dict): return list(o.values())
    if isinstance(o, list): return o
    return []

lex   = as_list(json.loads((BASE/"lexemes.json").read_text(encoding="utf-8")))
roots = as_list(json.loads((BASE/"roots.json").read_text(encoding="utf-8")))

def rid(e):
    if not isinstance(e, dict): return None
    if e.get("id"): return e["id"]
    r = e.get("root")
    return r.get("id") if isinstance(r, dict) else None

ids = {rid(e) for e in roots if rid(e)}

def m_of(e):
    for k in ("literalMeaning","meaning_tr","primaryMeaning","meaning","definition"):
        if e.get(k): return e[k]
    return ""

byref_root = defaultdict(list)
byref_der  = defaultdict(list)
for e in lex:
    for r in set(e.get("rootIds") or []):
        byref_root[r].append(e)
    d = e.get("derivation")
    if isinstance(d, dict):
        for r in set(d.get("rootIds") or []):
            byref_der[r].append(e)

eksik_root = sorted(r for r in byref_root if r not in ids)
eksik_der  = sorted(r for r in byref_der  if r not in ids)

print("=== TANIMSIZ REFERANSLAR ===")
print("kaynak rootIds           :", len(eksik_root))
print("kaynak derivation.rootIds :", len(eksik_der))
print()

for baslik, lst, kaynak in [("rootIds kaynakli", eksik_root, byref_root),
                            ("derivation.rootIds kaynakli", eksik_der, byref_der)]:
    print("---", baslik, "---")
    for r in lst:
        print(r)
        for e in kaynak[r][:4]:
            print("    ", e.get("form","?"), "|", m_of(e))
    print()

print("=== CAPRAZ KONTROL ===")
for r in ["R-BZH","R-FOSH","R-DEL","R-MUR","R-UE-PRON","R-SHCHAB"]:
    print("  %-12s tanimli=%-5s rootIds=%d der=%d" % (
        r, r in ids, len(byref_root.get(r,[])), len(byref_der.get(r,[]))))
