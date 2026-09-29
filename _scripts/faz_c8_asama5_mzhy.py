# -*- coding: utf-8 -*-
"""M-ZHY ve ilgili morfemleri incele"""

import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
LINGUISTIC = BASE / "public" / "data" / "linguistic"

with open(LINGUISTIC / "morphemes.json", encoding="utf-8") as f:
    morphemes = json.load(f)

# M-ZHY detay
print("=== M-ZHY DETAY ===")
for m in morphemes:
    if m.get("id") == "M-ZHY":
        print(json.dumps(m, ensure_ascii=False, indent=2))
        break

# M-GHE2 detay
print("\n=== M-GHE2 DETAY ===")
for m in morphemes:
    if m.get("id") == "M-GHE2":
        print(json.dumps(m, ensure_ascii=False, indent=2))
        break

# M-SH1E detay
print("\n=== M-SH1E DETAY ===")
for m in morphemes:
    if m.get("id") == "M-SH1E":
        print(json.dumps(m, ensure_ascii=False, indent=2))
        break

# M-SH1E2 detay
print("\n=== M-SH1E2 DETAY ===")
for m in morphemes:
    if m.get("id") == "M-SH1E2":
        print(json.dumps(m, ensure_ascii=False, indent=2))
        break

# Tum suffix morfemler
print("\n=== TUM SUFFIX MORFEMLER ===")
for m in morphemes:
    if m.get("attachment") == "suffix":
        print(f"  {m['id']:<20} {m.get('form', '?'):<15} {m.get('gloss', '?')}")

print(f"\nToplam morfem: {len(morphemes)}")