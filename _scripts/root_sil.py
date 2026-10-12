import json
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
roots_path = BASE / "public/data/linguistic/roots.json"
roots = json.loads(roots_path.read_text(encoding="utf-8"))

# гур kökünü bul ve sil
silinecek = []
for r in roots:
    if r.get("form") == "гур":
        silinecek.append(r)

print(f"Silinecek: {len(silinecek)}")
for r in silinecek:
    print(f"  {r['id']}: {r['form']}")

# Sil
roots = [r for r in roots if r.get("form") != "гур"]

roots_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Yeni toplam: {len(roots)}")