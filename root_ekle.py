import json
import csv
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")

roots_path = BASE / "public/data/linguistic/roots.json"
mevcut_roots = json.loads(roots_path.read_text(encoding="utf-8"))

print(f"Mevcut kök: {len(mevcut_roots)}")

mevcut_forms = {r["form"] for r in mevcut_roots if "form" in r}
mevcut_ids = {r["id"] for r in mevcut_roots if "id" in r}

print(f"Mevcut form: {len(mevcut_forms)}")
print(f"Mevcut ID: {len(mevcut_ids)}")

csv_path = BASE / "_scripts/root_adaylari_full.csv"

yeni_adaylar = []
if csv_path.exists():
    with open(csv_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            form = row.get("KOK", "").strip()
            freq_str = row.get("FREKANS", "0").strip()
            freq = int(freq_str) if freq_str.isdigit() else 0
            if form:
                yeni_adaylar.append({"form": form, "freq": freq})
    print(f"CSV bulundu: {csv_path}")
else:
    print(f"CSV BULUNAMADI: {csv_path}")

print(f"CSV'deki aday: {len(yeni_adaylar)}")

eklenen = 0
atlanan = 0

for aday in yeni_adaylar:
    form = aday["form"]
    
    if form in mevcut_forms:
        atlanan += 1
        continue
    
    yeni_id = f"R-{form[:3].upper()}"
    sayac = 1
    while yeni_id in mevcut_ids:
        yeni_id = f"R-{form[:3].upper()}{sayac}"
        sayac += 1
    
    yeni_entry = {
        "id": yeni_id,
        "form": form,
        "primaryMeaning": f"[AUTO] freq={aday['freq']}",
        "productivity": {"corpusFrequency": aday["freq"]},
        "wordFamily": {"id": f"WF-{form[:3].upper()}"}
    }
    
    mevcut_roots.append(yeni_entry)
    mevcut_ids.add(yeni_id)
    mevcut_forms.add(form)
    eklenen += 1

roots_path.write_text(json.dumps(mevcut_roots, ensure_ascii=False, indent=2), encoding="utf-8")
print()
print(f"OK: {eklenen} yeni kok eklendi, {atlanan} atlandi, toplam: {len(mevcut_roots)}")