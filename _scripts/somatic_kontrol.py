import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

rootlu = [l for l in lex if l.get("rootIds")]
print(f"rootIds dolu: {len(rootlu)}")
coklu = [l for l in rootlu if len(l["rootIds"]) > 1]
print(f"Çoklu kök: {len(coklu)}")

for hedef in ["нэгу", "Ӏэгу", "бзэгу", "лъэгу", "напс", "Ӏэпэ", "лъапэ", "напэ"]:
    for l in lex:
        if l.get("form") == hedef:
            print(f"\n{hedef}: rootIds={l.get('rootIds')}")
            print(f"   deriv={l.get('derivation')}")
            break

hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]
print(f"\nR-HAE: {len(hae)}")
