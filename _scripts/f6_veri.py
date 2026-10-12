import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))
print(f"Root: {len(roots)}")
print(json.dumps(roots[0], ensure_ascii=False, indent=2))

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"\nLexeme: {len(lex)}")
print(json.dumps(lex[0], ensure_ascii=False, indent=2))
