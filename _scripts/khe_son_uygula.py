import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if form == "хьэдэгъуэдахэ":
        l["conceptId"] = "MORTALITY"
        l["subConceptId"] = "DEATH"
        l["taxonomyFamily"] = "Ölüm/Kader"
        l["rootForm"] = "хьэ-"
        l["literalMeaning"] = "güzel, huzurlu ölüm"
        uygulanan += 1
        print(f"OK: {form} -> MORTALITY/DEATH")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("хьэ") and not l.get("subConceptId")]
print(f"хьэ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 хьэ- KATEGORİSİ TAM BİTTİ!")
