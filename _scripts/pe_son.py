import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

# Direkt form eşleşmesi
uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if form == "пэшӏуекӏоу" or (normalize(form).startswith("пэ") and not l.get("subConceptId")):
        l["conceptId"] = "OPPOSING_ADV"
        l["subConceptId"] = "CONFRONTING_ADV"
        l["taxonomyFamily"] = "Gramer & Nitelik"
        l["rootForm"] = "пэ-"
        uygulanan += 1
        print(f"OK: {form}")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("пэ") and not l.get("subConceptId")]
print(f"пэ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 пэ- KATEGORİSİ TAM BİTTİ!")
