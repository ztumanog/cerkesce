import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

r_gu = [l for l in lex if "R-GU" in (l.get("rootIds") or [])]
print(f"R-GU toplam: {len(r_gu)}")
print("\n=== R-GU kelimeleri ===")
for l in r_gu:
    print(f"  {l.get('form', '?'):30s} | {(l.get('literalMeaning') or '')[:40]}")
