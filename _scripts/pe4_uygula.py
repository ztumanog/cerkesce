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

PE_4TUR = {
    "пэгуным":         ("BUCKET", "CONTAINER_DAT", "Gramer & Çekim"),
    "пэгуныр":         ("BUCKET", "CONTAINER_NOM", "Gramer & Çekim"),
    "пэгъунэгъоу":     ("NEIGHBOR", "PROXIMITY_ADV", "Gramer & Nitelik"),
    "пэгъунэгъуу":     ("NEIGHBOR", "PROXIMITY_ADV", "Gramer & Nitelik"),
    "пэгъупандэ":      ("HOOK_NOSED", "NOSE_SHAPE", "Nitelik & Beden"),
    "пэгъуэкӀын":      ("GO_TO_MEET", "MEET_ACTION", "Eylem & Fiziksel"),
    "пэгъуэлъын":      ("LIE_IN_FRONT", "BLOCK_ACTION", "Eylem & Fiziksel"),
    "пэгъым":          ("COMPANION", "FRONT_PARTNER_DAT", "Gramer & Çekim"),
    "пэгъэгъуэлъын":   ("CAUSATIVE_LIE_IN_FRONT", "CAUSATIVE_BLOCK", "Eylem & Fiziksel"),
    "пэгъэжыжьэн":     ("DRIVE_BACK", "CAUSATIVE_RETURN", "Eylem & Fiziksel"),
    "пэгъэуджэн":      ("DANCE_FORWARD", "CAUSATIVE_DANCE", "Eylem & Fiziksel"),
    "пэдзыжын":        ("THROW_BACK", "THROW_ACTION", "Eylem & Fiziksel"),
    "пэжагъэ":         ("TRUTH", "TRUTH_QUALITY", "Nitelik & Ahlak"),
    "пэжкъым":         ("NOT_TRUE", "NEGATIVE_STATE", "Gramer & Çekim"),
    "пэжкъэ":          ("ISNT_IT_TRUE", "QUESTION_FORM", "Gramer & Çekim"),
    "пэжу":            ("TRULY", "TRUTH_ADV", "Gramer & Nitelik"),
    "пэжуи":           ("TRULY_EVEN", "TRUTH_EVEN", "Gramer & Çekim"),
    "пэжхэм":          ("TRUTHS", "TRUTH_OBL", "Gramer & Çekim"),
    "пэжхэр":          ("TRUTHS", "TRUTH_PL", "Gramer & Çekim"),
    "пэжщ":            ("TRUE_PREDICATE", "TRUTH_PRED", "Gramer & Çekim"),
    "пэжыгъэкӏэ":      ("TRUTHFULLY", "TRUTH_INS", "Gramer & Nitelik"),
    "пэжыгъэм":        ("TRUTH", "TRUTH_DAT", "Gramer & Çekim"),
    "пэжыгъэмрэ":      ("TRUTH_AND", "TRUTH_CONJ", "Gramer & Çekim"),
    "пэжыгъэр":        ("TRUTH", "TRUTH_NOM", "Gramer & Çekim"),
    "пэжыгъэхэм":      ("TRUTHS", "TRUTH_PL_OBL", "Gramer & Çekim"),
    "пэжыгъэхэр":      ("TRUTHS", "TRUTH_PL_NOM", "Gramer & Çekim"),
    "пэжыжьэн":        ("BE_DISTANT", "DISTANCE_ACTION", "Eylem & Fiziksel"),
    "пэжыжьэу":        ("DISTANTLY", "FAR_ADV", "Gramer & Nitelik"),
    "пэжым":           ("TRUTH", "TRUTH_DAT", "Gramer & Çekim"),
    "пэжын":           ("BE_TRUE", "TRUTH_VERB", "Eylem & Ahlak"),
    "пэжыныгъэ":       ("TRUTH", "TRUTH_QUALITY", "Nitelik & Ahlak"),
    "пэжыпкъэ":        ("TRUTH_ESSENCE", "ESSENTIAL_TRUTH", "Düşünce & Soyut"),
    "пэжыпӀэ":         ("TRUTH_PLACE", "REALITY", "Düşünce & Soyut"),
    "пэжыпӏэр":        ("TRUTH_PLACE", "REALITY_NOM", "Gramer & Çekim"),
    "пэжыр":           ("TRUTH", "TRUTH_NOM", "Gramer & Çekim"),
    "пэжырытхэ":       ("ORTHOGRAPHY", "TRUTH_WRITING", "Eylem & Yazı"),
    "пэжыӀэжын":       ("CONFESS", "TELL_TRUTH_AGAIN", "Eylem & Dil"),
    "пэжыӀэн":         ("TELL_TRUTH", "TRUTH_SPEAKING", "Eylem & Dil"),
    "пэзджын":         ("ECHO", "RESPOND_CALL", "Eylem & Dil"),
    "пэзэзэн":         ("HALT_VERB", "FREEZE_ACTION", "Eylem & Fiziksel"),
    "пэкъуэкӀын":      ("STEP_FORWARD", "MEET_ACTION", "Eylem & Fiziksel"),
    "пэкӀуэжын":       ("RETURN_FORWARD", "GO_BACK_FORWARD", "Eylem & Fiziksel"),
    "пэкӀуэтэн":       ("ADVANCE", "MOVE_FORWARD", "Eylem & Fiziksel"),
    "пэкӏу":           ("MEETING", "APPROACH", "Eylem & Fiziksel"),
    "пэкӏуэ":          ("GOING_FORWARD", "MEET_PERSON", "Toplum & İlişki"),
    "пэкӏуэу":         ("GOING_FORWARD_ADV", "APPROACH_ADV", "Gramer & Nitelik"),
    "пэкӏэ":           ("NOSE_INSTRUMENTAL", "FRONT_INS", "Gramer & Çekim"),
    "пэлъытын":        ("COMPARE", "EQUATE_ACTION", "Düşünce & Soyut"),
    "пэлъытэ":         ("EQUAL", "COMPARABLE", "Düşünce & Soyut"),
    "пэлъытэу":        ("EQUALLY", "EQUIVALENT_ADV", "Gramer & Nitelik"),
    "пэлъэныкъуэ":     ("FRONT_SIDE", "FRONT_HALF", "Mekan & Yön"),
    "пэлъэщын":        ("OVERCOME", "PREVAIL", "Eylem & Fiziksel"),
    "пэлыдын":         ("SHINE_FORWARD", "GLOW_ACTION", "Nitelik & Doğa"),
    "пэм":             ("NOSE_OBLIQUE", "FRONT_DAT", "Gramer & Çekim"),
    "пэмыжыжьэу":      ("NEARBY", "PROXIMITY_ADV", "Gramer & Nitelik"),
    "пэмычыжьэу":      ("NEARBY", "CLOSE_ADV", "Gramer & Nitelik"),
    "пэплъэрт":        ("WAITING_PAST", "EXPECT_PAST", "Gramer & Çekim"),
    "пэплъэу":         ("WAITING_ADV", "EXPECT_ADV", "Gramer & Nitelik"),
    "пэпсэлъэжын":     ("ARGUE", "CONTRADICT", "Eylem & Dil"),
    "пэпхъэрын":       ("DASH_FORWARD", "SWEEP_ACTION", "Eylem & Fiziksel"),
    "пэпчъ":           ("EVERY", "EACH_ONE", "Düşünce & Soyut"),
    "пэпщӀыпщӀын":     ("SNIFFLE", "NOSE_SNIFFLE", "İnsan & Beden"),
    "пэрикъэ":         ("ENOUGH", "SUFFICIENT", "Düşünce & Soyut"),
    "пэртэбакъ":       ("STEP", "THRESHOLD", "Eşya & Ev"),
    "пэрыгъэкӀуэтын":  ("ADVANCE_CAUSATIVE", "MOVE_FORWARD_CAUS", "Eylem & Fiziksel"),
    "пэрыгъэлъэдэн":   ("RUN_FORWARD_CAUS", "CAUSATIVE_RUN", "Eylem & Fiziksel"),
    "пэрыгъэсхьэн":    ("SET_IN_FRONT", "CAUSATIVE_PLACE", "Eylem & Fiziksel"),
    "пэрыгъэтын":      ("STAND_IN_FRONT", "CAUSATIVE_STAND", "Eylem & Fiziksel"),
    "пэрыгъэтӀысхьэн": ("SEAT_IN_FRONT", "CAUSATIVE_SEAT", "Eylem & Fiziksel"),
}

PE_NORM = {normalize(k): v for k, v in PE_4TUR.items()}

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
    for f in belirsiz[:15]:
        print(f"  - {f}")
else:
    print("\n🎉 пэ- KATEGORİSİ TAM BİTTİ!")
