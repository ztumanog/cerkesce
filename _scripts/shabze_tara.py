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

for form in ["шабзэ", "шабзэпс", "шабзэбзэ", "щабз", "бзащӀэ", "бзащӀэпс"]:
    count = corpus.count(form)
    print(f"{form:20s}: {count}")
