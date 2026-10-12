import json
from pathlib import Path

diamond = json.loads(Path("_scripts/diamond_ornekler_kbd.json").read_text(encoding="utf-8"))
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(s):
    s = s.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")
    return s.strip().lower()

lex_forms = {normalize(l.get("form", "")) for l in lex}
diamond_forms = {normalize(w) for w in diamond}
fark = diamond_forms - lex_forms

print(f"Eslesmeyen: {len(fark)}")

print("\n=== Ilk 30 eslesmeyen ===")
sayac = 0
for form in fark:
    for w, d in diamond.items():
        if normalize(w) == form:
            print(f"\n  {w}:")
            for ex in d.get("examples", [])[:2]:
                print(f"    - {ex[:100]}")
            sayac += 1
            break
    if sayac >= 30:
        break
