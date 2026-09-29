# -*- coding: utf-8 -*-
"""Asama 4 icin lexeme ID'lerini topla"""

import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
LINGUISTIC = BASE / "public" / "data" / "linguistic"

with open(LINGUISTIC / "lexemes.json", encoding="utf-8") as f:
    lexemes = json.load(f)

# Her kok icin lexeme'leri grupla
from collections import defaultdict

kok_lexemeler = defaultdict(list)

for lex in lexemes:
    rootIds = lex.get("derivation", {}).get("rootIds", [])
    for rid in rootIds:
        kok_lexemeler[rid].append({
            "id": lex["id"],
            "form": lex["form"]
        })

# Ilgilendigimiz kokler
hedef_kokler = [
    "R-NYBZHY", "R-ADE", "R-ANE", "R-K1UASH", "R-SHYPHUE",
    "R-TETE", "R-DADE", "R-BZE", "R-1UEKHU", "R-MAF1E",
    "R-UNE", "R-MAKHUE", "R-SHXUE", "R-C1YQ1U"
]

print("="*70)
print("KOK BASINA LEXEME LISTESI")
print("="*70)

for rk in hedef_kokler:
    lexs = kok_lexemeler.get(rk, [])
    print(f"\n{rk} ({len(lexs)} lexeme):")
    for l in lexs:
        print(f"  - {l['id']:<20} {l['form']}")