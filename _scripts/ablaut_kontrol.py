import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

for hedef in ["нэгу", "Ӏэгу", "бзэгу", "лъэгу", "напс", "Ӏэпэ", "лъапэ", "напэ"]:
    for l in lex:
        if l.get("form") == hedef:
            print(f"{hedef}: rootIds={l.get('rootIds')} deriv={l.get('derivation')}")
            break

rootlu = [l for l in lex if l.get("rootIds")]
coklu = [l for l in rootlu if len(l["rootIds"]) > 1]
print(f"\nrootIds dolu: {len(rootlu)}")
print(f"Çoklu kök: {len(coklu)}")

hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]
print(f"R-HAE: {len(hae)}")
