import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import defaultdict
import math

vektorler = {}
from pathlib import Path

# Proje kök dizinini betiğin bulunduğu klasörün bir üst seviyesi olarak tanımlayın
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# 9. satırdaki dosya açma işlemini dinamik yolla değiştirin:
with (PROJECT_ROOT / "e:/projeler/cerkesce/public/data/linguistic/embedding_vectors.jsonl").open(encoding="utf-8") as f:
    ...
    for line in f:
        v = json.loads(line)
        vektorler[v["id"]] = v

dataset = []
dataset_map = {}
id_to_roots = {}
with Path("public/data/linguistic/embedding_dataset.jsonl").open(encoding="utf-8") as f:
    for line in f:
        d = json.loads(line)
        dataset.append(d)
        dataset_map[d["id"]] = d
        id_to_roots[d["id"]] = set(d.get("roots", []))

# 1. Normları bir kez önceden hesapla O(N)
vektor_normlari = {}
for vid, vdata in vektorler.items():
    vec = vdata.get("vector", {})
    vektor_normlari[vid] = math.sqrt(sum(val**2 for val in vec.values()))

def cosine_fast(id1, id2):
    v1 = vektorler[id1].get("vector", {})
    v2 = vektorler[id2].get("vector", {})
    ortak = set(v1.keys()) & set(v2.keys())
    if not ortak: return 0.0
    
    dot = sum(v1[k] * v2[k] for k in ortak)
    n1 = vektor_normlari.get(id1, 0.0)
    n2 = vektor_normlari.get(id2, 0.0)
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
            s = cosine_fast(a["id"], b["id"])
            if 0.7 <= s < 1.0:
                morfolojik.append((s, a, b, r))
morfolojik.sort(key=lambda x: -x[0])
for s, a, b, r in morfolojik[:15]:
    print(f"  {s:.3f}  [{r}] {a.get('form',''):15} ~ {b.get('form',''):15}")
print(f"\nToplam: {len(morfolojik)}")

print("\n" + "=" * 70)
print("3. ANLAMSAL YAKINLIK (0.5-0.7) (Ortak Kök Hariç)")
print("=" * 70)
anlamsal = []
ids = list(vektorler.keys())
for i in range(len(ids)):
    id_a = ids[i]
    roots_a = id_to_roots.get(id_a, set())
    for j in range(i+1, len(ids)):
        id_b = ids[j]
        # Ortak kökü olan morfolojik türevleri anlamsal yakınlıktan filtrele
        if roots_a & id_to_roots.get(id_b, set()):
            continue
            
        s = cosine_fast(id_a, id_b)
        if 0.5 <= s < 0.7:
            a_obj = dataset_map.get(id_a, vektorler[id_a])
            b_obj = dataset_map.get(id_b, vektorler[id_b])
            anlamsal.append((s, a_obj, b_obj))

anlamsal.sort(key=lambda x: -x[0])
for s, a, b in anlamsal[:15]:
    print(f"  {s:.3f}  {a.get('form',''):15} ~ {b.get('form',''):15}")
print(f"\nToplam: {len(anlamsal)}")