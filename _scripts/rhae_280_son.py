import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]

print(f"R-HAE toplam: {len(hae)}")
for l in hae:
    print(f"  {l.get('form', '?'):25s} rootIds={l.get('rootIds')}")

rootlu = [l for l in lex if l.get("rootIds")]
print(f"\nrootIds dolu: {len(rootlu)}")
