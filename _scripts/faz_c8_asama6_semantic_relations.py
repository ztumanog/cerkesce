# -*- coding: utf-8 -*-
"""Faz C-8 - Asama 6: Semantic Relations ekle (154 -> 175)"""

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

# ============ YENI ILISKILER ============

NEW_RELATIONS = [
    # --- GRUP A: -шхуэ turevleri (5) ---
    {
        "id": "SR-SHXUE-BIG",
        "source": "R-SHXUE",
        "target": "BIG",
        "type": "derivational",
        "evidence": "шхуэ",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-PSY-BIG_WATER",
        "source": "R-PSY",
        "target": "FLOOD",
        "type": "derivational",
        "evidence": "псышхуэ",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-UNE-BIG_HOUSE",
        "source": "R-UNE",
        "target": "HOUSE",
        "type": "derivational",
        "evidence": "унэшхуэ",
        "confidence": 1.0,
        "evidenceSource": "academic"
    },
    {
        "id": "SR-MAF1E-CONFLAGRATION",
        "source": "R-MAF1E",
        "target": "FIRE",
        "type": "derivational",
        "evidence": "мафӀэшхуэ",
        "confidence": 1.0,
        "evidenceSource": "corpus"
    },
    {
        "id": "SR-SHXUE-C1YQ1U-ANTONYM",
        "source": "M-SHXUE",
        "target": "M-C1YQ1U",
        "type": "antonym",
        "evidence": "-шхуэ vs -цӀыкӀу",
        "confidence": 1.0,
        "evidenceSource": "grammatical"
    },

    # --- GRUP B: -цӀыкӀу turevleri (4) ---
    {
        "id": "SR-C1YQ1U-SMALL",
        "source": "R-C1YQ1U",
        "target": "SMALL",
        "type": "derivational",
        "evidence": "цӀыкӀу",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-PSY-STREAM",
        "source": "R-PSY",
        "target": "STREAM",
        "type": "derivational",
        "evidence": "псыцӀыкӀу",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-UNE-SMALL_HOUSE",
        "source": "R-UNE",
        "target": "HOUSE",
        "type": "derivational",
        "evidence": "унэцӀыкӀу",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-GU-COWARD",
        "source": "R-GU",
        "target": "COWARD",
        "type": "derivational",
        "evidence": "гуцӀыкӀу",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },

    # --- GRUP C: ныбжь turevleri (4) ---
    {
        "id": "SR-NYBZHY-AGE",
        "source": "R-NYBZHY",
        "target": "AGE",
        "type": "derivational",
        "evidence": "ныбжь",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-NYBZHY-AGED",
        "source": "R-NYBZHY",
        "target": "AGED",
        "type": "derivational",
        "evidence": "ныбжьышхуэ",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-NYBZHY-YOUTH",
        "source": "R-NYBZHY",
        "target": "YOUTH",
        "type": "derivational",
        "evidence": "ныбжьыцӀыкӀу",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-NYBZHY-ZHY",
        "source": "R-NYBZHY",
        "target": "R-ZHY",
        "type": "related",
        "evidence": "ныбжь + жьы (yas + eski)",
        "confidence": 0.9,
        "evidenceSource": "semantic"
    },

    # --- GRUP D: Akrabalik iliskileri (5) ---
    {
        "id": "SR-ADE-UNCLE",
        "source": "R-ADE",
        "target": "UNCLE",
        "type": "compound",
        "evidence": "адэ къуэш",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-ADE-AUNT_PATERNAL",
        "source": "R-ADE",
        "target": "AUNT_PATERNAL",
        "type": "compound",
        "evidence": "адэшыпхъу",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-ANE-UNCLE_MATERNAL",
        "source": "R-ANE",
        "target": "UNCLE_MATERNAL",
        "type": "compound",
        "evidence": "анэ къуэш",
        "confidence": 1.0,
        "evidenceSource": "academic"
    },
    {
        "id": "SR-ANE-AUNT_MATERNAL",
        "source": "R-ANE",
        "target": "AUNT_MATERNAL",
        "type": "compound",
        "evidence": "анэшыпхъу",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-K1UASH-BROTHER",
        "source": "R-K1UASH",
        "target": "BROTHER",
        "type": "derivational",
        "evidence": "къуэш",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },

    # --- GRUP E: Dede iliskileri (3) ---
    {
        "id": "SR-TETE-GRANDFATHER",
        "source": "R-TETE",
        "target": "GRANDFATHER",
        "type": "derivational",
        "evidence": "тэтэжъ",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-DADE-GREAT_GRANDFATHER",
        "source": "R-DADE",
        "target": "GREAT_GRANDFATHER",
        "type": "derivational",
        "evidence": "дадэшхуэ",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
    {
        "id": "SR-ADE-GRANDFATHER",
        "source": "R-ADE",
        "target": "GRANDFATHER",
        "type": "derivational",
        "evidence": "адэшхуэ",
        "confidence": 1.0,
        "evidenceSource": "dictionary"
    },
]


def main():
    print("="*60)
    print("FAZ C-8 - ASAMA 6: SEMANTIC RELATIONS")
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