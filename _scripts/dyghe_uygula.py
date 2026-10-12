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

DYGHE = {
    "дыгъэ":            ("SUN", "SUN_STAR", "Güneş & Işık"),
    "дыгъэгъазэ":       ("PLANT", "SUNFLOWER", "Güneş & Bitki"),
    "дыгъэкъухьэпӀэ":   ("SUN", "SUNSET_WEST", "Güneş & Yön"),
    "дыгъэкъуэкӀыпӀэ":  ("SUN", "SUNRISE_EAST", "Güneş & Yön"),
    "дыгъэм":           ("SUN", "OBLIQUE_CASE", "Güneş & Işık"),
    "дыгъэмыхъуэ":      ("SHADE", "SHADOW_SIDE", "Güneş & Doğa"),
    "дыгъэпс":          ("LIGHT", "SUNLIGHT", "Güneş & Işık"),
    "дыгъэр":           ("SUN", "NOMINATIVE_CASE", "Güneş & Işık"),
    "дыгъэрыжьэ":       ("HEAT", "SUNBURNT", "Güneş & İklim"),
}

DYGHE_NORM = {normalize(k): v for k, v in DYGHE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("дыгъэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in DYGHE_NORM:
        concept, sub, family = DYGHE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "дыгъэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("дыгъэ") and not l.get("subConceptId")]
print(f"дыгъэ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 дыгъэ- KATEGORİSİ TAM BİTTİ!")
