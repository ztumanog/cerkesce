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
    if normalize(form) == "лъхугъэ":
        l["conceptId"] = "OFFSPRING"
        l["subConceptId"] = "CHILD_BORN"
        l["taxonomyFamily"] = "Toplum & İlişki"
        l["rootForm"] = "лъ-"
        uygulanan += 1
        print(f"OK: {form} -> OFFSPRING/CHILD_BORN")

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n{uygulanan} kayit guncellendi")

# Son kontrol
bos = []
for l in lex:
    form = l.get("form", "")
    if normalize(form).startswith("лъ") and not normalize(form).startswith("лъэ"):
        concept = l.get("conceptId") or ""
        sub = l.get("subConceptId") or ""
        if concept in ("BELIRSIZ", "-", "", "COLOR") or sub in ("-", ""):
            bos.append(form)

print(f"лъ- BOŞ/BELIRSIZ kalan: {len(bos)}")
if not bos:
    print("\n🎉 лъ- KATEGORİSİ TAM BİTTİ!")
