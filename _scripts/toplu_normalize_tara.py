import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from datasets import load_dataset

print("Korpus yukleniyor...")
ds = load_dataset("adiga-ai/circassian-parallel-corpus", verification_mode="no_checks")
all_text = []
for split in ds:
    for row in ds[split]:
        for col in row:
            if isinstance(row[col], str):
                all_text.append(row[col])
corpus = " ".join(all_text)

def normalize(s):
    return (s.replace("Ӏ", "ӏ")
             .replace("ӏ", "ӏ")
             .replace("Ӏ", "ӏ")
             .lower())

corpus_norm = normalize(corpus)

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0
sifir_kalan = []
for l in lex:
    form = l.get("form", "")
    if not form:
        continue
    norm_form = normalize(form)
    count = corpus_norm.count(norm_form)
    eski = l.get("corpusFrequency", 0) or 0
    if count != eski:
        l["corpusFrequency"] = count
        guncellenen += 1
    if count == 0:
        sifir_kalan.append(l["id"])

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
print(f"Guncellenen: {guncellenen}")
print(f"Korpus kaniti olan: {with_corpus}")
print(f"Korpus kaniti olmayan: {len(lex) - with_corpus}")
print(f"Coverage: {with_corpus/len(lex)*100:.1f}%")
print(f"\nFrekansi 0 kalanlar: {len(sifir_kalan)}")
for sid in sifir_kalan[:30]:
    print(f"  {sid}")
