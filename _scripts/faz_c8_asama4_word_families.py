# -*- coding: utf-8 -*-
"""Faz C-8 - Asama 4: Word Families guncelleme

1. Yeni aileler olustur (12)
2. Mevcut aileleri guncelle (WF-SHXUE, WF-C1YQ1U)
"""

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

# ============ YENI AILELER ============

NEW_FAMILIES = [
    {
        "id": "WF-NYBZHY",
        "rootId": "R-NYBZHY",
        "morphemeIds": ["M-SHXUE", "M-C1YQ1U"],
        "lexemeIds": [
            "L-NYBZHYSHXUE",
            "L-NYBZHYC1YQ1U"
        ],
        "productivity": {
            "totalLexemes": 2,
            "corpusFrequency": 0
        },
        "notes": "Yas/omur ailesi. ныбжьышхуэ (yasli) ve ныбжьыцӀыкӀу (genc)."
    },
    {
        "id": "WF-ADE",
        "rootId": "R-ADE",
        "morphemeIds": ["M-SHXUE"],
        "lexemeIds": [
            "L-ADESHHUE",
            "L-ADEKUESHH",
            "L-ADESHYPHUE"
        ],
        "productivity": {
            "totalLexemes": 3,
            "corpusFrequency": 0
        },
        "notes": "Baba ailesi. адэшхуэ (dede), адэ къуэш (amca), адэшыпхъу (hala)."
    },
    {
        "id": "WF-ANE",
        "rootId": "R-ANE",
        "morphemeIds": ["M-SHXUE"],
        "lexemeIds": [
            "L-ANESHHUE",
            "L-ANEKUESHH",
            "L-ANESHYPHUE"
        ],
        "productivity": {
            "totalLexemes": 3,
            "corpusFrequency": 0
        },
        "notes": "Anne ailesi. анэшхуэ (buyukanne), анэ къуэш (dayi), анэшыпхъу (teyze)."
    },
    {
        "id": "WF-K1UASH",
        "rootId": "R-K1UASH",
        "morphemeIds": [],
        "lexemeIds": [
            "L-K1UASH",
            "L-K1UESHYGHE",
            "L-ADEKUESHH",
            "L-ANEKUESHH"
        ],
        "productivity": {
            "totalLexemes": 4,
            "corpusFrequency": 0
        },
        "notes": "Erkek kardes ailesi. къуэш, къуэшыгъэ, адэ къуэш, анэ къуэш."
    },
    {
        "id": "WF-SHYPHUE",
        "rootId": "R-SHYPHUE",
        "morphemeIds": [],
        "lexemeIds": [
            "L-SHYPHUE",
            "L-ADESHYPHUE",
            "L-ANESHYPHUE"
        ],
        "productivity": {
            "totalLexemes": 3,
            "corpusFrequency": 0
        },
        "notes": "Kiz kardes ailesi. шыпхъу, адэшыпхъу (hala), анэшыпхъу (teyze)."
    },
    {
        "id": "WF-TETE",
        "rootId": "R-TETE",
        "morphemeIds": [],
        "lexemeIds": ["L-TETAZH"],
        "productivity": {
            "totalLexemes": 1,
            "corpusFrequency": 0
        },
        "notes": "Dede ailesi (ADY). тэтэжъ."
    },
    {
        "id": "WF-DADE",
        "rootId": "R-DADE",
        "morphemeIds": ["M-SHXUE"],
        "lexemeIds": ["L-DADESHHUE"],
        "productivity": {
            "totalLexemes": 1,
            "corpusFrequency": 0
        },
        "notes": "Dede ailesi (KBD/Abzeh). дадэшхуэ (buyuk dede)."
    },
    {
        "id": "WF-BZE",
        "rootId": "R-BZE",
        "morphemeIds": ["M-SHXUE"],
        "lexemeIds": [
            "L-BZE",
            "L-BZEGU",
            "L-BZEDYDHU",
            "L-BZESHXUE",
            "L-BZEPSE",
            "L-BZEBZA"
        ],
        "productivity": {
            "totalLexemes": 6,
            "corpusFrequency": 0
        },
        "notes": "Dil ailesi. бзэ, бзэгу, бзэдыд, бзэшхуэ, бзэпс, бзэбзэ."
    },
    {
        "id": "WF-1UEKHU",
        "rootId": "R-1UEKHU",
        "morphemeIds": ["M-SHXUE", "M-C1YQ1U"],
        "lexemeIds": [
            "L-1UEKHUASHHUE",
            "L-1UEKHUC1YQ1U"
        ],
        "productivity": {
            "totalLexemes": 2,
            "corpusFrequency": 0
        },
        "notes": "Is/mesele ailesi. Ӏуэхушхуэ (onemli is), ӀуэхуцӀыкӀу (onemsiz is)."
    },
    {
        "id": "WF-MAF1E",
        "rootId": "R-MAF1E",
        "morphemeIds": ["M-SHXUE", "M-C1YQ1U"],
        "lexemeIds": [
            "L-MAF1E",
            "L-MAF1ASHE",
            "L-MAF1EGU",
            "L-MAF1ESHHUE",
            "L-MAF1EC1YQ1U"
        ],
        "productivity": {
            "totalLexemes": 5,
            "corpusFrequency": 0
        },
        "notes": "Ates ailesi. мафӀэ, мафӀащэ, мафӀэгу, мафӀэшхуэ (yangin), мафӀэцӀыкӀу (kivilcim)."
    },
    {
        "id": "WF-UNE",
        "rootId": "R-UNE",
        "morphemeIds": ["M-SHXUE", "M-C1YQ1U"],
        "lexemeIds": [
            "L-UNE",
            "L-UNEGUASHE",
            "L-PSYUNE",
            "L-UNESHHUE",
            "L-UNEC1YQ1U"
        ],
        "productivity": {
            "totalLexemes": 5,
            "corpusFrequency": 0
        },
        "notes": "Ev ailesi. унэ, унэгуащэ, псыунэ, унэшхуэ (buyuk ev), унэцӀыкӀу (kucuk ev)."
    },
    {
        "id": "WF-MAKHUE",
        "rootId": "R-MAKHUE",
        "morphemeIds": ["M-SHXUE"],
        "lexemeIds": ["L-MAKHUESHHUE"],
        "productivity": {
            "totalLexemes": 1,
            "corpusFrequency": 0
        },
        "notes": "Gun ailesi. махуэшхуэ (bayram - buyuk gun)."
    },
]

