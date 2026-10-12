import json
from pathlib import Path

# 1. conceptId haritası (senin verdiğin)
concept_map = {
    # Somatik
    "гу": "HEART", "нэ": "EYE", "Ӏэ": "HAND", "лъэ": "FOOT", "щхьэ": "HEAD",
    "псэ": "SOUL", "бзэ": "TONGUE", "жьэ": "MOUTH", "пэ": "NOSE", "бгъэ": "CHEST",
    "бгъу": "SIDE", "кӀэ": "TAIL", "тхы": "BACK", "ныбэ": "BELLY", "пщэ": "NECK",
    "дзэ": "TOOTH", "натӀэ": "FOREHEAD", "тэмакъ": "THROAT", "нащхьэ": "EYEBROW",
    "лъэнкӀапӀэ": "KNEE", "напӀэ": "EYELID", "лъы": "BLOOD", "гущӀэ": "VISCERA",
    "Ӏэгу": "PALM", "лъэгу": "SOLE", "напс": "TEAR", "жьэпкъ": "JAW",
    "Ӏэпэ": "FINGER", "лъапэ": "TOE", "Ӏэщхьэ": "ARM",
    # Doğa
    "псы": "WATER", "мафӀэ": "FIRE", "щӀы": "EARTH", "хы": "SEA",
    "мэз": "FOREST", "мыл": "ICE", "пшэ": "CLOUD", "пхъэ": "WOOD",
    "жьы": "WIND", "дыгъэ": "SUN", "мазэ": "MOON", "вагъуэ": "STAR",
    "уафэ": "SKY", "уэшх": "RAIN", "уэс": "SNOW", "бгы": "MOUNTAIN",
    "губгъуэ": "FIELD", "псыхъуэ": "RIVER_VALLEY", "мывэ": "STONE", "ятӀэ": "MUD",
    # Akrabalık
    "адэ": "FATHER", "анэ": "MOTHER", "къуэ": "SON", "пхъу": "DAUGHTER",
    "шыпхъу": "SISTER", "къуэш": "BROTHER", "дэлъху": "MALE_SIBLING",
    "адэжь": "ANCESTOR", "аныхэ": "GRANDMOTHER", "тэтэ": "GRANDFATHER",
    "адагъэ": "FATHERHOOD", "анагъэ": "MOTHERHOOD", "анэшъ": "MATERNAL_KIN",
    "гуащэ": "MOTHER_IN_LAW", "пщы": "FATHER_IN_LAW", "щӀэблэ": "DESCENDANTS",
    "гъунэгъу": "NEIGHBOR",
    # Hayvan
    "шы": "HORSE", "дыгъужь": "WOLF", "бажэ": "FOX", "мыщэ": "BEAR",
    "кӀэпхъ": "LYNX", "джэду": "CAT", "хьэ": "DOG", "бжэн": "GOAT",
    "мэл": "SHEEP", "вы": "OX", "жэм": "COW", "кхъуэ": "PIG",
    "бзу": "BIRD", "чэт": "CHICKEN", "хыкъа": "DOLPHIN", "тхьэкӀумэчӀыхь": "RABBIT",
    "мэзчэт": "PHEASANT", "блэ": "SNAKE", "бжьэ": "BEE", "бджежь": "FISH",
    "къаз": "GOOSE", "бабыщ": "DUCK", "гуэгуш": "TURKEY", "къру": "CRANE",
    "бгъащхъуэ": "EAGLE", "къандж": "MAGPIE", "аргъуей": "MOSQUITO",
    "бжьыдзэ": "FLEA", "бэдж": "SPIDER", "уашхэ": "BADGER",
    # Renkler (önceki)
    "плъыжь": "RED", "хужь": "WHITE", "фӀыцӀэ": "BLACK", "гъуэжь": "YELLOW",
    "щхъуантӀэ": "BLUE", "удзыфэ": "GREEN", "щхъуэ": "GREY", "гъуабэ": "BROWN",
    # Sayılar (önceki)
    "зы": "ONE", "тӀу": "TWO", "щы": "THREE", "плӀы": "FOUR",
    "тху": "FIVE", "хы": "SIX", "блы": "SEVEN", "ий": "EIGHT",
    "бгъу": "NINE", "пщӀы": "TEN",
    "щэ": "ONE_HUNDRED",
}

# 2. Lexemes
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
print(f"Lexemes: {len(lex)}")

# 3. Uygula
guncellenen = 0
for l in lex:
    form = l.get("form", "")
    if form in concept_map and not l.get("conceptId"):
        l["conceptId"] = concept_map[form]
        guncellenen += 1

print(f"Güncellenen conceptId: {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Toplam: {len(lex)}")
