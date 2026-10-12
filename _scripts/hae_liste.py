import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

hae_list = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]
print(f"R-HAE (köpek) kökü atanan toplam: {len(hae_list)}\n")

for i, l in enumerate(hae_list[:50], 1):
    form = l.get("form", "?")
    lm = (l.get("literalMeaning") or "")[:60]
    print(f"{i:3}. {form:20s} | {lm}")

if len(hae_list) > 50:
    print(f"\n... ve {len(hae_list) - 50} kelime daha.")
