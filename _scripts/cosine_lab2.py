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

# Ayni root'tan gelen lexemeleri bul
from collections import defaultdict
by_root = defaultdict(list)
for item in dataset:
    for rid in item.get("rootIds", []):
        by_root[rid].append(item)

print("=== AYNI ROOT'TAN GELEN LEXEMELER ===")
for rid, items in sorted(by_root.items(), key=lambda x: -len(x[1]))[:5]:
    print(f"\n{rid} ({len(items)} lexeme):")
    for item in items[:5]:
        print(f"  {item['form']} ({item.get('literalMeaning')})")

# En benzer ciftleri bul
vectors = [(item, vectorize(item)) for item in dataset]
top_ciftler = []
for i in range(len(vectors)):
    for j in range(i+1, len(vectors)):
        item1, v1 = vectors[i]
        item2, v2 = vectors[j]
        sim = cosine(v1, v2)
        if sim > 0.5:
            top_ciftler.append((sim, item1['form'], item2['form'], item1.get('rootIds')))

top_ciftler.sort(reverse=True)
print(f"\n=== EN BENZER 20 CIFT ===")
for sim, f1, f2, roots in top_ciftler[:20]:
    print(f"{sim:.3f}  {f1} <-> {f2}  (root: {roots})")