# ============ MEVCUT AILE GUNCELLEMELERI ============

UPDATE_FAMILIES = [
    {
        "id": "WF-SHXUE",
        "morphemeIds": ["M-SHXUE"],
        "lexemeIds": [
            "L-SHXUE",
            "L-PSYSHXUE",
            "L-NYBZHYSHXUE",
            "L-UNESHHUE",
            "L-GUSHHUE",
            "L-1UEKHUASHHUE",
            "L-MAF1ESHHUE",
            "L-ADESHHUE",
            "L-ANESHHUE",
            "L-MAKHUESHHUE"
        ],
        "productivity": {
            "totalLexemes": 10,
            "corpusFrequency": 0,
            "isSuffixFamily": True
        },
        "notes": "Buyutme eki ailesi (-шхуэ). Fiziksel buyukluk, yaslilik, onem, cesaret, yogunluk anlamlari katar."
    },
    {
        "id": "WF-C1YQ1U",
        "morphemeIds": ["M-C1YQ1U"],
        "lexemeIds": [
            "L-C1YQ1U",
            "L-PSYC1YQ1U",
            "L-UNEC1YQ1U",
            "L-NYBZHYC1YQ1U",
            "L-GUC1YQ1U",
            "L-1UEKHUC1YQ1U",
            "L-MAF1EC1YQ1U"
        ],
        "productivity": {
            "totalLexemes": 7,
            "corpusFrequency": 0,
            "isSuffixFamily": True
        },
        "notes": "Kucultme eki ailesi (-цӀыкӀу). -шхуэ'nun zit anlamlisi."
    },
]


def main():
    print("="*60)
    print("FAZ C-8 - ASAMA 4: WORD FAMILIES")
    print("="*60)

    families = load_json("word_families.json")
    print(f"\nMevcut aile sayisi: {len(families)}")

    # 1. Yeni aileleri ekle
    print("\n--- YENI AILELER ---")
    eklenen = 0
    atlanan = 0

    for new_fam in NEW_FAMILIES:
        existing = find_by_id(families, new_fam["id"])
        if existing:
            print(f"[ATLA] {new_fam['id']} zaten var")
            atlanan += 1
        else:
            families.append(new_fam)
            lex_count = len(new_fam["lexemeIds"])
            print(f"[EKLE] {new_fam['id']} - {lex_count} lexeme")
            eklenen += 1

    # 2. Mevcut aileleri guncelle
    print("\n--- MEVCUT AILE GUNCELLEMELERI ---")
    guncellenen = 0

    for upd in UPDATE_FAMILIES:
        existing = find_by_id(families, upd["id"])
        if existing:
            eski_lex = len(existing.get("lexemeIds", []))
            yeni_lex = len(upd["lexemeIds"])
            existing["morphemeIds"] = upd["morphemeIds"]
            existing["lexemeIds"] = upd["lexemeIds"]
            existing["productivity"] = upd["productivity"]
            existing["notes"] = upd["notes"]
            print(f"[GUNCELLE] {upd['id']}: {eski_lex} -> {yeni_lex} lexeme")
            guncellenen += 1
        else:
            print(f"[HATA] {upd['id']} bulunamadi!")

    save_json("word_families.json", families)

    print(f"\n{'='*60}")
    print(f"OZET")
    print(f"{'='*60}")
    print(f"Eklenen aile: {eklenen}")
    print(f"Atlanan aile: {atlanan}")
    print(f"Guncellenen aile: {guncellenen}")
    print(f"Yeni toplam: {len(families)} aile")
    print(f"(Onceki: {len(families) - eklenen})")


if __name__ == "__main__":
    main()