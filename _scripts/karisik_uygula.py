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

# 48 kelime (kök bilgileriyle)
VERI = {
    "бзэбзэ":              ("SPEECH", "WHISPER_SOUND", "Dil & İletişim", "бзэ-"),
    "пэбжьэ":              ("TIME", "DAWN", "Zaman & Doğa", "пэ-"),
    "дзэгъуэ":             ("TIME", "PERIOD", "Zaman & Toplum", "дзэ-"),
    "къуиблы":             ("FAMILY", "SEVEN_BROTHERS", "Aile & Akrabalık", "къуэ-"),
    "мэзкъогъум":          ("NATURE", "FOREST_EDGE", "Doğa & Coğrafya", "мэз-"),
    "бзащӀэпс":            ("SPEECH", "SWEET_TALK", "Dil & İletişim", "бзэ-"),
    "кубзэ":               ("LANGUAGE", "CORE_LANGUAGE", "Dil & İletişim", "бзэ-"),
    "гъубжь":              ("TOOL", "SPEAR_ROD", "Alet & Savaş", "гъущӀ-"),
    "бгъуэгъу":            ("RELATION", "COMPANION", "Toplum & İlişki", "бгъу-"),
    "блэчӀа":              ("MOTION", "PASS_BY", "Eylem & Hareket", "блэ-"),
    "блэчӀын":             ("MOTION", "PASS_BY", "Eylem & Hareket", "блэ-"),
    "кхъуэбан":            ("ANIMAL", "PIG_PEN", "Doğa & Hayvancılık", "кхъуэ-"),
    "бадз":                ("ANIMAL", "FLY_INSECT", "Doğa & Hayvanlar", "бадз-"),
    "щхъу":                ("FOOD", "YOGURT_COLOR", "Maddi Kültür", "щхъу-"),
    "пхъэхъуей":           ("PLANT", "OAK_TREE", "Doğa & Bitkiler", "пхъэ-"),
    "дежьей":              ("PLANT", "HAZELNUT_TREE", "Doğa & Bitkiler", "дежь-"),
    "пхъэжабэ":            ("TOOL", "WOODEN_BRUSH", "Alet & Eşya", "пхъэ-"),
    "шезае":               ("PLANT", "CHESTNUT_TREE", "Doğa & Bitkiler", "шэ-"),
    "кхэр":                ("DEATH", "GRAVES", "İnsan & Yaşam", "кхъэ-"),
    "деш":                 ("MATERIAL", "GOLD", "Doğa & Madenler", "дыщэ-"),
    "кӀэб":                ("BODY", "WAIST_KIDNEY", "İnsan & Beden", "кӀэб-"),
    "чъыгае":              ("PLANT", "OAK_TREE", "Doğa & Bitkiler", "чъыг-"),
    "хуэржэ":              ("CONTAINER", "BAG", "Maddi Kültür & Eşya", "хуэржэ-"),
    "фищын":               ("ACTION", "EXTRACT", "Eylem & Hareket", "щын-"),
    "бжьынгъэгъэ":         ("PLANT", "GARLIC_FLOWER", "Doğa & Bitkiler", "бжьын-"),
    "пщӀыкӀу":             ("NUMBER", "TEN", "Sayılar & Ölçü", "пщӀы-"),
    "пщӀыкӀутӀ":           ("NUMBER", "TWELVE", "Sayılar & Ölçü", "пщӀы-"),
    "гъамахуэ":            ("TIME", "SUMMER_DAY", "Zaman & Doğa", "гъэ-"),
    "мэлыжь":              ("TIME", "MARCH_MONTH", "Zaman & Takvim", "мэл-"),
    "зэдэлъхуэзэшыпхъу":   ("FAMILY", "SIBLINGS", "Aile & Akrabalık", "лъху-"),
    "зэпэдзэн":            ("ACTION", "THROW_MUTUAL", "Eylem & Etkileşim", "дзэн-"),
    "зэпэупщӀэн":          ("SPEECH", "QUESTION_MUTUAL", "Dil & İletişim", "упщӀэ-"),
    "Ӏуэпэ":               ("BODY", "LIP", "İnsan & Beden", "Ӏу-"),
    "хьэджэбз":            ("SPEECH", "ELOQUENT", "Dil & İletişim", "бзэ-"),
    "зэдэлъху":            ("FAMILY", "BROTHERS", "Aile & Akrabalık", "лъху-"),
    "дэлъхан":             ("MARRIAGE", "MARRY_INTO", "Aile & Akrabalık", "лъэ-"),
    "дэхан":               ("BEAUTY", "BEAUTIFY", "İnsan & Nitelik", "дахэ-"),
    "дэгъуаса":            ("TIME", "YESTERDAY_EVENING", "Zaman & Doğa", "гъуа-"),
    "дэгъуапщэхь":         ("TIME", "THIS_EVENING", "Zaman & Doğa", "пщэхь-"),
    "дзэн":                ("ACTION", "THROW", "Eylem & Hareket", "дзэн-"),
    "джадэу":              ("MANNER", "LIKE_CHICKEN_AXE", "Eylem & Tarz", "джадэ-"),
    "файцай":              ("SOUND", "WHISTLE_NOISE", "Doğa & Ses", "фай-"),
    "фӀэцӀа":              ("COLOR", "BLACKISH", "Nitelik & Renk", "цӀэ-"),
    "гупсэсан":            ("EMOTION", "CONFIDE", "Duygu & Düşünce", "гу-"),
    "еджакуэ":             ("PERSON", "STUDENT", "Toplum & Eğitim", "еджэ-"),
    "егупсэсауэ":          ("MIND", "THOUGHTFULLY", "Duygu & Düşünce", "гу-"),
    "егупсэсэн":           ("MIND", "THINK_DEEPLY", "Duygu & Düşünce", "гу-"),
    "елъан":               ("ACTION", "ATTACK_LEAP", "Eylem & Hareket", "лъэн-"),
}

VERI_NORM = {normalize(k): v for k, v in VERI.items()}

uygulanan = 0
bulunamayan = []
for l in lex:
    form = l.get("form", "")
    norm = normalize(form)
    if norm in VERI_NORM:
        concept, sub, family, root = VERI_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = root
        uygulanan += 1
        # listeden çıkar
        del VERI_NORM[norm]

# Eşleşmeyenler
bulunamayan = list(VERI_NORM.keys())

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")
if bulunamayan:
    print(f"Bulunamayan: {len(bulunamayan)}")
    for f in bulunamayan[:20]:
        print(f"  - {f}")
else:
    print("🎉 Tüm 48 kayıt bulundu ve uygulandı!")
