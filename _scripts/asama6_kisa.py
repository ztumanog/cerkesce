import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# rootIds olmayanlar
kalan = [l for l in lex if not l.get("rootIds")]
print(f"rootIds olmayan: {len(kalan)}")

guncellenen = 0

for l in kalan:
    form = l.get("form", "")
    if not form:
        continue
    
    # 1-3 harf → kendisi kok
    if 2 <= len(form) <= 3:
        root_id = f"R-{form.upper()}"
        wf_id = f"WF-{form.upper()}"
        
        l["rootIds"] = [root_id]
        l["wordFamilyId"] = wf_id
        l["derivation"] = {
            "rootIds": [root_id],
            "morphemeIds": [],
            "rule": "root"
        }
        guncellenen += 1

print(f"Guncellenen (2-3 harf): {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
