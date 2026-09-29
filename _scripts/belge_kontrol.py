# -*- coding: utf-8 -*-
"""Belge durumu kontrolu"""

import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
DOCS = BASE / "docs"

# 1. Mevcut belgeler
print("="*70)
print("MEVCUT BELGELER (docs/)")
print("="*70)

for f in sorted(DOCS.glob("*.md")):
    boyut = f.stat().st_size
    print(f"  {f.name:<50} {boyut:>6} byte")

# 2. Alt klasorler
print("\n" + "="*70)
print("ALT KLASORLER (docs/)")
print("="*70)

for d in sorted(DOCS.iterdir()):
    if d.is_dir():
        print(f"  {d.name}/")
        for f in sorted(d.glob("*.md"))[:5]:
            print(f"    - {f.name}")

# 3. Kritik belgeler
print("\n" + "="*70)
print("KRITIK BELGELER")
print("="*70)

kritik = [
    "PROJECT_STATUS.md",
    "ROADMAP.md",
    "PHASES.md",
    "Phases.md",
    "MEMO_FAZ_C8.md",
    "FAZ_C8_TAMAMLAMA_RAPORU.md",
    "ADR_INDEX.md"
]

for k in kritik:
    p = DOCS / k
    if p.exists():
        print(f"  [VAR] {k} ({p.stat().st_size} byte)")
    else:
        print(f"  [YOK] {k}")

# 4. ADR klasoru
print("\n" + "="*70)
print("ADR DOSYALARI")
print("="*70)

adr_dir = DOCS / "architecture" / "adr"
if adr_dir.exists():
    for f in sorted(adr_dir.glob("*.md")):
        print(f"  {f.name}")
else:
    print("  ADR klasoru yok")

# 5. Mevcut JSON metrikleri
print("\n" + "="*70)
print("MEVCUT JSON METRIKLERI")
print("="*70)

LINGUISTIC = BASE / "public" / "data" / "linguistic"

for fname in ["roots.json", "lexemes.json", "morphemes.json", "semantic_relations.json", "word_families.json"]:
    with open(LINGUISTIC / fname, encoding="utf-8") as f:
        data = json.load(f)
    print(f"  {fname:<30} {len(data):>5}")