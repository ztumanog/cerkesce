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

MAKHUE = {
    "махуэ":            ("DAY", "DAY_TIME", "Zaman & Takvim"),
    "махуэбг":          ("TIME", "DAY_PART", "Zaman & Takvim"),
    "махуэгъакӀуэ":     ("TIME", "TIME_SPENDING", "Zaman & Yaşam"),
    "махуэку":          ("TIME", "DAY_PART", "Zaman & Takvim"),
    "махуэкӏэ":         ("TIME", "TIME_PERIOD", "Gramer & Zaman"),
    "махуэл":           ("WORK", "DAILY_WORK", "Zaman & Çalışma"),
    "махуэм":           ("GRAMMAR", "OBLIQUE_CASE", "Gramer & Çekim"),
    "махуэми":          ("GRAMMAR", "CONJUNCTIVE_CASE", "Gramer & Çekim"),
    "махуэр":           ("GRAMMAR", "NOMINATIVE_CASE", "Gramer & Çekim"),
    "махуэри":          ("GRAMMAR", "CONJUNCTIVE_CASE", "Gramer & Çekim"),
    "махуэт":           ("GRAMMAR", "PAST_TENSE", "Gramer & Çekim"),
    "махуэу":           ("TIME", "ADVERBIAL_TIME", "Gramer & Zaman"),
    "махуэхэм":         ("GRAMMAR", "PLURAL_OBLIQUE", "Gramer & Çekim"),
    "махуэхэр":         ("GRAMMAR", "PLURAL_NOMINATIVE", "Gramer & Çekim"),
    "махуэшхуэ":        ("HOLIDAY", "CELEBRATION", "Zaman & Kültür"),
    "махуэшхуэм":       ("GRAMMAR", "OBLIQUE_CASE", "Gramer & Çekim"),
    "махуэшхуэр":       ("GRAMMAR", "NOMINATIVE_CASE", "Gramer & Çekim"),
    "махуэшхуэхэм":     ("GRAMMAR", "PLURAL_OBLIQUE", "Gramer & Çekim"),
    "махуэщ":           ("GRAMMAR", "INDICATIVE_PREDICATE", "Gramer & Çekim"),
    "махуэщӀу":         ("TIME", "NEW_DAY", "Zaman & Dilek"),
}

MAKHUE_NORM = {normalize(k): v for k, v in MAKHUE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("махуэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in MAKHUE_NORM:
        concept, sub, family = MAKHUE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "махуэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("махуэ") and not l.get("subConceptId")]
print(f"махуэ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 махуэ- KATEGORİSİ TAM BİTTİ!")
