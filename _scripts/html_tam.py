import json, re
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

html_pat = re.compile(r'<[^>]+>')
html_li = [l for l in lex if html_pat.search(l.get("literalMeaning", "") or "")]

print("=== 3 TAM ÖRNEK ===\n")
for l in html_li[:3]:
    print(f"ID: {l['id']}")
    print(f"Form: {l.get('form', '?')}")
    print(f"literalMeaning:")
    print(repr(l['literalMeaning']))
    print("=" * 80)
