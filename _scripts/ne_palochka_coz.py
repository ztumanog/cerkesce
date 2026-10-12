import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# DOĞRU normalize — TÜM varyantları büyük Ӏ yap
def normalize(text):
    if not text:
        return ""
    text = text.replace('\u04cf', '\u04e0')  # ӏ → Ӏ
    text = text.replace('I', '\u04e0')
    text = text.replace('l', '\u04e0')
    text = text.replace('1', '\u04e0')
    return text.strip()

# Sözlük (normalize edilmiş formatta)
SON_DUZELTME = {
    # GÖZ
    "нэм": ("EYE", "EYE"),
    "нэхэр": ("EYE", "EYES"),
    "нэхэм": ("EYE", "EYES"),
    "нэпитӀу": ("EYE", "TWO_EYES"),
    # YÜZ
    "нэкӀ": ("FACE", "CHEEK"),
    "нэкӀы": ("FACE", "CHEEK"),
    "нэкӀым": ("FACE", "CHEEK"),
    "нэкӀэ": ("FACE", "CHEEK"),
    "нэкӀэу": ("FACE", "CHEEK"),
    "нэуфӀыцӀщхьэрыуэу": ("FACE", "DARK_FACE"),
    # SINIR
    "нэщӀ": ("LIMIT", "EMPTY"),
    "нэщӀым": ("LIMIT", "EMPTY"),
    "нэщӀу": ("LIMIT", "EMPTY"),
    "нэшэсын": ("LIMIT", "DELIVER"),
    # BELİRTİ
    "нэщэнэ": ("SIGN", "SIGN"),
    "нэщэнэхэр": ("SIGN", "SIGNS"),
    "нэщэнэхэм": ("SIGN", "SIGNS"),
    "нэщэнэу": ("SIGN", "SIGN"),
    "нэшанэ": ("SIGN", "SIGN"),
    # AHLAK
    "нэӀуасэ": ("ETHICS", "ACQUAINTANCE"),
    "нэӀэ": ("ETHICS", "ATTENTION"),
    "нэӀэмый": ("ETHICS", "INATTENTIVE"),
    "нэмыгъэса": ("ETHICS", "UNTRAINED"),
    "нэутхагъ": ("MIND", "SHARP_MIND"),
    "нэутх": ("MIND", "SHARP_MIND"),
    # DOĞA
    "нэпкъым": ("NATURE", "SHORE"),
    # IŞIK
    "нэфапӀэу": ("LIGHT", "LIGHT_PLACE"),
    # KİŞİ
    "нэмыц": ("PERSON", "GERMAN"),
    # KARŞILAŞTIRMA
    "нэмыӀэми": ("COMPARISON", "CONJUNCTION"),
}

AİLE = {
    "EYE": "Göz & Görme", "FACE": "Yüz & Sima", "LIMIT": "Sınır & Mesafe",
    "SIGN": "Belirti & İşaret", "ETHICS": "Ahlak & Soyut", "MIND": "Ahlak & Soyut",
    "NATURE": "Doğa & Coğrafya", "LIGHT": "Işık & Aydınlık",
    "PERSON": "Kişi & Halk", "COMPARISON": "Karşılaştırma",
}

# Sözlüğü de normalize et (güvenlik için)
SON_DUZELTME = {normalize(k): v for k, v in SON_DUZELTME.items()}

uygulanan = 0
islenen = set()

for l in lex:
    form = l.get("form", "")
    if not form.startswith("нэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in SON_DUZELTME:
        concept, sub = SON_DUZELTME[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = AİLE[concept]
        l["rootForm"] = "нэ-"
        uygulanan += 1
        islenen.add(norm)

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Doğrulama
belirsiz = []
for l in lex:
    if l.get("form", "").startswith("нэ") and not l.get("subConceptId"):
        belirsiz.append(l.get("form"))

print(f"OK - {uygulanan} kayit guncellendi")
print(f"Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    print("\nKalan belirsizler:")
    for f in belirsiz:
        print(f"  - {f}")
else:
    print("\n🎉 нэ- KATEGORİSİ TAM BİTTİ!")
