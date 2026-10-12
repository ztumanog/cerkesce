import json
from pathlib import Path

# 1. Kaynakları yükle
roots_concepts = json.loads(Path("data/grammar/roots-concepts.json").read_text(encoding="utf-8"))
print(f"roots-concepts: {len(roots_concepts)}")

# 2. Root map
root_map = {}
for r in roots_concepts:
    form = r.get("form")
    if form:
        root_map[form] = r

print(f"Benzersiz: {len(root_map)}")

# 3. Lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 4. Uygula
guncellenen_root = 0
guncellenen_wf = 0
guncellenen_ipa = 0
guncellenen_cid = 0

for l in lex:
    form = l.get("form", "")
    if form in root_map:
        r = root_map[form]
        
        if not l.get("rootIds") and r.get("rootIds"):
            l["rootIds"] = r["rootIds"]
            guncellenen_root += 1
        
        if not l.get("wordFamilyId") and r.get("wordFamilyId"):
            l["wordFamilyId"] = r["wordFamilyId"]
            guncellenen_wf += 1
        
        if not l.get("ipa") and r.get("ipa"):
            l["ipa"] = r["ipa"]
            guncellenen_ipa += 1
        
        if not l.get("conceptId") and r.get("conceptId"):
            l["conceptId"] = r["conceptId"]
            guncellenen_cid += 1

print(f"\nGüncellenen rootIds: {guncellenen_root}")
print(f"Güncellenen wordFamilyId: {guncellenen_wf}")
print(f"Güncellenen IPA: {guncellenen_ipa}")
print(f"Güncellenen conceptId: {guncellenen_cid}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Toplam: {len(lex)}")
