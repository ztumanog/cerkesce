import sys
sys.stdout.reconfigure(encoding="utf-8")
from datasets import load_dataset

ds = load_dataset("adiga-ai/circassian-parallel-corpus", verification_mode="no_checks")

# Temel kelimeleri ara
temel = ["шӀэн", "тхэн", "еджэн", "цы", "пкъы", "лъы", "шъо"]
all_text = []
for split in ds:
    for row in ds[split]:
        for col in row:
            if isinstance(row[col], str):
                all_text.append(row[col])

print("=== TEMEL KELIME TARAMASI ===")
for form in temel:
    count = sum(1 for t in all_text if form in t)
    print(f"{form:10s}: {count}")
