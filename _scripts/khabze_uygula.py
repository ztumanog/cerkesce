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

KHABZE = {
    "хабзэ":        ("TRADITION", "CUSTOM_LAW", "Kültür & Toplum"),
    "хабзэжь":      ("TRADITION", "ANCIENT_CUSTOM", "Kültür & Toplum"),
    "хабзэжьхэр":   ("GRAMMAR", "ANCIENT_CUSTOMS_PLURAL", "Dil & Gramer"),
    "хабзэкъым":    ("GRAMMAR", "TRADITION_NEGATION", "Dil & Gramer"),
    "хабзэкӏэ":     ("GRAMMAR", "TRADITION_INSTRUMENTAL", "Dil & Gramer"),
    "хабзэм":       ("GRAMMAR", "TRADITION_OBLIQUE", "Dil & Gramer"),
    "хабзэмкӏэ":    ("GRAMMAR", "TRADITION_INSTRUMENTAL", "Dil & Gramer"),
    "хабзэмыщӏэ":   ("BEHAVIOR", "ILL_MANNERED", "Toplum & Davranış"),
    "хабзэн":       ("ACTION", "HABIT_ACCUSTOMED", "Eylem & Durum"),
    "хабзэншагъэ":  ("BEHAVIOR", "LAWLESSNESS_BAD_MANNERS", "Toplum & Davranış"),
    "хабзэншагъэм": ("GRAMMAR", "LAWLESSNESS_OBLIQUE", "Dil & Gramer"),
    "хабзэншагъэу": ("GRAMMAR", "LAWLESSLY_ADVERB", "Dil & Gramer"),
    "хабзэншэ":     ("BEHAVIOR", "UNMANNED_LAWLESS", "Toplum & Davranış"),
    "хабзэр":       ("GRAMMAR", "TRADITION_NOMINATIVE", "Dil & Gramer"),
    "хабзэри":      ("GRAMMAR", "TRADITION_EMPHATIC", "Dil & Gramer"),
    "хабзэу":       ("GRAMMAR", "TRADITION_ADVERBIAL", "Dil & Gramer"),
    "хабзэхэм":     ("GRAMMAR", "TRADITIONS_PLURAL_OBLIQUE", "Dil & Gramer"),
    "хабзэхэмрэ":   ("GRAMMAR", "TRADITIONS_CONJUNCTIVE", "Dil & Gramer"),
    "хабзэхэр":     ("GRAMMAR", "TRADITIONS_PLURAL_NOMINATIVE", "Dil & Gramer"),
    "хабзэщ":       ("GRAMMAR", "TRADITION_PREDICATIVE", "Dil & Gramer"),
}

KHABZE_NORM = {normalize(k): v for k, v in KHABZE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("хабзэ"):
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
if not belirsiz:
    print("\n🎉 хабзэ- KATEGORİSİ TAM BİTTİ!")
