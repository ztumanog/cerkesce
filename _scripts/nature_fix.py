import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-nature-fix-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Duzeltmeler
DUZELT = {
    "къэлъыхъуэныгъэ": ("SEARCH_ACT", "SEARCHING", "Düşünce & Soyut"),
    "пагагъ": ("PRIDE", "EMOTION", "Nitelik & Duygu"),
}

# Temizlenecekler
TEMIZLE = [
    "ефэныгъэ", "къэча", "дыжьыныпс", "костюм", "хьэжькурий",
]

duzeltilen = 0
temizlenen = 0

for l in lex:
    form = l.get("form", "")
    if l.get("conceptId") == "NATURE":
        if form in DUZELT:
            concept, sub, family = DUZELT[form]
            l["conceptId"] = concept
            l["subConceptId"] = sub
            l["taxonomyFamily"] = family
            duzeltilen += 1
            print(f"  Duzeltildi: {form} -> {concept}")
        elif form in TEMIZLE:
            l["conceptId"] = ""
            l["subConceptId"] = ""
            l["taxonomyFamily"] = ""
            l["notes"] = (l.get("notes", "") + " [NATURE yanlis etiket temizlendi]").strip()
            temizlenen += 1
            print(f"  Temizlendi: {form}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nDuzeltilen: {duzeltilen}")
print(f"Temizlenen: {temizlenen}")

# Kontrol
nature = [l for l in lex if "NATURE" in (l.get("conceptId") or "")]
print(f"\nKalan NATURE: {len(nature)}")
for l in nature:
    print(f"  {l.get('form'):20s} | {l.get('conceptId', 'YOK'):20s} | {l.get('literalMeaning', '?')[:40]}")
