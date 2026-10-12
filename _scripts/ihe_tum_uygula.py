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

# TÜM Ӏэ- kayıtları (2. ve 3. tur)
IHE_TUM = {
    # === İlk tur ===
    "Ӏэ":              ("HAND", "HAND_BODY", "İnsan & Beden"),
    "Ӏэпэ":            ("FINGER", "FINGER_BODY", "İnsan & Beden"),
    "Ӏэгу":            ("PALM", "PALM_BODY", "İnsan & Beden"),
    "Ӏэпщэ":           ("WRIST", "WRIST_BODY", "İnsan & Beden"),
    "Ӏэблэ":           ("ARM", "ARM_SHOULDER", "İnsan & Beden"),
    "Ӏэпхъуамбэ":      ("FINGER", "FINGER_HAND", "İnsan & Beden"),
    "Ӏэщхьэ":          ("SLEEVE", "SLEEVE_CLOTH", "İnsan & Beden"),
    "Ӏэгъуэпэ":        ("ELBOW", "ELBOW_JOINT", "İnsan & Beden"),
    "Ӏэлъэ":           ("GLOVE", "GLOVE_CLOTHING", "Eşya & Takı"),
    "Ӏэлъын":          ("RING", "RING_JEWELRY", "Eşya & Takı"),
    "Ӏэпщэхъу":        ("BRACELET", "JEWELRY", "Eşya & Takı"),
    "Ӏэпхъуалъэ":      ("THIMBLE", "SEWING_TOOL", "Eşya & Takı"),
    "Ӏэжь":            ("HANDLE", "HANDLE_TOOL", "Eşya & Araç"),
    "Ӏэнэ":            ("TABLE", "TABLE_FURNITURE", "Eşya & Mutfak"),
    "Ӏэщэ":            ("WEAPON", "WEAPON_ARM", "Eşya & Savaş"),
    "Ӏэмэпсымэ":       ("TOOL", "EQUIPMENT_TOOL", "Eşya & Araç"),
    "Ӏыгъын":          ("HOLD", "HOLD_ACTION", "Eylem & Fiziksel"),
    "Ӏэтын":           ("RAISE", "RAISE_HAND", "Eylem & Fiziksel"),
    "ӀэплӀэ":          ("EMBRACE", "EMBRACE_ARM", "Eylem & Fiziksel"),
    "Ӏэгуауэ":         ("APPLAUSE", "APPLAUSE_HAND", "Kültür & Etkileşim"),
    "ӀэщӀэгъэхун":     ("INVOLUNTARY", "ACCIDENTAL_DROP", "Eylem & Gramer"),
    "ӀэщӀэукӀын":      ("INVOLUNTARY", "ACCIDENTAL_KILL", "Eylem & Gramer"),
    "ӀэщӀэщӀын":       ("INVOLUNTARY", "ACCIDENTAL_ACTION", "Eylem & Gramer"),
    "Ӏэрытх":          ("MANUSCRIPT", "HANDWRITING", "Eylem & Yazı"),
    "Ӏэрысэ":          ("TAME", "DOMESTICATED", "Nitelik & Doğa"),
    "ӀэкӀуэлъакӀуэ":   ("SKILLFUL", "HANDY_PERSON", "Nitelik & Beceri"),
    "ӀэщӀагъэ":        ("CRAFT", "CRAFT_TRADE", "Toplum & Meslek"),
    "Ӏэуж":            ("TRACE", "HAND_TRACE", "Kültür & Beden"),
    "Ӏэмал":           ("MEANS", "METHOD_OPTION", "Düşünce & Soyut"),

    # === 2. tur (53 kayıt) ===
    "Ӏэбжьанэ":        ("NAIL", "HAND_NAIL", "İnsan & Beden"),
    "Ӏэбжьыб":         ("HANDFUL", "HAND_MEASURE", "Ölçü & Beden"),
    "Ӏэбжьэ":          ("HANDLE", "HAND_HANDLE", "Eşya & Araç"),
    "Ӏэбзыгъэ":        ("DEXTERITY", "HAND_SKILL", "Nitelik & Beceri"),
    "Ӏэбыдэлъэбыдэ":   ("ROBUST", "BODY_STRENGTH", "Nitelik & Beden"),
    "Ӏэбэлагъ":        ("CLUMSINESS", "HAND_CLUMSINESS", "Nitelik & Beceri"),
    "Ӏэбэлъабагъэ":    ("CLUMSINESS", "HAND_FOOT_CLUMSINESS", "Nitelik & Beceri"),
    "Ӏэбэрэбэн":       ("GROPE", "HAND_SEARCH", "Eylem & Fiziksel"),
    "ӀэгунэщӀу":       ("EMPTY_HANDED", "HAND_EMPTY", "Nitelik & Beden"),
    "ӀэгупӀэ":         ("PALM_AREA", "PALM_PLACE", "Doğa & Mekan"),
    "Ӏэгуэ":           ("GESTURE", "HAND_GESTURE", "Kültür & Etkileşim"),
    "Ӏэгъу":           ("NEIGHBORHOOD", "NEARBY_PERSON", "Toplum & İlişki"),
    "Ӏэгъуапэ":        ("NEIGHBORHOOD", "NEARBY_BORDER", "Toplum & Mekan"),
    "Ӏэгъуэблагъуэ":   ("KINSHIP", "RELATIVES_NEIGHBORS", "Toplum & İlişki"),
    "Ӏэгъуэджэн":      ("REVISE", "HAND_CHECK", "Eylem & Zihin"),
    "Ӏэгъэпсэху":      ("REST", "HAND_REST", "Eylem & Yaşam"),
    "Ӏэгъэтынш":       ("COMFORT", "HAND_EASE", "Eylem & Yaşam"),
    "Ӏэдакъэжьауэ":    ("SWIFTNESS", "HAND_AGILITY", "Nitelik & Beceri"),
    "Ӏэдакъэмывэ":     ("STONE", "HAND_STONE", "Doğa & Eşya"),
    "Ӏэдэбагъ":        ("POLITENESS", "MANNERS_BEHAVIOR", "Kültür & Ahlak"),
    "Ӏэдэбын":         ("RESPECT", "MANNERS_ACTION", "Eylem & Ahlak"),
    "Ӏэдэгъуэмылъэ":   ("PROVISIONS", "HAND_FOOD_BAG", "Eşya & Besin"),
    "Ӏэдэж":           ("PLIERS", "HAND_TOOL", "Eşya & Araç"),
    "Ӏэдэуадэ":        ("TOOLS", "HAND_TOOLS_SET", "Eşya & Araç"),
    "ӀэдэӀуантӀэ":     ("WRENCH", "ADJUSTABLE_TOOL", "Eşya & Araç"),
    "Ӏэзэ":            ("HEALER", "DOCTOR_PHYSICIAN", "Toplum & Meslek"),
    "Ӏэзэгъуазэ":      ("MEDICAL_GUIDE", "HEALING_GUIDE", "Toplum & Meslek"),
    "Ӏэзэгъуэ":        ("REMEDY", "REMEDY_MEDICINE", "Yaşam & Sağlık"),
    "ӀэкӀуэ":          ("REACH", "HAND_REACH", "Düşünce & Güç"),
    "ӀэкӀуэлъакӀуагъ": ("SKILLFULNESS", "HAND_DEXTERITY", "Nitelik & Beceri"),
    "ӀэкӀуэцӀ":        ("PALM", "HAND_INSIDE", "İnsan & Beden"),
    "ӀэлфӀыцӀэу":      ("WILDLY", "WILD_BEHAVIOR", "Nitelik & Doğa"),
    "Ӏэлъэдакъэнэ":    ("GLOVE_PART", "GLOVE_WRIST", "Eşya & Takı"),
    "Ӏэмбатэ":         ("HAND_REST", "PALM_REST", "Eşya & Beden"),
    "Ӏэмдэч":          ("HANDLE", "TOOL_HANDLE", "Eşya & Araç"),
    "ӀэмпӀэ":          ("EMBRACE", "HAND_HOLD", "İnsan & Beden"),
    "Ӏэмыр":           ("COMMAND", "HAND_COMMAND", "Toplum & Yönetim"),
    "Ӏэмэ":            ("TOOL", "HAND_TOOL", "Eşya & Araç"),
    "Ӏэнащхьэ":        ("TABLE_TOP", "TABLE_HEAD", "Eşya & Mutfak"),
    "Ӏэней":           ("TABLECLOTH", "TABLE_CLOTH", "Eşya & Mutfak"),
    "Ӏэнэежэ":         ("SERVER", "TABLE_WAITER", "Toplum & Meslek"),
    "Ӏэнэзехьэ":       ("HOST", "TABLE_MANAGER", "Kültür & Etkileşim"),
    "Ӏэнэщхьэ":        ("TABLE_TOP", "TABLE_HEAD", "Eşya & Mutfak"),

    # === 3. tur (80+ kayıt) ===
    "Ӏэпкълъэпкъ":     ("BODY_STRUCTURE", "BODY_PARTS", "İnsan & Beden"),
    "ӀэплӀакӀуэ":      ("EMBRACE", "EMBRACE_ACTION", "Eylem & Fiziksel"),
    "ӀэплӀэрыс":       ("LAP_CHILD", "EMBRACE_CHILD", "İnsan & Beden"),
    "ӀэпхъуамбэжьакӀэ":("THUMB", "FINGER_HAND", "İnsan & Beden"),
    "Ӏэпхъуэжын":      ("EMBRACE", "EMBRACE_ACTION", "Eylem & Fiziksel"),
    "ӀэпщӀэлъапщӀэ":   ("CRAWLING", "MOVEMENT_ON_ALL_FOURS", "Eylem & Fiziksel"),
    "ӀэпыкӀыжын":      ("RELEASE", "HAND_RELEASE", "Eylem & Fiziksel"),
    "Ӏэпылъын":        ("HAND_HELD", "HAND_POSSESSION", "Eylem & Fiziksel"),
    "Ӏэпыхун":         ("DROP", "ACCIDENTAL_DROP", "Eylem & Gramer"),
    "Ӏэпычын":         ("PLUCK", "HAND_PLUCK", "Eylem & Fiziksel"),
    "Ӏэпэгуахъуэ":     ("FINGER_FORK", "HAND_PART", "İnsan & Beden"),
    "Ӏэпэгъу":         ("HELPER", "HAND_COMPANION", "Toplum & İlişki"),
    "Ӏэпэзадэ":        ("INEXPERIENCED", "HAND_CLUMSY", "Nitelik & Beceri"),
    "ӀэпэмцӀий":       ("FINGER_TIP", "FINGER_PART", "İnsan & Beden"),
    "Ӏэпэпс":          ("FINGER_STRING", "HAND_ACCESSORY", "Eşya & Takı"),
    "Ӏэпэтэрмэш":      ("HAND_TRICK", "HAND_SKILL", "Nitelik & Beceri"),
    "Ӏэрымылъхьэ":     ("UNREACHABLE", "HAND_UNREACHABLE", "Düşünce & Soyut"),
    "Ӏэрыхуэ":         ("WINDFALL", "HAND_CHANCE", "Düşünce & Soyut"),
    "Ӏэрыхьэн":        ("OBTAIN", "HAND_OBTAIN", "Eylem & Fiziksel"),
    "ӀэрыщӀ":          ("HANDMADE", "HANDMADE_ITEM", "Eşya & Araç"),
    "Ӏэубыд":          ("PLEDGE", "HAND_PLEDGE", "Toplum & Hukuk"),
    "Ӏэулэд":          ("WAVE", "HAND_GESTURE", "Kültür & Etkileşim"),
    "ӀэфракӀэ":        ("ELBOW", "ARM_JOINT", "İnsan & Beden"),
    "Ӏэфэ":            ("HAND_SKIN", "BODY_SKIN", "İnsan & Beden"),
    "ӀэфӀ-ӀуфӀ":       ("SWEET_DELICIOUS", "SWEET_TASTE", "Doğa & Besin"),
    "ӀэфӀагъ":         ("SWEETNESS", "TASTE_QUALITY", "Nitelik & Doğa"),
    "ӀэфӀыгъэ":        ("SWEETNESS", "TASTE_PLEASURE", "Nitelik & Doğa"),
    "ӀэхуэкӀ":         ("HAND_STYLE", "WORK_STYLE", "Nitelik & Beceri"),
    "Ӏэхъушэ":         ("HERD", "ANIMAL_HERD", "Doğa & Hayvan"),
    "Ӏэхъуэн":         ("HERD_ANIMALS", "HERDING_ACTION", "Toplum & Meslek"),
    "Ӏэчлъэчын":       ("WITHDRAW", "HAND_WITHDRAW", "Eylem & Zihin"),
    "ӀэштӀым":         ("FIST", "HAND_FIST", "İnsan & Beden"),
    "Ӏэшэлъашэ":       ("CRIPPLED", "BODY_DISABILITY", "Nitelik & Beden"),
    "ӀэщакӀуэн":       ("ARM_ONESELF", "WEAPON_ARMING", "Eşya & Savaş"),
    "Ӏэщыхъуэ":        ("HERDER", "SHEPHERD", "Toplum & Meslek"),
    "Ӏэщэ-фащэ":       ("ARMOR_WEAPONS", "WAR_GEAR", "Eşya & Savaş"),
    "ӀэщӀ":            ("SLEEVE_BRANCH", "SLEEVE_CLOTH", "Eşya & Takı"),
    "ӀэщӀагъэншэ":     ("UNSKILLED", "NO_CRAFT", "Toplum & Meslek"),
    "ӀэщӀыхьэн":       ("ACCIDENTAL_ENTER", "INVOLUNTARY_ENTER", "Eylem & Gramer"),
    "ӀэщӀэгъупщыкӀын": ("ACCIDENTAL_FORGET", "INVOLUNTARY_ACTION", "Eylem & Gramer"),
    "ӀэщӀэгъэувэн":    ("ACCIDENTAL_SET", "INVOLUNTARY_ACTION", "Eylem & Gramer"),
    "ӀэщӀэдзэн":       ("BEGIN", "HAND_BEGIN", "Eylem & Fiziksel"),
    "ӀэщӀэкъузэн":     ("ACCIDENTAL_SQUEEZE", "INVOLUNTARY_ACTION", "Eylem & Gramer"),
    "ӀэщӀэкӀырабгъу":  ("ACCIDENTAL_SLIP", "INVOLUNTARY_SLIP", "Eylem & Gramer"),
    "ӀэщӀэкӀэрэхъукӀын":("ACCIDENTAL_ROLL", "INVOLUNTARY_ACTION", "Eylem & Gramer"),
    "ӀэщӀэкӀэрэхъухьын":("ACCIDENTAL_ENTANGLE", "INVOLUNTARY_ACTION", "Eylem & Gramer"),
    "ӀэщӀэлъэгъуэн":   ("ACCIDENTAL_SEE", "INVOLUNTARY_SEE", "Eylem & Gramer"),
    "ӀэщӀэлъэфын":     ("ACCIDENTAL_DRAG", "INVOLUNTARY_DRAG", "Eylem & Gramer"),
    "ӀэщӀэлӀэн":       ("ACCIDENTAL_DIE", "INVOLUNTARY_DIE", "Eylem & Gramer"),
    "ӀэщӀэплъыхьын":   ("ACCIDENTAL_LOOK", "INVOLUNTARY_LOOK", "Eylem & Gramer"),
    "ӀэщӀэпхъуэтын":   ("ACCIDENTAL_SNATCH", "INVOLUNTARY_SNATCH", "Eylem & Gramer"),
    "ӀэщӀэужэгъуэн":   ("ACCIDENTAL_DISLIKE", "INVOLUNTARY_EMOTION", "Eylem & Gramer"),
    "ӀэщӀэхужын":      ("ACCIDENTAL_REDROP", "INVOLUNTARY_DROP", "Eylem & Gramer"),
    "ӀэщӀэхун":        ("ACCIDENTAL_DROP", "INVOLUNTARY_DROP", "Eylem & Gramer"),
    "ӀэщӀэхуэн":       ("ACCIDENTAL_FALL_INTO", "INVOLUNTARY_FALL", "Eylem & Gramer"),
    "ӀэщӀэхын":        ("ACCIDENTAL_TAKE", "INVOLUNTARY_TAKE", "Eylem & Gramer"),
    "Ӏэдэ":            ("PLIERS", "HAND_TOOL", "Eşya & Araç"),
    "Ӏэдэб":           ("POLITENESS", "MANNERS", "Kültür & Ahlak"),
    "Ӏэдэбу":          ("POLITELY", "MANNERS_ADV", "Gramer & Nitelik"),
    "Ӏэдэбынчъэ":      ("IMPOLITE", "MANNERS_LESS", "Kültür & Ahlak"),
    "Ӏэзэгъу":         ("REMEDY", "MEDICINE", "Yaşam & Sağlık"),
    "Ӏэл":             ("WILD", "UNTAMED", "Nitelik & Doğa"),
    "ӀэлъэщӀ":         ("TOWEL", "HAND_CLOTH", "Eşya & Ev"),
    "Ӏэм":             ("HAND", "HAND_DAT", "Gramer & Çekim"),
    "ӀэнатӀэ":         ("FOREHEAD_DUTY", "POSITION_JOB", "Toplum & Meslek"),
    "Ӏэнкун":          ("ASTONISHED", "STUNNED_STATE", "Nitelik & Zihin"),
    "Ӏэнтэгъу":        ("ARMREST", "ELBOW_REST", "Eşya & Ev"),
    "ӀэпапӀэ":         ("FINGERPRINT", "HAND_MARK", "İnsan & Beden"),
    "Ӏэпхлъэпх":       ("BINDING", "WRAPPING", "Eylem & Fiziksel"),
    "Ӏэпхъуэн":        ("EMBRACE", "EMBRACE_ACTION", "Eylem & Fiziksel"),
    "Ӏэпыӏэгъу":       ("HELP", "ASSISTANCE", "Kültür & Etkileşim"),
    "Ӏэр":             ("HAND", "HAND_NOM", "Gramer & Çekim"),
    "ӀэкӀыб":          ("HAND_BACK", "BACK_SIDE", "İnsan & Beden"),
    "Ӏэгубжъэ":        ("PALM_CUP", "HAND_CUP", "Eşya & Mutfak"),
    "Ӏэгъэбэгу":       ("BOAST", "HAND_BOAST", "Nitelik & Etkileşim"),
    "Ӏэдакъэ":         ("HEEL", "BODY_HEEL", "İnsan & Beden"),
    "Ӏэджэ":           ("MANY", "QUANTITY_MANY", "Nitelik & Doğa"),
    "Ӏэлъэщӏ":         ("TOWEL", "HAND_CLOTH", "Eşya & Ev"),
    "Ӏэмыщӏэ":         ("PALM_FULL", "HANDFUL", "İnsan & Beden"),
    "Ӏэмин":           ("SAFE_AMEN", "TRUST_WORD", "Kültür & Inanç"),
    "Ӏэминат":         ("TRUST_DEPOSIT", "DEPOSIT_ITEM", "Toplum & Hukuk"),
}

IHE_NORM = {normalize(k): v for k, v in IHE_TUM.items()}

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
if belirsiz:
    print("İlk 20:")
    for f in belirsiz[:20]:
        print(f"  - {f}")
else:
    print("\n🎉 Ӏэ- KATEGORİSİ TAM BİTTİ!")
