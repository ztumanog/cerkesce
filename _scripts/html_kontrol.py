import json, re
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

html_pat = re.compile(r'<[^>]+>')
html_li = [l for l in lex if html_pat.search(l.get("literalMeaning", "") or "")]
print(f"HTML içeren: {len(html_li)} / {len(lex)}")

bozuk_ipa = [l for l in lex if l.get("ipa") and "[File:" in l["ipa"]]
print(f"Bozuk IPA: {len(bozuk_ipa)} / {len(lex)}")

print("\n=== HTML Örnekleri ===")
for l in html_li[:3]:
    print(f"\nID: {l['id']}")
    print(f"Form: {l.get('form', '?')}")
    print(f"literalMeaning: {l['literalMeaning'][:250]}")
    print("-" * 60)

print("\n=== Bozuk IPA ===")
for l in bozuk_ipa[:3]:
    print(f"  {l['id']}: form={l.get('form', '?')}, ipa={l.get('ipa', '?')}")
