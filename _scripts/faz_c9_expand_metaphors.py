
"""
Faz C-9.4 — Metaforik zincir genisletme
========================================
4 -> 18 metafor (mimar hedefi 15+)

Kaynak: adiga-ai corpus + web-corpora.net dogrulamasi
Karar: ADR-GUP-001 (гуп = yerli Cerkessce)
"""
import json
from pathlib import Path
from datetime import datetime, timezone

LING = Path("public/data/linguistic")
SR_PATH = LING / "semantic_relations.json"
VERIFY_PATH = Path("data/corpus/webcorpora/verification_results.json")

# 14 yeni metafor (web-corpora dogrulamasi ile)
NEW_METAPHORS = [
    {"id": "SR-GU-LOVE",       "source": "R-GU",    "target": "LOVE",     "evidence": "гуфӀэ",       "confidence": 0.85, "corpusFrequency": 17,  "notes": "Kalp + iyi = sevgi. Somatik metafor."},
    {"id": "SR-GU-ANGER",      "source": "R-GU",    "target": "ANGER",    "evidence": "губжь",       "confidence": 0.60, "corpusFrequency": 54,  "notes": "Kalp + kirilma = ofke. Autocomplete dogrulandi."},
    {"id": "SR-GU-CENTER",     "source": "R-GU",    "target": "CENTER",   "evidence": "гу",          "confidence": 1.00, "corpusFrequency": 782, "notes": "Kalp = merkez. En temel metafor."},
    {"id": "SR-GU-BOND",       "source": "R-GU",    "target": "BOND",     "evidence": "гукӀэгъу",    "confidence": 0.85, "corpusFrequency": 324, "notes": "Kalp bagi. Corpus dogrulandi."},
    {"id": "SR-GU-FEELING",    "source": "R-GU",    "target": "FEELING",  "evidence": "гухэлъ",      "confidence": 0.85, "corpusFrequency": 102, "notes": "Kalpte olan = duygu."},
    {"id": "SR-GU-SADNESS",    "source": "R-GU",    "target": "SADNESS",  "evidence": "гухэкӀ",      "confidence": 0.80, "corpusFrequency": 54,  "notes": "Kalpten cikma = huzun."},
    {"id": "SR-HEART-SPEECH",  "source": "R-GU",    "target": "SPEECH",   "evidence": "гущыӀэ",      "confidence": 0.85, "corpusFrequency": 428, "notes": "Kalp + soz = konusma."},
    {"id": "SR-GU-FRONT",      "source": "R-GU",    "target": "FRONT",    "evidence": "гуп",         "confidence": 0.85, "corpusFrequency": 290, "notes": "ADR-GUP-001: on/yuz/cephe."},
    {"id": "SR-NE-TEARS",      "source": "R-NE",    "target": "TEARS",    "evidence": "нэпс",        "confidence": 0.85, "corpusFrequency": 66,  "notes": "Goz + su = gozyasi."},
    {"id": "SR-NE-WITNESS",    "source": "R-NE",    "target": "WITNESS",  "evidence": "нэгу",        "confidence": 0.85, "corpusFrequency": 287, "notes": "Goz + kalp = sahit."},
    {"id": "SR-HEAD-LEADER",   "source": "R-SHHYE", "target": "LEADER",   "evidence": "щхьэ",        "confidence": 0.80, "corpusFrequency": 678, "notes": "Bas = lider/onder."},
    {"id": "SR-HEAD-SELF",     "source": "R-SHHYE", "target": "SELF",     "evidence": "щхьэ",        "confidence": 0.80, "corpusFrequency": 678, "notes": "Bas = kendi (refleksif)."},
    {"id": "SR-HAND-POWER",    "source": "R-1E",    "target": "POWER",    "evidence": "Ӏэ",          "confidence": 0.80, "corpusFrequency": 473, "notes": "El = guc."},
    {"id": "SR-FOOT-PLACE",    "source": "R-LHE",   "target": "PLACE",    "evidence": "лъэ",         "confidence": 0.85, "corpusFrequency": 80,  "notes": "Ayak = yer/mekan."},
]


def main():
    print("=" * 60)
    print("Faz C-9.4 — Metaforik Zincir Genisletme")
    print("=" * 60)
    print()

    # Semantic relations yukle
    relations = json.loads(SR_PATH.read_text(encoding="utf-8"))
    print(f"[1/4] Mevcut relation: {len(relations)}")

    # Mevcut metaphorical
    existing_meta = [r for r in relations if r.get("type") == "metaphorical"]
    print(f"      Mevcut metafor: {len(existing_meta)}")

    # Duplicate kontrol
    existing_ids = {r["id"] for r in relations}

    # Yeni metaforlari ekle
    print()
    print("[2/4] Yeni metaforlar ekleniyor...")
    added = 0
    for m in NEW_METAPHORS:
        if m["id"] in existing_ids:
            print(f"      [!] {m['id']} zaten var, atlaniyor")
            continue

        new_relation = {
            "id": m["id"],
            "source": m["source"],
            "target": m["target"],
            "type": "metaphorical",
            "evidence": m["evidence"],
            "confidence": m["confidence"],
            "evidenceSource": "corpus+dictionary",
            "corpusFrequency": m["corpusFrequency"],
            "notes": m["notes"],
            "verifiedAt": datetime.now(timezone.utc).isoformat(),
        }
        relations.append(new_relation)
        added += 1
        print(f"      + {m['id']} ({m['evidence']}) -> {m['target']}")

    # Kaydet
    print()
    print("[3/4] Kaydediliyor...")
    SR_PATH.write_text(
        json.dumps(relations, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    print(f"      {SR_PATH}")

    # Ozet
    print()
    print("[4/4] Ozet")
    print()
    print("=" * 60)
    print("C-9.4 OZETI")
    print("=" * 60)
    print(f"Onceki toplam relation  : {len(relations) - added}")
    print(f"Eklenen metafor         : {added}")
    print(f"Yeni toplam relation    : {len(relations)}")
    print()
    final_meta = [r for r in relations if r.get("type") == "metaphorical"]
    print(f"Metafor sayisi (once)   : 4")
    print(f"Metafor sayisi (sonra)  : {len(final_meta)}")
    print()
    print("Metafor zincirleri:")
    print("  HEAD:  TOP, REASON, FREEDOM, WINDOW, LEADER, SELF")
    print("  HEART: LOVE, ANGER, CENTER, BOND, FEELING, SADNESS, SPEECH, FRONT")
    print("  EYE:   TEARS, WITNESS")
    print("  HAND:  POWER")
    print("  FOOT:  PLACE")
    print()
    print("OK — C-9.4 tamamlandi.")


if __name__ == "__main__":
    main()