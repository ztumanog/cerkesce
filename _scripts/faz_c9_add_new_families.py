"""
Faz C-9.3 — 6 yeni word family ekleme
======================================
Mimar onayi: 2026-09-30
Kaynak: adiga-ai corpus dogrulamasi (C-9.1.1)

Yeni aileler:
  WF-F    - ф       (32,267)  - belirsiz semantik
  WF-1E   - Ӏэ      (11,294)  - el (somatik)
  WF-LHE  - лъэ     (10,729)  - ayak (somatik)
  WF-SH1Y - щӀы     ( 9,435)  - yer/toprak (doga)
  WF-SH1E - щӀэ     ( 9,383)  - alt/asagi
  WF-PE   - пэ      ( 7,184)  - burun/on (somatik)

Toplam: 30 → 36 aile
"""
import json
from pathlib import Path
from datetime import datetime, timezone

BASE = Path(".")
LING = BASE / "public" / "data" / "linguistic"

print("=" * 60)
print("Faz C-9.3 — 6 Yeni Word Family Ekleme")
print("=" * 60)
print()

# ---- Yeni aile tanimlari ----
NEW_FAMILIES = [
    {
        "id": "WF-F",
        "rootId": "R-F",
        "category": "function",  # ф cogunlukla islevsel
        "notes": "ф koku — en yuksek frekansli (32.267). Muhtemelen islevsel morfem.",
    },
    {
        "id": "WF-1E",
        "rootId": "R-1E",
        "category": "body",
        "notes": "El ailesi (Ӏэ). Somatik kok. Corpus: 11.294 kullanim.",
    },
    {
        "id": "WF-LHE",
        "rootId": "R-LHE",
        "category": "body",
        "notes": "Ayak/bacak ailesi (лъэ). Somatik kok. Corpus: 10.729 kullanim.",
    },
    {
        "id": "WF-SH1Y",
        "rootId": "R-SH1Y",
        "category": "nature",
        "notes": "Yer/toprak ailesi (щӀы). Doga koku. Corpus: 9.435 kullanim.",
    },
    {
        "id": "WF-SH1E",
        "rootId": "R-SH1E",
        "category": "spatial",
        "notes": "Alt/asagi ailesi (щӀэ). Mekan koku. Corpus: 9.383 kullanim.",
    },
    {
        "id": "WF-PE",
        "rootId": "R-PE",
        "category": "body",
        "notes": "Burun/on ailesi (пэ). Somatik + mekan. Corpus: 7.184 kullanim.",
    },
]

# ---- Dosyalari yukle ----
wf_path = LING / "word_families.json"
families = json.loads(wf_path.read_text(encoding="utf-8"))
print(f"[1/5] Mevcut word_families.json yuklendi: {len(families)} aile")

roots = json.loads((LING / "roots.json").read_text(encoding="utf-8"))
lexemes = json.loads((LING / "lexemes.json").read_text(encoding="utf-8"))
morphemes = json.loads((LING / "morphemes.json").read_text(encoding="utf-8"))
print(f"[2/5] roots.json: {len(roots)}, lexemes.json: {len(lexemes)}, morphemes.json: {len(morphemes)}")
print()

# ---- Yeni aileleri olustur ----
print("[3/5] Yeni aileler olusturuluyor...")

added = []
skipped = []

for spec in NEW_FAMILIES:
    wf_id = spec["id"]
    root_id = spec["rootId"]

    # Duplicate kontrol
    if any(wf["id"] == wf_id for wf in families):
        print(f"      [!] {wf_id} zaten var, atlaniyor")
        skipped.append(wf_id)
        continue

    # Root bilgisi
    root = next((r for r in roots if r["id"] == root_id), None)
    if not root:
        print(f"      [!] {root_id} bulunamadi, atlaniyor")
        skipped.append(wf_id)
        continue

    # Root'a bagli lexeme'ler
    root_lexemes = [
        lx["id"] for lx in lexemes
        if root_id in lx.get("derivation", {}).get("rootIds", [])
    ]

    # Root'a bagli morfem'ler
    root_morphemes = [
        m["id"] for m in morphemes
        if root_id in m.get("rootIds", [])
    ]

    # En yuksek frekansli lexeme
    if root_lexemes:
        lex_freqs = {}
        for lx_id in root_lexemes:
            lx = next((l for l in lexemes if l["id"] == lx_id), None)
            if lx:
                lex_freqs[lx_id] = lx.get("corpusFrequency", 0)
        most_freq = max(lex_freqs.items(), key=lambda x: x[1])[0] if lex_freqs else None
    else:
        most_freq = None

    # Yeni aile
    new_wf = {
        "id": wf_id,
        "rootId": root_id,
        "category": spec["category"],
        "morphemeIds": root_morphemes,
        "lexemeIds": root_lexemes,
        "productivity": {
            "totalLexemes": len(root_lexemes),
            "corpusFrequency": root.get("productivity", {}).get("corpusFrequency", 0),
            "mostFrequentLexemeId": most_freq,
        },
        "dialectNote": {
            "adyghe": root.get("dialectVariants", {}).get("adyghe", root.get("form", "")),
            "kabardian": root.get("dialectVariants", {}).get("kabardian", root.get("form", "")),
            "note": "C-9.3 corpus dogrulamasi ile eklendi.",
        },
        "notes": spec["notes"],
    }

    families.append(new_wf)
    added.append(wf_id)
    print(f"      + {wf_id} ({root['form']}) - {len(root_lexemes)} lexeme, freq={new_wf['productivity']['corpusFrequency']}")

print()

# ---- Kaydet ----
print("[4/5] word_families.json guncelleniyor...")
wf_path.write_text(
    json.dumps(families, ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print(f"      Toplam: {len(families)} aile")
print()

# ---- Ozet ----
print("[5/5] Ozet")
print()
print("=" * 60)
print("C-9.3 OZETI")
print("=" * 60)
print(f"Onceki aile sayisi : 30")
print(f"Eklenen            : {len(added)}")
print(f"Son aile sayisi    : {len(families)}")
print()

if added:
    print("Eklenen aileler:")
    for wf_id in added:
        wf = next(w for w in families if w["id"] == wf_id)
        print(f"  {wf_id:8s} -> {wf['rootId']:8s} ({wf['productivity']['totalLexemes']} lexeme, freq={wf['productivity']['corpusFrequency']:,})")

if skipped:
    print()
    print("Atlananlar:")
    for wf_id in skipped:
        print(f"  {wf_id}")

print()
print("OK — C-9.3 tamamlandi.")