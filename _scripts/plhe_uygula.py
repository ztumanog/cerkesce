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

PLHE = {
    "плъэгъу":               ("SEE", "SIGHT_VIEW", "Göz & Görme"),
    "плъэгъуа":              ("SEE", "PAST_QUESTION", "Göz & Görme"),
    "плъэгъугъэба":          ("SEE", "EMPHATIC_PAST", "Göz & Görme"),
    "плъэгъун":              ("SEE", "SEE_ACTION", "Göz & Görme"),
    "плъэгъурэ":             ("SEE", "PRESENT_ACTION", "Göz & Görme"),
    "плъэгъурэба":           ("SEE", "EMPHATIC_PRESENT", "Göz & Görme"),
    "плъэгъущт":             ("SEE", "FUTURE_ACTION", "Göz & Görme"),
    "плъэгъуэ":              ("SEE", "SIGHT_VIEW", "Göz & Görme"),
    "плъэкӀын":              ("LOOK", "ABILITY_LOOK", "Göz & Görme"),
    "плъэкӀына":             ("LOOK", "ABILITY_QUESTION", "Göz & Görme"),
    "плъэкӀынэу":            ("LOOK", "ABILITY_PURPOSE", "Göz & Görme"),
    "плъэкӀыщт":             ("LOOK", "ABILITY_FUTURE", "Göz & Görme"),
    "плъэкӀыщтыр":           ("LOOK", "ABILITY_NOUN", "Göz & Görme"),
    "плъэкӀыщтэп":           ("LOOK", "ABILITY_NEGATIVE", "Göz & Görme"),
    "плъэкӀэ":               ("LOOK", "MANNER_LOOK", "Göz & Görme"),
    "плъэн":                 ("LOOK", "LOOK_ACTION", "Göz & Görme"),
    "плъэӀуакӀуэ-дэӀуакӀуэ": ("WATCH", "SPY_SCOUT", "Göz & Görme"),
}

PLHE_NORM = {normalize(k): v for k, v in PLHE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("плъэ"):
        continue
    
    norm = normalize(form)
    if norm in PLHE_NORM:
        concept, sub, family = PLHE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "плъэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("плъэ") and not l.get("subConceptId")]
print(f"плъэ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 плъэ- KATEGORİSİ TAM BİTTİ!")
