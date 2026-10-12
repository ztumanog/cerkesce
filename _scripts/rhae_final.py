import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]

print(f"R-HAE toplam: {len(hae)}\n")
for l in hae:
    print(f"  form: {l.get('form')}")
    print(f"  rootIds: {l.get('rootIds')}")
    print(f"  derivation: {l.get('derivation')}")
    print()
