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

# YENİ eklenenler (ilk turda olmayanlar)
KHABZE_YENI = {
    "адыгэ хабзэ":          ("CULTURE", "CIRCASSIAN_ETHIC_CODE", "Toplum & Kültür"),
    "щэнхабзэ":             ("CULTURE", "NATIONAL_CULTURE", "Toplum & Kültür"),
    "муслымэн хабзэ":       ("RELIGION_CULTURE", "ISLAMIC_CUSTOM", "Toplum & Kültür"),
    "Хьэнцэ-гуащэр къешэкӀын хабзэ": ("RITUAL_CULTURE", "RAIN_RITUAL_CUSTOM", "Toplum & Kültür"),
    # Ek çekimli formlar
    "хабзэжьхэр":           ("CULTURE", "ANCIENT_CUSTOM_PLURAL", "Toplum & Kültür"),
    "хабзэкъым":            ("CULTURE", "CUSTOM_NEGATION", "Toplum & Kültür"),
    "хабзэкӏэ":             ("CULTURE", "CUSTOM_INSTRUMENTAL", "Toplum & Kültür"),
    "хабзэм":               ("CULTURE", "CUSTOM_OBLIQUE", "Toplum & Kültür"),
    "хабзэмкӏэ":            ("CULTURE", "CUSTOM_INSTRUMENTAL_OBLIQUE", "Toplum & Kültür"),
    "хабзэмыщӏэ":           ("BEHAVIOR", "IGNORANT_OF_CUSTOM", "Toplum & Kültür"),
    "хабзэн":               ("BEHAVIOR", "VERB_HABIT", "Toplum & Kültür"),
    "хабзэншагъэ":          ("LAW_RULE", "LAWLESSNESS", "Toplum & Kültür"),
    "хабзэншагъэм":         ("LAW_RULE", "LAWLESSNESS_OBLIQUE", "Toplum & Kültür"),
    "хабзэншагъэу":         ("LAW_RULE", "LAWLESSNESS_ADVERBIAL", "Toplum & Kültür"),
    "хабзэншэ":             ("BEHAVIOR", "CUSTOMLESS_UNMANNERED", "Toplum & Kültür"),
    "хабзэр":               ("CULTURE", "CUSTOM_DEFINITE", "Toplum & Kültür"),
    "хабзэри":              ("CULTURE", "CUSTOM_CONJUNCTIVE", "Toplum & Kültür"),
    "хабзэу":               ("CULTURE", "CUSTOM_ADVERBIAL", "Toplum & Kültür"),
    "хабзэхэм":             ("CULTURE", "CUSTOM_PLURAL_OBLIQUE", "Toplum & Kültür"),
    "хабзэхэмрэ":           ("CULTURE", "CUSTOM_PLURAL_COORDINATIVE", "Toplum & Kültür"),
    "хабзэхэр":             ("CULTURE", "CUSTOM_PLURAL_ABSOLUTIVE", "Toplum & Kültür"),
    "хабзэщ":               ("CULTURE", "CUSTOM_PREDICATIVE", "Toplum & Kültür"),
}

KHABZE_NORM = {normalize(k): v for k, v in KHABZE_YENI.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not (form.startswith("хабзэ") or "хабзэ" in form):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in KHABZE_NORM:
        concept, sub, family = KHABZE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "хабзэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("хабзэ") and not l.get("subConceptId")]
print(f"хабзэ- Belirsiz kalan: {len(belirsiz)}")
