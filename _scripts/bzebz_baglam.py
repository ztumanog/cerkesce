import sys
sys.stdout.reconfigure(encoding="utf-8")
from datasets import load_dataset

ds = load_dataset("adiga-ai/circassian-parallel-corpus", verification_mode="no_checks")
all_text = []
for split in ds:
    for row in ds[split]:
        for col in row:
            if isinstance(row[col], str):
                all_text.append(row[col])
corpus = " ".join(all_text)

# бзэбз gecen cumleleri bul
import re
for m in re.finditer(r'бзэбз\w*', corpus):
    start = max(0, m.start() - 50)
    end = min(len(corpus), m.end() + 50)
    print(f"...{corpus[start:end]}...")
    print("---")
