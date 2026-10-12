import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    text = text.replace('I', '\u04c0').replace('l', '\u04c0').replace('1', '\u04c0')
    return text.strip()

# 4. TUR — 128 kayıt
IHE_4TUR = {
    "Ӏэбыдэлъэбыдэу":     ("ROBUST", "BODY_STRENGTH_ADV", "Gramer & Nitelik"),
    "ӀэнэкӀэ":            ("TABLE", "TABLE_BY", "Gramer & Çekim"),
    "ӀэнэщӀу":            ("EMPTY_HANDED", "HAND_EMPTY_ADV", "Gramer & Nitelik"),
    "ӀэтӀэлъатӀэ":        ("SLACK", "BODY_SLACK", "Nitelik & Beden"),
    "ӀэфӀыгъэкӀэ":        ("SWEETLY", "TASTE_ADV", "Gramer & Nitelik"),
    "Ӏэхуитлъэхуит":      ("FREELY", "FREEDOM_ADV", "Gramer & Nitelik"),
    "ӀэхъушэдэмыкӀуэ":    ("STRAY_HERD", "ANIMAL_BEHAVIOR", "Doğa & Hayvan"),
    "Ӏэхъуэгъу":          ("HERDING_TIME", "HERDING_PERIOD", "Zaman & Çalışma"),
    "ӏэбэри":             ("GROPE_EVEN", "HAND_SEARCH_EVEN", "Gramer & Çekim"),
    "ӏэгуаор":            ("APPLAUSE", "APPLAUSE_NOM", "Gramer & Çekim"),
    "ӏэгукӏэ":            ("PALM", "HAND_INSTRUMENTAL", "Gramer & Çekim"),
    "ӏэгъуэблагъэм":      ("KINSHIP", "RELATIVES_OBLIQUE", "Gramer & Çekim"),
    "ӏэджи":              ("MANY_EVEN", "QUANTITY_EVEN", "Gramer & Çekim"),
    "ӏэджэкӏэ":           ("MANY", "QUANTITY_INS", "Gramer & Çekim"),
    "ӏэджэм":             ("MANY", "QUANTITY_OBL", "Gramer & Çekim"),
    "ӏэджэрэ":            ("MANY_TIMES", "QUANTITY_TIMES", "Gramer & Çekim"),
    "ӏэдэм":              ("TOOL", "HAND_TOOL_OBL", "Gramer & Çekim"),
    "ӏэжьэ":              ("HANDLE", "HAND_HANDLE", "Eşya & Araç"),
    "ӏэзагъ":             ("HEALING_SKILL", "DEXTERITY", "Nitelik & Beceri"),
    "ӏэзагъэ":            ("MASTERY", "HAND_SKILL", "Nitelik & Beceri"),
    "ӏэзэм":              ("HEALER", "DOCTOR_OBL", "Gramer & Çekim"),
    "ӏэзэу":              ("HEALER", "DOCTOR_ADV", "Gramer & Çekim"),
    "ӏэзэщ":              ("HEALER", "DOCTOR_PRED", "Gramer & Çekim"),
    "ӏэкӏуэлъакӏуэу":     ("SKILLFULLY", "HANDY_ADV", "Gramer & Nitelik"),
    "ӏэкӏэ":              ("HAND", "HAND_BY", "Gramer & Çekim"),
    "ӏэлъэщӏыр":          ("TOWEL", "HAND_CLOTH_NOM", "Gramer & Çekim"),
    "ӏэмалкӏэ":           ("MEANS", "METHOD_INS", "Gramer & Çekim"),
    "ӏэмалу":             ("MEANS", "METHOD_ADV", "Gramer & Çekim"),
    "ӏэмалхэр":           ("MEANS", "METHOD_PL", "Gramer & Çekim"),
    "ӏэмалыншагъэкӏэ":    ("HELPLESSNESS", "NO_MEANS_INS", "Gramer & Çekim"),
    "ӏэмалыншэу":         ("HELPLESSLY", "NO_MEANS_ADV", "Gramer & Nitelik"),
    "ӏэмалыр":            ("MEANS", "METHOD_NOM", "Gramer & Çekim"),
    "ӏэмыркӏэ":           ("COMMAND", "ORDER_INS", "Gramer & Çekim"),
    "ӏэмырыр":            ("COMMAND", "ORDER_NOM", "Gramer & Çekim"),
    "ӏэмыщӏэм":           ("PALM", "HANDFUL_OBL", "Gramer & Çekim"),
    "ӏэмэпсымэхэр":       ("TOOLS", "EQUIPMENT_PL", "Gramer & Çekim"),
    "ӏэнатӏэм":           ("DUTY", "POSITION_OBL", "Gramer & Çekim"),
    "ӏэнкуну":            ("ASTONISHED", "STUNNED_ADV", "Gramer & Nitelik"),
    "ӏэнэм":              ("TABLE", "TABLE_DAT", "Gramer & Çekim"),
    "ӏэнэр":              ("TABLE", "TABLE_NOM", "Gramer & Çekim"),
    "ӏэпкълъэпкъкӏэ":     ("BODY_STRUCTURE", "BODY_INS", "Gramer & Çekim"),
    "ӏэпкълъэпкъым":      ("BODY_STRUCTURE", "BODY_OBL", "Gramer & Çekim"),
    "ӏэпкълъэпкъыр":      ("BODY_STRUCTURE", "BODY_NOM", "Gramer & Çekim"),
    "ӏэпщэр":             ("WRIST", "ARM_NOM", "Gramer & Çekim"),
    "ӏэпыдзлъэпыдз":      ("TURMOIL", "HASTY_ACTION", "Eylem & Fiziksel"),
    "ӏэпыхур":            ("DROPPED_ITEM", "FALLEN_ITEM", "Gramer & Çekim"),
    "ӏэпыӏэгъоу":         ("HELPFULLY", "HELPER_ADV", "Gramer & Nitelik"),
    "ӏэпыӏэгъуи":         ("HELP_EVEN", "ASSISTANCE_EVEN", "Gramer & Çekim"),
    "ӏэпэдэгъэлэл":       ("LOOSE_FINGERS", "HAND_LOOSE", "Nitelik & Beden"),
    "ӏэпэкӏэ":            ("FINGER", "HAND_BY", "Gramer & Çekim"),
    "ӏэпэм":              ("FINGER", "HAND_DAT", "Gramer & Çekim"),
    "ӏэпэр":              ("FINGER", "HAND_NOM", "Gramer & Çekim"),
    "ӏэпэрытххэм":        ("MANUSCRIPTS", "HANDWRITING_PL", "Gramer & Çekim"),
    "ӏэпэхэр":            ("FINGERS", "HAND_PLURAL", "Gramer & Çekim"),
    "ӏэрамэ":             ("BOUQUET", "FLOWER_BUNCH", "Doğa & Eşya"),
    "ӏэрытхыр":           ("MANUSCRIPT", "HANDWRITING_NOM", "Gramer & Çekim"),
    "ӏэсау":              ("TAME", "DOMESTICATED_ADV", "Gramer & Nitelik"),
    "ӏэсэ":               ("TAME", "DOMESTICATED", "Nitelik & Doğa"),
    "ӏэсэн":              ("BECOME_TAME", "DOMESTICATE_ACTION", "Eylem & Fiziksel"),
    "ӏэсэу":              ("TAMELY", "DOMESTICATED_ADV", "Gramer & Nitelik"),
    "ӏэтауэ":             ("RAISED", "LIFTED_ADV", "Gramer & Nitelik"),
    "ӏэтащхьэ":           ("PROUD_HEAD", "RAISED_HEAD", "Nitelik & Beden"),
    "ӏэтащхьэм":          ("PROUD", "RAISED_HEAD_OBL", "Gramer & Çekim"),
    "ӏэтащхьэр":          ("PROUD", "RAISED_HEAD_NOM", "Gramer & Çekim"),
    "ӏэтащхьэу":          ("PROUDLY", "RAISED_HEAD_ADV", "Gramer & Nitelik"),
    "ӏэтащхьэхэм":        ("PROUD", "RAISED_HEAD_PL_OBL", "Gramer & Çekim"),
    "ӏэткӏэ":             ("LIFTING", "RAISED_INS", "Gramer & Çekim"),
    "ӏэтыгъэкӏэ":         ("ELEVATION", "RAISED_ITEM_INS", "Gramer & Çekim"),
    "ӏэтыгъэу":           ("ELEVATED_STATE", "LIFTED_STATE", "Gramer & Nitelik"),
    "ӏэтэ":               ("STACK", "HAY_STACK", "Doğa & Eşya"),
    "ӏэу":                ("HAND", "HAND_AS", "Gramer & Çekim"),
    "ӏэубыдыпӏэншэ":      ("UNGROUNDED", "NO_HOLD_PLACE", "Nitelik & Soyut"),
    "ӏэубытыпӏэ":         ("HOLD_PLACE", "SUPPORT_POINT", "Eşya & Araç"),
    "ӏэужь":              ("HAND_TRACE", "LEGACY_WORK", "Kültür & Beden"),
    "ӏэуэлъауэ":          ("NOISE", "CLAMOR_NOISE", "Kültür & Etkileşim"),
    "ӏэуэлъауэншэ":       ("NOISELESS", "QUIET_STATE", "Nitelik & Doğa"),
    "ӏэуэлъауэр":         ("NOISE", "CLAMOR_NOM", "Gramer & Çekim"),
    "ӏэуэлъэуэн":         ("MAKE_NOISE", "CLAMOR_ACTION", "Eylem & Fiziksel"),
    "ӏэфӏ":               ("SWEET", "DELICIOUS_TASTE", "Doğa & Besin"),
    "ӏэфӏу":              ("SWEETLY", "TASTE_ADV", "Gramer & Nitelik"),
    "ӏэфӏыкӏэ":           ("SWEET", "SWEET_SPEAKING_INS", "Gramer & Çekim"),
    "ӏэфӏыщэ":            ("VERY_SWEET", "TOO_SWEET", "Nitelik & Doğa"),
    "ӏэхъогъу":           ("HERDING_TIME", "HERDING_PERIOD", "Zaman & Çalışma"),
    "ӏэхъогъум":          ("HERDING_TIME", "HERDING_DAT", "Gramer & Çekim"),
    "ӏэхъогъур":          ("HERDING_TIME", "HERDING_NOM", "Gramer & Çekim"),
    "ӏэхъу-лъэхъу":       ("HERD_ASSOCIATES", "HERD_GROUP", "Toplum & Meslek"),
    "ӏэхъуамбэр":         ("FINGER", "HAND_FINGER_NOM", "Gramer & Çekim"),
    "ӏэхъулъэхъу":        ("HERD_ASSOCIATES", "HERD_GROUP", "Toplum & Meslek"),
    "ӏэхъулъэхъухэр":     ("HERD_GROUPS", "HERD_PL", "Gramer & Çekim"),
    "ӏэхъуэ":             ("HERDER", "SHEPHERD", "Toplum & Meslek"),
    "ӏэхъуэм":            ("HERDER", "SHEPHERD_DAT", "Gramer & Çekim"),
    "ӏэхэм":              ("HANDS", "HANDS_DAT", "Gramer & Çekim"),
    "ӏэхэмкӏэ":           ("HANDS", "HANDS_BY", "Gramer & Çekim"),
    "ӏэхэр":              ("HANDS", "HANDS_NOM", "Gramer & Çekim"),
    "ӏэчлъэч":            ("STRONG_BRAVE", "ROBUST_PERSON", "Nitelik & Beceri"),
    "ӏэштӏымкӏэ":         ("FIST", "FIST_BY", "Gramer & Çekim"),
    "ӏэшъхьэтет":         ("OVERSEER", "LEADER_MANAGER", "Toplum & Yönetim"),
    "ӏэшъхьэтетхэм":      ("OVERSEERS", "LEADERS_OBL", "Gramer & Çekim"),
    "ӏэшъхьэтетхэми":     ("OVERSEERS", "LEADERS_EVEN", "Gramer & Çekim"),
    "ӏэшъхьэтетхэр":      ("OVERSEERS", "LEADERS_NOM", "Gramer & Çekim"),
    "ӏэшъхьэтетым":       ("OVERSEER", "LEADER_DAT", "Gramer & Çekim"),
    "ӏэшъхьэтетэу":       ("OVERSEER", "LEADER_ADV", "Gramer & Çekim"),
    "ӏэшӏу":              ("SWEET", "DELICIOUS", "Doğa & Besin"),
    "ӏэшӏэх":             ("EASY_QUICK", "SIMPLE_ACTION", "Nitelik & Beceri"),
    "ӏэщ":                ("LIVESTOCK", "FARM_ANIMAL", "Doğa & Hayvan"),
    "ӏэщхьэр":            ("SLEEVE", "ARM_NOM", "Gramer & Çekim"),
    "ӏэщхьэхэр":          ("SLEEVES", "ARMS_PL_NOM", "Gramer & Çekim"),
    "ӏэщхэм":             ("LIVESTOCK", "ANIMALS_DAT", "Gramer & Çekim"),
    "ӏэщхэр":             ("LIVESTOCK", "ANIMALS_NOM", "Gramer & Çekim"),
    "ӏэщым":              ("LIVESTOCK", "ANIMAL_DAT", "Gramer & Çekim"),
    "ӏэщыр":              ("LIVESTOCK", "ANIMAL_NOM", "Gramer & Çekim"),
    "ӏэщэкӏэ":            ("WEAPON", "WEAPON_BY", "Gramer & Çekim"),
    "ӏэщэм":              ("WEAPON", "WEAPON_DAT", "Gramer & Çekim"),
    "ӏэщэншэ":            ("UNARMED", "NO_WEAPON", "Eşya & Savaş"),
    "ӏэщэр":              ("WEAPON", "WEAPON_NOM", "Gramer & Çekim"),
    "ӏэщэфащэр":          ("ARMOR_WEAPONS", "WAR_GEAR_NOM", "Gramer & Çekim"),
    "ӏэщэхэр":            ("WEAPONS", "WEAPONS_NOM", "Gramer & Çekim"),
    "ӏэщӏагъэлӏ":         ("CRAFTSMAN", "SKILLED_PERSON", "Toplum & Meslek"),
    "ӏэщӏагъэм":          ("CRAFT", "PROFESSION_DAT", "Gramer & Çekim"),
    "ӏэщӏагъэр":          ("CRAFT", "PROFESSION_NOM", "Gramer & Çekim"),
    "ӏэщӏыб":             ("HAND_BACK", "REAR_SIDE", "İnsan & Beden"),
    "ӏэщӏэкӏын":          ("ACCIDENTAL_ESCAPE", "INVOLUNTARY_ESCAPE", "Eylem & Gramer"),
    "ӏэщӏэлъ":            ("HAND_HELD_STATE", "ACCIDENTAL_CONTAIN", "Eylem & Gramer"),
    "ӏэщӏэлъу":           ("HAND_HELD_ADV", "ACCIDENTAL_CONTAIN_ADV", "Gramer & Nitelik"),
    "ӏэщӏэлъын":          ("HAND_HELD_VERB", "ACCIDENTAL_CONTAIN_VERB", "Eylem & Gramer"),
    "ӏэятэ":              ("HAND_RAISE", "GESTURE_ACTION", "Eylem & Fiziksel"),
}

IHE_NORM = {normalize(k): v for k, v in IHE_4TUR.items()}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("Ӏэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in IHE_NORM:
        concept, sub, family = IHE_NORM[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "Ӏэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("Ӏэ") and not l.get("subConceptId")]
print(f"Ӏэ- Belirsiz kalan: {len(belirsiz)}")
if not belirsiz:
    print("\n🎉 Ӏэ- KATEGORİSİ TAM BİTTİ!")
