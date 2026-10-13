import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

lex_by_id = {l.get("id"): l for l in lex}

# Root -> lexemeIds mapping
lex_to_root_wf = {}
for r in roots:
    root_id = r.get("id")
    wf_info = r.get("wordFamily", {})
    wf_id = wf_info.get("id")
    cids = wf_info.get("conceptIds", [])
    
    for lid in wf_info.get("lexemeIds", []):
        lex_to_root_wf[lid] = (root_id, wf_id, cids)

guncellenen = 0
for lid, (root_id, wf_id, cids) in lex_to_root_wf.items():
    if lid in lex_by_id:
        l = lex_by_id[lid]
        if not l.get("rootIds"):
            l["rootIds"] = [root_id]
            l["wordFamilyId"] = wf_id
            if not l.get("conceptId") and cids:
                l["conceptId"] = cids[0]
            if not l.get("derivation"):
                l["derivation"] = {
                    "rootIds": [root_id],
                    "morphemeIds": [],
                    "rule": "root"
                }
            guncellenen += 1

print(f"Guncellenen: {guncellenen}")
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
