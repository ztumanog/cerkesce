import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

dataset = []
with Path("public/data/linguistic/embedding_dataset.jsonl").open(encoding="utf-8") as f:
    for line in f:
        dataset.append(json.loads(line))

print(f"Toplam: {len(dataset)} lexeme\n")

print("=== KAVRAM BAZLI GRUPLAMA ===")
kavramlar = Counter()
for k in dataset:
    for c in k.get("concepts", []):
        kavramlar[c] += 1
for c, n in kavramlar.most_common(20):
    print(f"  {c:25} {n}")

print("\n=== ROOT BAZLI GRUPLAMA ===")
rootlar = Counter()
for k in dataset:
    for r in k.get("roots", []):
        rootlar[r] += 1
for r, n in rootlar.most_common(15):
    print(f"  {r:10} {n} lexeme")

print("\n=== AYNI ROOT + AYNI KAVRAM ===")
for r in ["гу", "нэ", "щхьэ", "Ӏэ", "лъэ", "псэ"]:
    alt = [k for k in dataset if r in k.get("roots", [])]
    if len(alt) < 2: continue
    print(f"\n  Root: {r} ({len(alt)} lexeme)")
    for k in alt[:8]:
        print(f"    {k['id']:20} {k['form']:15} {k['meaning'][:30]:30} {k['concepts']}")
