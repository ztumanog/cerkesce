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

def normalize(s):
    return (s.replace("Ӏ", "ӏ").replace("ӏ", "ӏ").lower())

corpus_norm = normalize(corpus)

formlar = ["тырку", "урыс", "къэжэр", "шэшэн", "абхъаз", "куржы", "къалмыкъ",
           "бланэ", "дыгъужь", "блэ", "къаргъэ", "жьынду",
           "дзэл", "бжей", "кӏей", "бэрэжьей"]

print("=== KORPUS TARAMASI ===")
for form in formlar:
    count = corpus_norm.count(normalize(form))
    print(f"{form:15s}: {count}")
