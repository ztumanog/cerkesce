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

KALAN = {
    # Baş & Kafa
    "щхьэ":                ("HEAD", "HEAD_BODY", "Baş & Kafa"),
    "щхьэбалыджэ":         ("PILLOW", "HEAD_REST", "Baş & Kafa"),
    "щхьэбгъупцӀапцӀэ":    ("TEMPLE", "HEAD_PART", "Baş & Kafa"),
    "щхьэгухъу":           ("SKULL", "HEAD_BONE", "Baş & Kafa"),
    "щхьэгуэ":             ("HORNLESS", "HEAD_BARE", "Baş & Kafa"),
    "щхьэгъакъэ":          ("STUNNED", "HEAD_STATE", "Baş & Kafa"),
    "щхьэгъэ":             ("HEADWEAR", "HEAD_COVER", "Baş & Kafa"),
    "щхьэцхэр":            ("HAIR", "HEAD_HAIR", "Baş & Kafa"),
    
    # Üst & Üzeri
    "щхьэгу":              ("TOP", "HEAD_TOP", "Üst & Üzeri"),
    "щхьэдэгъэхуэхын":     ("OVER_FALL", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэдэдзыхын":        ("OVER_THROW", "HEAD_OVER", "Üst & Üzeri"),
    "щхьэдэжэхын":         ("OVER_RUN", "HEAD_OVER", "Üst & Üzeri"),
    
    # Ahlak & Düşünce
    "щхьэгурыс":           ("THOUGHT", "HEAD_MIND", "Ahlak & Düşünce"),
    
    # Söz & Neden
    "щхьэгавагъэ":         ("CHATTER", "HEAD_TALK", "Söz & Neden"),
    "щхьэгъавагъэ":        ("CHATTER", "HEAD_TALK", "Söz & Neden"),
    "щхьэгъавэ":           ("TALKATIVE", "HEAD_TALK", "Söz & Neden"),
    
    # Pencere & Yapı
    "щхьэгъу":             ("WINDOW", "HEAD_OPENING", "Pencere & Yapı"),
    "щхьэгъубжэ":          ("WINDOW", "HEAD_WINDOW", "Pencere & Yapı"),
    "щхьэгъубжэм":         ("WINDOW", "HEAD_WINDOW", "Pencere & Yapı"),
    "щхьэгъубжэмкӀэ":      ("WINDOW", "HEAD_WINDOW", "Pencere & Yapı"),
    "щхьэгъубжэр":         ("WINDOW", "HEAD_WINDOW", "Pencere & Yapı"),
    "щхьэгъубжэхэр":       ("WINDOW", "HEAD_WINDOW", "Pencere & Yapı"),
    
    # Kendi & Öz
    "щхьэгъусэ":           ("SPOUSE", "HEAD_COMPANION", "Kendi & Öz"),
    "щхьэгъусэм":          ("SPOUSE", "HEAD_COMPANION", "Kendi & Öz"),
    "щхьэгъусэншэ":        ("SINGLE", "HEAD_COMPANION", "Kendi & Öz"),
    "щхьэгъусэншэн":       ("SINGLE", "HEAD_COMPANION", "Kendi & Öz"),
    "щхьэгъусэр":          ("SPOUSE", "HEAD_COMPANION", "Kendi & Öz"),
    "щхьэгъэрыт":          ("INDEPENDENT", "HEAD_STAND", "Kendi & Öz"),
    
    # Duygu & Durum
    "щхьэгъэуз":           ("ANNOYING", "HEAD_PAIN", "Duygu & Durum"),
    "щхьэгъэщхъ":          ("SHAMEFUL", "HEAD_SHAME", "Duygu & Durum"),
}

KALAN_NORM = {normalize(k): v for k, v in KALAN.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("щхьэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in KALAN_NORM:
        concept, sub, family = KALAN_NORM[norm]
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
    for f in belirsiz[:20]:
        print(f"  - {f}")
else:
    print("\n🎉 щхьэ- KATEGORİSİ TAM BİTTİ!")
