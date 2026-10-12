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

formlar = ["плъыжь", "хужь", "фӀыцӀэ", "щхъуэ", "удзыфэ", "гъуэжь", "гъуабжэ", "морафэ",
           "тхьэмахуэ", "блыщхьэ", "гъубжь", "бэрэжьей", "мэкъуауэгъуэ", "мэкъуогъу", "щэбэт",
           "махуэ", "мазэ", "илъэс", "гъэ", "жэщ", "пщэдджыжь", "пщыхьэщхьэ"]

for form in formlar:
    count = corpus_norm.count(normalize(form))
    print(f"{form:20s}: {count}")
