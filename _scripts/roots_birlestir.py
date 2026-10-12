import json
from pathlib import Path
from collections import defaultdict

# 1. Kökleri yükle ve birleştir
r117 = json.loads(Path("data/grammar/roots-117.json").read_text(encoding="utf-8"))
r30 = json.loads(Path("data/grammar/roots-30.json").read_text(encoding="utf-8"))
all_roots_list = r117 + r30

# Tekrarları temizle (form bazlı)
roots_by_form = {}
for r in all_roots_list:
    form = r["form"]
    if form not in roots_by_form:
        roots_by_form[form] = r

print(f"roots-117: {len(r117)}")
print(f"roots-30: {len(r30)}")
print(f"Toplam ham: {len(all_roots_list)}")
print(f"Tekrarsız: {len(roots_by_form)}")

# 2. Kök formlarını uzunluk sırasına göre diz (uzun önce)
sorted_roots = sorted(roots_by_form.items(), key=lambda x: len(x[0]), reverse=True)
print(f"\n=== İlk 10 kök (uzunluk sırası) ===")
for form, r in sorted_roots[:10]:
    print(f"  {form:15s} -> {r['rootIds'][0] if r.get('rootIds') else '?'}")

# 3. Kaydet
Path("_scripts/roots_birlesik.json").write_text(
    json.dumps(list(roots_by_form.values()), ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print(f"\n✅ Birleşik kök dosyası: _scripts/roots_birlesik.json")
