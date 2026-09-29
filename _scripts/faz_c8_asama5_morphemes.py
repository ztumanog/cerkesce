# -*- coding: utf-8 -*-
"""Faz C-8 - Asama 5: Yeni morfemler ekle (70 -> 75)"""

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

# ============ YENI MORFEMLER ============

NEW_MORPHEMES = [
    {
        "id": "M-TETE",
        "form": "тэтэ",
        "ipa": "/tata/",
        "gloss": "dede (kok)",
        "type": "lexical",
        "dialect": "both",
        "attachment": "free",
        "exampleLexemeIds": ["L-TETAZH"],
        "notes": "Dede koku. ADY agirlikli. Kaynak: Huvaj (2007)."
    },
    {
        "id": "M-DADE",
        "form": "дадэ",
        "ipa": "/daːda/",
        "gloss": "dede (kok)",
        "type": "lexical",
        "dialect": "both",
        "attachment": "free",
        "exampleLexemeIds": ["L-DADESHHUE"],
        "notes": "Dede koku. ADY Abzeh + KBD. Kaynak: Huvaj (2007), Wiktionary."
    },
    {
        "id": "M-NYBZHY",
        "form": "ныбжь",
        "ipa": "/nǝbʑ/",
        "gloss": "yas, omur (kok)",
        "type": "lexical",
        "dialect": "both",
        "attachment": "free",
        "exampleLexemeIds": ["L-NYBZHYSHXUE", "L-NYBZHYC1YQ1U"],
        "notes": "Yas/omur koku. Homonym: ныбжь (golge)."
    },
    {
        "id": "M-K1UASH",
        "form": "къуэш",
        "ipa": "/qʷʼǝʃ/",
        "gloss": "erkek kardes (kok)",
        "type": "lexical",
        "dialect": "both",
        "attachment": "free",
        "exampleLexemeIds": ["L-K1UASH"],
        "notes": "Erkek kardes koku. Bilesiklerde: адэ къуэш, анэ къуэш."
    },
    {
        "id": "M-SHYPHUE",
        "form": "шыпхъу",
        "ipa": "/ʃǝpχʷǝ/",
        "gloss": "kiz kardes (kok)",
        "type": "lexical",
        "dialect": "both",
        "attachment": "free",
        "exampleLexemeIds": ["L-SHYPHUE"],
        "notes": "Kiz kardes koku. Bilesiklerde: адэшыпхъу, анэшыпхъу."
    }
]


def main():
    print("="*60)
    print("FAZ C-8 - ASAMA 5: MORPHEMES")
    print("="*60)

    morphemes = load_json("morphemes.json")
    print(f"\nMevcut morfem sayisi: {len(morphemes)}")

    eklenen = 0
    atlanan = 0

    for m in NEW_MORPHEMES:
        existing = find_by_id(morphemes, m["id"])
        if existing:
            print(f"[ATLA] {m['id']} zaten var")
            atlanan += 1
        else:
            morphemes.append(m)
            print(f"[EKLE] {m['id']} - {m['form']} ({m['gloss']})")
            eklenen += 1

    save_json("morphemes.json", morphemes)

    print(f"\n{'='*60}")
    print(f"OZET")
    print(f"{'='*60}")
    print(f"Eklenen: {eklenen}")
    print(f"Atlanan: {atlanan}")
    print(f"Yeni toplam: {len(morphemes)} morfem")
    print(f"(Onceki: {len(morphemes) - eklenen})")

    if len(morphemes) >= 75:
        print(f"\n[***] 75+ MORPHEME HEDEFINE ULASILDI! ***")


if __name__ == "__main__":
    main()