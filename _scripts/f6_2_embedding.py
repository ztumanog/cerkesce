import sys
import json
import math
from pathlib import Path
from collections import Counter

sys.stdout.reconfigure(encoding="utf-8")

dataset_path = Path("public/data/linguistic/embedding_dataset.jsonl")
output_path = Path("public/data/linguistic/embedding_vectors.jsonl")

if not dataset_path.exists():
    print(f"HATA: {dataset_path} bulunamadı!")
    sys.exit(1)

dataset = []
with dataset_path.open(encoding="utf-8") as f:
    for line in f:
        if line.strip():
            dataset.append(json.loads(line))

print(f"Toplam Yüklenen Lexeme: {len(dataset)}")

def ngram_vektor(metin, n=3):
    metin = f"_{metin.lower().strip()}_"
    v = Counter()
    for i in range(len(metin) - n + 1):
        v[metin[i:i+n]] += 1
    return v

def l2_normalize(v):
    norm = math.sqrt(sum(val ** 2 for val in v.values()))
    if norm == 0:
        return {}
    return {k: round(val / norm, 4) for k, val in v.items()}

def cosine(v1, v2):
    ortak = set(v1.keys()) & set(v2.keys())
    if not ortak:
        return 0.0
    return sum(v1[k] * v2[k] for k in ortak)

vektor_kayitlari = []
vektor_haritasi = {}

for item in dataset:
    lexeme_id = item.get("id")
    form = item.get("form", "")
    if not form or not lexeme_id:
        continue
    
    tf_vec = ngram_vektor(form, n=3)
    norm_vec = l2_normalize(tf_vec)
    
    rec = {
        "id": lexeme_id,
        "form": form,
        "meaning": item.get("meaning", ""),
        "roots": item.get("roots", []),
        "vector": norm_vec
    }
    vektor_kayitlari.append(rec)
    vektor_haritasi[lexeme_id] = rec

# === 1) Embedding Vektörlerini Kaydet ===
output_path.parent.mkdir(parents=True, exist_ok=True)
with output_path.open("w", encoding="utf-8") as f:
    for rec in vektor_kayitlari:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")

print(f"Vektörler Kaydedildi -> {output_path} ({len(vektor_kayitlari)} kayıt)\n")

# === 2) En Benzer Çiftler ===
benzerlikler = []
ids = list(vektor_haritasi.keys())
for i in range(len(ids)):
    for j in range(i + 1, len(ids)):
        a = vektor_haritasi[ids[i]]
        b = vektor_haritasi[ids[j]]
        skor = cosine(a["vector"], b["vector"])
        if skor > 0.4:
            benzerlikler.append((skor, a, b))

benzerlikler.sort(key=lambda x: -x[0])

print("=== EN BENZER CIFTLER (Top 15) ===")
print("-" * 70)
for skor, a, b in benzerlikler[:15]:
    print(f"  {skor:.3f}  {a['form']:15} ~ {b['form']:15}  ({a['meaning'][:20]} ~ {b['meaning'][:20]})")

# === 3) Aynı Root Grubunda Benzerlik ===
print("\n=== AYNI ROOT GRUBUNDA BENZERLIK ===")
print("-" * 70)
root_gruplari = {}
for item in dataset:
    for r in item.get("roots", []):
        root_gruplari.setdefault(r, []).append(item["id"])

for r, ids_r in sorted(root_gruplari.items(), key=lambda x: -len(x[1]))[:5]:
    if len(ids_r) < 2:
        continue
    print(f"\n  Root: {r} ({len(ids_r)} lexeme)")
    for i in range(min(3, len(ids_r))):
        for j in range(i + 1, min(4, len(ids_r))):
            a = vektor_haritasi.get(ids_r[i])
            b = vektor_haritasi.get(ids_r[j])
            if a and b:
                skor = cosine(a["vector"], b["vector"])
                print(f"    {skor:.3f}  {a['form']:15} ~ {b['form']:15}")

print("\n" + "=" * 70)
print("OZET: Faz 6.2 Embedding Üretimi ve Kaydı Başarıyla Tamamlandı.")
print("=" * 70)
