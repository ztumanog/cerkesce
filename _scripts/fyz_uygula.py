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

FYZ = {
    "фыз":              ("WOMAN", "WOMAN_ADULT", "İnsan & Cinsiyet"),
    "фызабэ":           ("WOMAN", "WIDOW", "Toplum & Medeni Durum"),
    "фызабэпхъу":       ("FAMILY", "DAUGHTER_OF_WIDOW", "Aile & Akrabalık"),
    "фызгъалъхуэ":      ("PROFESSION", "MIDWIFE", "Toplum & Meslek"),
    "фыздэубзэ":        ("RELATION", "FLATTERING_WIFE", "Toplum & İlişki"),
    "фызиӏэ":           ("MARITAL_STATUS", "MARRIED_MAN", "Toplum & Medeni Durum"),
    "фызиӏэхэр":        ("MARITAL_STATUS", "MARRIED_MEN", "Toplum & Medeni Durum"),
    "фызкъэмышэ":       ("MARITAL_STATUS", "UNMARRIED_MAN", "Toplum & Medeni Durum"),
    "фызмыдэ":          ("MARITAL_STATUS", "SINGLE_BY_CHOICE", "Toplum & Medeni Durum"),
    "фызри":            ("GRAMMAR", "NOUN_EMPHATIC", "Dil & Gramer"),
    "фызу":             ("GRAMMAR", "ADVERBIAL_CASE", "Dil & Gramer"),
    "фызхэм":           ("GRAMMAR", "PLURAL_OBLIQUE", "Dil & Gramer"),
    "фызхэри":          ("GRAMMAR", "PLURAL_EMPHATIC", "Dil & Gramer"),
    "фызыжь":           ("WOMAN", "OLD_WOMAN", "İnsan & Yaşam"),
    "фызыжьым":         ("GRAMMAR", "OLD_WOMAN_OBLIQUE", "Dil & Gramer"),
    "фызыжьыр":         ("GRAMMAR", "OLD_WOMAN_NOMINATIVE", "Dil & Gramer"),
    "фызым":            ("GRAMMAR", "WOMAN_OBLIQUE", "Dil & Gramer"),
    "фызымрэ":          ("GRAMMAR", "WOMAN_CONJUNCTION", "Dil & Gramer"),
    "фызын":            ("ACTION", "SQUEEZE_WRING", "Eylem & Fiziksel"),
    "фызыр":            ("GRAMMAR", "WOMAN_NOMINATIVE", "Dil & Gramer"),
    "фызыхуейр":        ("DESIRE", "WANTING_WIFE", "Duygu & İstek"),
    "фызышэ":           ("MARRIAGE", "WEDDING_BRIDE_FETCHING", "Toplum & Gelenek"),
    "фызышэлъэӀу":      ("MARRIAGE", "MARRIAGE_PROPOSAL", "Toplum & Gelenek"),
    "фызышэпежьэ":      ("MARRIAGE", "BRIDE_WELCOMING_CEREMONY", "Toplum & Gelenek"),
    "фызэджар":         ("PERSON", "INVITED_WOMAN", "Toplum & Etkileşim"),
}

FYZ_NORM = {normalize(k): v for k, v in FYZ.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("фыз"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in FYZ_NORM:
        concept, sub, family = FYZ_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "фыз-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("фыз") and not l.get("subConceptId")]
print(f"фыз- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 фыз- KATEGORİSİ TAM BİTTİ!")
