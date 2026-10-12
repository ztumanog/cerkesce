import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

# Mimarın 3 CSV listesinden DERLENMİŞ veri
PE = {
    # 1. tur
    "пэ":              ("NOSE", "NOSE_BODY", "İnsan & Beden"),
    "пэбг":            ("NOSE_BRIDGE", "NOSE_PART", "İnsan & Beden"),
    "пэбгъэн":         ("FRONT_CHEST", "CHEST_FORWARD", "Eylem & Beden"),
    "пэбж":            ("NOSE_HOLE", "NOSE_PART", "İnsan & Beden"),
    "пэбжьэ":          ("NOSE_TIP", "NOSE_PART", "İnsan & Beden"),
    "пэбжьэуэн":       ("NOSE_CLASH", "FRONT_ACTION", "Eylem & Fiziksel"),
    "пэбзий":          ("NOSE_HAIR", "NOSE_PART", "İnsan & Beden"),
    "пэблагъ":         ("NEARBY", "PROXIMITY", "Mekan & Yön"),
    "пэблагъэ":        ("NEARBY", "PROXIMITY", "Mekan & Yön"),
    "пэблагъэу":       ("NEARBY_ADV", "PROXIMITY_ADV", "Gramer & Nitelik"),
    "пэблэгъэ":        ("NEARNESS", "PROXIMITY_STATE", "Mekan & Yön"),
    "пэгагъ":          ("ARROGANCE", "NOSE_PRIDE", "Nitelik & Ahlak"),
    "пэгагъэ":         ("ARROGANCE", "NOSE_PRIDE", "Nitelik & Ahlak"),
    "пэгун":           ("BUCKET", "CONTAINER", "Eşya & Araç"),
    "пэгъокӀ":         ("ENCOUNTER", "MEET_ACTION", "Kültür & Etkileşim"),
    "пэгъу":           ("COMPANION", "FRONT_PARTNER", "Toplum & İlişki"),
    "пэгъубжэ":        ("WINDOW", "FRONT_OPENING", "Eşya & Ev"),
    "пэгъунэгъу":      ("NEIGHBOR", "PROXIMITY", "Toplum & İlişki"),

    # 2. tur (önemli olanlar)
    "пэж":             ("TRUE", "TRUTH", "Düşünce & Soyut"),
    "пэжагъ":          ("TRUTH", "HONESTY", "Düşünce & Soyut"),
    "пэжыгъэ":         ("TRUTH", "HONESTY", "Düşünce & Soyut"),
    "пэжыжьэ":         ("FAR", "DISTANT", "Mekan & Yön"),
    "пэмыкӏ":          ("OTHER", "DIFFERENT", "Düşünce & Soyut"),
    "пэмын":           ("SMELL", "SENSE", "İnsan & Beden"),
    "пэмэн":           ("SMELL", "SENSE", "İnsan & Beden"),
    "пэнтх":           ("NOSE_BRIDGE", "BODY_PART", "İnsan & Beden"),
    "пэнэ":            ("THORN", "PLANT", "Nitelik & Doğa"),
    "пэплъэ":          ("WAITING", "ATTENTION", "Düşünce & Soyut"),
    "пэплъэн":         ("WAIT", "LOOK_FORWARD", "Düşünce & Soyut"),
    "пэпцӀ":           ("FALSEHOOD", "LIE", "Düşünce & Soyut"),
    "пэр":             ("NOSE_FRONT", "BODY_PART", "İnsan & Beden"),
    "пэрыт":           ("LEADER", "FOREMOST", "Toplum & Meslek"),
    "пэрыуэ":          ("OBSTACLE", "IMPACT", "Eylem & Fiziksel"),
    "пэрыуэгъу":       ("OPPONENT", "RIVAL", "Toplum & Meslek"),
    "пэрыхьэн":        ("APPROACH", "ACTION", "Eylem & Fiziksel"),
    "пэрышын":         ("LEAD_FORWARD", "ACTION", "Eylem & Fiziksel"),
    "пэт":             ("WHILE", "CONJUNCTION", "Düşünce & Soyut"),
    "пэтын":           ("STAND_BEFORE", "POSITION", "Eylem & Fiziksel"),
    "пэув":            ("OPPONENT", "POSITION", "Toplum & Meslek"),
    "пэувын":          ("STAND_AGAINST", "OPPOSE", "Eylem & Fiziksel"),
    "пэфыкъ":          ("FLAT_NOSE", "BODY_PART", "İnsan & Beden"),
    "пэш":             ("ROOM", "HOME", "Mekan & Yön"),
    "пэшыр":           ("ROOM", "HOME", "Mekan & Yön"),
    "пэшэгъу":         ("ROOMMATE", "COMPANION", "Toplum & Meslek"),
    "пэшэж":           ("LEADER", "HEAD", "Toplum & Meslek"),
    "пэщхъын":         ("NOSTRIL", "BODY_PART", "İnsan & Beden"),
    "пэщэ":            ("PASHA_LEADER", "TITLE", "Toplum & Meslek"),
    "пэщэныгъэ":       ("LEADERSHIP", "WORK", "Toplum & Meslek"),
    "пэщӀын":          ("OPPOSE", "ACTION", "Eylem & Fiziksel"),
    "пэӀужын":         ("MOVE_AWAY", "MOVEMENT", "Eylem & Fiziksel"),

    # 3. tur
    "пэгъэувын":       ("PLACE_FORWARD", "CAUSATIVE_PLACE", "Eylem & Fiziksel"),
    "пэд":             ("NOSE_PART", "BODY_FRONT", "İnsan & Beden"),
    "пэджэжын":        ("RESPOND", "ANSWER_CALL", "Eylem & Dil"),
    "пэдзан":          ("THROW_FORWARD", "THROW_ACTION", "Eylem & Fiziksel"),
    "пэзэз":           ("HALT", "STAGGER", "Eylem & Fiziksel"),
    "пэкукъу":         ("NOSE_BONE", "NOSE_PART", "İnsan & Beden"),
    "пэкъурш":         ("HAWK_NOSED", "NOSE_SHAPE", "Nitelik & Beden"),
    "пэкӀун":          ("APPROACH", "GO_FORWARD", "Eylem & Fiziksel"),
    "пэлъху":          ("FOAL", "YOUNG_HORSE", "Doğa & Hayvan"),
    "пэлъыт":          ("EQUIVALENT", "EQUAL_VALUE", "Düşünce & Soyut"),
    "пэнтӀыкъ":        ("BLUNT_NOSED", "NOSE_SHAPE", "Nitelik & Beden"),
    "пэнцӀыв":         ("POINTED_NOSED", "NOSE_SHAPE", "Nitelik & Beden"),
    "пэпщэн":          ("PANT", "NOSE_BREATHE", "İnsan & Beden"),
    "пэрыдзэн":        ("THROW_FORWARD", "CAST_ACTION", "Eylem & Fiziksel"),
    "пэрыжын":         ("RUN_FORWARD", "RUSH_FORWARD", "Eylem & Fiziksel"),
    "пэрылъхьэн":      ("PUT_BEFORE", "ACTION", "Eylem & Fiziksel"),
    "пэрысын":         ("SIT_BEFORE", "POSITION", "Eylem & Fiziksel"),
    "пэрыуэн":         ("OBSTRUCT", "HIT", "Eylem & Fiziksel"),
    "пэрыхъумэн":      ("PROTECT", "GUARD", "Eşya & Savaş"),
    "пэублэ":          ("PREFACE", "START", "Eylem & Yazı"),
    "пэщӀэуэн":        ("RESIST", "ACTION", "Eylem & Fiziksel"),
    "пэщӏэувэн":       ("RESIST", "OPPOSE", "Eylem & Fiziksel"),
    "пэӀуэжын":        ("STEP_ASIDE", "MOVEMENT", "Eylem & Fiziksel"),
}

PE_NORM = {normalize(k): v for k, v in PE.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("пэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in PE_NORM:
        concept, sub, family = PE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "пэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("пэ") and not l.get("subConceptId")]
print(f"пэ- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    print("İlk 20:")
    for f in belirsiz[:20]:
        print(f"  - {f}")
else:
    print("\n🎉 пэ- KATEGORİSİ TAM BİTTİ!")
