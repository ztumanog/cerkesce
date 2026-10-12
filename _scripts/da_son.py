import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
da = [l for l in lex if "R-DA" in (l.get("rootIds") or [])]
print(f"R-DA kalan: {len(da)}")
for l in da[:15]:
    print(f"  {l.get('form', '?'):20s} rootIds={l.get('rootIds')}")

# Gerçek baba kelimeleri
print("\n=== Gerçek baba kelimeleri ===")
for form in ["адэ", "да", "дадэ", "адэжь"]:
    l = next((l for l in lex if l.get("form") == form), None)
    if l:
        print(f"  {form:20s} rootIds={l.get('rootIds')}")
