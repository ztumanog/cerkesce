import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

sr_path = Path("public/data/linguistic/semantic_relations.json")
sr = json.loads(sr_path.read_text(encoding="utf-8"))

# Bulunamayan 5 metafor icin alternatif kanit
alternatif = {
    "SR-HEAD-TOP": {
        "status": "ALTERNATIF_KANIT",
        "confidence": 0.60,
        "source": "Wikipedia + Wiktionary",
        "evidence": "щхьэгу = zirve, tepe. HEAD -> TOP metaforu.",
        "notes": "Corpus'ta bulunamadi ama Wikipedia'da var."
    },
    "SR-HEAD-REASON": {
        "status": "ALTERNATIF_KANIT",
        "confidence": 0.65,
        "source": "Wikipedia + Wiktionary",
        "evidence": "щхьэусыгъуэ = sebep. HEAD -> REASON metaforu.",
        "notes": "Corpus'ta bulunamadi ama Wikipedia'da var."
    },
    "SR-SHHYE-FREEDOM": {
        "status": "ALTERNATIF_KANIT",
        "confidence": 0.70,
        "source": "Wikipedia",
        "evidence": "щхьэхуитыныгъэ = ozgurluk. HEAD -> FREEDOM metaforu.",
        "notes": "Corpus'ta bulunamadi ama Wikipedia'da var."
    },
    "SR-SHHYE-WINDOW": {
        "status": "ALTERNATIF_KANIT",
        "confidence": 0.65,
        "source": "Wiktionary",
        "evidence": "щхьэгъубжэ = pencere. HEAD -> WINDOW metaforu.",
        "notes": "Corpus'ta bulunamadi ama Wiktionary'de var."
    },
    "SR-GU-ANGER": {
        "status": "ALTERNATIF_KANIT",
        "confidence": 0.75,
        "source": "12 sozluk",
        "evidence": "губжь = ofke. HEART -> ANGER metaforu.",
        "notes": "Corpus'ta bulunamadi ama 12 sozlukte var."
    }
}

guncellenen = 0
for m in sr:
    if m.get("type") != "metaphorical":
        continue
    mid = m.get("id", "")
    if mid in alternatif:
        a = alternatif[mid]
        m["confidence"] = a["confidence"]
        m["evidenceSource"] = a["source"]
        m["evidence"] = a["evidence"]
        m["notes"] = a["notes"]
        m["status"] = a["status"]
        guncellenen += 1
        print(f"Guncellendi: {mid} (conf={a['confidence']})")

sr_path.write_text(json.dumps(sr, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen: {guncellenen}")
