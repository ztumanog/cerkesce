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

PE_5TUR = {
    "пэрыгъэувэн":       ("BLOCK_PLACE_CAUS", "CAUSATIVE_BLOCK", "Eylem & Fiziksel"),
    "пэрыгъэукӀуриен":   ("ROLL_FORWARD_CAUS", "CAUSATIVE_ROLL", "Eylem & Fiziksel"),
    "пэрыгъэӀэбэн":      ("REACH_FORWARD_CAUS", "CAUSATIVE_REACH", "Eylem & Fiziksel"),
    "пэрыкуэн":          ("WALK_FORWARD", "MOVE_FORWARD", "Eylem & Fiziksel"),
    "пэрылъын":          ("LIE_IN_FRONT", "BLOCK_STATE", "Eylem & Fiziksel"),
    "пэрылъэдэн":        ("RUN_TOWARD", "APPROACH_RUN", "Eylem & Fiziksel"),
    "пэрылъэтын":        ("FLY_FORWARD", "JUMP_FORWARD", "Eylem & Fiziksel"),
    "пэрылӀыхьын":       ("DIE_IN_FRONT", "DIE_BEFORE", "Eylem & Fiziksel"),
    "пэрымэ":            ("NOSE_SMELL", "SMELL_SENSE", "İnsan & Beden"),
    "пэрыохъу":          ("OBSTACLE", "HINDRANCE", "Düşünce & Soyut"),
    "пэрытын":           ("STAND_IN_FRONT", "GUARD_STAND", "Eylem & Fiziksel"),
    "пэрыублэрэкӀэн":    ("STUMBLE_FORWARD", "STUMBLE_ACTION", "Eylem & Fiziksel"),
    "пэрыубыдэн":        ("DETAIN", "HOLD_BACK", "Eylem & Fiziksel"),
    "пэрыувэн":          ("STEP_IN_FRONT", "BLOCK_WAY", "Eylem & Fiziksel"),
    "пэрыуэншэ":         ("UNIMPEDED", "FREE_PASSAGE", "Nitelik & Doğa"),
    "пэрыуэншэу":        ("UNIMPEDED_ADV", "FREELY_ADV", "Gramer & Nitelik"),
    "пэрыхуэн":          ("DRIVE_FORWARD", "HERD_FORWARD", "Toplum & Meslek"),
    "пэрыхъухьын":       ("ENCIRCLE_FRONT", "BLOCK_AROUND", "Eylem & Fiziksel"),
    "пэрыхын":           ("REMOVE_FROM_FRONT", "CLEAR_FRONT", "Eylem & Fiziksel"),
    "пэрыхьащ":          ("REACHED_FRONT", "ARRIVED_FRONT", "Gramer & Çekim"),
    "пэрыхьэт":          ("ABUNDANT", "PLENTIFUL", "Nitelik & Doğa"),
    "пэрыхьэту":         ("ABUNDANTLY", "PLENTIFULLY_ADV", "Gramer & Nitelik"),
    "пэрыщӀыхьын":       ("FENCE_FRONT", "ENCLOSE_FRONT", "Eylem & Fiziksel"),
    "пэрыӀун":           ("NAIL_IN_FRONT", "ATTACH_FRONT", "Eylem & Fiziksel"),
    "пэрыӀэбапӀэ":       ("REACH_PLACE", "HOLD_POINT", "Eşya & Araç"),
    "пэрыӀэбэ":          ("REACHING_FORWARD", "STRETCHING_HAND", "Nitelik & Beden"),
    "пэстронкӀэ":        ("FRONT_ROW_INS", "FRONT_LINE_INS", "Gramer & Çekim"),
    "пэсын":             ("SIT_IN_FRONT", "GUARD_SIT", "Eylem & Fiziksel"),
    "пэсэрэ":            ("ANCIENT", "OLD_TIMES", "Zaman & Kültür"),
    "пэтащ":             ("STOOD_FORWARD", "STOOD_STATE", "Gramer & Çekim"),
    "пэтзэ":             ("STILL_WHILE", "CONTINUOUS_ADV", "Gramer & Çekim"),
    "пэтми":             ("ALTHOUGH", "IN_SPITE_OF", "Gramer & Çekim"),
    "пэтрэ":             ("STILL_CONTINUOUS", "ONGOING_PARTICLE", "Gramer & Çekim"),
    "пэтыгъ":            ("STANDING_STATE", "DURATION_STATE", "Eylem & Fiziksel"),
    "пэтэджын":          ("STAND_UP", "RISE_FORWARD", "Eylem & Fiziksel"),
    "пэтӀинэ":           ("TURNED_UP_NOSE", "NOSE_SHAPE", "Nitelik & Beden"),
    "пэтӀысын":          ("SIT_DOWN_IN_FRONT", "SETTLE_FRONT", "Eylem & Fiziksel"),
    "пэу":               ("FRONT_ADV", "NOSE_ADV", "Gramer & Çekim"),
    "пэубл":             ("INTRODUCTION", "PREFACE", "Eylem & Dil"),
    "пэубыдын":          ("CLAIM", "DEMAND_ACTION", "Eylem & Dil"),
    "пэуцужьын":         ("RESIST", "STAND_AGAINST", "Eylem & Fiziksel"),
    "пэфыфэн":           ("SNIFF_CONTINUOUS", "SMELL_ACTION", "İnsan & Beden"),
    "пэху":              ("WHITE_NOSED", "WHITE_FRONT", "Nitelik & Doğa"),
    "пэхутэ":            ("NOW_PRESENT", "AT_PRESENT", "Zaman & Kültür"),
    "пэц":               ("NOSE_HAIR_BRISTLE", "BRISTLE", "Doğa & Hayvan"),
    "пэцӀурэ":           ("POINTED_NOSED", "NOSE_SHAPE", "Nitelik & Beden"),
    "пэцӀуун":           ("POINTED_NOSE_VERB", "PROTRUDE_FRONT", "Nitelik & Beden"),
    "пэчыжьэ":           ("FAR_OFF", "DISTANT_FRONT", "Mekan & Yön"),
    "пэчыжьэу":          ("FAR_OFF_ADV", "DISTANTLY", "Gramer & Nitelik"),
    "пэчӀынатӀэу":       ("FOREHEAD_TO_FOREHEAD", "FACE_TO_FACE_ADV", "Gramer & Nitelik"),
    "пэшот":             ("APRON", "FRONT_CLOTH", "Eşya & Araç"),
    "пэшхуэ":            ("BIG_NOSED", "NOSE_LARGE", "Nitelik & Beden"),
    "пэшхьэку":          ("ROOM_CENTER", "FRONT_HALL", "Mekan & Yön"),
    "пэшым":             ("ROOM", "ROOM_DAT", "Gramer & Çekim"),
    "пэшышхуэ":          ("LARGE_ROOM", "BIG_HALL", "Mekan & Yön"),
    "пэшэныгъэ":         ("LEADERSHIP", "GUIDANCE", "Toplum & Meslek"),
    "пэшӀуекӀуэу":       ("OPPOSING_ADV", "CONFRONTING_ADV", "Gramer & Nitelik"),
    "пэщ":               ("ROOM", "OVERCOME", "Mekan & Yön"),
    "пэщхъыныхъу":       ("ANIMAL_FEED", "FRONT_FODDER", "Doğa & Hayvan"),
    "пэщылъын":          ("LIE_IN_ROOM", "STAY_IN_ROOM", "Eylem & Fiziksel"),
    "пэщыпхэ":           ("ROOM_MATERIAL", "BUILDING_TIMBER", "Eşya & Araç"),
    "пэщыху":            ("CONTENTED", "CALM_MIND", "Nitelik & Doğa"),
    "пэщэшхо":           ("GREAT_LEADER", "CHIEF_COMMANDER", "Toplum & Meslek"),
    "пэщэшхом":          ("GREAT_LEADER", "CHIEF_DAT", "Gramer & Çekim"),
    "пэщэшхор":          ("GREAT_LEADER", "CHIEF_NOM", "Gramer & Çekim"),
    "пэщэшхоу":          ("GREAT_LEADER", "CHIEF_ADV", "Gramer & Nitelik"),
    "пэщэшхохэм":        ("GREAT_LEADER", "CHIEF_PL_DAT", "Gramer & Çekim"),
    "пэщэшхохэмрэ":      ("GREAT_LEADER", "CHIEF_PL_AND", "Gramer & Çekim"),
    "пэщэщэн":           ("SCATTER_FRONT", "SPILL_FORWARD", "Eylem & Fiziksel"),
    "пэщӀэгъэувэн":      ("OPPOSE_CAUSATIVE", "SET_AGAINST", "Eylem & Fiziksel"),
    "пэщӀэдзын":         ("BEGIN_ACTION", "START_FORWARD", "Eylem & Fiziksel"),
    "пэщӀэлъын":         ("LIE_AGAINST", "FACE_POSITION", "Eylem & Fiziksel"),
    "пэщӀэлъэдэн":       ("RUN_TO_MEET", "RUSH_FORWARD", "Eylem & Fiziksel"),
    "пэщӀэлъэтын":       ("FLY_TO_MEET", "LEAP_FORWARD", "Eylem & Fiziksel"),
    "пэщӀэсэн":          ("SIT_OPPOSITE", "FACE_SITTING", "Eylem & Fiziksel"),
    "пэщӀэхуэн":         ("ENCOUNTER_EVENT", "MEET_CHANCE", "Eylem & Fiziksel"),
    "пэщӀэщӀэгъу":       ("STARTING_TIME", "INITIAL_PHASE", "Zaman & Kültür"),
    "пэщӀэщӀэн":         ("BEGIN_VERB", "INITIATE_ACTION", "Eylem & Fiziksel"),
    "пэщӏэдзэ":          ("BEGINNING", "INTRODUCTION", "Eylem & Dil"),
    "пэщӏэтын":          ("STAND_AGAINST", "RESIST_POSITION", "Eylem & Fiziksel"),
    "пэщӏэувэ":          ("OPPONENT", "RESISTER", "Toplum & Meslek"),
    "пэщӏэувэу":         ("OPPOSING_ADV", "RESISTING_ADV", "Gramer & Nitelik"),
    "пэӀуджын":          ("RESPOND_CALL", "ECHO_BACK", "Eylem & Dil"),
    "пэӀэщӀэу":          ("DISTANT_ADV", "FAR_AWAY_ADV", "Gramer & Nitelik"),
    "пэӏухъо":           ("APRON_BARRIER", "FRONT_SHIELD", "Eşya & Araç"),
    "пэӏухъор":          ("APRON_BARRIER", "SHIELD_NOM", "Gramer & Çekim"),
    "пэӏущӏэ":           ("MEETING_FRONT", "CONFRONTATION", "Eylem & Fiziksel"),
    "пэӏэщӏэ":           ("FAR_OFF", "DISTANT_PLACE", "Mekan & Yön"),
}

PE_NORM = {normalize(k): v for k, v in PE_5TUR.items()}

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
if not belirsiz:
    print("\n🎉 пэ- KATEGORİSİ TAM BİTTİ!")
