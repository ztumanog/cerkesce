import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from datasets import load_dataset

# Korpus yukle
print("Korpus yukleniyor...")
ds = load_dataset("adiga-ai/circassian-parallel-corpus", verification_mode="no_checks")

all_text = []
for split in ds:
    for row in ds[split]:
        for col in row:
            if isinstance(row[col], str):
                all_text.append(row[col])
corpus = " ".join(all_text)

# Normalize fonksiyonu: buyuk/kucuk Ӏ ve ӏ birlestir
def normalize(s):
    return (s.replace("Ӏ", "ӏ")
             .replace("ӏ", "ӏ")
             .replace("Ӏ", "ӏ")
             .lower())

corpus_norm = normalize(corpus)

# Temel kelimeleri normalize ederek tara
temel = ["гурыӏуэн", "гущыӏэ", "гурыӏуэжын", "гукӏэгъу", "гухэкӏ",
         "гущӏуагъо", "ӏэпыӏэгъу", "ӏэмал", "ӏэзэгъу", "ӏэфӏ", "ӏэщ",
         "дадэшхуэ", "тышыпхъу", "нышыпхъу", "мэзкъогъум", "мэзлъапэ"]

print("\n=== NORMALIZE EDILMIS TARAMA ===")
for form in temel:
    norm_form = normalize(form)
    count = corpus_norm.count(norm_form)
    print(f"{form:20s}: {count}")
