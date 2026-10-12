import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
wf = json.loads(Path("public/data/linguistic/word_families.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

print("=== METRIKLER ===")
print(f"Root: {len(roots)}")
print(f"Lexeme: {len(lex)}")
print(f"Aile: {len(wf)}")
print(f"Toplam korpus: {sum(l.get('corpusFrequency', 0) or 0 for l in lex)}")

print("\n=== YENI AILELER ===")
for w in wf:
    if w["id"] in ["WF-LEZH", "WF-LAZHE"]:
        print(f"{w['id']}: {len(w.get('lexemeIds', []))} lexeme, korpus {w['productivity']['corpusFrequency']}")
