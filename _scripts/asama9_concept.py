import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# rootIds -> conceptId mapping
root_to_concepts = {}
for l in lex:
    if l.get("rootIds") and l.get("conceptId"):
        root_id = l["rootIds"][0]
        if root_id not in root_to_concepts:
            root_to_concepts[root_id] = l["conceptId"]

print(f"Root -> concept mapping: {len(root_to_concepts)}")

guncellenen = 0

for l in lex:
    if l.get("conceptId"):
        continue
    
    if l.get("rootIds"):
        root_id = l["rootIds"][0]
        if root_id in root_to_concepts:
            l["conceptId"] = root_to_concepts[root_id]
            guncellenen += 1

print(f"Guncellenen (conceptId): {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
