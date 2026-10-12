import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
color = [l for l in lex if l.get("conceptId") in ("RED", "BLUE", "GREEN", "WHITE", "YELLOW", "GRAY", "MULTICOLOR", "BLACKISH")]

# Mukerrerleri bul
sayac = Counter(l.get("form") for l in color)
print("Mukerrer formlar:")
for form, sayi in sayac.items():
    if sayi > 1:
        print(f"  {form}: {sayi} kez")

# фӀэцӀа anlamini duzelt
for l in color:
    if l.get("form") == "фӀэцӀа":
        l["literalMeaning"] = "siyahımsı"
        print(f"\nDuzenlendi: фӀэцӀа -> siyahımsı")

# щхъу'yu cok anlamli yap
for l in color:
    if l.get("form") == "щхъу":
        l["conceptIds"] = ["BLUE", "GRAY"]
        l["notes"] = "[Çok anlamlı: 1. mavi 2. gri]"
        print(f"Duzenlendi: щхъу -> BLUE, GRAY (çok anlamlı)")
        break

Path("public/data/linguistic/lexemes.json").write_text(
    json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8"
)
print("\nKaydedildi.")
