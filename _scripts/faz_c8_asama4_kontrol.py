# -*- coding: utf-8 -*-
"""Faz C-8 - Asama 4 on kontrol: word_families"""

import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
LINGUISTIC = BASE / "public" / "data" / "linguistic"

with open(LINGUISTIC / "word_families.json", encoding="utf-8") as f:
    families = json.load(f)

with open(LINGUISTIC / "lexemes.json", encoding="utf-8") as f:
    lexemes = json.load(f)

with open(LINGUISTIC / "roots.json", encoding="utf-8") as f:
    roots = json.load(f)

# Mevcut aileler
print("="*60)
print("MEVCUT AILELER")
print("="*60)
for wf in families:
    lex_count = len(wf.get("lexemeIds", []))
    print(f"{wf['id']:<15} rootId={wf.get('rootId', '?'):<15} lexemes={lex_count}")

# Yeni kokler icin aile var mi?
print("\n" + "="*60)
print("YENI KOKLER ICIN AILE KONTROLU")
print("="*60)

yeni_kokler = [
    "R-SHXUE", "R-C1YQ1U", "R-NYBZHY",
    "R-ADE", "R-ANE", "R-K1UASH", "R-SHYPHUE",
    "R-TETE", "R-DADE", "R-BZE", "R-1UEKHU",
    "R-MAF1E", "R-UNE", "R-MAKHUE"
]

for rk in yeni_kokler:
    var = any(f.get("rootId") == rk for f in families)
    print(f"  [{'VAR' if var else 'YOK'}] {rk}")

# Her kok icin lexeme sayisi
print("\n" + "="*60)
print("KOK BASINA LEXEME SAYISI")
print("="*60)

for root in roots:
    rid = root.get("id", "")
    count = sum(1 for l in lexemes if rid in l.get("derivation", {}).get("rootIds", []))
    if count > 0:
        print(f"  {rid:<15} {root.get('form', '?'):<15} lexemes={count}")

print(f"\nToplam: {len(families)} aile, {len(lexemes)} lexeme, {len(roots)} kok")