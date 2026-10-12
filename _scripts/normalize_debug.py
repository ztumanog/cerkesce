import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

def normalize(s):
    return s.replace("\u04c0", "\u04cf")

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

# Ornek
ornek = next((l for l in lex if l["form"] == "ӏэпыӏэгъу"), None)
ornek_root = next((r for r in roots if r["id"] == "R-1E"), None)

if ornek and ornek_root:
    lf = normalize(ornek["form"])
    rf = normalize(ornek_root["form"])
    print(f"Lexeme normalized repr: {repr(lf)}")
    print(f"Root normalized repr: {repr(rf)}")
    print(f"Lexeme hex: {[hex(ord(c)) for c in lf]}")
    print(f"Root hex: {[hex(ord(c)) for c in rf]}")
    print(f"startsWith? {lf.startswith(rf)}")

# Root map'i goster
root_by_form = {normalize(r["form"]): r["id"] for r in roots}
print(f"\nR-1E normalized: {normalize(ornek_root['form'])}")
print(f"Map'te var mi? {normalize(ornek_root['form']) in root_by_form}")

# Lexeme'in ilk 5 karakterini goster
print(f"\nLexeme ilk 5: {[hex(ord(c)) for c in ornek['form'][:5]]}")
print(f"Root: {[hex(ord(c)) for c in ornek_root['form']]}")
