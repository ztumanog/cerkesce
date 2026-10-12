import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
morphs = json.loads(Path("public/data/linguistic/morphemes.json").read_text(encoding="utf-8"))

print("=== METRIKLER ===")
print(f"Lexeme: {len(lex)}")
print(f"Morfem: {len(morphs)}")

# MorphemeIds kontrol
duzelt = ["L-GUPSYSE", "L-GURYYUEN", "L-PEPLEN", "L-1ERYSH1"]
print("\n=== DUZELTILEN LEXEMELER ===")
for l in lex:
    if l["id"] in duzelt:
        print(f"  {l['id']}: {l['form']} -> {l['derivation']['morphemeIds']}")
