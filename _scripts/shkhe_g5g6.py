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

GRUP_5_6 = {
    # === GRUP 5 ===
    "щхьэхь-псэхь":         ("PANIC", "HEAD_PANIC", "Duygu & Durum"),
    "щхьэхь-псэхьу":        ("PANIC", "HEAD_PANIC", "Duygu & Durum"),
    "щхьэхьу":              ("PANIC", "HEAD_PANIC", "Duygu & Durum"),
    "щхьэхэр":              ("HEAD", "HEAD_BODY", "Baş & Kafa"),
    "щхьэц":                ("HAIR", "HEAD_HAIR", "Baş & Kafa"),
    "щхьэцпэщтэ":           ("HAIR_CLIP", "HEAD_HAIR", "Baş & Kafa"),
    "щхьэцыхэр":            ("HAIR", "HEAD_HAIR", "Baş & Kafa"),
    "щхьэцым":              ("HAIR", "HEAD_HAIR", "Baş & Kafa"),
    "щхьэцыпэ":             ("HAIR_TIP", "HEAD_HAIR", "Baş & Kafa"),
    "щхьэцыр":              ("HAIR", "HEAD_HAIR", "Baş & Kafa"),
    "щхьэшхуэ":             ("BIG_HEAD", "HEAD_SIZE", "Baş & Kafa"),
    "щхьэшэн":              ("LEAD", "HEAD_LEAD", "Kendi & Öz"),
    "щхьэщ":                ("BIRD", "HEAD_BIRD", "Canlı & Doğa"),
    "щхьэщихун":            ("OVER_FALL", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыгу":             ("TOP", "HEAD_TOP", "Üst & Üzeri"),
    "щхьэщыгъуэлъхьэн":     ("OVER_LIE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыгъэун":          ("OVER_CAUSE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыжын":            ("OVER_LEAVE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщылъхьэн":         ("PUT_ON", "HEAD_COVER", "Baş & Kafa"),
    "щхьэщылъын":           ("OVER_LIE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщылъэдэн":         ("OVER_RUN", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщылъэфын":         ("OVER_DRAG", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыпӀиикӀын":       ("OVER_JUMP", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщытхъу":           ("BOASTFUL", "HEAD_BOAST", "Ahlak & Düşünce"),
    "щхьэщытхъугъэ":        ("BOASTING", "HEAD_BOAST", "Ahlak & Düşünce"),
    "щхьэщытхъын":          ("OVER_TEAR", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщытын":            ("OVER_STAND", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщытӀысхьэн":       ("OVER_SIT", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыувэн":           ("OVER_STAND", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыукӀуриикӀын":    ("OVER_ROLL", "HEAD_OVER", "Üst & Üzeri"),
    
    # === GRUP 6 ===
    "щхьэщыхун":            ("OVER_FALL", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыхуэн":           ("OVER_FALL", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыхын":            ("OVER_REMOVE", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыхьэн":           ("OVER_ENTER", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщышын":            ("OVER_LEAD", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщыӀэтыкӀын":       ("OVER_LIFT", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэщэ":               ("RESPECT", "HEAD_BOW", "Ahlak & Düşünce"),
    "щхьэщэхуж":            ("INDEPENDENT", "HEAD_FREE", "Kendi & Öz"),
    "щхьэщӀыдзэ":           ("BEGINNING", "HEAD_START", "Söz & Neden"),
    "щхьэщӀэгупсыс":        ("THINKER", "HEAD_THINK", "Ahlak & Düşünce"),
    "щхьэӀуо":              ("OPENLY", "HEAD_OPEN", "Söz & Neden"),
    "щхьэӀуу":              ("OPENLY", "HEAD_OPEN", "Söz & Neden"),
    "щхьэӀууду":            ("OPENLY", "HEAD_OPEN", "Söz & Neden"),
}

GRUP_NORM = {normalize(k): v for k, v in GRUP_5_6.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("щхьэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in GRUP_NORM:
        concept, sub, family = GRUP_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "щхьэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("щхьэ") and not l.get("subConceptId")]
print(f"щхьэ- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    print("\nKalanlar:")
    for f in belirsiz[:30]:
        print(f"  - {f}")
