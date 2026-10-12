import json
import csv
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-food-ek2-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

veri = {}
with open("_scripts/food_ek2.csv", encoding="utf-8") as f:
    reader = csv.reader(f)
    for satir in reader:
        if not satir or len(satir) < 4:
            continue
        if satir[0].strip().lower() == "form":
            continue
        veri[satir[0].strip()] = (satir[1].strip(), satir[2].strip(), satir[3].strip(), satir[4].strip())

print(f"CSV'den: {len(veri)} kayit")

uygulanan = 0
bulunamayan = []
for l in lex:
    form = l.get("form", "")
    if form in veri:
        anlam, concept, sub, family = veri[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        if not l.get("literalMeaning"):
            l["literalMeaning"] = anlam
        uygulanan += 1
        print(f"  OK: {form} -> {concept}")
        del veri[form]

# Bulunamayanlar
for form in veri:
    bulunamayan.append(form)
    print(f"  BULUNAMADI: {form}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {uygulanan} kayit guncellendi")
print(f"Bulunamayan: {len(bulunamayan)}")
