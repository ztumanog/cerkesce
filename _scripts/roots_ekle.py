import json
from pathlib import Path

# 1. Kökleri yükle
roots_path = Path("data/grammar/roots-30.json")
roots = json.loads(roots_path.read_text(encoding="utf-8"))
print(f"Kök sayısı: {len(roots)}")

# 2. Root map (form -> root objesi)
root_map = {r["form"]: r for r in roots}
print(f"Root map: {len(root_map)}")

# 3. Lexemes yükle
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 4. Uygula
guncellenen_root = 0
guncellenen_wf = 0
guncellenen_ipa = 0

for l in lex:
    form = l.get("form", "")
    if form in root_map:
        r = root_map[form]
        
        # rootIds
        if not l.get("rootIds"):
            l["rootIds"] = r["rootIds"]
            guncellenen_root += 1
        
        # wordFamilyId
        if not l.get("wordFamilyId"):
            l["wordFamilyId"] = r["wordFamilyId"]
            guncellenen_wf += 1
        
        # ipa
        if not l.get("ipa") and r.get("ipa"):
            l["ipa"] = r["ipa"]
            guncellenen_ipa += 1

print(f"\nGüncellenen rootIds: {guncellenen_root}")
print(f"Güncellenen wordFamilyId: {guncellenen_wf}")
print(f"Güncellenen IPA: {guncellenen_ipa}")

# 5. Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Toplam: {len(lex)}")
