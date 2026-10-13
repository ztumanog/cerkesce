import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))

# Somatik kokler (body + emotion + cognition domainleri)
somatic_roots = []
for r in roots:
    domains = r.get("semanticDomains", [])
    if any(d in domains for d in ["body", "emotion", "cognition", "perception"]):
        form = r.get("form", "")
        if form and len(form) >= 2:
            somatic_roots.append({
                "root_id": r.get("id"),
                "form": form,
                "wf_id": r.get("wordFamily", {}).get("id"),
                "cids": r.get("wordFamily", {}).get("conceptIds", []),
                "len": len(form)
            })

# Uzun forma gore sirala (en spesifik once)
somatic_roots.sort(key=lambda x: -x["len"])

print(f"Somatik kok sayisi: {len(somatic_roots)}")

guncellenen = 0
atlanan = 0

for l in lex:
    # Zaten rootIds varsa atla
    if l.get("rootIds"):
        atlanan += 1
        continue
    
    form = l.get("form", "")
    if not form:
        continue
    
    # En uzun eslesen koku bul
    for sr in somatic_roots:
        if sr["form"] in form:
            l["rootIds"] = [sr["root_id"]]
            l["wordFamilyId"] = sr["wf_id"]
            if not l.get("conceptId") and sr["cids"]:
                l["conceptId"] = sr["cids"][0]
            if not l.get("derivation"):
                l["derivation"] = {
                    "rootIds": [sr["root_id"]],
                    "morphemeIds": [],
                    "rule": "compound" if len(form) > len(sr["form"]) else "root"
                }
            guncellenen += 1
            break

print(f"Guncellenen: {guncellenen}")
print(f"Atlanan (zaten root'lu): {atlanan}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
