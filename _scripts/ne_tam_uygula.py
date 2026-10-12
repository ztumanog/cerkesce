import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize_palochka(text):
    if not text:
        return ""
    return text.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")

# ============================================================
# GENİŞLETİLMİŞ SINIFLANDIRMA — 12 kategori
# ============================================================
def siniflandir(form, anlam):
    f = normalize_palochka(form)
    a = (anlam or "").lower()
    
    # === ÖZEL KELİMELER (Mimar onaylı) ===
    OZEL = {
        "нэшэбэгу": ("PLANT", "CUCUMBER", "Bitki & Doğa"),
        "нэмыцэ":   ("PERSON", "GERMAN", "Kişi & Halk"),
        "нэрыбгэ":  ("PERSON", "PERSON", "Kişi & Halk"),
        "нэнау":    ("FAMILY", "MOTHER", "Aile"),
        "нэпкъ":    ("NATURE", "SHORE", "Doğa & Coğrafya"),
        "нэху":     ("LIGHT", "LIGHT", "Işık & Aydınlık"),
        "нэщэнэ":   ("SIGN", "SIGN", "Belirti & İşaret"),
        "нэшан":    ("SIGN", "SIGN", "Belirti & İşaret"),
        "нэгъэсауэ":("COMPARISON", "COMPLETELY", "Karşılaştırma"),
        "нэмыплъ":  ("VISIBILITY", "INATTENTION", "Görünürlük"),
        "нэгъэсын": ("LIMIT", "DELIVER", "Sınır & Mesafe"),
    }
    
    if f in OZEL:
        return OZEL[f]
    
    # === GÖZ & GÖRME ===
    if any(f.startswith(p) for p in ["нэшъу", "нэшӀу", "нэху", "нэфӀ", "нэр",
                                       "нэбжь", "нэпс", "нэбдзы", "нэбзый",
                                       "нэкулъ", "нэджы", "нэжгъ", "нэжьгъ"]):
        return ("EYE", "EYE", "Göz & Görme")
    
    # === IŞIK ===
    if any(f.startswith(p) for p in ["нэфын", "нэхущ", "нэхулъ", "нэхуап",
                                       "нэхукӀ", "нэфылъ", "нэфу", "нэфыр",
                                       "нэфым", "нэфшъагъ", "нэхугъэ", "нэхунэ",
                                       "нэхуу", "нэхум", "нэхур", "нэхущхь",
                                       "нэхумыщ", "нэхъу-нэхъ"]) or f == "нэф":
        return ("LIGHT", "LIGHT", "Işık & Aydınlık")
    
    # === SADNESS ===
    if any(f.startswith(p) for p in ["нэщхъей", "нэщхъеягъ", "нэщхъеигъ",
                                       "нэщхъеял", "нэщхъыдж", "нэщхъыц",
                                       "нэщхъыфӀ", "нэщхъпэ", "нэщхъыр",
                                       "нэщхъ", "нэшхъэй", "нэшхъэин",
                                       "нэшхъэигъ", "нэшх-пэшх"]):
        return ("SADNESS", "SADNESS", "Üzüntü & Keder")
    
    # === YAŞ ===
    if any(f.startswith(p) for p in ["нэхъыжь", "нэхъщӀ", "нэхъыщӀ"]):
        return ("AGE", "AGE", "Yaş & Karşılaştırma")
    
    # === DİN ===
    if any(f.startswith(p) for p in ["нэмэз", "нэмаз", "нэчыхь", "нэлат"]):
        return ("RELIGION", "RELIGION", "Din & İnanç")
    
    # === GÖRÜNÜRLÜK ===
    if any(f.startswith(p) for p in ["нэрылъагъу", "нэрымылъагъу",
                                       "нэрылъэгъу", "нэрымылъэ",
                                       "нэрлъэгъу", "нэрыплъэ", "нэплъ"]):
        return ("VISIBILITY", "VISIBILITY", "Görünürlük")
    
    # === KARŞILAŞTIRMA ===
    if any(f.startswith(p) for p in ["нэхъыб", "нэхъри", "нэхъыщхь",
                                       "нэхъыфӀ", "нэхъыкӀ", "нэхъыр",
                                       "нэхъеи", "нэхъап", "нэхъ", "нэхь",
                                       "нэуж"]):
        return ("COMPARISON", "COMPARISON", "Karşılaştırma")
    
    # === UTANÇ ===
    if any(f.startswith(p) for p in ["нэпэнчъ", "нэукӀытэ", "нэпэтех",
                                       "нэпэпкъ", "нэмыс", "нэпч"]):
        return ("SHAME", "SHAME", "Utanç & Ahlak")
    
    # === AHLAK ===
    if any(f.startswith(p) for p in ["нэшӀу", "нэфӀэгу", "нэгъэса",
                                       "нэшэн", "нэщан", "нэуат"]):
        return ("ETHICS", "ETHICS", "Ahlak & Soyut")
    
    # === YÜZ ===
    if any(f.startswith(p) for p in ["нэгу", "нэкӀу", "нэку", "нэжэгуж", "нэгуф"]):
        return ("FACE", "FACE", "Yüz & Sima")
    
    # === SINIR & MESAFE ===
    if any(f.startswith(p) for p in ["нэс", "нэз", "нэблэгъ", "нэгъаб",
                                       "нэгъун", "нэмыкӀ", "нэмыщӀ", "нэкӀыс",
                                       "нэӀус", "нэӀэс", "нэӀэбэс"]):
        return ("LIMIT", "LIMIT", "Sınır & Mesafe")
    
    # === BELİRSİZ ===
    return ("BELIRSIZ", "-", "-")

# ============================================================
# UYGULA
# ============================================================
uygulanan = 0
belirsiz = []

for l in lex:
    form = l.get("form", "")
    if not form.startswith("нэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    concept, sub, family = siniflandir(form, l.get("literalMeaning") or "")
    
    if concept == "BELIRSIZ":
        belirsiz.append((form, l.get("literalMeaning") or "?"))
        continue
    
    l["conceptId"] = concept
    l["subConceptId"] = sub
    l["taxonomyFamily"] = family
    l["rootForm"] = "нэ-"
    uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"OK - {uygulanan} kayit guncellendi")
print(f"Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    print("\nIlk 30 belirsiz:")
    for f, a in belirsiz[:30]:
        print(f"  {f:<25} | {a[:40]}")

# Rapor dosyası
with open("_scripts/ne_belirsiz_son.txt", "w", encoding="utf-8") as f:
    f.write(f"BELİRSİZ KALAN — {len(belirsiz)} kayit\n")
    f.write("=" * 80 + "\n\n")
    for form, anlam in belirsiz:
        f.write(f"{form:<25} | {anlam[:50]}\n")
