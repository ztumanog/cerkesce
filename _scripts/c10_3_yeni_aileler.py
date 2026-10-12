import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

wf_path = Path("public/data/linguistic/word_families.json")
wf = json.loads(wf_path.read_text(encoding="utf-8"))

# Mevcut ID'ler
mevcut = {w["id"] for w in wf}

# Yeni aileler
yeni = [
    {
        "id": "WF-ZE",
        "rootId": "R-ZE",
        "category": "body",
        "subcategory": "head-face",
        "semanticDomains": ["perception", "speech"],
        "morphemeIds": [],
        "lexemeIds": ["L-ZE"],
        "productivity": {"totalLexemes": 1, "corpusFrequency": 0, "mostFrequentLexemeId": "L-ZE"},
        "dialectNote": {"adyghe": "жьэ", "kabardian": "жьэ", "note": "Her iki lehcede ayni"},
        "notes": "C-10.3 yeni aile. Agiz/konusma kok ailesi."
    },
    {
        "id": "WF-PLHE",
        "rootId": "R-PLHE",
        "category": "mind",
        "subcategory": "perception",
        "semanticDomains": ["cognition", "perception"],
        "morphemeIds": [],
        "lexemeIds": ["L-PLHE", "L-PEPLEN"],
        "productivity": {"totalLexemes": 2, "corpusFrequency": 48, "mostFrequentLexemeId": "L-PEPLEN"},
        "dialectNote": {"adyghe": "плъэ", "kabardian": "плъэ", "note": "Her iki lehcede ayni"},
        "notes": "C-10.3 yeni aile. Bakmak/algilamak kok ailesi."
    },
    {
        "id": "WF-TKHE",
        "rootId": "R-TKHE",
        "category": "mind",
        "subcategory": "cognition",
        "semanticDomains": ["cognition", "communication"],
        "morphemeIds": [],
        "lexemeIds": ["L-TKHE"],
        "productivity": {"totalLexemes": 1, "corpusFrequency": 0, "mostFrequentLexemeId": "L-TKHE"},
        "dialectNote": {"adyghe": "тхэ", "kabardian": "тхэ", "note": "Her iki lehcede ayni"},
        "notes": "C-10.3 yeni aile. Yazmak kok ailesi."
    }
]

for y in yeni:
    if y["id"] not in mevcut:
        wf.append(y)
        print(f"Eklendi: {y['id']}")

wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam aile: {len(wf)}")

# Kategori dagilimi
from collections import Counter
kat = Counter(w.get("category", "other") for w in wf)
print("\n=== YENI KATEGORI DAGILIMI ===")
for k, v in kat.most_common():
    print(f"  {k:15} {v}")
