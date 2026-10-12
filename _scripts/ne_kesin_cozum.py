import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# KESİN normalize — TÜM palochka varyantlarını 0x4cf yap (küçük)
# veya 0x4e0 yap (büyük) — ikisi de olur, TUTARLI olsun
def normalize(text):
    if not text:
        return ""
    # Tüm olası palochka benzerleri → büyük Ӏ (0x4e0)
    for c in ['\u04cf', '\u04c0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04e0')
    text = text.replace('I', '\u04e0')
    text = text.replace('l', '\u04e0')
    text = text.replace('1', '\u04e0')
    return text.strip()

# Sözlük — BÜYÜK palochka (0x4e0) ile yazılmış
# normalize() hem sözlüğü hem veritabanını aynı yapar
SON = {
    "нэщӀ":            ("LIMIT", "EMPTY", "Sınır & Mesafe"),
    "нэкӀым":          ("FACE", "CHEEK", "Yüz & Sima"),
    "нэщӀым":          ("LIMIT", "EMPTY", "Sınır & Mesafe"),
    "нэкӀэ":           ("FACE", "CHEEK", "Yüz & Sima"),
    "нэӀэ":            ("ETHICS", "ATTENTION", "Ahlak & Soyut"),
    "нэпитӀу":         ("EYE", "TWO_EYES", "Göz & Görme"),
    "нэӀуасэ":         ("ETHICS", "ACQUAINTANCE", "Ahlak & Soyut"),
    "нэкӀ":            ("FACE", "CHEEK", "Yüz & Sima"),
    "нэкӀы":           ("FACE", "CHEEK", "Yüz & Sima"),
    "нэмыӀэми":        ("COMPARISON", "CONJUNCTION", "Karşılaştırma"),
    "нэӀэмый":         ("ETHICS", "INATTENTIVE", "Ahlak & Soyut"),
    "нэщӀу":           ("LIMIT", "EMPTY", "Sınır & Mesafe"),
    "нэфапӀэу":        ("LIGHT", "LIGHT_PLACE", "Işık & Aydınlık"),
    "нэуфӀыцӀщхьэрыуэу":("FACE", "DARK_FACE", "Yüz & Sima"),
    "нэкӀэу":          ("FACE", "CHEEK", "Yüz & Sima"),
    "нэджэӀуджэ":      ("ETHICS", "DISORDER", "Ahlak & Soyut"),
    "нэкъыфӀэщӀ":      ("EYE", "PLEASANT", "Göz & Görme"),
    "нэшэкъашэкӀэ":    ("ETHICS", "FLIRT", "Ahlak & Soyut"),
    "нэгъэупӀэпӀэгъум":("TIME", "MOMENT", "Zaman"),
    "нэщӀщ":           ("LIMIT", "EMPTY", "Sınır & Mesafe"),
    "нэхейкӀэ":        ("ETHICS", "INNOCENT", "Ahlak & Soyut"),
    "нэшӀо-гушӀу":     ("EMOTION", "JOY", "Duygu & Zihin"),
    "нэӀу":            ("FACE", "FRONT", "Yüz & Sima"),
    "нэӀуей":          ("ETHICS", "SHAMELESS", "Ahlak & Soyut"),
}

# Sözlük anahtarlarını normalize et (güvenlik)
SON_NORM = {normalize(k): v for k, v in SON.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("нэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in SON_NORM:
        concept, sub, family = SON_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "нэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Doğrulama
belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("нэ") and not l.get("subConceptId")]
print(f"OK - {uygulanan} kayit guncellendi")
print(f"Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    print("\nKalan belirsizler:")
    for f in belirsiz[:20]:
        # Debug: normalize + codepoint
        n = normalize(f)
        cps = " ".join(hex(ord(c)) for c in f)
        print(f"  {f:<25} | norm: {n:<25} | cps: {cps}")
