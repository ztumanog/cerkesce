import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    text = text.replace('\u04cf', '\u04e0')
    text = text.replace('I', '\u04e0')
    text = text.replace('l', '\u04e0')
    text = text.replace('1', '\u04e0')
    text = text.replace('s', 's')  # нэфsэт için
    return text.strip()

# Mimar'ın 61 kelimesi — TAM LİSTE
SON_61 = {
    # 1. SINIR & MESAFE / AHLAK
    "нэщӀ":            ("LIMIT", "EMPTY", "Sınır & Mesafe"),
    # 2. YÜZ & SİMA
    "нэкӀым":          ("FACE", "CHEEK", "Yüz & Sima"),
    # 3. SINIR
    "нэщӀым":          ("LIMIT", "EMPTY", "Sınır & Mesafe"),
    # 4. YÜZ
    "нэкӀэ":           ("FACE", "CHEEK", "Yüz & Sima"),
    # 5. AHLAK
    "нэӀэ":            ("ETHICS", "ATTENTION", "Ahlak & Soyut"),
    # 6. GÖZ
    "нэпитӀу":         ("EYE", "TWO_EYES", "Göz & Görme"),
    # 7. AHLAK
    "нэӀуасэ":         ("ETHICS", "ACQUAINTANCE", "Ahlak & Soyut"),
    # 8. YÜZ
    "нэкӀ":            ("FACE", "CHEEK", "Yüz & Sima"),
    # 10. YÜZ
    "нэкӀы":           ("FACE", "CHEEK", "Yüz & Sima"),
    # 11. KARŞILAŞTIRMA
    "нэмыӀэми":        ("COMPARISON", "CONJUNCTION", "Karşılaştırma"),
    # 12. AHLAK
    "нэӀэмый":         ("ETHICS", "INATTENTIVE", "Ahlak & Soyut"),
    # 14. SINIR
    "нэщӀу":           ("LIMIT", "EMPTY", "Sınır & Mesafe"),
    # 15. IŞIK
    "нэфапӀэу":        ("LIGHT", "LIGHT_PLACE", "Işık & Aydınlık"),
    # 16. YÜZ
    "нэуфӀыцӀщхьэрыуэу":("FACE", "DARK_FACE", "Yüz & Sima"),
    # 17. YÜZ
    "нэкӀэу":          ("FACE", "CHEEK", "Yüz & Sima"),
    # 18. AHLAK
    "нэджэӀуджэ":      ("ETHICS", "DISORDER", "Ahlak & Soyut"),
    # 19. AHLAK
    "нэфсэт":          ("ETHICS", "DESIRE", "Ahlak & Soyut"),
    # 20. GÖZ
    "нэшъоу":          ("EYE", "BLIND", "Göz & Görme"),
    # 21. GÖZ/AHLAK
    "нэкъыфӀэщӀ":      ("EYE", "PLEASANT", "Göz & Görme"),
    # 22. AHLAK
    "нэшэкъашэкӀэ":    ("ETHICS", "FLIRT", "Ahlak & Soyut"),
    # 23. ZAMAN
    "нэпе":            ("TIME", "TODAY", "Zaman"),
    # 24. SINIR
    "нэтан":           ("LIMIT", "TARGET", "Sınır & Mesafe"),
    # 25. BELİRTİ
    "нэшанэхэр":       ("SIGN", "SIGNS", "Belirti & İşaret"),
    # 26. ZAMAN
    "нэгъэупӀэпӀэгъум":("TIME", "MOMENT", "Zaman"),
    # 27. SINIR
    "нэщӀщ":           ("LIMIT", "EMPTY", "Sınır & Mesafe"),
    # 28. BELİRTİ
    "нэщэнэщ":         ("SIGN", "SIGN", "Belirti & İşaret"),
    # 29. AHLAK
    "нэхейкӀэ":        ("ETHICS", "INNOCENT", "Ahlak & Soyut"),
    # 30. AHLAK
    "нэшӀо-гушӀу":     ("EMOTION", "JOY", "Duygu & Zihin"),
    # 31. AİLE
    "нэнаур":          ("FAMILY", "MOTHER", "Aile"),
    # 32. AHLAK
    "нэхай":           ("ETHICS", "INNOCENT", "Ahlak & Soyut"),
    # 33. DOĞA
    "нэпкъыжьэ":       ("NATURE", "CLIFF", "Doğa & Coğrafya"),
    # 34. AİLE
    "нэщыпхъуэ":       ("FAMILY", "SISTER_IN_LAW", "Aile"),
    # 35. KİŞİ
    "нэгэгъу":         ("PERSON", "PEER", "Kişi & Halk"),
    # 36. SINIR
    "нэпх":            ("LIMIT", "BORDER", "Sınır & Mesafe"),
    # 37. EYLEM
    "нэджэдысын":      ("ACTION", "SIT_UNTIL", "Eylem"),
    # 38. EYLEM
    "нэпщысын":        ("ACTION", "COUNT", "Eylem"),
    # 39. AİLE
    "нэпшъашъ":        ("FAMILY", "STEPDAUGHTER", "Aile"),
    # 40. YÜZ
    "нэщхы-гущх":      ("FACE", "CHEERFUL", "Yüz & Sima"),
    # 41. AİLE
    "нэнэжъ":          ("FAMILY", "GRANDMOTHER", "Aile"),
    # 42. YÜZ
    "нэӀу":            ("FACE", "FRONT", "Yüz & Sima"),
    # 43. AHLAK
    "нэӀуей":          ("ETHICS", "SHAMELESS", "Ahlak & Soyut"),
    # 44. DİL
    "нэӀурыдзэ":       ("LANGUAGE", "SPEECH", "Dil & İletişim"),
    # 45. KONUM
    "нэӀурыт":         ("SPACE", "FRONT", "Mekan & Yön"),
    # 46. SINIR
    "нэд":             ("LIMIT", "REACH", "Sınır & Mesafe"),
    # 47. AHLAK
    "нэдж-нэпцӀ":      ("ETHICS", "HYPOCRITE", "Ahlak & Soyut"),
    # 48. DİL
    "нэмыцэбзэ":       ("LANGUAGE", "GERMAN_LANG", "Dil & İletişim"),
    # 49. GÖZ
    "нэтемыхыу":       ("EYE", "ATTENTIVE", "Göz & Görme"),
    # 50. AHLAK
    "нэутхэ":          ("MIND", "SHARP_MIND", "Ahlak & Soyut"),
    # 51. AHLAK
    "нэхей":           ("ETHICS", "INNOCENT", "Ahlak & Soyut"),
    # 52. AHLAK/YÜZ
    "нэшхуэгушхуэ":    ("ETHICS", "GENEROUS", "Ahlak & Soyut"),
    # 53. AHLAK
    "нэшхуэгушхуэу":   ("ETHICS", "GENEROUS", "Ahlak & Soyut"),
    # 54. AHLAK
    "нэшэкъашэ":       ("ETHICS", "FLIRT", "Ahlak & Soyut"),
    # 55. DİL
    "нэщӀгъущӀыдзэ":   ("LANGUAGE", "GOSSIP", "Dil & İletişim"),
    # 56. SINIR
    "нэщӀей":          ("LIMIT", "EMPTY", "Sınır & Mesafe"),
    # 57. EYLEM
    "нэщӀикӀыж":       ("ACTION", "EVACUATE", "Eylem"),
    # 58. EYLEM
    "нэщӀын":          ("ACTION", "EMPTY_VERB", "Eylem"),
    # 59. EYLEM
    "нэщӀысын":        ("ACTION", "SIT_IDLE", "Eylem"),
    # 60. VÜCUT
    "нэщӀэпкӀэ":       ("BODY", "WEAK", "Vücut"),
    # 61. KONUM
    "нэщӀыбагъ":       ("SPACE", "BACK", "Mekan & Yön"),
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("нэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in SON_61:
        concept, sub, family = SON_61[norm]
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
    for f in belirsiz:
        print(f"  - {f}")
else:
    print("\n🎉 нэ- KATEGORİSİ TAM BİTTİ!")
