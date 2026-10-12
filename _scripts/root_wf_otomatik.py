import json
from pathlib import Path
import shutil

# 1. Birleşik kökleri yükle
roots = json.loads(Path("_scripts/roots_birlesik.json").read_text(encoding="utf-8"))
print(f"Kök sayısı: {len(roots)}")

# 2. Lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 3. Kök formlarını uzunluk sırasına göre diz
sorted_root_forms = sorted([r["form"] for r in roots if r.get("form")], key=len, reverse=True)
root_map = {r["form"]: r for r in roots if r.get("form")}

# 4. İstatistikler
guncellenen_root = 0
guncellenen_wf = 0
guncellenen_deriv = 0

for l in lex:
    form = l.get("form", "")
    if not form:
        continue

    found_root = None
    for root_form in sorted_root_forms:
        if form == root_form:
            found_root = root_form
            break
        if root_form in form and len(root_form) >= 2:
            found_root = root_form
            break

    if not found_root:
        continue

    r = root_map[found_root]

    if not l.get("rootIds") and r.get("rootIds"):
        l["rootIds"] = r["rootIds"]
        guncellenen_root += 1

    if not l.get("wordFamilyId") and r.get("wordFamilyId"):
        l["wordFamilyId"] = r["wordFamilyId"]
        guncellenen_wf += 1

    if not l.get("derivation") and r.get("derivation"):
        l["derivation"] = r["derivation"]
        guncellenen_deriv += 1

print(f"\nGüncellenen rootIds: {guncellenen_root}")
print(f"Güncellenen wordFamilyId: {guncellenen_wf}")
print(f"Güncellenen derivation: {guncellenen_deriv}")

# 5. Kaydet (önce yedek)
shutil.copy(lex_path, str(lex_path) + ".bak-root")
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Kaydedildi: {lex_path}")
print(f"   Yedek: {lex_path}.bak-root")
