import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

# Ornek lexeme
ornek = next((l for l in lex if l["form"] == "ӏэпыӏэгъу"), None)
if ornek:
    print("Lexeme form repr:", repr(ornek["form"]))
    print("Lexeme form hex:", [hex(ord(c)) for c in ornek["form"]])

# Ornek root
ornek_root = next((r for r in roots if r["id"] == "R-1E"), None)
if ornek_root:
    print("\nRoot form repr:", repr(ornek_root["form"]))
    print("Root form hex:", [hex(ord(c)) for c in ornek_root["form"]])

# Karsilastir
if ornek and ornek_root:
    lf = ornek["form"]
    rf = ornek_root["form"]
    print(f"\nLexeme startsWith root? {lf.startswith(rf)}")
    print(f"Lexeme[0] == Root[0]? {lf[0] == rf[0]} ({hex(ord(lf[0]))} vs {hex(ord(rf[0]))})")
    print(f"Lexeme[1] == Root[1]? {lf[1] == rf[1]} ({hex(ord(lf[1]))} vs {hex(ord(rf[1]))})")
