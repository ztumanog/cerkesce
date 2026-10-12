import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize_palochka(text):
    if not text:
        return ""
    return text.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")

# GRUP 1 — 30 kayıt
GRUP_1_RAW = {
    "нэ":              ("EYE", "EYE", "noun"),
    "нэ жан":          ("VISION", "SHARP_EYE", "adjective"),
    "нэ закъуэ":       ("EYE", "ONE_EYE", "adjective"),
    "нэ Ӏей":          ("EYE", "EVIL_EYE", "noun"),
    "нэбажэ":          ("EYE", "BULGING_EYE", "adjective"),
    "нэбажэкӀэшэ":     ("EYE", "BULGING_EYE", "adjective"),
    "нэбал":           ("EYE", "BULGING_EYE", "adjective"),
    "нэбгъузкӏэ":      ("VISION", "SQUINT", "adverb"),
    "нэбгъузу":        ("VISION", "SQUINT", "adverb"),
    "нэбгъэф":         ("EYE", "CLEAR_EYE", "adjective"),
    "нэбгыри":         ("PERSON", "INDIVIDUAL", "noun"),
    "нэбгыритӏу":      ("PERSON", "TWO_PERSONS", "noun"),
    "нэбгыритӏум":     ("PERSON", "TWO_PERSONS", "noun"),
    "нэбгыритӏуми":    ("PERSON", "TWO_PERSONS", "noun"),
    "нэбгыритӏур":     ("PERSON", "TWO_PERSONS", "noun"),
    "нэбгыритӏури":    ("PERSON", "TWO_PERSONS", "noun"),
    "нэбгырищ":        ("PERSON", "THREE_PERSONS", "noun"),
    "нэбгырэ":         ("PERSON", "INDIVIDUAL", "noun"),
    "нэбгырэм":        ("PERSON", "INDIVIDUAL", "noun"),
    "нэбдзыпэ":        ("EYE", "EYELASH_TIP", "noun"),
    "нэбдзыфӀэ":       ("EYE", "EYELASH", "adjective"),
    "нэбжьыц":         ("EYE", "EYELASH", "noun"),
    "нэбжьыцылэ":      ("COSMETICS", "MASCARA", "noun"),
    "нэбзый":          ("VISION", "EYE_RAY", "noun"),
    "нэблагъэ":        ("DISTANCE", "NEAR", "adverb"),
    "нэблэгъэн":       ("DISTANCE", "APPROACH", "verb"),
    "нэбухэднэцар":    ("EYE", "BULGING_EYE", "adjective"),
    "нэбэнэушэу":      ("VISION", "INTERACTION", "adverb"),
    "нэвагъуэ":        ("EYE", "SHINING_EYE", "adjective"),
    "нэвысын":         ("LIMIT", "COMPLETE_PLOW", "verb"),
}

# Aile haritası
AILE = {
    "EYE": "Göz & Görme",
    "VISION": "Göz & Görme",
    "COSMETICS": "Göz & Görme",
    "PERSON": "Ahlak & Soyut",
    "DISTANCE": "Sınır & Mesafe",
    "LIMIT": "Sınır & Mesafe",
}

GRUP_1 = {normalize_palochka(k): v for k, v in GRUP_1_RAW.items()}

uygulanan = 0
islenen = set()

for l in lex:
    raw_form = l.get("form", "")
    norm_form = normalize_palochka(raw_form)
    
    if norm_form in GRUP_1:
        concept, sub, pos = GRUP_1[norm_form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = AILE.get(concept, "Göz & Görme")
        l["rootForm"] = "нэ-"
        if not l.get("partOfSpeech"):
            l["partOfSpeech"] = pos
        uygulanan += 1
        islenen.add(norm_form)

bulunamayan = [f for f in GRUP_1 if f not in islenen]

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"OK - {uygulanan} kayit guncellendi")
if bulunamayan:
    print(f"Bulunamayan: {len(bulunamayan)}")
    for f in bulunamayan:
        print(f"  - {f}")
else:
    print("Tum kayitlar bulundu!")
