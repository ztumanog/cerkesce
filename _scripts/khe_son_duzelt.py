import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if form == "хьэдэгъуэдахэ":
        # DÜZELTME: yanlış MORTALITY değil, SHAME
        l["conceptId"] = "SHAME"
        l["subConceptId"] = "DISGRACE"
        l["taxonomyFamily"] = "Ahlak & Utanç"
        l["rootForm"] = "хьэ-"
        l["literalMeaning"] = "rezillik, utanç, kepazelik"
        uygulanan += 1
        print(f"OK: {form} -> SHAME/DISGRACE")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("хьэ") and not l.get("subConceptId")]
print(f"хьэ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 хьэ- KATEGORİSİ TAM BİTTİ!")
