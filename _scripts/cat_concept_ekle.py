import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# CAT.*.md kategorileri (KBD)
CATEGORY_MAP = {
    # === ANATOMI ===
    "къупщхьэ": "BONE", "дзажэналъэ": "RIB", "Ӏупэ": "LIP",
    "нэ": "EYE", "напӀэ": "EYELID", "Ӏэпкълъэпкъ": "BODY",
    "пэ": "NOSE", "жьэ": "MOUTH", "дзэ": "TOOTH", "бзэгу": "TONGUE",
    "тхьэкӀумэ": "EAR", "пщэ": "NECK", "тэмакъ": "THROAT",
    "натӀэ": "FOREHEAD", "напэ": "FACE", "нэкӀу": "CHEEK",
    "набдзэ": "BROW", "нэбжьыц": "EYELASH", "натӀэзэрыхьэ": "TEMPLE",
    "нэзэрыхьэ": "TEMPLE", "нэкӀущхьэ": "CHEEK", "жьэпкъ": "CHIN",
    "дамэ": "SHOULDER", "ныбэ": "BELLY", "щахэ": "GROIN",
    "бгы": "WAIST", "куэ": "HIP", "тхы": "SPINE",
    "Ӏэблэ": "HAND", "Ӏэпщэ": "WRIST", "Ӏэпэ": "FINGER",
    "Ӏэпхъуамбэ": "FINGER", "ӀэфракӀэ": "ELBOW",
    "лъакъуэ": "LEG", "лъапэ": "FOOT", "лъэпхъуамбэ": "TOE",
    "лъэпкъынэ": "ANKLE", "лъэдакъэ": "HEEL", "лъэгуажьэ": "KNEE",
    
    # === HAYVAN ===
    "гуу": "BULL", "хыв": "BISON", "хьэрэ": "BISON", "вы": "OX",
    "жэм": "COW", "мэл": "SHEEP", "тӀы": "SHEEP", "шыгъуэш": "LAMB",
    "тхушӀэ": "SHEEP", "тӀушӀэ": "SHEEP", "бжэн": "GOAT",
    "ажэ": "GOAT", "чэтӀ": "KID", "бжэнхъу": "GOAT", "къуэршэ": "GOAT",
    "къуэ": "PIG", "хъуэпӀащэ": "BOAR", "мэзыкъуэ": "BOAR",
    "шыщӀэ": "FOAL", "нэбгъэф": "FOAL", "къунэн": "FOAL",
    "хакӀуэ": "STALLION", "хакӀуэпщӀэ": "STALLION", "дунэн": "STALLION",
    "алъпджей": "FAIRY_HORSE", "шыд": "DONKEY", "благъуэ": "DRAGON",
    "щыхь": "DEER", "бжьэду": "ELK", "мышэ": "BEAR", "дыгъужь": "WOLF",
    "бажэджэд": "LYNX", "бажэ": "FOX", "хьэ": "DOG",
    "дзыгъуэ": "MOUSE", "дзыгъуэшхуэ": "RAT", "дзыгъуэнэф": "MOUSE",
    "кӀэпхъ": "SQUIRREL", "цыхьэбанэ": "HEDGEHOG", "къуэлэндыз": "BEAVER",
    "цӀыӀубэнэф": "MOLE", "тхьэкӀумэкӀыхь": "RABBIT",
    "шындыхьэу": "LIZARD", "хьэпцӀхъупцӀ": "WORM",
    "хьэндэркъуакъуэ": "FROG", "хьэндэркъуакъуэцӀэхэлъ": "FROG",
    "шылэгъу": "TURTLE", "псыщындыхьэу": "NEWT",
    "цӀэ": "LOUSE", "бжьыдзэ": "FLEA", "цӀыв": "BEETLE",
    "бадзэ": "FLY", "бжьэ": "BEE", "хъуан": "MOTH",
    "аргъуей": "MOSQUITO", "гъудэ": "BOTFLY", "тхьэгъэлэдж": "FIREFLY",
    "хьэмбэлу": "BUTTERFLY", "хьэпӀацӀэ": "WORM",
    "хьэдзыгъуанэ": "WASP", "бжьэпӀацӀэ": "BUMBLEBEE",
    "хьэпцӀащэ": "HORNET", "бадзэпцӀ": "MIDGE",
    "бадзэшхуэ": "HORSEFLY", "хъумпӀэцӀэдж": "ANT",
    "елыркъэш": "CRAB", "бэдж": "SPIDER", "мэлхъэпӀэтӀэ": "TICK",
    "бзу": "BIRD", "къуалэбзу": "BIRD", "джэд": "CHICKEN",
    "адакъэ": "ROOSTER", "бэбыш": "DUCK", "псыджэд": "DUCK",
    "къуаргъ": "CROW", "къуалэ": "JACKDAW", "къаджэ": "MAGPIE",
    "къуэнщӀэ": "ROOK", "вынд": "RAVEN", "къуалэджэд": "RAVEN",
    "къаз": "GOOSE", "къыу": "SWAN", "къру": "CRANE",
    "бгъэ": "EAGLE", "къашыргъэ": "HAWK", "тхьэрыкъуэ": "DOVE",
    "жьынду": "OWL", "бжьэндэхъу": "STARLING",
    "пцӀащхъуэ": "SWALLOW", "хьэрхъумп": "HOOPOE",
    "жыгъуӀу": "WOODPECKER", "кӀыгуугу": "CUCKOO",
    "бдзэжьей": "FISH", "бдзэ": "STURGEON", "аргъей": "SALMON",
    
    # === RENK ===
    "плъыжь": "RED", "гъуэплъ": "COPPER_RED", "плъыжьыфэ": "REDDISH",
    "цӀыплъ": "SCARLET", "гъуэжь": "YELLOW", "гъуэжьыфэ": "LIGHT_YELLOW",
    "щхъуэ": "BLUE", "удзыфэ": "GREEN", "морэ": "BROWN",
    "гъуабжэ": "GREY", "щхъуантӀэ": "LIGHT_BLUE", "хужь": "WHITE",
    "фӀыцӀэ": "BLACK", "хужьыфэ": "WHITISH", "фӀыцӀыфэ": "BLACKISH",
    
    # === AİLE ===
    "адэ": "FATHER", "анэ": "MOTHER", "дадэ": "GRANDFATHER",
    "нанэ": "GRANDMOTHER", "адэшхуэ": "GRANDFATHER",
    "анэшхуэ": "GRANDMOTHER", "къуэ": "SON", "пхъу": "DAUGHTER",
    "къуэш": "BROTHER", "шыпхъу": "SISTER", "дэлъху": "SIBLING",
    "тхьэмадэ": "FATHER_IN_LAW", "гуащэ": "MOTHER_IN_LAW",
    "пщыкъуэ": "BROTHER_IN_LAW", "пщыпхъу": "SISTER_IN_LAW",
    "щыкъу адэ": "FATHER_IN_LAW", "щыкъу анэ": "MOTHER_IN_LAW",
    "щыкъу щӀалэ": "BROTHER_IN_LAW", "щыкъу хъыджэбз": "SISTER_IN_LAW",
    "фызабэ": "WIDOW", "лӀыгъуабэ": "WIDOWER", "зеиншэ": "ORPHAN",
    "ибэ": "ORPHAN",
    
    # === BİTKİ ===
    "жыг": "TREE", "пхъэхуей": "BIRCH", "дей": "WALNUT_TREE",
    "бжей": "OAK_TREE", "удз": "GRASS", "гуэдз": "WHEAT",
    "ху": "MILLET", "нартыху": "MAIZE", "хьэ": "BARLEY",
    "Ӏэрысэ": "APPLE", "мыӀэрысэ": "APPLE", "кхъужь": "PEAR",
    "балий": "CHERRY", "дэ": "WALNUT", "хъэуан": "MELON",
    "хъарбуз": "WATERMELON", "джэш": "BEANS", "хьэлыгъу": "SWEET_BREAD",
    "хьэлыуэ": "HALVA", "чэфэр": "KEFIR", "фадэ": "BEVERAGE",
    "бжьын": "ONION", "бжьыныщхьэ": "GARLIC", "кӀэртӀоф": "POTATO",
    "къэб": "PUMPKIN", "нащэ": "CUCUMBER", "тэмэтус": "TOMATO",
    "удзгъэгъа": "FLOWER", "дыгъэгъазэ": "SUNFLOWER",
    "гуащэнабдзэ": "ROSE", "бжьыхьэ": "AUTUMN",
    
    # === SAYI ===
    "зы": "ONE", "тӀу": "TWO", "щы": "THREE", "плӀы": "FOUR",
    "тху": "FIVE", "хы": "SIX", "блы": "SEVEN", "и": "EIGHT",
    "бгъу": "NINE", "пщӀы": "TEN", "щэ": "HUNDRED",
    "мин": "THOUSAND", "мелуане": "TEN_THOUSAND",
    
    # === ZAMAN ===
    "сыт щыгъуи": "ALWAYS", "зэпымыууэ": "CONTINUOUSLY",
    "зэзэмызэ": "SOMETIMES", "зэикӀ": "NEVER",
    "иджы": "NOW", "иджыпсту": "NOW", "щӀэхыу": "SOON",
    "нобэ": "TODAY", "нышэдибэ": "MORNING", "ныщхьэбэ": "EVENING",
    "пщыхьэщхьэ": "EVENING", "ныжэбэ": "TONIGHT",
    "пщэдей": "TOMORROW", "пщэдджыжь": "MORNING",
    "дыгъуасэ": "YESTERDAY", "вэсэмахуэ": "DAY_BEFORE_YESTERDAY",
    "нэгъабэ": "LAST_YEAR", "секунд": "SECOND",
    "дакъикъэ": "MINUTE", "сыхьэт": "HOUR",
    "тхьэмахуэ": "SUNDAY", "блыщхьэ": "MONDAY",
    "гъубж": "TUESDAY", "бэрэжьей": "WEDNESDAY",
    "махуэку": "THURSDAY", "мэрем": "FRIDAY", "щэбэт": "SATURDAY",
    "гъатхэ": "SPRING", "гъэмахуэ": "SUMMER",
    "бжьыхьэ": "AUTUMN", "щӀымахуэ": "WINTER",
    "щӀышылэ": "JANUARY", "мазае": "FEBRUARY", "гъатхэпэ": "MARCH",
    "мэлыжь": "APRIL", "накъыгъэ": "MAY", "мэкъуауэгъуэ": "JUNE",
    "бадзэуэгъуэ": "JULY", "шыщхьэӀу": "AUGUST",
    "фокӀадэ": "SEPTEMBER", "Ӏуэгъуэ": "OCTOBER",
    "щэкӀуэгъуэ": "NOVEMBER", "дыгъэгъазэ": "DECEMBER",
    
    # === DOĞA ===
    "уафэ": "SKY", "уэшх": "RAIN", "уэс": "SNOW", "дыгъэ": "SUN",
    "мазэ": "MOON", "вагъуэ": "STAR", "псы": "WATER", "хы": "SEA",
    "бгы": "MOUNTAIN", "мэз": "FOREST", "гуэл": "LAKE",
    "бащ": "STICK", "гуащӀэ": "SOUR",
    
    # === MESLEK ===
    "Ӏэзэ": "DOCTOR", "тхакӀуэ": "WRITER", "егъэджакӀуэ": "TEACHER",
    "еджакӀуэ": "STUDENT", "усакӀуэ": "POET", "щакӀуэ": "HUNTER",
    "лажьакӀуэ": "WORKER", "къафакӀуэ": "DANCER",
    "пшынауэ": "MUSICIAN", "уэрэдохъуэ": "SINGER",
    "сымаджащӀэ": "NURSE", "гъущӀӀэщӀэ": "BLACKSMITH",
    "пхъэщӀэ": "CARPENTER", "кхъухьлъатэзехуэ": "PILOT",
    "шыгузехуэ": "DRIVER", "хъушэсыж": "SHEPHERD",
    "плъыр": "GUARD", "пщылӀ": "FARMER", "зауэлӀ": "SOLDIER",
    "унэӀут": "HOUSEKEEPER", "гъуэгурыкӀуэ": "TRAVELER",
    "джэгуакӀуэ": "MINSTREL", "дыщэщӀэ": "GOLDSMITH",
    "бжэнышэ": "GOATHERD", "шэхущэ": "MERCHANT",
    "джанэдэдӀ": "TAILOR", "вакъэдэдӀ": "SHOEMAKER",
    "псыхьэ": "WATER_CARRIER", "тхылъзехьэ": "LIBRARIAN",
    "чылэпащхьэ": "VILLAGE_HEAD", "бдзэжьеящэ": "FISHER",
}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    if form in CATEGORY_MAP and not l.get("conceptId"):
        l["conceptId"] = CATEGORY_MAP[form]
        guncellenen += 1

print(f"conceptId eklenen: {guncellenen}")
print(f"conceptId dolu: {sum(1 for l in lex if l.get('conceptId'))} / {len(lex)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK Kaydedildi")
