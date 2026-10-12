import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

def normalize(s):
    return s.replace("\u04c0", "\u04cf")

# Adigece -> Kabardeyce basit donusum
def ady_to_kbd(s):
    return (s.replace("шъ", "щ")
             .replace("жъ", "жь")
             .replace("чъ", "ч")
             .replace("ф", "ху")
             .replace("шӀ", "щӀ"))

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

root_by_form = {normalize(r["form"]): r["id"] for r in roots}

no_root = [l for l in lex if not l.get("derivation", {}).get("rootIds")]
print(f"Root'suz: {len(no_root)}")

atandi = 0
for l in no_root:
    form = normalize(l.get("form", ""))
    kbd_form = ady_to_kbd(form)
    
    best_root = None
    best_len = 0
    
    # Hem orijinal hem donusturulmus form ile dene
    for test_form in [form, kbd_form]:
        for root_form, root_id in root_by_form.items():
            if test_form.startswith(root_form) and len(root_form) > best_len:
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
for l in kalan[:10]:
    print(f"  {l['form']} ({l.get('literalMeaning')})")
