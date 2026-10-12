import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Yedek
tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-kinship-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Duzenlenecekler
DUZELT = {
    "щыкъухъыджэбз": ("SISTER_IN_LAW", "KINSHIP"),
    "щыкъу щӀалэ": ("BROTHER_IN_LAW", "KINSHIP"),
    "щыкъу хьэджэбз": ("SISTER_IN_LAW", "KINSHIP"),
    "щыкъу адэ": ("FATHER_IN_LAW", "KINSHIP"),
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if form in DUZELT:
        concept, sub = DUZELT[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = "Toplum & İlişki"
        l["rootForm"] = "щы-"
        print(f"  OK: {form} -> {concept}/{sub}")
        uygulanan += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {uygulanan} kayit guncellendi")
