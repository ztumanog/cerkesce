import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

print("=== R-ADA kalan ===")
ada = [l for l in lex if "R-ADA" in (l.get("rootIds") or [])]
for l in ada:
    print(f"  {l.get('form', '?'):25s}")
print(f"\nR-ADA toplam: {len(ada)}")

print("\n=== R-DA ===")
da = [l for l in lex if "R-DA" in (l.get("rootIds") or [])]
for l in da:
    print(f"  {l.get('form', '?'):25s}")
print(f"R-DA toplam: {len(da)}")

print("\n=== 'да' kelimesi ===")
l = next((l for l in lex if l.get("form") == "да"), None)
if l:
    print(f"  {l.get('form')}: rootIds={l.get('rootIds')}")
else:
    print("  'да' lexemes.json'da yok")

rootlu = [l for l in lex if l.get("rootIds")]
print(f"\nrootIds dolu: {len(rootlu)}")
