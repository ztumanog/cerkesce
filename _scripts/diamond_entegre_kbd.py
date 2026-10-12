import json
from pathlib import Path

# KBD ◊ örnekleri yükle
diamond_path = Path("_scripts/diamond_ornekler_kbd.json")
diamond = json.loads(diamond_path.read_text(encoding="utf-8"))
print(f"KBD ◊ örnek: {len(diamond)}")

# Lexemes yükle
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

def normalize(s):
    s = s.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")
    return s.strip().lower()

diamond_map = {normalize(w): d for w, d in diamond.items()}
print(f"Diamond map: {len(diamond_map)}")

guncellenen = 0
for l in lex:
    form_norm = normalize(l.get("form", ""))
    d = diamond_map.get(form_norm)
    if not d:
        continue
    if d.get("examples") and not l.get("examples"):
        l["examples"] = d["examples"][:3]
        guncellenen += 1

print(f"\nGüncellenen: {guncellenen}")

ex_dolu = sum(1 for l in lex if l.get("examples"))
print(f"examples dolu: {ex_dolu} / {len(lex)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("\nOK Kaydedildi")
