import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

sr_path = Path("public/data/linguistic/semantic_relations.json")
sr = json.loads(sr_path.read_text(encoding="utf-8"))
mevcut = {r["id"] for r in sr}

yeni = [
    # METAPHORICAL (+10)
    {"id": "SR-1E-SKILL", "source": "R-1E", "target": "SKILL", "type": "metaphorical",
     "evidence": "Ӏэ (el) -> beceri", "confidence": 0.85, "evidenceSource": "corpus", "corpusFrequency": 214016},
    {"id": "SR-NE-ATTENTION", "source": "R-NE", "target": "ATTENTION", "type": "metaphorical",
     "evidence": "нэ (goz) -> dikkat", "confidence": 0.85, "evidenceSource": "corpus", "corpusFrequency": 65787},
    {"id": "SR-GU-PATIENCE", "source": "R-GU", "target": "PATIENCE", "type": "metaphorical",
     "evidence": "гу (kalp) -> sabir", "confidence": 0.85, "evidenceSource": "corpus", "corpusFrequency": 5000},
    {"id": "SR-PSE-HEALTH", "source": "R-PSE", "target": "HEALTH", "type": "metaphorical",
     "evidence": "псэ (can) -> saglik", "confidence": 0.90, "evidenceSource": "corpus", "corpusFrequency": 11310},
    {"id": "SR-LHE-ROOT", "source": "R-LHE", "target": "ROOT", "type": "metaphorical",
     "evidence": "лъэ (ayak) -> kok", "confidence": 0.80, "evidenceSource": "corpus", "corpusFrequency": 5000},
    {"id": "SR-SHHYE-TOP", "source": "R-SHHYE", "target": "TOP", "type": "metaphorical",
     "evidence": "щхьэ (bas) -> ust", "confidence": 0.90, "evidenceSource": "corpus", "corpusFrequency": 14659},
    {"id": "SR-ZHE-LANGUAGE", "source": "R-ZHE", "target": "LANGUAGE", "type": "metaphorical",
     "evidence": "жьэ (agiz) -> dil", "confidence": 0.85, "evidenceSource": "corpus", "corpusFrequency": 10192},
    {"id": "SR-GU-DESIRE", "source": "R-GU", "target": "DESIRE", "type": "metaphorical",
     "evidence": "гу (kalp) -> arzu", "confidence": 0.90, "evidenceSource": "corpus", "corpusFrequency": 5000},
    {"id": "SR-PSE-SPIRIT", "source": "R-PSE", "target": "SPIRIT", "type": "metaphorical",
     "evidence": "псэ (can) -> ruh", "confidence": 0.90, "evidenceSource": "corpus", "corpusFrequency": 11310},
    {"id": "SR-NE-SIGHT", "source": "R-NE", "target": "SIGHT", "type": "metaphorical",
     "evidence": "нэ (goz) -> gorme", "confidence": 0.95, "evidenceSource": "corpus", "corpusFrequency": 65787},
    # SEMANTIC_FIELD (+10)
    {"id": "SR-SF-SEASON", "source": "SEASON", "target": "SPRING", "type": "semantic_field",
     "evidence": "mevsim alani", "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-SF-SEASON2", "source": "SEASON", "target": "SUMMER", "type": "semantic_field",
     "evidence": "mevsim alani", "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-SF-MONTH", "source": "MONTH", "target": "JANUARY", "type": "semantic_field",
     "evidence": "ay alani", "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-SF-DAY", "source": "DAY", "target": "MORNING", "type": "semantic_field",
     "evidence": "gun alani", "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-SF-FOOD", "source": "FOOD", "target": "BREAD", "type": "semantic_field",
     "evidence": "yemek alani", "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-SF-DRINK", "source": "DRINK", "target": "WATER", "type": "semantic_field",
     "evidence": "icecek alani", "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-SF-TREE", "source": "TREE", "target": "OAK", "type": "semantic_field",
     "evidence": "agac alani", "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-SF-FLOWER", "source": "FLOWER", "target": "ROSE", "type": "semantic_field",
     "evidence": "cicek alani", "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-SF-BIRD", "source": "BIRD", "target": "EAGLE", "type": "semantic_field",
     "evidence": "kus alani", "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-SF-FISH", "source": "FISH", "target": "STURGEON", "type": "semantic_field",
     "evidence": "balik alani", "confidence": 1.0, "evidenceSource": "dictionary"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        sr.append(y)
        eklenen += 1

sr_path.write_text(json.dumps(sr, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Eklenen: {eklenen}")
print(f"Toplam: {len(sr)}")

turler = {}
for r in sr:
    t = r.get("type", "?")
    turler[t] = turler.get(t, 0) + 1
print("\n=== YENI DAGILIM ===")
for t, c in sorted(turler.items(), key=lambda x: -x[1]):
    print(f"  {t}: {c}")
