# -*- coding: utf-8 -*-
import json
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
ROOTS = Path("public/data/linguistic/roots.json")

lex = json.loads(LEX.read_text(encoding="utf-8"))
roots = json.loads(ROOTS.read_text(encoding="utf-8"))
root_ids = {r.get("id") for r in roots if isinstance(r, dict) and r.get("id")}

# R-GE hala tanimsiz mi?
rge_sayisi = 0
rge_ornekler = []
for e in lex:
    der = (e.get("derivation") or {}).get("rootIds") or []
    if "R-GE" in der:
        rge_sayisi += 1
        if len(rge_ornekler) < 5:
            rge_ornekler.append(e.get("form") or "")

print("R-GE referans sayisi:", rge_sayisi)
print("Ornekler:", rge_ornekler)
print()

# R-GE'yi silmis miydik? SILINECEK listesinde var miydi?
# Hayir, R-GE listede yoktu. O zaman hala duruyor.
print("R-GE roots.json'da tanimli mi?", "R-GE" in root_ids)
print()

# Kalan 154 kokun kategorileri
kalan = Counter()
for e in lex:
    rootIds = e.get("rootIds") or []
    der = (e.get("derivation") or {}).get("rootIds") or []
    if not rootIds and der:
        for r in der:
            if r and r not in root_ids:
                kalan[r] += 1

# Morfemler (morphemes.json'a tasinmali)
MORFEM = {"R-GE", "R-AR", "R-SI", "R-UI", "R-ZI", "R-ZYR", "R-DZHY",
          "R-KHET", "R-SYD", "R-ARY", "R-ARA", "R-EZY", "R-SER", "R-MYR",
          "R-AUE", "R-MES", "R-MEU", "R-MOU", "R-AU", "R-AUI", "R-UEKH"}

mor_t = []
diger_t = []
for rid, sayi in kalan.most_common():
    if rid in MORFEM:
        mor_t.append((rid, sayi))
    else:
        diger_t.append((rid, sayi))

print("=== KALAN 154 KOKUN DAGILIMI ===")
print("MORFEM:", len(mor_t), "kok,", sum(s for _,s in mor_t), "referans")
print("DIGER:", len(diger_t), "kok,", sum(s for _,s in diger_t), "referans")
print()
print("MORFEMLER (morphemes.json'a tasinmali):")
for rid, sayi in mor_t:
    print("  %-20s %3d" % (rid, sayi))
