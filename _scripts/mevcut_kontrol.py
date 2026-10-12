import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

for hedef in ["нэгу", "Ӏэгу", "бзэгу", "лъэгу", "напс", "Ӏэпэ", "лъапэ", "напэ"]:
    for l in lex:
        if l.get("form") == hedef:
            print(f"{hedef}: rootIds={l.get('rootIds')} deriv={l.get('derivation')}")
            break

rootlu = [l for l in lex if l.get("rootIds")]
print(f"\nrootIds dolu: {len(rootlu)}")
coklu = [l for l in rootlu if len(l["rootIds"]) > 1]
print(f"Çoklu kök: {len(coklu)}")
