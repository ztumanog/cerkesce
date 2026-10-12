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

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if normalize(form) == "джэ" and not l.get("subConceptId"):
        l["conceptId"] = "CALL"
        l["subConceptId"] = "SPEECH"
        l["taxonomyFamily"] = "Kültür & Etkileşim"
        l["rootForm"] = "джэ-"
        uygulanan += 1
        print(f"OK: {form} -> CALL/SPEECH")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("джэ") and not l.get("subConceptId")]
print(f"джэ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 джэ- KATEGORİSİ TAM BİTTİ!")
