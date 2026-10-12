import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

ada = [l for l in lex if "R-ADA" in (l.get("rootIds") or [])]
print(f"R-ADA toplam: {len(ada)}")
for l in ada:
    print(f"  {l.get('form', '?'):25s}")

rootlu = [l for l in lex if l.get("rootIds")]
print(f"\nrootIds dolu: {len(rootlu)}")
