import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# Mimarın 50 kelimesi için tam pasaport verisi
MIMAR_50 = {
    "гу":           ("BODY",     "HEART",         "Duygu & Zihin", "гу"),
    "гуагъэуцорэмэ":("EMOTION",  "HEARTBREAK",    "Duygu & Zihin", "гу"),
    "гуадз":        ("PERSON",   "ASSISTANT",     "Görev & Unvan", "гу"),
    "гуадзэ":       ("AGRICULTURE","WHEAT",       "Tarım & Görev", "гуадзэ"),
    "гуажэ":        ("EMOTION",  "OFFENSE",       "Duygu & Zihin", "гу"),
    "гуакӀуагъ":    ("EMOTION",  "CHARM",         "Duygu & Zihin", "гу"),
    "гуакӀуэ":      ("EMOTION",  "ATTRACTIVE",    "Duygu & Zihin", "гу"),
    "гуанабэ":      ("NATURE",   "BRANCHY",       "Doğa & Bitki",  "гуанэ"),
    "гуаным":       ("NATURE",   "BRANCH",        "Doğa & Bitki",  "гуанэ"),
    "гуанэ":        ("NATURE",   "BRANCH",        "Doğa & Bitki",  "гуанэ"),
    "гуапагъ":      ("EMOTION",  "KINDNESS",      "Duygu & Zihin", "гу"),
    "гуапагъэ":     ("EMOTION",  "KINDNESS",      "Duygu & Zihin", "гу"),
    "гуапэ":        ("EMOTION",  "WARM",          "Duygu & Zihin", "гу"),
    "гуапэт":       ("EMOTION",  "WARM",          "Duygu & Zihin", "гу"),
    "гуапэу":       ("EMOTION",  "WARM",          "Duygu & Zihin", "гу"),
    "гуапэщ":       ("EMOTION",  "WARM",          "Duygu & Zihin", "гу"),
    "гуартэ":       ("COLLECTIVE","HERD",         "Topluluk",       "гуартэ"),
    "гуарцэ":       ("NATURE",   "THICKET",       "Doğa & Arazi",  "гуарцэ"),
    "гуауэ":        ("EMOTION",  "GRIEF",         "Duygu & Zihin", "гу"),
    "гуауэм":       ("EMOTION",  "GRIEF",         "Duygu & Zihin", "гу"),
    "гуауэр":       ("EMOTION",  "GRIEF",         "Duygu & Zihin", "гу"),
    "гуауэшхуэ":    ("EMOTION",  "GREAT_GRIEF",   "Duygu & Zihin", "гу"),
    "гуауэщхьэуэ":  ("EMOTION",  "MISFORTUNE",    "Duygu & Zihin", "гу"),
    "гуахъуэ":      ("OBJECT",   "PITCHFORK",     "Tarım & Alet",  "гу"),
    "гуащ":         ("PERSON",   "LADY",          "Sosyal Rol",     "гуащэ"),
    "гуащэ":        ("PERSON",   "LADY",          "Sosyal Rol",     "гуащэ"),
    "гуащэм":       ("PERSON",   "LADY",          "Sosyal Rol",     "гуащэ"),
    "гуащэнабдзэ":  ("NATURE",   "ROSE",          "Doğa & Flora",  "гуащэ"),
    "гуащэнэ":      ("ANIMAL",   "RIVER_FISH",    "Doğa & Fauna",  "гуащэ"),
    "гуащэр":       ("PERSON",   "LADY",          "Sosyal Rol",     "гуащэ"),
    "гуащэу":       ("PERSON",   "LADY",          "Sosyal Rol",     "гуащэ"),
    "гуащӀаджэ":    ("LABOR",    "HARDSHIP",      "Güç & Emek",     "гуащӀэ"),
    "гуащӀэ":       ("LABOR",    "POWER",         "Güç & Emek",     "гуащӀэ"),
    "гуащӀэв":      ("LABOR",    "VERY_SEVERE",   "Güç & Emek",     "гуащӀэ"),
    "гуащӀэгъуэ":   ("TIME",     "PEAK_WORK",     "Güç & Emek",     "гуащӀэ"),
    "гуащӀэпсэу":   ("PERSON",   "LABOURER",      "Güç & Emek",     "гуащӀэ"),
    "гуащӀэрагъкӀэ":("LABOR",    "BY_FORCE",      "Güç & Emek",     "гуащӀэ"),
    "гуащӏэдэкӏ":   ("LABOR",    "PRODUCT",       "Güç & Emek",     "гуащӀэ"),
    "гуащӏэкӏэ":    ("LABOR",    "BY_HARD_WORK",  "Güç & Emek",     "гуащӀэ"),
    "гуащӏэм":      ("LABOR",    "POWER",         "Güç & Emek",     "гуащӀэ"),
    "гуащӏэмащӏэ":  ("LABOR",    "WEAK",          "Güç & Emek",     "гуащӀэ"),
    "гуащӏэр":      ("LABOR",    "POWER",         "Güç & Emek",     "гуащӀэ"),
    "гуащӏэу":      ("LABOR",    "STRONGLY",      "Güç & Emek",     "гуащӀэ"),
    "губгъо":       ("NATURE",   "FIELD",         "Doğa & Arazi",   "губгъуэ"),
    "губгъом":      ("NATURE",   "FIELD",         "Doğa & Arazi",   "губгъуэ"),
    "губгъор":      ("NATURE",   "FIELD",         "Doğa & Arazi",   "губгъуэ"),
    "губгъу":       ("NATURE",   "FIELD",         "Doğa & Arazi",   "губгъуэ"),
    "губгъуэ":      ("NATURE",   "FIELD",         "Doğa & Arazi",   "губгъуэ"),
    "губгъуэм":     ("NATURE",   "FIELD",         "Doğa & Arazi",   "губгъуэ"),
    "губгъуэр":     ("NATURE",   "FIELD",         "Doğa & Arazi",   "губгъуэ"),
}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    if form in MIMAR_50:
        concept, sub, family, root = MIMAR_50[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = root
        guncellenen += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {guncellenen} kayit guncellendi")

# Rapor
with open("_scripts/gu_50_rapor.txt", "w", encoding="utf-8") as f:
    f.write(f"GU- 50 KAYIT UYGULAMA RAPORU\n")
    f.write("=" * 80 + "\n\n")
    for l in lex:
        if l.get("rootForm") == "гу" or (l.get("form", "") in MIMAR_50):
            form = l.get("form", "?")
            concept = l.get("conceptId", "-")
            sub = l.get("subConceptId", "-")
            fam = l.get("taxonomyFamily", "-")
            f.write(f"{form:<22} | {concept:<12} | {sub:<18} | {fam}\n")
