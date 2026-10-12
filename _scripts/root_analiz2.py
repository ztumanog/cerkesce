import json
import csv
from pathlib import Path
from collections import Counter

BASE = Path(r"E:\projeler\Cerkesce")

# 1. roots-117 vs aktif
with open(BASE / "data/grammar/roots-117.json", encoding="utf-8") as f:
    r117 = json.load(f)
with open(BASE / "public/data/linguistic/roots.json", encoding="utf-8") as f:
    aktif = json.load(f)

r117_ids = set()
for r in r117:
    for rid in r.get("rootIds", []):
        r117_ids.add(rid)

aktif_ids = set(r.get("id") for r in aktif if r.get("id"))

print("=== ROOT ID KARSILASTIRMA ===")
print(f"roots-117 root ID: {len(r117_ids)}")
print(f"aktif root ID: {len(aktif_ids)}")
print(f"Ortak: {len(r117_ids & aktif_ids)}")
print(f"Sadece roots-117: {len(r117_ids - aktif_ids)}")
print(f"Sadece aktif: {len(aktif_ids - r117_ids)}")
print()
print("Sadece roots-117'de olanlar (ilk 20):")
for rid in sorted(r117_ids - aktif_ids)[:20]:
    print(f"  {rid}")

# 2. koksuz_temiz.csv prefix
print()
print("=== KOKSUZ_TEMIZ.CSV PREFIX ===")
with open(BASE / "_scripts/koksuz_temiz.csv", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))

prefixes = Counter()
for r in rows:
    form = r.get("FORM", "")
    if form:
        prefixes[form[:2]] += 1

print(f"Toplam: {len(rows)}")
print("Ilk 2 harf (ilk 20):")
for k, v in prefixes.most_common(20):
    print(f"  {k}: {v}")