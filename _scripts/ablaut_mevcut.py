import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

for hedef in ["напс", "лъапэ", "напэ"]:
    for l in lex:
        if l.get("form") == hedef:
            print(f"{hedef}: rootIds={l.get('rootIds')} deriv={l.get('derivation')}")
            break

rootlu = [l for l in lex if l.get("rootIds")]
coklu = [l for l in rootlu if len(l["rootIds"]) > 1]
print(f"\nrootIds dolu: {len(rootlu)} | Çoklu kök: {len(coklu)}")
