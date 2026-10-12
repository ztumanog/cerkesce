import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04e0')
    text = text.replace('I', '\u04e0').replace('l', '\u04e0').replace('1', '\u04e0')
    return text.strip()

PKHU = {
    "пхъу":             ("DAUGHTER", "DAUGHTER_CHILD", "Aile & Akrabalık"),
    "пхъуантэ":         ("CONTAINER", "CHEST_TRUNK", "Maddi Kültür & Eşya"),
    "пхъуантэдэлъ":     ("ITEM", "CHEST_CONTENTS", "Maddi Kültür & Eşya"),
    "пхъуантэм":        ("GRAMMAR", "CHEST_OBLIQUE", "Dil & Gramer"),
    "пхъуантэр":        ("GRAMMAR", "CHEST_NOMINATIVE", "Dil & Gramer"),
    "пхъужь":           ("DAUGHTER", "ELDEST_DAUGHTER", "Aile & Akrabalık"),
    "пхъум":            ("GRAMMAR", "DAUGHTER_OBLIQUE", "Dil & Gramer"),
    "пхъур":            ("GRAMMAR", "DAUGHTER_NOMINATIVE", "Dil & Gramer"),
    "пхъурылъху":       ("FAMILY", "NEPHEW_NIECE", "Aile & Akrabalık"),
    "пхъухэри":         ("GRAMMAR", "DAUGHTERS_PLURAL_EMPHATIC", "Dil & Gramer"),
    "пхъуэн":           ("ACTION", "SCATTER_SOW", "Eylem & Fiziksel"),
    "пхъуэтэн":         ("ACTION", "SNATCH_GRAB", "Eylem & Fiziksel"),
}

PKHU_NORM = {normalize(k): v for k, v in PKHU.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("пхъу"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in PKHU_NORM:
        concept, sub, family = PKHU_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "пхъу-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("пхъу") and not l.get("subConceptId")]
print(f"пхъу- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 пхъу- KATEGORİSİ TAM BİTTİ!")
