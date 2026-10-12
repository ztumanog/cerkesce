import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# лъэпсап ve лъэпс düzelt
for l in lex:
    form = l.get("form", "")
    if form == "лъэпсап":
        l["conceptId"] = "PREFIX"
        l["subConceptId"] = "GRAMMATICAL_PREFIX"
        l["taxonomyFamily"] = "Dilbilgisi"
        l["rootForm"] = "лъэ-"
        print(f"OK: лъэпсап -> PREFIX/GRAMMATICAL_PREFIX")
    elif form == "лъэпс":
        # Bu da ayak bağı olabilir, ama dilbilgisel kök de olabilir
        # Sözlükten kontrol gerekli
        l["conceptId"] = "BINDING"
        l["subConceptId"] = "ROOT_BINDING"
        l["taxonomyFamily"] = "Ayak & Adım"
        l["rootForm"] = "лъэ-"
        print(f"OK: лъэпс -> BINDING/ROOT_BINDING")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("Tamam!")
