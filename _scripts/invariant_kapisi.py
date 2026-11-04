# -*- coding: utf-8 -*-
# Salt okunur invariant kapisi. Cikis kodu 0 = temiz, 1 = ihlal var.
import json, re, sys, csv
from collections import Counter
from pathlib import Path
K = Path("public/data/linguistic")
def yukle(p):
    d = json.loads(Path(p).read_bytes().decode("utf-8-sig"))
    return d if isinstance(d, list) else d.get("lexemes", d)
L = yukle(K/"lexemes.json")
R = {r["id"]: r for r in json.loads((K/"roots.json").read_text(encoding="utf-8"))}
F = {f["id"]: f for f in json.loads((K/"word_families.json").read_text(encoding="utf-8"))}
ihlal = []   # (kural, lexeme_id, ayrinti)
def ekle(k, i, a=""): ihlal.append((k, i, a))

ids = Counter(x["id"] for x in L)
for i, n in ids.items():
    if n > 1: ekle("I1 tekrar eden lexeme ID", i, n)

for x in L:
    i = x["id"]; f = x.get("wordFamilyId")
    if f is not None:
        if not isinstance(f, str): ekle("I2 wordFamilyId string degil", i, repr(f))
        elif re.search(r"\s[+|,/]\s|\s{2,}|^\s|\s$", f): ekle("I3 wordFamilyId birlesik/bozuk", i, repr(f))
        elif f not in F: ekle("I4 wordFamilyId tanimsiz", i, f)
    rids = x.get("rootIds") or []
    if not isinstance(rids, list): ekle("I5 rootIds liste degil", i, repr(rids)); rids = []
    for r in rids:
        if r not in R: ekle("I6 rootIds tanimsiz", i, r)
    if len(rids) > 2: ekle("I7 rootIds > 2 (inceleme)", i, ",".join(rids))
    form = x.get("form") or ""
    if "\u04c0" in form: ekle("I8 U+04C0 kalmis (normalize edilmeli)", i, form)
    c = x.get("conceptId")
    if c and not re.fullmatch(r"[A-Z][A-Z0-9_]*", c): ekle("I9 conceptId UPPER_SNAKE degil", i, c)

kul = {x.get("wordFamilyId") for x in L}
for f in F:
    if f.count("-") >= 2 and f not in kul: ekle("I10 aile kaydi var, lexeme yok", f, "")

sayac = Counter(k for k, _, _ in ihlal)
for k in sorted(sayac): print(f"{k:42s} {sayac[k]}")
print("TOPLAM ihlal:", len(ihlal))
with open("_scripts/invariant_ihlaller.csv", "w", encoding="utf-8-sig", newline="") as fh:
    w = csv.writer(fh); w.writerow(["kural", "id", "ayrinti"]); w.writerows(ihlal)
for k, i, a in ihlal:
    if k.startswith(("I2", "I3")): print("  ", k, i, a)
sys.exit(1 if ihlal else 0)