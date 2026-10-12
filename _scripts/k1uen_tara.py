import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from datasets import load_dataset

# Lexeme'de var mi?
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
mevcut = [l for l in lex if l["form"] == "кӀуэн" or l["id"] == "L-K1UEN"]

print("=== LEXEME KONTROL ===")
if mevcut:
    for l in mevcut:
        print(f"VAR: {l['id']} - {l['form']} - {l.get('literalMeaning', '?')} - korpus: {l.get('corpusFrequency', '?')}")
else:
    print("YOK: кӀуэн lexeme'de kayitli degil")

# Korpus tarama
print("\n=== KORPUS TARAMA ===")
ds = load_dataset("adiga-ai/circassian-parallel-corpus", verification_mode="no_checks")
all_text = []
for split in ds:
    for row in ds[split]:
        for col in row:
            if isinstance(row[col], str):
                all_text.append(row[col])
corpus = " ".join(all_text)

def normalize(s):
    return (s.replace("Ӏ", "ӏ").replace("ӏ", "ӏ").replace("Ӏ", "ӏ").lower())

corpus_norm = normalize(corpus)

formlar = ["кӀуэн", "кӀуэ", "кӀуэр", "кӀуэным", "кӀуащ", "кӀуэжын", "къэкӀуэн"]
for form in formlar:
    count = corpus_norm.count(normalize(form))
    print(f"{form:15s}: {count}")
