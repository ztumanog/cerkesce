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

ADE = {
    "адэ":              ("FATHER", "FATHER_PARENT", "Aile & Akrabalık"),
    "адэ къуэш":        ("FAMILY", "UNCLE_PATERNAL", "Aile & Akrabalık"),
    "адэ-анэ":          ("PARENT", "PARENTS", "Aile & Akrabalık"),
    "адэ-анэм":         ("GRAMMAR", "PARENTS_OBLIQUE", "Dil & Gramer"),
    "адэ-анэр":         ("GRAMMAR", "PARENTS_NOMINATIVE", "Dil & Gramer"),
    "адэ-анэхэм":       ("GRAMMAR", "PARENTS_PLURAL_OBLIQUE", "Dil & Gramer"),
    "адэжкӀэ":          ("FAMILY", "PATERNAL_LINE", "Aile & Akrabalık"),
    "адэжынэ":          ("BIRD", "CORNCRAKE", "Doğa & Canlılar"),
    "адэжь":            ("ANCESTOR", "PATRIARCH_ANCESTOR", "Aile & Akrabalık"),
    "адэжьхэм":         ("GRAMMAR", "ANCESTORS_OBLIQUE", "Dil & Gramer"),
    "адэжьхэр":         ("ANCESTOR", "ANCESTORS_PLURAL", "Aile & Akrabalık"),
    "адэкӏи":           ("FAMILY", "PATERNAL_EMPHATIC", "Aile & Akrabalık"),
    "адэкӏэ":           ("FAMILY", "PATERNAL_LINE", "Aile & Akrabalık"),
    "адэм":             ("GRAMMAR", "FATHER_OBLIQUE", "Dil & Gramer"),
    "адэми":            ("GRAMMAR", "FATHER_OBLIQUE_EMPHATIC", "Dil & Gramer"),
    "адэмрэ":           ("GRAMMAR", "FATHER_CONJUNCTION", "Dil & Gramer"),
    "адэмыгу":          ("FAMILY", "STEPFATHER", "Aile & Akrabalık"),
    "адэнапӀас":        ("FAMILY", "STEPFATHER", "Aile & Akrabalık"),
    "адэнэпӀэс":        ("FAMILY", "STEPFATHER", "Aile & Akrabalık"),
    "адэпалъэ":         ("HERITAGE", "PATERNAL_LEGACY", "Aile & Akrabalık"),
    "адэр":             ("GRAMMAR", "FATHER_NOMINATIVE", "Dil & Gramer"),
    "адэри":            ("GRAMMAR", "FATHER_NOMINATIVE_EMPHATIC", "Dil & Gramer"),
    "адэт":             ("CULTURE", "CUSTOM", "Toplum & Kültür"),
    "адэу":             ("GRAMMAR", "FATHER_ADVERBIAL", "Dil & Gramer"),
    "адэш":             ("FAMILY", "UNCLE_PATERNAL", "Aile & Akrabalık"),
    "адэшхуэ":          ("GRANDFATHER", "GRANDFATHER_PATERNAL", "Aile & Akrabalık"),
    "адэшхуэм":         ("GRAMMAR", "GRANDFATHER_OBLIQUE", "Dil & Gramer"),
    "адэшыпхъу":        ("FAMILY", "PATERNAL_AUNT", "Aile & Akrabalık"),
    "адэщ":             ("GRAMMAR", "FATHER_PREDICATIVE", "Dil & Gramer"),
}

ADE_NORM = {normalize(k): v for k, v in ADE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("адэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in ADE_NORM:
        concept, sub, family = ADE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "адэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("адэ") and not l.get("subConceptId")]
print(f"адэ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 адэ- KATEGORİSİ TAM BİTTİ!")
