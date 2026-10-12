import json
from pathlib import Path

sr_path = Path('public/data/linguistic/semantic_relations.json')
sr = json.loads(sr_path.read_text(encoding='utf-8'))

mevcut_ids = {s.get('id', '') for s in sr}

# Yeni iliskiler: WATER -> ...
yeni = [
    {"id": "SR-WATER-RIVER", "source": "WATER", "target": "RIVER",
     "type": "related", "evidence": "псы ~ псыежэх",
     "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-WATER-DRINK", "source": "WATER", "target": "DRINK",
     "type": "related", "evidence": "псы ефэн",
     "confidence": 1.0, "evidenceSource": "corpus"},
    {"id": "SR-WATER-WELL", "source": "WATER", "target": "WELL",
     "type": "related", "evidence": "псынэ",
     "confidence": 1.0, "evidenceSource": "dictionary"},
    {"id": "SR-WATER-STREAM", "source": "WATER", "target": "STREAM",
     "type": "related", "evidence": "псы кӀантӀэ",
     "confidence": 1.0, "evidenceSource": "dictionary"},
]

eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        sr.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']}")

sr_path.write_text(json.dumps(sr, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam iliski: {len(sr)}")
