import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter, defaultdict

# Dataset'i yükle
dataset = []
with Path("public/data/linguistic/embedding_dataset.jsonl").open(encoding="utf-8") as f:
    for line in f:
        dataset.append(json.loads(line))

print(f"Toplam: {len(dataset)} lexeme\n")

# === HIPOTEZ 1: Root -> Kavram Yogunlugu ===
print("=" * 60)
print("HIPOTEZ 1: Root -> Kavram Yogunlugu")
print("=" * 60)

root_kavram = defaultdict(set)
for k in dataset:
    for r in k.get("roots", []):
        for c in k.get("concepts", []):
            root_kavram[r].add(c)

print(f"\n{'Root':10} {'Kavram':8} {'Lexeme':8} Kavramlar")
print("-" * 60)
for r in sorted(root_kavram.keys(), key=lambda x: -len(root_kavram[x]))[:10]:
    lexeme_sayisi = sum(1 for k in dataset if r in k.get("roots", []))
    kavramlar = list(root_kavram[r])[:5]
    print(f"{r:10} {len(root_kavram[r]):8} {lexeme_sayisi:8} {', '.join(kavramlar)}")

# === HIPOTEZ 2: Kavram -> Root Cesitliligi ===
print("\n" + "=" * 60)
print("HIPOTEZ 2: Kavram -> Root Cesitliligi")
print("=" * 60)

kavram_root = defaultdict(set)
for k in dataset:
    for c in k.get("concepts", []):
        for r in k.get("roots", []):
            kavram_root[c].add(r)

print(f"\n{'Kavram':25} {'Root':8} Rootlar")
print("-" * 60)
for c in sorted(kavram_root.keys(), key=lambda x: -len(kavram_root[x]))[:15]:
    rootlar = list(kavram_root[c])[:5]
    print(f"{c:25} {len(kavram_root[c]):8} {', '.join(rootlar)}")

# === HIPOTEZ 3: Polisemi (Cok Anlamlilik) ===
print("\n" + "=" * 60)
print("HIPOTEZ 3: Polisemi (Cok Anlamlilik)")
print("=" * 60)

root_anlam = defaultdict(set)
for k in dataset:
    for r in k.get("roots", []):
        anlam = k.get("meaning", "")
        if anlam:
            # Ilk kelimeyi al
            ilk = anlam.split(",")[0].strip()
            root_anlam[r].add(ilk)

print(f"\n{'Root':10} {'Anlam':8} Ornek Anlamlar")
print("-" * 60)
for r in sorted(root_anlam.keys(), key=lambda x: -len(root_anlam[x]))[:10]:
    anlamlar = list(root_anlam[r])[:4]
    print(f"{r:10} {len(root_anlam[r]):8} {', '.join(anlamlar)}")

# === OZET ===
print("\n" + "=" * 60)
print("OZET")
print("=" * 60)
print(f"Toplam lexeme    : {len(dataset)}")
print(f"Toplam root      : {len(root_kavram)}")
print(f"Toplam kavram    : {len(kavram_root)}")
print(f"Ort. lexeme/root : {len(dataset) / len(root_kavram):.1f}")
print(f"Ort. kavram/root : {sum(len(v) for v in root_kavram.values()) / len(root_kavram):.1f}")
