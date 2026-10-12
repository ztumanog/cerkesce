import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))
print("=== R-1E KONTROL ===")
for r in roots:
    if r["id"] == "R-1E":
        print(json.dumps(r, ensure_ascii=False, indent=2))
    if r["form"] in ["ӏэ", "ӏ", "1э", "Iэ"]:
        print(f"Bulundu: {r['id']} - '{r['form']}' (repr: {repr(r['form'])})")

print("\n=== TUM ROOT FORMLARI (ilk 20) ===")
for r in roots[:20]:
    print(f"  {r['id']}: '{r['form']}' (repr: {repr(r['form'])})")
