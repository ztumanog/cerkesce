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

# GRUP 1 + GRUP 2 — Mimar onaylı
SHKHE = {
    # === GRUP 1 ===
    "щхьэдэлъыхын":         ("OVER_JUMP", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэдэплъыхын":        ("OVER_LOOK", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэдэпсэлъыхын":      ("OVER_TALK", "HEAD_OVER", "Söz & Neden"),
    "щхьэдэтхъухын":        ("OVER_SCRAPE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэдэхуэхын":         ("OVER_FALL", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэдэхын":            ("OVER_PASS", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэдэхыпӀэ":          ("OVER_PASSAGE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэегъэзыпӀэ":        ("SHELTER", "HEAD_REST", "Baş & Kafa"),
    "щхьэж":                ("SELF", "HEAD_SELF", "Kendi & Öz"),
    "щхьэзакъуэ":           ("ALONE", "HEAD_SOLO", "Kendi & Öz"),
    "щхьэзакъуэрылажьэ":    ("SELF_WORKER", "HEAD_SOLO", "Kendi & Öz"),
    "щхьэзыфӀэфӀ":          ("SELFISH", "HEAD_SELF", "Kendi & Öz"),
    "щхьэзэ":               ("SINGLE", "HEAD_SOLO", "Kendi & Öz"),
    "щхьэич":               ("REBELLIOUS", "HEAD_STUBBORN", "Ahlak & Düşünce"),
    "щхьэкӀуае":            ("HEAD_DISEASE", "HEAD_DISEASE", "Baş & Kafa"),
    "щхьэкӀуэ":             ("HEAD_DISEASE", "HEAD_DISEASE", "Baş & Kafa"),
    "щхьэкӀуэн":            ("HEAD_DISEASE", "HEAD_DISEASE", "Baş & Kafa"),
    "щхьэкӀуэх":            ("HEAD_DISEASE", "HEAD_DISEASE", "Baş & Kafa"),
    "щхьэкӀи":              ("REASON", "HEAD_REASON", "Söz & Neden"),
    "щхьэкӀэ":              ("REASON", "HEAD_REASON", "Söz & Neden"),
    "щхьэкӀэкъым":          ("REASON", "HEAD_REASON", "Söz & Neden"),
    "щхьэкӀэм":             ("REASON", "HEAD_REASON", "Söz & Neden"),
    "щхьэкӀэщ":             ("REASON", "HEAD_REASON", "Söz & Neden"),
    "щхьэл":                ("MILL", "HEAD_MILL", "Yapı & Nesne"),
    "щхьэлъащӀэ":           ("MILL_BASE", "HEAD_MILL", "Yapı & Nesne"),
    "щхьэлъэфӀей":          ("MILL_DUST", "HEAD_MILL", "Yapı & Nesne"),
    "щхьэлыкъуэ":           ("PLACE_MILL", "HEAD_MILL", "Yapı & Nesne"),
    "щхьэлыпс":             ("MILL_WATER", "HEAD_MILL", "Yapı & Nesne"),
    "щхьэм":                ("HEAD", "HEAD_BODY", "Baş & Kafa"),
    "щхьэматэжь":           ("BASKET", "HEAD_BASKET", "Yapı & Nesne"),
    
    # === GRUP 2 ===
    "щхьэмыгъазэ":          ("DETERMINED", "HEAD_FORWARD", "Ahlak & Düşünce"),
    "щхьэмыгъазэу":         ("DETERMINED", "HEAD_FORWARD", "Ahlak & Düşünce"),
    "щхьэмыж":              ("EAR_GRAIN", "HEAD_TOP", "Baş & Kafa"),
    "щхьэмыжыбэ":           ("EAR_GRAIN", "HEAD_TOP", "Baş & Kafa"),
    "щхьэнтэ":              ("PILLOW", "HEAD_REST", "Baş & Kafa"),
    "щхьэншэ":              ("HEADLESS", "HEAD_NO", "Baş & Kafa"),
    "щхьэпрегъэдзын":       ("OVER_THROW", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыгъуэлъыкӀын":   ("OVER_LIE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыгъэун":         ("OVER_CAUSE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыдзын":          ("OVER_THROW", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыжын":           ("OVER_RUN", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыкӀын":          ("OVER_CROSS", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрылъын":          ("OVER_JUMP", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрылъэтын":        ("OVER_FLY", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыплъын":         ("OVER_LOOK", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыпщын":          ("OVER_CRAWL", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрысыкӀын":        ("OVER_MOVE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыун":            ("OVER_HIT", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыфтын":          ("OVER_FLY", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыхужын":         ("OVER_FALL", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрыхун":           ("OVER_PASS", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпрышын":           ("OVER_CARRY", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэпс":               ("ROPE", "HEAD_ROPE", "Yapı & Nesne"),
    "щхьэпхэтӀыгу":         ("CAPE", "HEAD_TOP", "Üst & Üzeri"),
    "щхьэпылъэ":            ("HEAD_TIE", "HEAD_COVER", "Baş & Kafa"),
    "щхьэпыщӀэ":            ("JOIN", "HEAD_TOP", "Üst & Üzeri"),
    "щхьэпэ":               ("USEFUL", "HEAD_BENEFIT", "Ahlak & Düşünce"),
    "щхьэпэджэн":           ("USEFUL", "HEAD_BENEFIT", "Ahlak & Düşünce"),
    "щхьэпэжын":            ("USEFUL", "HEAD_BENEFIT", "Ahlak & Düşünce"),
    "щхьэпэлъагэ":          ("PROUD", "HEAD_HIGH", "Ahlak & Düşünce"),
}

# Sözlük anahtarlarını normalize et
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

# Kalan
belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("щхьэ") and not l.get("subConceptId")]
print(f"щхьэ- Belirsiz kalan: {len(belirsiz)}")
