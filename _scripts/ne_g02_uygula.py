import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize_palochka(text):
    if not text:
        return ""
    return text.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")

GRUP_2_RAW = {
    "нэгей":          ("EYE", "SQUINT", "adjective"),
    "нэгу":           ("FACE", "FACE", "noun"),
    "нэгузегъэужь":   ("FACE", "JOY", "adjective"),
    "нэгузыужь":      ("FACE", "CHEERFUL", "adjective"),
    "нэгузыужьыпӀэ":  ("FACE", "PLEASANT_PLACE", "noun"),
    "нэгуихыгъэу":    ("FACE", "OPEN_FACE", "adverb"),
    "нэгум":          ("FACE", "FACE", "noun"),
    "нэгур":          ("FACE", "FACE", "noun"),
    "нэгуф":          ("FACE", "BRIGHT_FACE", "adjective"),
    "нэгуфӀэ":        ("FACE", "SMILING_FACE", "adjective"),
    "нэгъабэ":        ("TIME", "LAST_YEAR", "noun"),
    "нэгъабэрей":     ("TIME", "LAST_YEAR", "adjective"),
    "нэгъуд":         ("EYE", "ILLUSION", "noun"),
    "нэгъуджэ":       ("VISION", "MIRROR", "noun"),
    "нэгъуей":        ("ETHNICITY", "NOGAI", "noun"),
    "нэгъуейхэм":     ("ETHNICITY", "NOGAI", "noun"),
    "нэгъунджэ":      ("VISION", "MIRROR", "noun"),
    "нэгъунэ":        ("GRAMMAR", "EVEN_INCLUDING", "adverb"),
    "нэгъуэджа":      ("VISION", "GLASSES_WEARER", "adjective"),
    "нэгъуэщӀ":       ("LIMIT", "OTHER", "pronoun"),
    "нэгъуэщӀкӀэ":    ("LIMIT", "OTHER_WAY", "adverb"),
    "нэгъуэщӀу":      ("LIMIT", "DIFFERENTLY", "adverb"),
    "нэгъуэщӀхэм":    ("LIMIT", "OTHERS", "pronoun"),
    "нэгъуэщӀхэми":   ("LIMIT", "OTHERS", "pronoun"),
    "нэгъуэщӀхэр":    ("LIMIT", "OTHERS", "pronoun"),
    "нэгъуэщӀхэри":   ("LIMIT", "OTHERS", "pronoun"),
    "нэгъуэщӀым":     ("LIMIT", "OTHER_PERSON", "pronoun"),
    "нэгъуэщӀыпӀэ":   ("LOCATION", "OTHER_PLACE", "noun"),
    "нэгъыф":         ("FACE", "UNFRIENDLY_FACE", "adjective"),
    "нэгъэса":        ("ETHICS", "PERFECT", "adjective"),
}

AILE = {
    "EYE": "Göz & Görme", "VISION": "Göz & Görme",
    "FACE": "Yüz & Sima",
    "TIME": "Sınır & Mesafe", "LIMIT": "Sınır & Mesafe",
    "GRAMMAR": "Sınır & Mesafe", "LOCATION": "Sınır & Mesafe",
    "ETHNICITY": "Ahlak & Soyut", "ETHICS": "Ahlak & Soyut",
}

GRUP_2 = {normalize_palochka(k): v for k, v in GRUP_2_RAW.items()}

uygulanan = 0
islenen = set()

for l in lex:
    raw_form = l.get("form", "")
    norm_form = normalize_palochka(raw_form)
    
    if norm_form in GRUP_2:
        concept, sub, pos = GRUP_2[norm_form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = AILE.get(concept, "Sınır & Mesafe")
        l["rootForm"] = "нэ-"
        if not l.get("partOfSpeech"):
            l["partOfSpeech"] = pos
        uygulanan += 1
        islenen.add(norm_form)

bulunamayan = [f for f in GRUP_2 if f not in islenen]

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"OK - {uygulanan} kayit guncellendi")
if bulunamayan:
    print(f"Bulunamayan: {len(bulunamayan)}")
    for f in bulunamayan:
        print(f"  - {f}")
else:
    print("Tum kayitlar bulundu!")
