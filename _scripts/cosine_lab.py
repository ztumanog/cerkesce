import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
import math
from pathlib import Path
from collections import Counter

dataset = json.loads(Path("public/data/linguistic/embedding_dataset.json").read_text(encoding="utf-8"))

def vectorize(item):
    features = []
    features.extend(item.get("rootIds", []))
    if item.get("wordFamilyId"):
        features.append(item["wordFamilyId"])
    if item.get("conceptId"):
        features.append(item["conceptId"])
    for r in item.get("semanticRelations", []):
        if r.get("target"):
            features.append(r["target"])
    return Counter(features)

def cosine(v1, v2):
    keys = set(v1.keys()) | set(v2.keys())
    dot = sum(v1.get(k, 0) * v2.get(k, 0) for k in keys)
    mag1 = math.sqrt(sum(v1.get(k, 0) ** 2 for k in keys))
    mag2 = math.sqrt(sum(v2.get(k, 0) ** 2 for k in keys))
    if mag1 == 0 or mag2 == 0:
        return 0
    return dot / (mag1 * mag2)

# Ornek: ayni root'tan gelen lexemeler
vectors = [(item, vectorize(item)) for item in dataset]

print("=== COSINE SIMILARITY (ilk 30 lexeme) ===")
count = 0
for i in range(min(30, len(vectors))):
    for j in range(i+1, min(30, len(vectors))):
        item1, v1 = vectors[i]
        item2, v2 = vectors[j]
        sim = cosine(v1, v2)
        if sim > 0.3:
            print(f"{item1['form']} <-> {item2['form']}: {sim:.3f} (root: {item1.get('rootIds')})")
            count += 1

print(f"\nToplam benzer cift: {count}")
