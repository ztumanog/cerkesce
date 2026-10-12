import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
wf = json.loads(Path("public/data/linguistic/word_families.json").read_text(encoding="utf-8"))
sr = json.loads(Path("public/data/linguistic/semantic_relations.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

print("=== MEVCUT DURUM ===")
print(f"Lexeme: {len(lex)}")
print(f"Word Family: {len(wf)}")
print(f"Semantic Relation: {len(sr)}")
print(f"Root: {len(roots)}")

frekanssiz = [l for l in lex if not l.get("corpusFrequency") or l["corpusFrequency"] == 0]
print(f"Frekanssiz: {len(frekanssiz)}/{len(lex)}")

kat = Counter(w.get("category", "other") for w in wf)
print("\nKategori:")
for k, v in kat.most_common():
    print(f"  {k:15} {v}")
