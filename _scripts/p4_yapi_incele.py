import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# roots.json yapisi
f = Path("public/data/linguistic/roots.json")
if f.exists():
    roots = json.loads(f.read_text(encoding="utf-8"))
    print(f"=== roots.json: {len(roots)} kok ===")
    print(json.dumps(roots[0], ensure_ascii=False, indent=2))
else:
    print("roots.json bulunamadi")

# lexemes.json yapisi
f = Path("public/data/linguistic/lexemes.json")
lex = json.loads(f.read_text(encoding="utf-8"))
print(f"\n=== lexemes.json: {len(lex)} lexeme ===")
print(json.dumps(lex[0], ensure_ascii=False, indent=2))

# morphemes.json yapisi
f = Path("public/data/linguistic/morphemes.json")
if f.exists():
    morphs = json.loads(f.read_text(encoding="utf-8"))
    print(f"\n=== morphemes.json: {len(morphs)} morfem ===")
    print(json.dumps(morphs[0], ensure_ascii=False, indent=2))
else:
    print("\nmorphemes.json bulunamadi")
