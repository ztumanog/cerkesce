import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
import math
from pathlib import Path
from collections import Counter, defaultdict

dataset = json.loads(Path("public/data/linguistic/embedding_dataset.json").read_text(encoding="utf-8"))

def vectorize(item):
    """Agirlikli vektor - root ve concept daha onemli."""
    features = Counter()
    
    # Root (agirlik: 3.0)
    for rid in item.get("rootIds", []):
        features[rid] += 3.0
    
    # WordFamily (agirlik: 2.0)
    wf = item.get("wordFamilyId")
    if wf:
        features[wf] += 2.0
    
    # Concept (agirlik: 2.5)
    concept = item.get("conceptId")
    if concept:
        features[concept] += 2.5
    
    # Semantic relations (agirlik: 1.0 * confidence)
    for r in item.get("semanticRelations", []):
        target = r.get("target")
        conf = r.get("confidence", 1.0)
        if target:
            features[target] += 1.0 * conf
    
    # Dialect variants (agirlik: 0.5)
    dv = item.get("dialectVariants", {})
    for k, v in dv.items():
        if v:
            features[f"dialect:{v}"] += 0.5
    
    return features

def cosine(v1, v2):
    keys = set(v1.keys()) | set(v2.keys())
    dot = sum(v1.get(k, 0) * v2.get(k, 0) for k in keys)
    mag1 = math.sqrt(sum(v1.get(k, 0) ** 2 for k in keys))
    mag2 = math.sqrt(sum(v2.get(k, 0) ** 2 for k in keys))
    if mag1 == 0 or mag2 == 0:
        return 0
    return dot / (mag1 * mag2)

vectors = [(item, vectorize(item)) for item in dataset]

top_ciftler = []
for i in range(len(vectors)):
    for j in range(i+1, len(vectors)):
        item1, v1 = vectors[i]
        item2, v2 = vectors[j]
        sim = cosine(v1, v2)
        if sim > 0.7:
            top_ciftler.append((sim, item1['form'], item2['form'], item1.get('rootIds')))

top_ciftler.sort(reverse=True)
print(f"=== 0.7+ BENZER CIFT: {len(top_ciftler)} ===")
for sim, f1, f2, roots in top_ciftler[:20]:
    print(f"{sim:.3f}  {f1} <-> {f2}  (root: {roots})")

# Root'u olmayan lexeme'ler
no_root = [item for item in dataset if not item.get("rootIds")]
print(f"\n=== ROOT'U OLMAYAN: {len(no_root)} ===")
for item in no_root[:5]:
    print(f"  {item['form']} ({item.get('literalMeaning')})")
