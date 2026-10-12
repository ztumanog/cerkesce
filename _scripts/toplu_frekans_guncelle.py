import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from datasets import load_dataset

# Korpus yukle
print("Korpus yukleniyor...")
ds = load_dataset("adiga-ai/circassian-parallel-corpus", verification_mode="no_checks")

# Tum metinleri birlestir
all_text = []
for split in ds:
    for row in ds[split]:
        for col in row:
            if isinstance(row[col], str):
                all_text.append(row[col])

corpus = " ".join(all_text)
print(f"Korpus boyutu: {len(corpus):,} karakter")

# Lexeme'leri yukle
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Her lexeme icin frekans hesapla (basit count)
guncellenen = 0
sifir_kalan = 0
for l in lex:
    form = l.get("form", "")
    if not form:
        continue
    count = corpus.count(form)
    eski = l.get("corpusFrequency", 0) or 0
    if count != eski:
        l["corpusFrequency"] = count
        guncellenen += 1
        if count > 0:
            print(f"{l['id']:25s} {form:20s} {eski:>6} -> {count:>6}")
    if count == 0:
        sifir_kalan += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nGuncellenen lexeme: {guncellenen}")
print(f"Toplam lexeme: {len(lex)}")

# Coverage yeniden hesapla
with_corpus = sum(1 for l in lex if (l.get("corpusFrequency") or 0) > 0)
print(f"Korpus kaniti olan: {with_corpus}")
print(f"Korpus kaniti olmayan: {len(lex) - with_corpus}")
print(f"Coverage: {with_corpus/len(lex)*100:.1f}%")
