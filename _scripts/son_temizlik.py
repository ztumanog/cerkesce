# -*- coding: utf-8 -*-
"""
SON TEMIZLIK: 4 tanimsiz derivation.rootIds'i sil.
R-BZHA2 (alinti), R-IUS, R-1UV, R-ISHCH (preverb/bilesik).
"""
import json
from pathlib import Path
from datetime import datetime
import shutil
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
ROOTS = Path("public/data/linguistic/roots.json")

ts = datetime.now().strftime("%Y%m%d-%H%M%S")
shutil.copy(LEX, LEX.with_name(f"lexemes.yedek-{ts}.json"))
print("Yedek: lexemes.yedek-" + ts + ".json\n")

lex = json.loads(LEX.read_text(encoding="utf-8"))

# 4 kalan kok
SILINECEK = {"R-BZHA2", "R-IUS", "R-1UV", "R-ISHCH"}

print("=== SON TEMIZLIK ===")
degisen = 0
silinen = 0
for e in lex:
    der = e.get("derivation")
    if not isinstance(der, dict):
        continue
    eski = der.get("rootIds") or []
    yeni = [r for r in eski if r not in SILINECEK]
    if yeni != eski:
        der["rootIds"] = yeni
        silinen += len(eski) - len(yeni)
        degisen += 1
        print("  %s: %s -> %s" % (e.get("id"), eski, yeni))

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print()
print("=== OZET ===")
print("Degisen lexeme:", degisen)
print("Silinen referans:", silinen)

# Dogrulama
lex2 = json.loads(LEX.read_text(encoding="utf-8"))
roots = json.loads(ROOTS.read_text(encoding="utf-8"))
root_ids = {r.get("id") for r in roots if isinstance(r, dict) and r.get("id")}

der_tanimsiz = Counter()
for e in lex2:
    der = (e.get("derivation") or {}).get("rootIds") or []
    for rid in der:
        if rid and rid not in root_ids:
            der_tanimsiz[rid] += 1

print()
print("=== DOGRULAMA ===")
print("Kalan tanimsiz derivation.rootIds:", len(der_tanimsiz))
print("Toplam referans:", sum(der_tanimsiz.values()))
if der_tanimsiz:
    print("Kalanlar:", dict(der_tanimsiz))
else:
    print("TEMIZ! 0 tanimsiz kok.")
