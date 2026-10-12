import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

# Unicode normalize
def normalize(s):
    # U+04C0 (Ӏ) -> U+04CF (ӏ)
    return s.replace("\u04c0", "\u04cf")

# Verileri yukle
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

# Root form -> ID (normalize edilmis)
root_by_form = {normalize(r["form"]): r["id"] for r in roots}

# Root'suz lexemeler
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

# Kaydet
lex_path = Path("public/data/linguistic/lexemes.json")
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

kalan = [l for l in lex if not l.get("derivation", {}).get("rootIds")]
print(f"Kalan root'suz: {len(kalan)}")
for l in kalan[:10]:
    print(f"  {l['form']} ({l.get('literalMeaning')})")
