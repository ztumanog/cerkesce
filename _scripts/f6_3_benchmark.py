import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import defaultdict
import math

vektorler = {}
with Path("public/data/linguistic/embedding_vectors.jsonl").open(encoding="utf-8") as f:
    for line in f:
        v = json.loads(line)
        vektorler[v["id"]] = v

dataset = []
with Path("public/data/linguistic/embedding_dataset.jsonl").open(encoding="utf-8") as f:
    for line in f:
        dataset.append(json.loads(line))

def cosine(v1, v2):
    ortak = set(v1.keys()) & set(v2.keys())
    if not ortak: return 0.0
    dot = sum(v1[k] * v2[k] for k in ortak)
    n1 = math.sqrt(sum(v**2 for v in v1.values()))
    n2 = math.sqrt(sum(v**2 for v in v2.values()))
    if n1 == 0 or n2 == 0: return 0.0
    return dot / (n1 * n2)

print("=" * 70)
print("1. HOMONYM TESPITI")
print("=" * 70)
form_gruplari = defaultdict(list)
for d in dataset:
    form_gruplari[d.get("form", "")].append(d)
homonymler = [(f, ks) for f, ks in form_gruplari.items() if len(ks) > 1 and len(set(k.get("meaning","") for k in ks)) > 1]
for form, ks in homonymler:
    print(f"\n  Form: {form}")
    for k in ks:
        print(f"    {k['id']:20} {k.get('meaning','')[:40]}")
print(f"\nToplam: {len(homonymler)}")

print("\n" + "=" * 70)
print("2. MORFOLOJIK AILE (0.7-0.9)")
print("=" * 70)
root_gruplari = defaultdict(list)
for d in dataset:
    for r in d.get("roots", []):
        root_gruplari[r].append(d)
morfolojik = []
for r, ks in root_gruplari.items():
    if len(ks) < 2: continue
    for i in range(len(ks)):
        for j in range(i+1, len(ks)):
            a, b = ks[i], ks[j]
            s = cosine(vektorler.get(a["id"],{}).get("vector",{}), vektorler.get(b["id"],{}).get("vector",{}))
            if 0.7 <= s < 1.0:
                morfolojik.append((s, a, b, r))
morfolojik.sort(key=lambda x: -x[0])
for s, a, b, r in morfolojik[:15]:
    print(f"  {s:.3f}  [{r}] {a['form']:15} ~ {b['form']:15}")
print(f"\nToplam: {len(morfolojik)}")

print("\n" + "=" * 70)
print("3. ANLAMSAL YAKINLIK (0.5-0.7)")
print("=" * 70)
anlamsal = []
ids = list(vektorler.keys())
for i in range(len(ids)):
    for j in range(i+1, len(ids)):
        a, b = vektorler[ids[i]], vektorler[ids[j]]
        s = cosine(a.get("vector",{}), b.get("vector",{}))
        if 0.5 <= s < 0.7:
            anlamsal.append((s, a, b))
anlamsal.sort(key=lambda x: -x[0])
for s, a, b in anlamsal[:15]:
    print(f"  {s:.3f}  {a['form']:15} ~ {b['form']:15}")
print(f"\nToplam: {len(anlamsal)}")
