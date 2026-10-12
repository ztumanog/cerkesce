import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-food-temizle-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Mimar'in siniflandirmasi (47 kelime)
SINIFLANDIRMA = {
    "зеиншэ": ("ORPHAN", "FAMILY_STATUS", "Toplum & İlişki"),
    "дэгъуэн": ("PERCEIVE_NOTICE", "VISION_ACTION", "Eylem & Zihin"),
    "шхын": ("EAT_FOOD", "MEAL_ACTION", "Eylem & Fiziksel"),
    "щӀэхын": ("PULL_EXTRACT", "PULL_ACTION", "Eylem & Fiziksel"),
    "къэхьын": ("BRING_VERB", "CARRY_ACTION", "Eylem & Fiziksel"),
    "егъэджакӀуэ": ("TEACHER", "PROFESSION_EDUCATION", "Toplum & Meslek"),
    "пщӀэ": ("RESPECT_HONOR", "VALUE_RESPECT", "Toplum & Etkileşim"),
    "къафэн": ("DANCE_VERB", "PERFORM_ACTION", "Kültür & Etkileşim"),
    "дэӀэпыкъун": ("HELP_ASSIST", "SUPPORT_ACTION", "Toplum & Etkileşim"),
    "ужыныгъэ": ("EFFORT_LABOR", "WORK_ACTIVITY", "Toplum & Meslek"),
    "щӀэлъэӀун": ("REQUEST_BEG", "PLEA_ACTION", "Eylem & Dil"),
    "ехъуэхын": ("CONGRATULATE", "WISH_ACTION", "Eylem & Dil"),
    "къарууфӀэ": ("STRONG_POWERFUL", "POWER_QUALITY", "Nitelik & Beden"),
    "бэгъуа": ("ABUNDANT_PROSPEROUS", "QUANTITY_QUALITY", "Nitelik & Doğa"),
    "шхалъэ": ("FOOD_CONTAINER", "DISH_TOOL", "Eşya & Araç"),
    "лыгъэва": ("BOILED_MEAT", "FOOD_MEAT", "Yaşam & Sağlık"),
    "щӀыналъэ": ("REGION_HOMELAND", "TERRITORY_LOCATION", "Toplum & Yurt"),
    "дзажэщӀ": ("GUM_DENTAL", "MOUTH_BODY", "İnsan & Beden"),
    "кӀэлъыкӀуэн": ("FOLLOW_PURSUE", "WALK_FOLLOW", "Eylem & Fiziksel"),
    "иужьыӀукӀэ": ("FINALLY_ULTIMATELY", "TIME_ADV", "Gramer & Nitelik"),
    "псыджанэ": ("LAKE_POND", "WATER_BODY", "Doğa & Doğa"),
    "пщылӀ": ("SERVANT_SLAVE", "SOCIAL_STATUS", "Toplum & Meslek"),
    "унэӀут": ("HOUSE_SERVANT", "DOMESTIC_WORKER", "Toplum & Meslek"),
    "Зэш": ("BOREDOM_GLOOM", "EMOTION_GLOOM", "Nitelik & Zihin"),
    "Щысхь": ("MERCY_COMPASSION", "MERCY_EMOTION", "Düşünce & Soyut"),
    "Лыуз": ("COMPASSION_PAIN", "EMPATHY_EMOTION", "Düşünce & Soyut"),
    "Таучэл": ("COURAGE_BRAVERY", "VALOR_QUALITY", "Nitelik & Zihin"),
    "Гуиихпсэих": ("TERRIFYING_HORRIFIC", "DREAD_EMOTION", "Düşünce & Soyut"),
    "ЗэрыщӀэтӀэн": ("HATE_DETEST", "HOSTILITY_EMOTION", "Eylem & Zihin"),
    "Щхьэжэгъуэн": ("DEPRESSED_OVERWHELMED", "MENTAL_DISTRESS", "Nitelik & Zihin"),
    "мэлыл": ("MUTTON", "MEAT_TYPE", "Yaşam & Sağlık"),
    "дэт": ("STAND_BETWEEN", "POSITION_STATE", "Gramer & Çekim"),
    "лэжьа": ("WORKED_DONE_WORN", "PAST_ACTION_STATE", "Gramer & Çekim"),
    "шха": ("STUCK_GLUED", "ATTACHED_STATE", "Gramer & Çekim"),
    "мышу": ("FRESH_SWEET", "TASTE_FRESHNESS", "Nitelik & Duyu"),
    "зэгъусэу": ("TOGETHER_ADV", "TOGETHERNESS_ADV", "Gramer & Nitelik"),
    "пкъымызагъэ": ("FIDGETY_RESTLESS", "RESTLESS_BEHAVIOR", "Nitelik & Beden"),
    "хэнэн": ("STICK_GET_STUCK", "ATTACH_ACTION", "Eylem & Fiziksel"),
    "советскэ": ("SOVIET_HISTORICAL", "HISTORICAL_TERM", "Toplum & Yurt"),
    "яубыдын": ("CATCH_IMPRISON", "CAPTURE_ACTION", "Eylem & Fiziksel"),
    "укъуэдия": ("STRETCHED_OUT", "POSTURE_STATE", "Gramer & Çekim"),
    "дагон": ("SUFFER_DEFEAT", "DEFEAT_ACTION", "Eylem & Fiziksel"),
    "къэуэж": ("EXPLOSIVE_BURSTING", "WEAPON_BURST", "Nitelik & Doğa"),
    "убзыхуа": ("ARRANGED_SET", "ORDERED_STATE", "Gramer & Çekim"),
    "зэдэпсэун": ("LIVE_TOGETHER", "COHABIT_ACTION", "Eylem & Fiziksel"),
    "гъэува": ("PLACED_SET_PAST", "POSITIONED_STATE", "Gramer & Çekim"),
    "щІакхъуэгъэтэдж": ("YEAST_HOPS", "BAKING_INGREDIENT", "Yaşam & Sağlık"),
}

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if form in SINIFLANDIRMA:
        concept, sub, family = SINIFLANDIRMA[form]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = family
        uygulanan += 1
        print(f"  OK: {form} -> {concept}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nOK - {uygulanan} kayit guncellendi")
