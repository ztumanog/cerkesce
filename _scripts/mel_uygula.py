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

MEL = {
    "мэл":              ("SHEEP", "SHEEP_ANIMAL", "Doğa & Canlılar", "мэл-"),
    "мэлажьэ":          ("ACTION", "WORKING", "Eylem & Çalışma", "лажьэ-"),
    "мэлакӏэ":          ("ANIMAL_BODY", "SHEEP_TAIL", "Doğa & Canlılar", "мэл-"),
    "мэлахъо":          ("PROFESSION", "SHEPHERD", "Toplum & Meslek", "мэл-"),
    "мэлахъом":         ("GRAMMAR", "SHEPHERD_OBLIQUE", "Dil & Gramer", "мэл-"),
    "мэлаӏич":          ("RELIGION", "ANGEL", "İnanç & Din", "мэлэӀич-"),
    "мэлаӏичмэ":        ("GRAMMAR", "ANGELS_PLURAL_OBLIQUE", "Dil & Gramer", "мэлэӀич-"),
    "мэлаӏичхэр":       ("GRAMMAR", "ANGELS_PLURAL_NOMINATIVE", "Dil & Gramer", "мэлэӀич-"),
    "мэлгъажэ":         ("ANIMAL_ACTIVITY", "SHEEP_HERDING", "Doğa & Hayvancılık", "мэл-"),
    "мэлжьагъэ":        ("FOOD", "SHEEP_MEAT_FOOD", "Maddi Kültür & Gıda", "мэл-"),
    "мэлхъун":          ("ACTION", "BECOMING_SHEEP", "Eylem & Durum", "мэл-"),
    "мэлхьэпӀатӀэ":     ("INSECT", "SHEEP_TICK", "Doğa & Canlılar", "мэл-"),
    "мэлхэм":           ("GRAMMAR", "SHEEP_PLURAL_OBLIQUE", "Dil & Gramer", "мэл-"),
    "мэлхэр":           ("GRAMMAR", "SHEEP_PLURAL_NOMINATIVE", "Dil & Gramer", "мэл-"),
    "мэлхэри":          ("GRAMMAR", "SHEEP_PLURAL_EMPHATIC", "Dil & Gramer", "мэл-"),
    "мэлъатэ":          ("ACTION", "FLYING_JUMPING", "Eylem & Hareket", "лъэтэн-"),
    "мэлъаӏуэ":         ("SPEECH", "REQUESTING", "Dil & İletişim", "лъэӀуэн-"),
    "мэлъхъэгъу":       ("FAMILY", "SISTER_IN_LAW_HUSBAND", "Aile & Akrabalık", "лъху-"),
    "мэлыд":            ("ACTION", "SHINING_GLOWING", "Eylem & Doğa", "лыдын-"),
    "мэлыжь":           ("TIME", "MARCH_MONTH", "Zaman & Takvim", "мэл-"),
    "мэлыжьыхь":        ("TIME", "APRIL_MONTH", "Zaman & Takvim", "мэл-"),
    "мэлыл":            ("FOOD", "MUTTON_MEAT", "Maddi Kültür & Gıda", "мэл-"),
    "мэлым":            ("GRAMMAR", "SHEEP_OBLIQUE", "Dil & Gramer", "мэл-"),
    "мэлыр":            ("GRAMMAR", "SHEEP_NOMINATIVE", "Dil & Gramer", "мэл-"),
    "мэлыфэ":           ("MATERIAL", "SHEEPSKIN", "Maddi Kültür & Eşya", "мэл-"),
    "мэлыхъуэ":         ("PROFESSION", "SHEPHERD", "Toplum & Meslek", "мэл-"),
    "мэлыхъуэжь":       ("PROFESSION", "OLD_SHEPHERD", "Toplum & Meslek", "мэл-"),
    "мэлыхъуэм":        ("GRAMMAR", "SHEPHERD_OBLIQUE", "Dil & Gramer", "мэл-"),
    "мэлыхъуэн":        ("ACTION", "HERDING_SHEEP", "Eylem & Meslek", "мэл-"),
    "мэлыхъуэпкъыуэ":   ("TOOL", "SHEPHERD_STAFF", "Alet & Eşya", "мэл-"),
    "мэлыхъуэр":        ("GRAMMAR", "SHEPHERD_NOMINATIVE", "Dil & Gramer", "мэл-"),
    "мэлыхъуэсабын":    ("ITEM", "SHEEP_SOAP", "Maddi Kültür & Eşya", "мэл-"),
    "мэлыхъуэхьэ":      ("ANIMAL", "SHEPHERD_DOG", "Doğa & Canlılar", "мэл-"),
    "мэлыхьыплӀэ":      ("NUMBER", "FOUR_SHEEP_UNITS", "Sayılar & Ölçü", "мэл-"),
    "мэлышъо":          ("MATERIAL", "SHEEPSKIN", "Maddi Kültür & Eşya", "мэл-"),
    "мэлэӀыч":          ("RELIGION", "ANGEL", "İnanç & Din", "мэлэӀич-"),
    "мэлэӏич":          ("RELIGION", "ANGEL", "İnanç & Din", "мэлэӀич-"),
    "мэлэӏичхэм":       ("GRAMMAR", "ANGELS_PLURAL_OBLIQUE", "Dil & Gramer", "мэлэӀич-"),
    "мэлэӏичхэр":       ("GRAMMAR", "ANGELS_PLURAL_NOMINATIVE", "Dil & Gramer", "мэлэӀич-"),
    "мэлэӏичым":        ("GRAMMAR", "ANGEL_OBLIQUE", "Dil & Gramer", "мэлэӀич-"),
    "мэлэӏичыр":        ("GRAMMAR", "ANGEL_NOMINATIVE", "Dil & Gramer", "мэлэӀич-"),
}

MEL_NORM = {normalize(k): v for k, v in MEL.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("мэл"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in MEL_NORM:
        concept, sub, family, root = MEL_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = root
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi (мэл-)")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("мэл") and not l.get("subConceptId")]
print(f"мэл- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz[:20]:
        print(f"  - {f}")
else:
    print("\n🎉 мэл- KATEGORİSİ TAM BİTTİ!")
