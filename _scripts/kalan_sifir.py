import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

print("=== KORPUS KANITI OLMAYAN LEXEME ===")
sifir = [l for l in lex if (l.get("corpusFrequency") or 0) == 0]
for l in sifir:
    print(f"{l['id']:25s} {l['form']:20s} {l.get('literalMeaning', '?')}")

print(f"\nToplam: {len(sifir)} / {len(lex)}")
