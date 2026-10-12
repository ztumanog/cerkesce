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

# Mimar'ın 64 kaydı (özet)
LHI = {
    "лӀы":              ("MAN", "MAN_ADULT", "İnsan & Cinsiyet"),
    "лӀыгъуабэ":        ("MAN", "WIDOWER", "Aile & Akrabalık"),
    "лӀыгъуэфызыгъуэ":  ("MARRIAGE", "COUPLE", "Aile & Akrabalık"),
    "лӀыгъэ":           ("COURAGE", "BRAVERY", "İnsan & Nitelik"),
    "лӀыгъэншэ":        ("CHARACTER", "COWARDICE", "İnsan & Nitelik"),
    "лӀыку":            ("MAN", "MIDDLE_AGED_MAN", "İnsan & Cinsiyet"),
    "лӀын":             ("MARRIAGE", "MARRY", "Aile & Akrabalık"),
    "лӀыншэ":           ("MARITAL_STATUS", "HUSBANDLESS", "Aile & Akrabalık"),
    "лӀыныбжь":         ("AGE", "MANHOOD_AGE", "İnsan & Yaşam"),
    "лӀыпӀэ":           ("AGE", "MANHOOD_STAGE", "İnsan & Yaşam"),
    "лӀыукӀыпӀэ":       ("LOCATION", "KILLING_PLACE", "Toplum & Savaş"),
    "лӀыфэ":            ("APPEARANCE", "MANLY_LOOK", "İnsan & Nitelik"),
    "лӀыфӀыгъэ":        ("VIRTUE", "GOODNESS", "İnsan & Nitelik"),
    "лӀыхъу":           ("HERO", "HEROIC_PERSON", "Toplum & Rol"),
    "лӀыхъубжьэ":       ("FEAST", "HERO_CUP", "Kültür & Gelenek"),
    "лӀыхъужьыбжьэ":    ("FEAST", "HERO_CUP", "Kültür & Gelenek"),
    "лӀыхэх":           ("PERSON", "ELECTED_MEN", "Toplum & Rol"),
    "лӀыщӀакӀуэ":       ("MAN", "YOUNG_MAN", "İnsan & Yaşam"),
    "лӀыщӀапщӀэ":       ("LAW", "BLOOD_MONEY", "Toplum & Hukuk"),
    "лӀыщӀапӀэ":        ("STAGE", "YOUTH_STAGE", "İnsan & Yaşam"),
    "лӀыщӀэн":          ("RESPECT", "HONOR_MAN", "Toplum & İlişki"),
    "лӀыӀуэлӀыфэ":      ("MANNER", "MANLY_BEHAVIOR", "İnsan & Nitelik"),
    "лӀыӀэдэ":          ("PERSON", "RESPECTED_MAN", "Toplum & Rol"),
    "лӀыгъэкӀэ":        ("COURAGE", "BRAVERY_MANNER", "İnsan & Nitelik"),
    "лӀыгъэм":          ("COURAGE", "OBLIQUE_CASE", "İnsan & Nitelik"),
    "лӀыгъэмрэ":        ("COURAGE", "CONJUNCTIVE_CASE", "İnsan & Nitelik"),
    "лӀыгъэр":          ("COURAGE", "NOMINATIVE_CASE", "İnsan & Nitelik"),
    "лӀыгъэшхуэ":       ("COURAGE", "GREAT_BRAVERY", "İnsan & Nitelik"),
    "лӀыжь":            ("MAN", "OLD_MAN", "İnsan & Yaşam"),
    "лӀыжьхэм":         ("MAN", "PLURAL_OBLIQUE", "İnsan & Yaşam"),
    "лӀыжьым":          ("MAN", "SINGULAR_OBLIQUE", "İnsan & Yaşam"),
    "лӀыжьыр":          ("MAN", "SINGULAR_NOMINATIVE", "İnsan & Yaşam"),
    "лӀыкӀо":           ("MESSENGER", "DELEGATE", "Toplum & Rol"),
    "лӀыкӀом":          ("MESSENGER", "SINGULAR_OBLIQUE", "Toplum & Rol"),
    "лӀыкӀомэ":         ("MESSENGER", "PLURAL_OBLIQUE", "Toplum & Rol"),
    "лӀыкӀор":          ("MESSENGER", "SINGULAR_NOMINATIVE", "Toplum & Rol"),
    "лӀыкӀоу":          ("MESSENGER", "ADVERBIAL_CASE", "Toplum & Rol"),
    "лӀыкӀохэм":        ("MESSENGER", "PLURAL_OBLIQUE", "Toplum & Rol"),
    "лӀыкӀохэр":        ("MESSENGER", "PLURAL_NOMINATIVE", "Toplum & Rol"),
    "лӀыкӀуэ":          ("MESSENGER", "DELEGATE", "Toplum & Rol"),
    "лӀыкӀуэм":         ("MESSENGER", "SINGULAR_OBLIQUE", "Toplum & Rol"),
    "лӀыкӀуэр":         ("MESSENGER", "SINGULAR_NOMINATIVE", "Toplum & Rol"),
    "лӀыкӀуэу":         ("MESSENGER", "ADVERBIAL_CASE", "Toplum & Rol"),
    "лӀыкӀуэхэм":       ("MESSENGER", "PLURAL_OBLIQUE", "Toplum & Rol"),
    "лӀыкӀуэхэр":       ("MESSENGER", "PLURAL_NOMINATIVE", "Toplum & Rol"),
    "лӀым":             ("MAN", "SINGULAR_OBLIQUE", "İnsan & Cinsiyet"),
    "лӀыр":             ("MAN", "SINGULAR_NOMINATIVE", "İnsan & Cinsiyet"),
    "лӀыукӀ":           ("CRIME", "KILLER", "Toplum & Hukuk"),
    "лӀыуэ":            ("WARRIOR", "KNIGHT", "Toplum & Rol"),
    "лӀыхъужъ":         ("HERO", "OLD_HERO", "Toplum & Rol"),
    "лӀыхъужь":         ("HERO", "HEROIC_PERSON", "Toplum & Rol"),
    "лӀыхъужьхэм":      ("HERO", "PLURAL_OBLIQUE", "Toplum & Rol"),
    "лӀыхъужьыгъэ":     ("HERO", "HEROISM", "İnsan & Nitelik"),
    "лӀыхъужьыр":       ("HERO", "SINGULAR_NOMINATIVE", "Toplum & Rol"),
    "лӀыхэм":           ("MAN", "PLURAL_OBLIQUE", "İnsan & Cinsiyet"),
    "лӀыхэр":           ("MAN", "PLURAL_NOMINATIVE", "İnsan & Cinsiyet"),
    "лӀыщхьэхэм":       ("LEADERSHIP", "HEAD_OF_HOUSEHOLD", "Toplum & Rol"),
    "лӀыщӀэ":           ("MAN", "YOUNG_MAN", "İnsan & Yaşam"),
}

LHI_NORM = {normalize(k): v for k, v in LHI.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not (form.startswith("лӀы") or form.startswith("лӏы") or form.startswith("лIы")):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in LHI_NORM:
        concept, sub, family = LHI_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "лӀы-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if (l.get("form","").startswith("лӀы") or l.get("form","").startswith("лӏы")) and not l.get("subConceptId")]
print(f"лӀы- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 лӀы- KATEGORİSİ TAM BİTTİ!")
