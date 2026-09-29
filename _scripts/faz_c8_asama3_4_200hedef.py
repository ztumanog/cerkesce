# -*- coding: utf-8 -*-
"""Faz C-8 - Asama 3.4: 200 lexeme hedefi"""

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

NEW_ROOTS = [
    {
        "id": "R-TETE",
        "form": "тэтэ",
        "ipa": "/tata/",
        "primaryMeaning": "dede (kok)",
        "secondaryMeanings": ["buyukbaba"],
        "semanticDomains": ["kinship", "family"],
        "dialectVariants": {"adyghe": "тэтэ", "kabardian": "тэтэ"},
        "productivity": {"lemmaCount": 3, "compoundCount": 2},
        "derivedWords": [
            {"form": "тэтэжъ", "meaning": "dede (yash)"},
            {"form": "тэтэшхуэ", "meaning": "buyuk dede"}
        ],
        "notes": "Dede koku (ADY agirlikli). Kaynak: Huvaj (2007), Ацумыжъ (2013)."
    },
    {
        "id": "R-DADE",
        "form": "дадэ",
        "ipa": "/daːda/",
        "primaryMeaning": "dede",
        "secondaryMeanings": ["buyukbaba"],
        "semanticDomains": ["kinship", "family"],
        "dialectVariants": {"adyghe": "дадэ", "kabardian": "дадэ"},
        "productivity": {"lemmaCount": 3, "compoundCount": 2},
        "derivedWords": [
            {"form": "дадэшхуэ", "meaning": "buyuk dede (KBD)"}
        ],
        "notes": "Dede koku (ADY Abzeh + KBD). Kaynak: Huvaj (2007), Wiktionary (KBD), Gish."
    }
]

NEW_LEXEMES = [
    {
        "id": "L-TETAZH",
        "form": "тэтэжъ",
        "ipa": "/tataʑ/",
        "literalMeaning": "yash dede",
        "derivation": {"rootIds": ["R-TETE"], "morphemeIds": [], "rule": "compound"},
        "wordFamilyId": "WF-TETE",
        "conceptId": "GRANDFATHER",
        "dialectVariants": {"adyghe": "тэтэжъ", "kabardian": "адэшхуэ"},
        "dictionaryEvidence": {
            "sourceCount": 3,
            "sources": ["Huvaj (2007)", "Ацумыжъ (2013)", "ТӀэшъу (1991)"],
            "meanings": {"tr": "dede", "ru": "дед"}
        },
        "notes": "ADY dede. тэтэ (dede) + жъ (yash). KBD karsiligi: адэшхуэ. Huvaj (2007): тэтэжъ/дадэ/адэшхуэ varyantlari."
    },
    {
        "id": "L-DADESHHUE",
        "form": "дадэшхуэ",
        "ipa": "/daːdaʃxʷa/",
        "literalMeaning": "buyuk dede",
        "derivation": {"rootIds": ["R-DADE"], "morphemeIds": ["M-SHXUE"], "rule": "compound"},
        "wordFamilyId": "WF-DADE",
        "conceptId": "GREAT_GRANDFATHER",
        "dialectVariants": {"adyghe": "дадэшхуэ", "kabardian": "дадэшхуэ"},
        "dictionaryEvidence": {
            "sourceCount": 3,
            "sources": ["Gish (KBD)", "Kabardeyce Wiktionary (2023)", "Apaşev (2008)"],
            "meanings": {"tr": "buyuk dede (KBD) / dede (ADY)", "ru": "прадед / дед"}
        },
        "notes": "дадэ (dede) + шхуэ (buyuk). KBD: great-grandfather. ADY: адэшхуэ ile esanlamli (Apasev 2008)."
    }
]


def main():
    print("="*60)
    print("FAZ C-8 - ASAMA 3.4: 200 LEXEME HEDEFI")
    print("="*60)

    roots = load_json("roots.json")
    print(f"\nMevcut kok sayisi: {len(roots)}")

    kok_eklenen = 0
    for new_root in NEW_ROOTS:
        existing = find_by_id(roots, new_root["id"])
        if existing:
            print(f"[ATLA] {new_root['id']} zaten var")
        else:
            roots.append(new_root)
            print(f"[EKLE] {new_root['id']} - {new_root['form']}")
            kok_eklenen += 1

    if kok_eklenen > 0:
        save_json("roots.json", roots)
        print(f"Yeni kok toplam: {len(roots)} (+{kok_eklenen})")

    lexemes = load_json("lexemes.json")
    print(f"\nMevcut lexeme sayisi: {len(lexemes)}")

    eklenen = 0
    atlanan = 0

    for lex in NEW_LEXEMES:
        existing = find_by_id(lexemes, lex["id"])
        if existing:
            print(f"[ATLA] {lex['id']} zaten var")
            atlanan += 1
        else:
            lexemes.append(lex)
            print(f"[EKLE] {lex['id']} - {lex['form']}")
            eklenen += 1

    save_json("lexemes.json", lexemes)

    print(f"\n{'='*60}")
    print(f"OZET")
    print(f"{'='*60}")
    print(f"Eklenen lexeme: {eklenen}")
    print(f"Atlanan lexeme: {atlanan}")
    print(f"Yeni toplam: {len(lexemes)} lexeme")
    print(f"(Onceki: {len(lexemes) - eklenen})")

    if len(lexemes) >= 200:
        print(f"\n[***] 200+ LEXEME HEDEFINE ULASILDI! ***")


if __name__ == "__main__":
    main()