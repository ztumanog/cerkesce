# -*- coding: utf-8 -*-
"""Faz C-8 - Asama 6b: 3 ek iliski (172 -> 175)"""

import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
LINGUISTIC = BASE / "public" / "data" / "linguistic"

def load_json(name):
    with open(LINGUISTIC / name, encoding="utf-8") as f:
        return json.load(f)

def save_json(name, data):
    with open(LINGUISTIC / name, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[KAYIT] {name}")

def find_by_id(items, item_id):
    for i in items:
        if i.get("id") == item_id:
            return i
    return None

# ============ 3 EK ILISKI ============

NEW_RELATIONS = [
    {
        "id": "SR-ADESHHUE-GRANDFATHER",
        "source": "L-ADESHHUE",
        "target": "GRANDFATHER",
        "type": "related",
        "evidence": "адэшхуэ = dede (ADY + KBD)",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-ANESHHUE-GRANDMOTHER",
        "source": "L-ANESHHUE",
        "target": "GRANDMOTHER",
        "type": "related",
        "evidence": "анэшхуэ = nine (ADY + KBD)",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-SHXUE-ZHY",
        "source": "M-SHXUE",
        "target": "M-ZHY",
        "type": "related",
        "evidence": "-шхуэ ↔ -жь (buyutme ekleri)",
        "confidence": 0.9,
        "evidenceSource": "grammatical"
    },
]


def main():
    print("="*60)
    print("FAZ C-8 - ASAMA 6b: 3 EK ILISKI")
    print("="*60)

    relations = load_json("semantic_relations.json")
    print(f"\nMevcut iliski sayisi: {len(relations)}")

    eklenen = 0
    atlanan = 0

    for rel in NEW_RELATIONS:
        existing = find_by_id(relations, rel["id"])
        if existing:
            print(f"[ATLA] {rel['id']} zaten var")
            atlanan += 1
        else:
            relations.append(rel)
            print(f"[EKLE] {rel['id']} ({rel['source']} -> {rel['target']})")
            eklenen += 1

    save_json("semantic_relations.json", relations)

    print(f"\n{'='*60}")
    print(f"OZET")
    print(f"{'='*60}")
    print(f"Eklenen: {eklenen}")
    print(f"Atlanan: {atlanan}")
    print(f"Yeni toplam: {len(relations)} iliski")
    print(f"(Onceki: {len(relations) - eklenen})")

    if len(relations) >= 175:
        print(f"\n[***] 175+ SEMANTIC RELATION HEDEFINE ULASILDI! ***")


if __name__ == "__main__":
    main()