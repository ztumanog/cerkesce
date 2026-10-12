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

# Peki beyaz listedeki diğer kelimeler var mı?
print("=== Beyaz listedeki kelimeler ===")
beyaz = ["хьэ", "хьэпшыр", "хьэбзы", "хьэш", "хьэпӀащэ", "хьэпӀащэжь", "хьэгъуэлъыжь"]
for form in beyaz:
    kayit = next((l for l in lex if l.get("form") == form), None)
    if kayit:
        print(f"  {form:20s} rootIds={kayit.get('rootIds')}")
    else:
        print(f"  {form:20s} (lexemes.json'da yok)")
