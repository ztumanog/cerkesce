import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-animal-fix-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Duzeltmeler
DUZELT = {
    "бгъэ": ("EAGLE", "BIRD", "Doğa & Hayvan"),
    "къару": ("POWER", "ABSTRACT_QUALITY", "Düşünce & Soyut"),
}

# Yanlis ANIMAL (temizlenecek)
TEMIZLE = ["ON_HILL", "SMOKE", "HILL", "SHORE"]

duzeltilen = 0
temizlenen = 0

for l in lex:
    form = l.get("form", "")
    cid = l.get("conceptId") or ""

    if form in DUZELT:
        concept, sub, family = DUZELT[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        duzeltilen += 1
        print(f"  Duzeltildi: {form} -> {concept}")
    elif cid in TEMIZLE:
        l["conceptId"] = ""
        l["subConceptId"] = ""
        l["taxonomyFamily"] = ""
        l["notes"] = (l.get("notes", "") + f" [{cid} yanlis etiket temizlendi]").strip()
        temizlenen += 1
        print(f"  Temizlendi: {form} ({cid})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nDuzeltilen: {duzeltilen}")
print(f"Temizlenen: {temizlenen}")

# Kontrol
animal = [l for l in lex if "ANIMAL" in (l.get("conceptId") or "") or
          l.get("taxonomyFamily") == "Doğa & Hayvan"]
print(f"\nKalan ANIMAL ilgili: {len(animal)}")
for l in animal[:40]:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
