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

# 4. TUR — Mimar'ın CSV çıktısı (yapıştırılan)
CSV_VERI = """
Іэврэчин,"Mısır",GRAIN,CORN_PLANT,Doğa & Besin
Ӏэ дэлъэн,"elle dokunmak",TOUCH,HAND_TOUCH,Eylem & Fiziksel
Ӏэ щыхуэн,"elle dokunmak",STROKE,HAND_STROKE,Eylem & Fiziksel
Ӏэбжьанэ,"el tırnağı",NAIL,HAND_NAIL,İnsan & Beden
Ӏэбжьыб,"tutam",HANDFUL,HAND_MEASURE,Ölçü & Beden
Ӏэбжьэ,"kulp",HANDLE,HAND_HANDLE,Eşya & Araç
Ӏэбжэнабжэ,"tırnak tırnağa",INTENSE,HAND_STRUGGLE,Nitelik & Etkileşim
Ӏэбзыгъэ,"el zekası",DEXTERITY,HAND_SKILL,Nitelik & Beceri
Ӏэбыдэлъэбыдэ,"eli ayağı sağlam",ROBUST,BODY_STRENGTH,Nitelik & Beden
Ӏэбэлагъ,"sakarlık",CLUMSINESS,HAND_CLUMSINESS,Nitelik & Beceri
Ӏэбэлъабагъэ,"sakarlık",CLUMSINESS,HAND_FOOT_CLUMSINESS,Nitelik & Beceri
Ӏэбэрэбэн,"el yordamıyla aramak",GROPE,HAND_SEARCH,Eylem & Fiziksel
ӀэгунэщӀу,"eli boş",EMPTY_HANDED,HAND_EMPTY,Nitelik & Beden
ӀэгупӀэ,"avuç alanı",PALM_AREA,PALM_PLACE,Doğa & Mekan
Ӏэгуэ,"el işareti",GESTURE,HAND_GESTURE,Kültür & Etkileşim
Ӏэгъу,"yakın",NEIGHBORHOOD,NEARBY_PERSON,Toplum & İlişki
Ӏэгъуапэ,"yakın çevre",NEIGHBORHOOD,NEARBY_BORDER,Toplum & Mekan
Ӏэгъуэблагъуэ,"hısım akraba",KINSHIP,RELATIVES_NEIGHBORS,Toplum & İlişki
Ӏэгъуэджэн,"elden geçirmek",REVISE,HAND_CHECK,Eylem & Zihin
Ӏэгъэпсэху,"dinlendirme",REST,HAND_REST,Eylem & Yaşam
Ӏэгъэтынш,"rahatlatma",COMFORT,HAND_EASE,Eylem & Yaşam
Ӏэдакъэжьауэ,"el çabukluğu",SWIFTNESS,HAND_AGILITY,Nitelik & Beceri
Ӏэдакъэмывэ,"el taşı",STONE,HAND_STONE,Doğa & Eşya
Ӏэдэбагъ,"edep",POLITENESS,MANNERS_BEHAVIOR,Kültür & Ahlak
Ӏэдэбын,"edepli davranmak",RESPECT,MANNERS_ACTION,Eylem & Ahlak
Ӏэдэгъуэмылъэ,"azık torbası",PROVISIONS,HAND_FOOD_BAG,Eşya & Besin
Ӏэдэж,"pense",PLIERS,HAND_TOOL,Eşya & Araç
Ӏэдэжу,"kıskaçla",PLIERS,HAND_TOOL_ADV,Gramer & Araç
Ӏэдэуадэ,"alet takımı",TOOLS,HAND_TOOLS_SET,Eşya & Araç
ӀэдэӀуантӀэ,"ingiliz anahtarı",WRENCH,ADJUSTABLE_TOOL,Eşya & Araç
Ӏэзэ,"hekim",HEALER,DOCTOR_PHYSICIAN,Toplum & Meslek
Ӏэзэгъуазэ,"hekimlik kılavuzu",MEDICAL_GUIDE,HEALING_GUIDE,Toplum & Meslek
Ӏэзэгъуэ,"çare",REMEDY,REMEDY_MEDICINE,Yaşam & Sağlık
Ӏэзэгъуэ-Ӏэзэпэ,"çare derman",REMEDY,ALL_REMEDIES,Yaşam & Sağlık
ӀэкӀуэ,"el erimi",REACH,HAND_REACH,Düşünce & Güç
ӀэкӀуэлъакӀуагъ,"beceriklilik",SKILLFULNESS,HAND_DEXTERITY,Nitelik & Beceri
ӀэкӀуэцӀ,"el içi",PALM,HAND_INSIDE,İnsan & Beden
ӀэкӀэщӀлъэкӀэщӀу,"eli ayağı tez",QUICKLY,HAND_FOOT_AGILITY,Gramer & Nitelik
ӀэлфӀыцӀэу,"yabani",WILDLY,WILD_BEHAVIOR,Nitelik & Doğa
Ӏэлъэдакъэнэ,"eldiven bilekliği",GLOVE_PART,GLOVE_WRIST,Eşya & Takı
Ӏэмбатэ,"avuç dayanağı",HAND_REST,PALM_REST,Eşya & Beden
Ӏэмдэч,"sap",HANDLE,TOOL_HANDLE,Eşya & Araç
ӀэмпӀэ,"kucak",EMBRACE,HAND_HOLD,İnsan & Beden
Ӏэмыр,"emir",COMMAND,HAND_COMMAND,Toplum & Yönetim
Ӏэмэ,"alet",TOOL,HAND_TOOL,Eşya & Araç
Ӏэнащхьэ,"sofra başı",TABLE_TOP,TABLE_HEAD,Eşya & Mutfak
Ӏэней,"sofra örtüsü",TABLECLOTH,TABLE_CLOTH,Eşya & Mutfak
Ӏэнэежэ,"sofra hizmetçisi",SERVER,TABLE_WAITER,Toplum & Meslek
Ӏэнэзехьэ,"sofra yöneticisi",HOST,TABLE_MANAGER,Kültür & Etkileşim
Ӏэнэщхьэ,"sofra masa üstü",TABLE_TOP,TABLE_HEAD,Eşya & Mutfak
Ӏэпкълъэпкъ,"beden yapısı",BODY_STRUCTURE,BODY_PARTS,İnsan & Beden
ӀэплӀакӀуэ,"kucaklayan",EMBRACE,EMBRACE_ACTION,Eylem & Fiziksel
ӀэплӀэрыс,"kucak çocuğu",LAP_CHILD,EMBRACE_CHILD,İnsan & Beden
Ӏэпсыгъуэлъэпсыгъуэ,"eli ayağı ince",SLENDER,BODY_APPEARANCE,Nitelik & Beden
ӀэпхъуамбэжьакӀэ,"başparmak",THUMB,FINGER_HAND,İnsan & Beden
Ӏэпхъуэжын,"kucaklaşmak",EMBRACE,EMBRACE_ACTION,Eylem & Fiziksel
ӀэпцӀлъэпцӀ,"çıplak elle",BARE_HAND_FOOT,BODY_STATE,Nitelik & Beden
ӀэпцӀупцӀ,"kıpır kıpır",RESTLESS_HANDS,HAND_MOVEMENT,Nitelik & Beceri
ӀэпцӀэлъапцӀэ,"yalınayak başı açık",BAREFOOT_BAREHAND,BODY_STATE,Nitelik & Beden
Ӏэпщацагъэ,"kol kıllılığı",ARM_HAIR,BODY_HAIR,İnsan & Beden
ӀэпщӀэлъапщӀэ,"sürünerek",CRAWLING,MOVEMENT_ON_ALL_FOURS,Eylem & Fiziksel
ӀэпыкӀыжын,"elden çıkmak",RELEASE,HAND_RELEASE,Eylem & Fiziksel
Ӏэпылъын,"elde bulunmak",HAND_HELD,HAND_POSSESSION,Eylem & Fiziksel
Ӏэпыхун,"elden düşmek",DROP,ACCIDENTAL_DROP,Eylem & Gramer
Ӏэпычын,"koparmak",PLUCK,HAND_PLUCK,Eylem & Fiziksel
Ӏэпэгуахъуэ,"parmak arası",FINGER_FORK,HAND_PART,İnsan & Beden
Ӏэпэгъу,"yardımcı",HELPER,HAND_COMPANION,Toplum & İlişki
Ӏэпэзадэ,"acemi",INEXPERIENCED,HAND_CLUMSY,Nitelik & Beceri
ӀэпэмцӀий,"parmak ucu",FINGER_TIP,FINGER_PART,İnsan & Beden
Ӏэпэпс,"parmak ipi",FINGER_STRING,HAND_ACCESSORY,Eşya & Takı
Ӏэпэтэрмэш,"parmak oyunu",HAND_TRICK,HAND_SKILL,Nitelik & Beceri
Ӏэрымылъхьэ,"ulaşılamaz",UNREACHABLE,HAND_UNREACHABLE,Düşünce & Soyut
Ӏэрыхуэ,"ele düşen",WINDFALL,HAND_CHANCE,Düşünce & Soyut
Ӏэрыхьэн,"ele geçmek",OBTAIN,HAND_OBTAIN,Eylem & Fiziksel
ӀэрыщӀ,"el yapımı",HANDMADE,HANDMADE_ITEM,Eşya & Araç
Ӏэубыд,"rehin",PLEDGE,HAND_PLEDGE,Toplum & Hukuk
Ӏэулэд,"el sallama",WAVE,HAND_GESTURE,Kültür & Etkileşim
ӀэфракӀэ,"dirsek",ELBOW,ARM_JOINT,İnsan & Beden
Ӏэфэ,"el derisi",HAND_SKIN,BODY_SKIN,İnsan & Beden
ӀэфӀ-ӀуфӀ,"tatlı tatlı",SWEET_DELICIOUS,SWEET_TASTE,Doğa & Besin
ӀэфӀагъ,"tatlılık",SWEETNESS,TASTE_QUALITY,Nitelik & Doğa
ӀэфӀыгъэ,"lezzet",SWEETNESS,TASTE_PLEASURE,Nitelik & Doğa
ӀэхуэкӀ,"el işleyişi",HAND_STYLE,WORK_STYLE,Nitelik & Beceri
Ӏэхъушэ,"sürü",HERD,ANIMAL_HERD,Doğa & Hayvan
Ӏэхъуэн,"çobanlık etmek",HERD_ANIMALS,HERDING_ACTION,Toplum & Meslek
Ӏэчлъэчын,"elini ayağını çekmek",WITHDRAW,HAND_WITHDRAW,Eylem & Zihin
ӀэштӀым,"yumruk",FIST,HAND_FIST,İnsan & Beden
Ӏэшэлъашэ,"topal çolak",CRIPPLED,BODY_DISABILITY,Nitelik & Beden
ӀэщакӀуэн,"silahlanmak",ARM_ONESELF,WEAPON_ARMING,Eşya & Savaş
Ӏэщыхъуэ,"çoban",HERDER,SHEPHERD,Toplum & Meslek
Ӏэщэ-фащэ,"silah teçhizat",ARMOR_WEAPONS,WAR_GEAR,Eşya & Savaş
ӀэщӀ,"kol",SLEEVE_BRANCH,SLEEVE_CLOTH,Eşya & Takı
ӀэщӀагъэншэ,"mesleksiz",UNSKILLED,NO_CRAFT,Toplum & Meslek
ӀэщӀыхьэн,"kazaen eline girmek",ACCIDENTAL_ENTER,INVOLUNTARY_ENTER,Eylem & Gramer
ӀэщӀэгъупщыкӀын,"kazaen unutmak",ACCIDENTAL_FORGET,INVOLUNTARY_ACTION,Eylem & Gramer
ӀэщӀэгъэувэн,"kazaen durdurmak",ACCIDENTAL_SET,INVOLUNTARY_ACTION,Eylem & Gramer
ӀэщӀэдзэн,"başlamak",BEGIN,HAND_BEGIN,Eylem & Fiziksel
ӀэщӀэкъузэн,"kazaen sıkıştırmak",ACCIDENTAL_SQUEEZE,INVOLUNTARY_ACTION,Eylem & Gramer
ӀэщӀэкӀырабгъу,"kazaen kaymak",ACCIDENTAL_SLIP,INVOLUNTARY_SLIP,Eylem & Gramer
ӀэщӀэкӀэрэхъукӀын,"kazaen yuvarlanmak",ACCIDENTAL_ROLL,INVOLUNTARY_ACTION,Eylem & Gramer
ӀэщӀэкӀэрэхъухьын,"kazaen dolanmak",ACCIDENTAL_ENTANGLE,INVOLUNTARY_ACTION,Eylem & Gramer
ӀэщӀэлъэгъуэн,"kazaen görmek",ACCIDENTAL_SEE,INVOLUNTARY_SEE,Eylem & Gramer
ӀэщӀэлъэфын,"kazaen sürüklemek",ACCIDENTAL_DRAG,INVOLUNTARY_DRAG,Eylem & Gramer
ӀэщӀэлӀэн,"kazaen ölmek",ACCIDENTAL_DIE,INVOLUNTARY_DIE,Eylem & Gramer
ӀэщӀэплъыхьын,"kazaen bakmak",ACCIDENTAL_LOOK,INVOLUNTARY_LOOK,Eylem & Gramer
ӀэщӀэпхъуэтын,"kazaen kapmak",ACCIDENTAL_SNATCH,INVOLUNTARY_SNATCH,Eylem & Gramer
ӀэщӀэужэгъуэн,"kazaen bıkmak",ACCIDENTAL_DISLIKE,INVOLUNTARY_EMOTION,Eylem & Gramer
ӀэщӀэхужын,"kazaen düşmek",ACCIDENTAL_REDROP,INVOLUNTARY_DROP,Eylem & Gramer
ӀэщӀэхун,"kazaen elden düşmek",ACCIDENTAL_DROP,INVOLUNTARY_DROP,Eylem & Gramer
ӀэщӀэхуэн,"kazaen eline düşmek",ACCIDENTAL_FALL_INTO,INVOLUNTARY_FALL,Eylem & Gramer
ӀэщӀэхын,"kazaen elinden almak",ACCIDENTAL_TAKE,INVOLUNTARY_TAKE,Eylem & Gramer
"""

VERI = {}
for line in CSV_VERI.strip().split("\n"):
    if not line.strip():
        continue
    parts = line.split(",")
    if len(parts) < 4:
        continue
    form = parts[0].strip().strip('"')
    anlam = parts[1].strip().strip('"')
    concept = parts[2].strip().strip('"')
    sub = parts[3].strip().strip('"')
    aile = parts[4].strip().strip('"') if len(parts) > 4 else "?"
    VERI[normalize(form)] = (concept, sub, aile)

print(f"CSV veri: {len(VERI)} kayit")

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("Ӏэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in VERI:
        concept, sub, family = VERI[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        l["rootForm"] = "Ӏэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if normalize(l.get("form","")).startswith("Ӏэ") and not l.get("subConceptId")]
print(f"Ӏэ- Belirsiz kalan: {len(belirsiz)}")
