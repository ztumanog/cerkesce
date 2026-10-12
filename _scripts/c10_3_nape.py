import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

wf_path = Path("public/data/linguistic/word_families.json")
wf = json.loads(wf_path.read_text(encoding="utf-8"))
mevcut = {w["id"] for w in wf}

yeni = {
    "id": "WF-NAPE", "rootId": "R-NAPE",
    "category": "body", "subcategory": "head-face",
    "semanticDomains": ["body", "emotion", "cognition"],
    "morphemeIds": [],
    "lexemeIds": ["L-NAPE", "L-NAPE1ELHESHH1", "L-NAPEK1UETS1", "L-NAPELHAGHU", "L-NAPELHE", "L-NAPENSHE", "L-NAPENTEH", "L-NAPENTEHYGHE"],
    "productivity": {"totalLexemes": 8, "corpusFrequency": 0, "mostFrequentLexemeId": "L-NAPE", "dictionarySources": 19},
    "dialectNote": {"adyghe": "напэ", "kabardian": "напэ"},
    "notes": "C-10.3 yeni aile. Yuz/vicdan kok ailesi. 19 sozluk kaynagi. 10+ turev. 15+ deyim."
}

if yeni["id"] not in mevcut:
    wf.append(yeni)
    print(f"Eklendi: {yeni['id']}")

wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam: {len(wf)}")

from collections import Counter
kat = Counter(w.get("category", "other") for w in wf)
for k, v in kat.most_common():
    print(f"  {k:15} {v}")
