import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

wf_path = Path("public/data/linguistic/word_families.json")
wf = json.loads(wf_path.read_text(encoding="utf-8"))

# Kategori mapping
kategoriler = {
    "WF-NE": {"category": "body", "subcategory": "head-face", "domains": ["perception"]},
    "WF-SHHYE": {"category": "body", "subcategory": "head-face", "domains": ["cognition"]},
    "WF-PE": {"category": "body", "subcategory": "head-face", "domains": ["perception"]},
    "WF-1E": {"category": "body", "subcategory": "limbs", "domains": ["action"]},
    "WF-LHE": {"category": "body", "subcategory": "limbs", "domains": ["action"]},
    "WF-GU": {"category": "body", "subcategory": "organs", "domains": ["emotion", "cognition"]},
    "WF-PSE": {"category": "body", "subcategory": "organs", "domains": ["emotion", "life"]},
    "WF-PSY": {"category": "nature", "subcategory": "terrain-water", "domains": ["nature"]},
    "WF-KUE": {"category": "nature", "subcategory": "terrain-water", "domains": ["nature"]},
    "WF-UES": {"category": "nature", "subcategory": "sky-weather", "domains": ["nature"]},
    "WF-MAF1E": {"category": "nature", "subcategory": "element", "domains": ["nature"]},
    "WF-ZHY": {"category": "nature", "subcategory": "sky-weather", "domains": ["nature"]},
    "WF-KHY": {"category": "nature", "subcategory": "terrain-water", "domains": ["nature"]},
    "WF-BZE": {"category": "mind", "subcategory": "language", "domains": ["cognition", "communication"]},
}

guncellenen = 0
for w in wf:
    wid = w.get("id", "")
    if wid in kategoriler:
        k = kategoriler[wid]
        w["category"] = k["category"]
        w["subcategory"] = k["subcategory"]
        w["semanticDomains"] = k["domains"]
        guncellenen += 1

wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Guncellenen: {guncellenen}")

# Kategori dagilimi
from collections import Counter
kat = Counter(w.get("category", "other") for w in wf)
print("\n=== YENI KATEGORI DAGILIMI ===")
for k, v in kat.most_common():
    print(f"  {k:15} {v}")
