# -*- coding: utf-8 -*-
"""Faz C-8 - Asama 5 on kontrol: morphemes"""

import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
LINGUISTIC = BASE / "public" / "data" / "linguistic"

with open(LINGUISTIC / "morphemes.json", encoding="utf-8") as f:
    morphemes = json.load(f)

print("="*70)
print(f"MEVCUT MORPHEMES ({len(morphemes)} adet)")
print("="*70)

# Tur bazli grupla
from collections import defaultdict
gruplar = defaultdict(list)

for m in morphemes:
    tur = m.get("type", "?")
    gruplar[tur].append(m)

for tur, mlist in gruplar.items():
    print(f"\n--- {tur} ({len(mlist)}) ---")
    for m in mlist:
        print(f"  {m['id']:<20} {m.get('form', '?'):<15} {m.get('gloss', '?')}")

# Aradigimiz morfemler
print("\n" + "="*70)
print("ARANAN MORFEMLER")
print("="*70)

aranan = ["M-TETE", "M-DADE", "M-ZHY", "M-SHCH1E", "M-GHE", "M-REY", "M-SH1U"]
for a in aranan:
    var = any(m.get("id") == a for m in morphemes)
    print(f"  [{'VAR' if var else 'YOK'}] {a}")

# Form aramasi
print("\n" + "="*70)
print("FORM ARAMASI")
print("="*70)

form_ara = ["тэтэ", "дадэ", "жъ", "щӀэ", "гъэ", "рей", "шӀу"]
for f in form_ara:
    bulunanlar = [m for m in morphemes if f in m.get("form", "")]
    print(f"\n'{f}' iceren morfemler:")
    for m in bulunanlar:
        print(f"  {m['id']:<20} {m.get('form', '?'):<15} {m.get('gloss', '?')}")