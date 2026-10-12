import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

sifir = [l for l in lex if (l.get("corpusFrequency") or 0) == 0 and l.get("status") != "rare"]
print(f"0 frekansli (rare olmayan): {len(sifir)}")
for l in sifir:
    print(f"  {l['id']:25s} {l['form']:20s} {l.get('literalMeaning', '?')}")
