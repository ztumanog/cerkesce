import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

def normalize(s):
    return s.replace("\u04c0", "\u04cf")

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

root_by_form = {normalize(r["form"]): r["id"] for r in roots}

# Root'suzlar
no_root = [l for l in lex if not l.get("derivation", {}).get("rootIds")]
print(f"Root'suz: {len(no_root)}")

# Ilk 5'i incele
for l in no_root[:5]:
    form = normalize(l.get("form", ""))
    print(f"\n{l['form']}:")
    print(f"  normalized: {repr(form)}")
    print(f"  derivation: {l.get('derivation')}")
    
    # Eslesen root var mi?
    eslesen = []
    for root_form, root_id in root_by_form.items():
        if form.startswith(root_form):
            eslesen.append((root_id, repr(root_form)))
    print(f"  eslesen rootlar: {eslesen}")

# Manuel test
print("\n=== MANUEL TEST ===")
test_form = normalize("ӏэпыӏэгъу")
print(f"Test form: {repr(test_form)}")
for root_form, root_id in root_by_form.items():
    if test_form.startswith(root_form):
        print(f"  Eslesti: {root_id} - {repr(root_form)}")
