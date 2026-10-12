import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
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

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    if not form:
        continue
    count = corpus_norm.count(normalize(form))
    if count > 0:
        l["corpusFrequency"] = count
        guncellenen += 1
    else:
        if l.get("status") != "rare":
            l["corpusFrequency"] = 0

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Guncellenen: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")

active = [l for l in lex if l.get("status") != "rare"]
with_corpus = sum(1 for l in active if (l.get("corpusFrequency") or 0) > 0)
print(f"Active: {len(active)}")
print(f"Korpus kanitli: {with_corpus}")
print(f"Coverage (active): {with_corpus/len(active)*100:.1f}%")
