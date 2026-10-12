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

MEZ = {
    "мэз":              ("FOREST", "FOREST_NATURE", "Doğa & Coğrafya"),
    "мэз лъапэ":        ("FOREST", "FOREST_EDGE", "Doğa & Coğrafya"),
    "мэзакӀуэлӀ":       ("PERSON", "WOODSMAN_HUNTER", "Toplum & Meslek"),
    "мэзауэ":           ("MOON", "MOONLIGHT", "Doğa & Gökyüzü"),
    "мэзах":            ("NIGHT", "DARKNESS", "Doğa & Zaman"),
    "мэзахэ":           ("NIGHT", "DARKNESS", "Doğa & Zaman"),
    "мэзахэм":          ("GRAMMAR", "DARKNESS_OBLIQUE", "Dil & Gramer"),
    "мэзджэд":          ("BIRD", "PHEASANT", "Doğa & Canlılar"),
    "мэздэгу":          ("FOREST", "DENSE_FOREST", "Doğa & Coğrafya"),
    "мэзекӏох":         ("PERSON", "TRAVELERS", "Toplum & Etkileşim"),
    "мэзкусэ":          ("FOREST", "FOREST_BELT", "Doğa & Coğrafya"),
    "мэзкуу":           ("CITY", "MOSCOW_CITY", "Coğrafya & Yerler"),
    "мэзкъогъум":       ("FOREST", "FOREST_VALLEY", "Doğa & Coğrafya"),
    "мэзлъапэ":         ("FOREST", "FOREST_EDGE", "Doğa & Coğrafya"),
    "мэзхъумэ":         ("PROFESSION", "FOREST_GUARD", "Toplum & Meslek"),
    "мэзхэм":           ("GRAMMAR", "FOREST_PLURAL_OBLIQUE", "Dil & Gramer"),
    "мэзхэр":           ("GRAMMAR", "FOREST_PLURAL_NOMINATIVE", "Dil & Gramer"),
    "мэзчэт":           ("BIRD", "PHEASANT", "Doğa & Canlılar"),
    "мэзщ":             ("GRAMMAR", "FOREST_PREDICATIVE", "Dil & Gramer"),
    "мэзы":             ("FOREST", "FOREST_NATURE", "Doğa & Coğrafya"),
    "мэзыдэ":           ("FOREST", "INSIDE_FOREST", "Doğa & Coğrafya"),
    "мэзыкхъуэ":        ("ANIMAL", "WILD_BOAR", "Doğa & Canlılar"),
    "мэзылъэ":          ("FOREST", "WOODED_AREA", "Doğa & Coğrafya"),
    "мэзылӀ":           ("PERSON", "FOREST_MAN", "Toplum & Kişi"),
    "мэзым":            ("GRAMMAR", "FOREST_OBLIQUE", "Dil & Gramer"),
    "мэзымкӏэ":         ("GRAMMAR", "FOREST_INSTRUMENTAL", "Dil & Gramer"),
    "мэзыншэ":          ("NATURE", "FORESTLESS", "Doğa & Coğrafya"),
    "мэзыр":            ("GRAMMAR", "FOREST_NOMINATIVE", "Dil & Gramer"),
    "мэзыш":            ("MATERIAL", "TREE_RESIN", "Doğa & Malzeme"),
    "мэзэ":             ("MOON", "MOON_CELESTIAL", "Doğa & Gökyüzü"),
    "мэзэхэ":           ("NIGHT", "DARKNESS", "Doğa & Zaman"),
}

MEZ_NORM = {normalize(k): v for k, v in MEZ.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("мэз"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in MEZ_NORM:
        concept, sub, family = MEZ_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "мэз-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("мэз") and not l.get("subConceptId")]
print(f"мэз- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 мэз- KATEGORİSİ TAM BİTTİ!")
