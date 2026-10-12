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

# GRUP 3 + GRUP 4 — Mimar onaylı
SHKHE = {
    # === GRUP 3 ===
    "щхьэпэлъахъшэ":        ("HUMBLE", "HEAD_LOW", "Ahlak & Düşünce"),
    "щхьэр":                ("HEAD", "HEAD_BODY", "Baş & Kafa"),
    "щхьэрыгъын":           ("OVER_HOVER", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэрыкъуэн":          ("HEAD_COVER", "HEAD_COVER", "Baş & Kafa"),
    "щхьэрылъэтын":         ("OVER_FLY", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэрыпхъуэтын":       ("OVER_SNATCH", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэрыуагъэ":          ("MISTAKE", "HEAD_ERROR", "Ahlak & Düşünce"),
    "щхьэрыуагъэхэр":       ("MISTAKE", "HEAD_ERROR", "Ahlak & Düşünce"),
    "щхьэрыудын":           ("STUN", "HEAD_ERROR", "Ahlak & Düşünce"),
    "щхьэрыутӀыпщу":        ("FREELY", "HEAD_FREE", "Kendi & Öz"),
    "щхьэрыуэгъуэ":         ("MISTAKE", "HEAD_ERROR", "Ahlak & Düşünce"),
    "щхьэрыуэн":            ("MISTAKE", "HEAD_ERROR", "Ahlak & Düşünce"),
    "щхьэрыхун":            ("OVER_FALL", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэрыхьу":            ("DIZZY", "HEAD_STATE", "Baş & Kafa"),
    "щхьэрыӀун":            ("HEAD_HIT", "HEAD_HIT", "Baş & Kafa"),
    "щхьэрэ":               ("HEAD", "HEAD_BODY", "Baş & Kafa"),
    "щхьэтелъэфу":          ("OVER_DRAG", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэтепхъуэ":          ("VEIL", "HEAD_COVER", "Baş & Kafa"),
    "щхьэтепӀэншэ":         ("UNCOVERED", "HEAD_BARE", "Baş & Kafa"),
    "щхьэтечауэ":           ("UNCOVERED", "HEAD_BARE", "Baş & Kafa"),
    "щхьэтечу":             ("UNCOVERED", "HEAD_BARE", "Baş & Kafa"),
    "щхьэуз":               ("HEADACHE", "HEAD_PAIN", "Duygu & Durum"),
    "щхьэузыхь":            ("SACRIFICE", "HEAD_SACRIFICE", "Kendi & Öz"),
    "щхьэукъуэн":           ("NAP", "HEAD_SLEEP", "Baş & Kafa"),
    "щхьэумэ":              ("CONFUSION", "HEAD_ERROR", "Ahlak & Düşünce"),
    "щхьэусыгъуэ":          ("REASON", "HEAD_REASON", "Söz & Neden"),
    "щхьэусыгъуэншэ":       ("REASONLESS", "HEAD_REASON", "Söz & Neden"),
    "щхьэусыгъуэр":         ("REASON", "HEAD_REASON", "Söz & Neden"),
    "щхьэусыгъуэу":         ("REASON", "HEAD_REASON", "Söz & Neden"),
    "щхьэусыгъуэхэр":       ("REASON", "HEAD_REASON", "Söz & Neden"),
    
    # === GRUP 4 ===
    "щхьэуэ":               ("STRIKER", "HEAD_HIT", "Yapı & Nesne"),
    "щхьэфэ":               ("SCALP", "HEAD_SKIN", "Baş & Kafa"),
    "щхьэфэкъу":            ("BALD", "HEAD_BARE", "Baş & Kafa"),
    "щхьэфэплъ":            ("RED_HEAD", "HEAD_SKIN", "Baş & Kafa"),
    "щхьэфэху":             ("BALD", "HEAD_BARE", "Baş & Kafa"),
    "щхьэфэц":              ("HAIR", "HEAD_HAIR", "Baş & Kafa"),
    "щхьэфэщӀэпхэ":         ("HEADBAND", "HEAD_COVER", "Baş & Kafa"),
    "щхьэх":                ("HEAD_DOWN", "HEAD_LOW", "Baş & Kafa"),
    "щхьэхуещэ":            ("SELFISH", "HEAD_SELF", "Kendi & Öz"),
    "щхьэхуимыт":           ("DEPENDENT", "HEAD_BOUND", "Kendi & Öz"),
    "щхьэхуимыту":          ("DEPENDENT", "HEAD_BOUND", "Kendi & Öz"),
    "щхьэхуимытыныгъэ":     ("DEPENDENCE", "HEAD_BOUND", "Kendi & Öz"),
    "щхьэхуит":             ("FREE", "HEAD_FREE", "Kendi & Öz"),
    "щхьэхуиту":            ("FREE", "HEAD_FREE", "Kendi & Öz"),
    "щхьэхуитыныгъэ":       ("FREEDOM", "HEAD_FREE", "Kendi & Öz"),
    "щхьэхуитыныгъэм":      ("FREEDOM", "HEAD_FREE", "Kendi & Öz"),
    "щхьэхуитыныгъэр":      ("FREEDOM", "HEAD_FREE", "Kendi & Öz"),
    "щхьэхуэ":              ("SEPARATE", "HEAD_SELF", "Kendi & Öz"),
    "щхьэхуэ-щхьэхуэу":     ("SEPARATE", "HEAD_SELF", "Kendi & Öz"),
    "щхьэхуэлажьэ":         ("FREELANCER", "HEAD_SELF", "Kendi & Öz"),
    "щхьэхуэныгъэ":         ("ISOLATION", "HEAD_SELF", "Kendi & Öz"),
    "щхьэхуэпӀу":           ("SPECIAL_RAISED", "HEAD_SELF", "Kendi & Öz"),
    "щхьэхуэрышхэн":        ("EAT_ALONE", "HEAD_SELF", "Kendi & Öz"),
    "щхьэхуэу":             ("SEPARATE", "HEAD_SELF", "Kendi & Öz"),
    "щхьэхуэфӀ":            ("SELF_GOOD", "HEAD_SELF", "Kendi & Öz"),
    "щхьэхын":              ("LAZY", "HEAD_LAZY", "Duygu & Durum"),
    "щхьэхынагъ":           ("LAZINESS", "HEAD_LAZY", "Duygu & Durum"),
    "щхьэхынэ":             ("LAZY", "HEAD_LAZY", "Duygu & Durum"),
    "щхьэхынэм":            ("LAZY", "HEAD_LAZY", "Duygu & Durum"),
    "щхьэхынэу":            ("LAZY", "HEAD_LAZY", "Duygu & Durum"),
}

SHKHE_NORM = {normalize(k): v for k, v in SHKHE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("щхьэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in SHKHE_NORM:
        concept, sub, family = SHKHE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "щхьэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("щхьэ") and not l.get("subConceptId")]
print(f"щхьэ- Belirsiz kalan: {len(belirsiz)}")
