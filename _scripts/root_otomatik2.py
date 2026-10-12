import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# Unicode normalize
def normalize(s):
    return (s.replace("Ӏ", "ӏ")  # U+04C0 -> U+04CF
             .replace("Ӏ", "ӏ")
             .replace("Ӏ", "ӏ"))

# Verileri yukle
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

# Normalize root form map
root_by_form = {normalize(r["form"]): r["id"] for r in roots}

# Root'u olmayanlar
no_root = [l for l in lex if not l.get("derivation", {}).get("rootIds")]
print(f"Root'u olmayan: {len(no_root)}")

atandi = 0
for l in no_root:
    form = normalize(l.get("form", ""))
    best_root = None
    best_len = 0
    
    for root_form, root_id in root_by_form.items():
        if form.startswith(root_form) and len(root_form) > best_len:
            best_root = root_id
            best_len = len(root_form)
    
    if best_root:
        l.setdefault("derivation", {})["rootIds"] = [best_root]
        l["derivation"]["rule"] = "auto_prefix"
        atandi += 1

print(f"Otomatik atanan: {atandi}")

lex_path = Path("public/data/linguistic/lexemes.json")
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

kalan = [l for l in lex if not l.get("derivation", {}).get("rootIds")]
print(f"Kalan root'suz: {len(kalan)}")
