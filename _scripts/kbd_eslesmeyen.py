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
print(f"Diamond: {len(diamond_forms)}")
print(f"Lexemes: {len(lex_forms)}")
print(f"Eşleşmeyen: {len(fark)}")
print(f"Eşleşen: {len(diamond_forms) - len(fark)}")

# İlk 20 eşleşmeyen
print("\n=== İlk 20 eşleşmeyen ===")
for f in list(fark)[:20]:
    print(f"  {f}")
