import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if l.get("subConceptId"):
        continue
    if not (form.startswith("лӀы") or form.startswith("лӏы") or form.startswith("лIы")):
        continue
    
    # Kalan tüm лӀы- formlarını MAN/OLD_MAN yap
    l["conceptId"] = "MAN"
    l["subConceptId"] = "OLD_MAN"
    l["taxonomyFamily"] = "İnsan & Yaşam"
    l["rootForm"] = "лӀы-"
    uygulanan += 1
    print(f"OK: {form} -> MAN/OLD_MAN")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if (l.get("form","").startswith("лӀы") or l.get("form","").startswith("лӏы")) and not l.get("subConceptId")]
print(f"лӀы- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 лӀы- KATEGORİSİ TAM BİTTİ!")
