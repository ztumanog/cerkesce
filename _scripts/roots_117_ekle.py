import json
from pathlib import Path

# 1. 117 kökü yükle
roots_path = Path("data/grammar/roots-117.json")
roots = json.loads(roots_path.read_text(encoding="utf-8"))
print(f"Kök: {len(roots)}")

# 2. Root map
root_map = {r["form"]: r for r in roots}

# 3. Lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 4. Uygula
guncellenen_root = 0
guncellenen_wf = 0
guncellenen_ipa = 0
guncellenen_concept = 0

for l in lex:
    form = l.get("form", "")
    if form in root_map:
        r = root_map[form]
        
        if not l.get("rootIds"):
            l["rootIds"] = r["rootIds"]
            guncellenen_root += 1
        
        if not l.get("wordFamilyId"):
            l["wordFamilyId"] = r["wordFamilyId"]
            guncellenen_wf += 1
        
        if not l.get("ipa") and r.get("ipa"):
            l["ipa"] = r["ipa"]
            guncellenen_ipa += 1
        
        if not l.get("conceptId") and r.get("conceptId"):
            l["conceptId"] = r["conceptId"]
            guncellenen_concept += 1

print(f"\nGüncellenen rootIds: {guncellenen_root}")
print(f"Güncellenen wordFamilyId: {guncellenen_wf}")
print(f"Güncellenen IPA: {guncellenen_ipa}")
print(f"Güncellenen conceptId: {guncellenen_concept}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Toplam: {len(lex)}")
