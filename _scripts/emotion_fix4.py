import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-emotion-fix4-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

DUZELT = {
    "гузэгъэгъуэ": "CALM",
    "гущӏэгъуншэ": "COMPASSION",
    "гукӏэгъушӏ": "COMPASSION",
    "гушӏуагъо": "JOY",
    "хьэзабу": "GRIEF",
    "хьэлэбэлыкъыншагъэ": "CALM",
    "гуфІэ": "JOY",
}

sayac = 0
for l in lex:
    form = l.get("form", "")
    if form in DUZELT and l.get("conceptId") == "EMOTION":
        l["conceptId"] = DUZELT[form]
        l["subConceptId"] = "EMOTION"
        l["taxonomyFamily"] = "Duygu & Zihin"
        sayac += 1
        print(f"  OK: {form} -> {DUZELT[form]}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {sayac} kayit guncellendi")

# Kalan cekimleri EMOTION'dan cikar
from collections import Counter
temizlenen = 0
for l in lex:
    if l.get("conceptId") == "EMOTION":
        # Cekim eki tasiyanlar
        form = l.get("form", "")
        if form.endswith(("у", "р", "м", "щ", "мэ", "т", "хэ", "гъэ", "гъэр", "ныгъэ")):
            l["conceptId"] = ""
            l["subConceptId"] = ""
            l["taxonomyFamily"] = ""
            temizlenen += 1

print(f"Cekim temizlenen: {temizlenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

kalan = [l for l in lex if l.get("conceptId") == "EMOTION"]
print(f"\nEMOTION genel kalan: {len(kalan)}")
for l in kalan:
    print(f"  {l.get('form'):25s} | {l.get('literalMeaning', '?')[:50]}")
