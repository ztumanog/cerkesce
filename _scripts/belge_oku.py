# -*- coding: utf-8 -*-
"""Kritik belgeleri oku"""

from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
DOCS = BASE / "docs"

kritik = [
    "PHASES.md",
    "PROJECT_STATUS.md",
    "ROADMAP.md",
    "FAZ_DURUMU.md",
    "FAZ_GECIS_RAPORU.md",
]

for k in kritik:
    p = DOCS / k
    if p.exists():
        print("="*70)
        print(f"### {k} ###")
        print("="*70)
        with open(p, encoding="utf-8") as f:
            print(f.read())
        print()
    else:
        print(f"[YOK] {k}\n")
        