import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# DÜZELTMELER
DUZELT = {
    "лъэпсап": ("PREFIX", "GRAMMATICAL_PREFIX", "Dilbilgisi"),
    "лъэпс":   ("LACE",   "SHOELACE",           "Ayak & Adım"),
    "лъэпщ":   ("DEITY",  "DEITY",              "Mitoloji"),
}

for l in lex:
    form = l.get("form", "")
    if form in DUZELT:
        concept, sub, family = DUZELT[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "лъэ-"
        print(f"OK: {form} -> {concept}/{sub}")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("\nTamam!")
