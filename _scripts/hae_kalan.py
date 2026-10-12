import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]

print(f"R-HAE kalan: {len(hae)}\n")
for i, l in enumerate(hae[:80], 1):
    form = l.get("form", "?")
    lm = (l.get("literalMeaning") or "")[:50]
    print(f"{i:3}. {form:20s} | {lm}")
