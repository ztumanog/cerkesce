import json
from pathlib import Path

# Tüm kaynakları yükle
roots_path = Path("data/grammar/roots-117.json")
roots = json.loads(roots_path.read_text(encoding="utf-8"))
print(f"Mevcut kök: {len(roots)}")

# Yeni veriler (senin yapıştırdığın)
# Ama bu veriler Python'da tanımlı değil - dosyaya kaydetmeliyiz

# 1. Form bazlı birleştirme
merged = {}
for r in roots:
    form = r["form"]
    if form not in merged:
        merged[form] = r
    else:
        # Çakışma: conceptId varsa ekle
        if r.get("conceptId") and not merged[form].get("conceptId"):
            merged[form]["conceptId"] = r["conceptId"]
        if r.get("wordFamilyId") and not merged[form].get("wordFamilyId"):
            merged[form]["wordFamilyId"] = r["wordFamilyId"]
        if r.get("rootIds") and not merged[form].get("rootIds"):
            merged[form]["rootIds"] = r["rootIds"]

print(f"Birleşik: {len(merged)}")

# 2. Kaydet
out_path = Path("data/grammar/roots-merged.json")
out_path.write_text(json.dumps(list(merged.values()), ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Kaydedildi: {out_path}")
