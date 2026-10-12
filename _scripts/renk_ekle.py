import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-renk-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Renkler (dogru yazim)
RENKLER = {
    "плъыжь": ("kırmızı", "RED", "COLOR"),
    "щхъу": ("mavi", "BLUE", "COLOR"),
    "фӀэцӀа": ("siyahımsı", "BLACKISH", "COLOR"),
    "хужь": ("beyaz", "WHITE", "COLOR"),
    "къуэлэн": ("alacalı", "MULTICOLOR", "COLOR"),
    "гъуэжь": ("sarı", "YELLOW", "COLOR"),
    "щӀыху": ("mavi", "BLUE", "COLOR"),
    "удзыфэ": ("yeşil", "GREEN", "COLOR"),
    "щхъуафэ": ("gri", "GRAY", "COLOR"),
    "щхъуантӀэ": ("yeşil", "GREEN", "COLOR"),
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if form in RENKLER:
        anlam, concept, sub = RENKLER[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = "Nitelik & Renk"
        if not l.get("literalMeaning"):
            l["literalMeaning"] = anlam
        uygulanan += 1
        print(f"  OK: {form} -> {anlam} ({concept})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {uygulanan} kayit guncellendi")

# Kontrol
color = [l for l in lex if l.get("conceptId") in ("RED", "BLUE", "GREEN", "WHITE", "YELLOW", "GRAY", "MULTICOLOR", "BLACKISH")]
print(f"\nCOLOR: {len(color)}")
for l in color:
    print(f"  {l.get('form'):20s} | {l.get('conceptId'):12s} | {l.get('literalMeaning', 'YOK')}")
