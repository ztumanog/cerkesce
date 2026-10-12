import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

sr_path = Path("public/data/linguistic/semantic_relations.json")
sr = json.loads(sr_path.read_text(encoding="utf-8"))

if not any(s.get("id") == "SR-NE-TEARS" for s in sr):
    sr.append({
        "id": "SR-NE-TEARS",
        "source": "R-NE",
        "target": "TEARS",
        "type": "metaphorical",
        "evidence": "нэпс",
        "confidence": 0.85,
        "evidenceSource": "adyghe.web-corpora.net",
        "reference": "Arkhangelskiy, Bagirokova, Lander (2019)",
        "notes": "Goz + su = gozyasi. Somatik metafor.",
        "evidenceDetail": {"source": "adyghe.web-corpora.net", "pages": 10, "status": "DOGRULANDI"}
    })
    sr_path.write_text(json.dumps(sr, ensure_ascii=False, indent=2), encoding="utf-8")
    print("SR-NE-TEARS eklendi")
else:
    print("Zaten var")
