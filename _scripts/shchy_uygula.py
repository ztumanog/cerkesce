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

SHCHY = {
    "щы":           ("THREE", "NUMERAL", "Gramer & Çekim"),
    "щыбгъэзыен":   ("BEND_SIDE", "BEND_ACTION", "Eylem & Fiziksel"),
    "щыбжьый":      ("THREE_WHIP", "WHIP_TOOL", "Eşya & Araç"),
    "щыбз":         ("THREE_COLORS", "COLOR_PATTERN", "Nitelik & Doğa"),
    "щыбзыщӀын":    ("SLICE_OFF", "CUT_ACTION", "Eylem & Fiziksel"),
    "щыблэ":        ("LIGHTNING", "THUNDER_GOD", "Kültür & İnanç"),
    "щыблэвыщӀэ":   ("LIGHTNING_STRIKE", "THUNDER_EVENT", "Doğa & Doğa"),
    "щыгу":         ("PEAK_SUMMIT", "TOP_LOCATION", "Mekan & Yön"),
    "щыгугъ":       ("HOPEFUL", "EXPECTANT", "Nitelik & Zihin"),
    "щыгугъын":     ("HOPE_VERB", "EXPECT_ACTION", "Eylem & Zihin"),
    "щыгугъыу":     ("HOPEFULLY_ADV", "EXPECT_ADV", "Gramer & Nitelik"),
    "щыгум":        ("PEAK_OBLIQUE", "TOP_DAT", "Gramer & Çekim"),
    "щыгуфӏыкӏыу":  ("REJOICING_ADV", "SMILE_ADV", "Gramer & Nitelik"),
    "щыгушхуэн":    ("PRIDE_VERB", "REJOICE_GREATLY", "Eylem & Zihin"),
    "щыгъагъын":    ("CLOTHE_CAUSATIVE", "WEAR_CAUSATIVE", "Eylem & Fiziksel"),
    "щыгът":        ("WORN_PAST", "DRESSED_PAST", "Gramer & Çekim"),
    "щыгъу":        ("SALT", "SPICE_FOOD", "Doğa & Besin"),
}

SHCHY_NORM = {normalize(k): v for k, v in SHCHY.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("щы"):
        continue
    
    norm = normalize(form)
    if norm in SHCHY_NORM:
        concept, sub, family = SHCHY_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "щы-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("щы") and not l.get("subConceptId")]
print(f"щы- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz[:15]:
        print(f"  - {f}")
else:
    print("\n🎉 щы- KATEGORİSİ TAM BİTTİ!")
