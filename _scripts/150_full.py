import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
l_corpus = [l for l in lex if l["id"].startswith("L-CORPUS")]

print(f"=== L-CORPUS ÖRNEK (tam 150) ===\n")
for l in l_corpus[:5]:
    lm = l.get("literalMeaning", "")
    print(f"ID: {l['id']}")
    print(f"Form: {l.get('form', '?')}")
    print(f"Uzunluk: {len(lm)}")
    print(f"literalMeaning: {lm}")
    print("-" * 80)
