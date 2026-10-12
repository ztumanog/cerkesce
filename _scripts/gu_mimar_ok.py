import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# Mimarın OK verdiği kayıtlar (form, concept, sub, family)
OK_LISTE = {
    "гуфӀэ":       ("EMOTION", "JOY", "Duygu & Zihin"),
    "гуфӀэн":      ("ACTION", "GU_VERB", "Duygu & Zihin"),
    "губзыгъэ":    ("MIND", "INTELLIGENCE", "Duygu & Zihin"),
    "гурыӏуэн":    ("ACTION", "GU_VERB", "Duygu & Zihin"),
    "губж":        ("EMOTION", "ANGER", "Duygu & Zihin"),
    "гупсысэ":     ("MIND", "THOUGHT", "Duygu & Zihin"),
    "гущӀэ":       ("EMOTION", "COMPASSION", "Duygu & Zihin"),
    "гурыӏуэжын":  ("ACTION", "GU_VERB", "Duygu & Zihin"),
    "гулъытэ":     ("MIND", "ATTENTION", "Duygu & Zihin"),
    "гухэкӏ":      ("EMOTION", "GRIEF", "Duygu & Zihin"),
    "гугъапӏэ":    ("EMOTION", "HOPE", "Duygu & Zihin"),
    "гузэжъогъу":  ("EMOTION", "FEAR", "Duygu & Zihin"),
    "гуфӏэгъу":    ("EMOTION", "JOY", "Duygu & Zihin"),
    "гузэвакӀуэ":  ("EMOTION", "FEAR", "Duygu & Zihin"),
    "гуэдз":       ("AGRICULTURE", "WHEAT", "Tarım"),
    "гугъа":       ("EMOTION", "HOPE", "Duygu & Zihin"),
    "губжь":       ("EMOTION", "ANGER", "Duygu & Zihin"),
    "гуиих":       ("EMOTION", "FEAR", "Duygu & Zihin"),
    "гупсысэн":    ("ACTION", "GU_VERB", "Duygu & Zihin"),
    "гууз":        ("EMOTION", "GRIEF", "Duygu & Zihin"),
    "гуфӀэгъуэ":   ("EMOTION", "JOY", "Duygu & Zihin"),
    "гущӀэгъу":    ("EMOTION", "COMPASSION", "Duygu & Zihin"),
    "гугъапӀэ":    ("EMOTION", "HOPE", "Duygu & Zihin"),
    "гуэныкъуэгъэ":("EMOTION", "GRIEF", "Duygu & Zihin"),
    "гужьей":      ("EMOTION", "FEAR", "Duygu & Zihin"),
    "гумыгъуэ":    ("EMOTION", "COMPASSION", "Duygu & Zihin"),
    "губжьын":     ("ACTION", "GU_VERB", "Duygu & Zihin"),
    "гушхуэн":     ("ACTION", "GU_VERB", "Duygu & Zihin"),
    "гукӏэгъу":    ("EMOTION", "COMPASSION", "Duygu & Zihin"),
}

# Kök tespiti
def kok_bul(form):
    for prefix in ["гуащӀэ", "гуащӏэ", "гуащэ", "губгъу", "гуан",
                   "гуарт", "гуарц", "гуап", "гуакӀу", "гуау", "гуаж",
                   "гуадз", "гуэдз", "гуэл", "гуэщ", "гуэгуш"]:
        if form.startswith(prefix):
            return prefix
    return "гу"

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if form in OK_LISTE:
        concept, sub, family = OK_LISTE[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = kok_bul(form)
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")
