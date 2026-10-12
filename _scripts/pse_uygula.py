import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

# ============================================================
# MİMARIN 105 KAYDI — TAM LİSTE
# Format: form: (CONCEPT, SUB, POS_donusum)
# ============================================================
MIMAR_105 = {
    "псэ":              ("SOUL", "SOUL", "noun"),
    "псэбыдэ":          ("RESILIENT", "RESILIENT", "adjective"),
    "псэгу":            ("SOUL", "SOUL_CORE", "noun"),
    "псэгъащтэ":        ("TERRIFYING", "TERRIFYING", "adjective"),
    "псэгъу":           ("LIFE_PARTNER", "LIFE_PARTNER", "noun"),
    "псэдзыгъэ":        ("SELF_SACRIFICE", "SELF_SACRIFICE", "noun"),
    "псэемыблэж":       ("SELFLESS", "SELFLESS", "adjective"),
    "псэемыблэжу":      ("SELFLESSLY", "SELFLESSLY", "adverb"),
    "псэжь":            ("DEAR_SOUL", "DEAR_SOUL", "noun"),
    "псэзэпылъхьэпӏэ":  ("CRITICAL_STATE", "CRITICAL_STATE", "noun"),
    "псэкӀуэд":         ("SIN", "SIN", "noun"),
    "псэкӏи":           ("SOUL_CRY", "SOUL_CRY", "noun"),
    "псэкӏод":          ("SIN", "SIN", "noun"),
    "псэкӏодхэр":       ("SINS", "SINS", "noun"),
    "псэкӏодшӏагъэ":    ("COMMITTED_SIN", "COMMITTED_SIN", "noun"),
    "псэкӏодшӏагъэу":   ("SINFULLY", "SINFULLY", "adverb"),
    "псэкӏодшӏагъэхэр": ("COMMITTED_SINS", "COMMITTED_SINS", "noun"),
    "псэкӏодшӏэгъабэ":  ("MULTIPLE_SINS", "MULTIPLE_SINS", "adjective/noun"),
    "псэкӏодшӏэным":    ("SINNING", "SINNING", "noun"),
    "псэкӏодыбэ":       ("SINFUL", "SINFUL", "adjective/noun"),
    "псэкӏодым":        ("SIN", "SIN_OBLIQUE", "noun"),
    "псэкӏодыр":        ("SIN", "SIN_SPECIFIC", "noun"),
    "псэкӏодышӏэ":      ("SINNER", "SINNER", "noun"),
    "псэкӏодэу":        ("SIN", "AS_SIN", "adverb"),
    "псэкӀэ":           ("SOUL", "WITH_SOUL", "noun"),
    "псэлъалэ":         ("TALKATIVE", "TALKATIVE", "adjective"),
    "псэлъапӀэ":        ("SPEAKING_PLACE", "SPEAKING_PLACE", "noun"),
    "псэлъафэ":         ("SPEECH_STYLE", "SPEECH_STYLE", "noun"),
    "псэлъыхъу":        ("SUITOR", "SUITOR", "noun"),
    "псэлъыхъугъуэ":    ("SUITOR_TIME", "SUITOR_TIME", "noun"),
    "псэлъыхъуншэ":     ("SUITORLESS", "SUITORLESS", "adjective"),
    "псэлъэ":           ("SPEECH", "SPEECH", "noun"),
    "псэлъэгъу":        ("INTERLOCUTOR", "INTERLOCUTOR", "noun"),
    "псэлъэгъуей":      ("HARD_TO_TALK_TO", "HARD_TO_TALK_TO", "adjective"),
    "псэлъэкъуэн":      ("START_TALKING", "START_TALKING", "verb"),
    "псэлъэкӀэмыщӀэ":   ("POOR_SPEAKER", "POOR_SPEAKER", "adjective"),
    "псэлъэкӏэ":        ("SPEECH_MANNER", "SPEECH_MANNER", "noun"),
    "псэлъэн":          ("SPEAK", "SPEAK", "verb"),
    "псэлъэныгъэ":      ("SPEECH_ABILITY", "SPEECH_ABILITY", "noun"),
    "псэлъэрей":        ("TALKATIVE", "TALKATIVE", "adjective/noun"),
    "псэлъэрилэ":       ("GARRULOUS", "GARRULOUS", "adjective"),
    "псэм":             ("SOUL", "SOUL_OBLIQUE", "noun"),
    "псэми":            ("SOUL", "SOUL_ALSO", "noun"),
    "псэншэ":           ("LIFELESS", "LIFELESS", "adjective"),
    "псэогъу":          ("LIFE_PARTNER", "LIFE_PARTNER", "noun"),
    "псэоу":            ("ALIVE", "ALIVE", "adverb"),
    "псэр":             ("SOUL", "SOUL_SPECIFIC", "noun"),
    "псэри":            ("SOUL", "SOUL_ALSO", "noun"),
    "псэрэкӏэ":         ("WITH_LIFE", "WITH_LIFE", "adverb"),
    "псэу":             ("ALIVE_HEALTHY", "ALIVE_HEALTHY", "adjective"),
    "псэуа":            ("LIVED", "LIVED", "verb"),
    "псэуалъ":          ("BUILDING", "BUILDING", "noun"),
    "псэуалъапхъэ":     ("BUILDING_MATERIAL", "BUILDING_MATERIAL", "noun"),
    "псэуалъэ":         ("DWELLING_STRUCTURE", "DWELLING_STRUCTURE", "noun"),
    "псэуауэ":          ("HAVING_LIVED", "HAVING_LIVED", "adverb"),
    "псэуащ":           ("LIVED_PAST", "LIVED_PAST", "verb"),
    "псэудэууэ":        ("SURVIVING", "SURVIVING", "adverb"),
    "псэужащ":          ("SURVIVED_PAST", "SURVIVED_PAST", "verb"),
    "псэужын":          ("SURVIVE", "SURVIVE", "verb"),
    "псэукӀэмыщӀэ":     ("POOR_LIVING", "POOR_LIVING", "adjective"),
    "псэукӏэ":          ("LIFESTYLE", "LIFESTYLE", "noun"),
    "псэукӏэм":         ("LIFESTYLE", "LIFESTYLE_OBLIQUE", "noun"),
    "псэукӏэр":         ("LIFESTYLE", "LIFESTYLE_SPECIFIC", "noun"),
    "псэум":            ("LIVING_BEINGS", "LIVING_OBLIQUE", "noun"),
    "псэун":            ("LIVE", "LIVE", "verb"),
    "псэуну":           ("WILL_LIVE", "WILL_LIVE", "verb"),
    "псэунущ":          ("WILL_LIVE", "WILL_LIVE_FUTURE", "verb"),
    "псэуныгъэ":        ("LIFE", "LIFE", "noun"),
    "псэуным":          ("LIFE", "LIFE_OBLIQUE", "noun"),
    "псэупӀэ":          ("DWELLING", "DWELLING", "noun"),
    "псэупӏэм":         ("DWELLING", "DWELLING_OBLIQUE", "noun"),
    "псэупӏэр":         ("DWELLING", "DWELLING_SPECIFIC", "noun"),
    "псэупӏэу":         ("DWELLING", "AS_DWELLING", "adverb"),
    "псэууэ":           ("ALIVE", "ALIVE_ADVERB", "adverb"),
    "псэуху":           ("WHILE_LIVING", "WHILE_LIVING", "adverb"),
    "псэухукӀэ":        ("WHILE_LIVING", "AS_LONG_AS_LIVING", "adverb"),
    "псэухэм":          ("LIVING_BEINGS", "LIVING_BEINGS_OBLIQUE", "noun"),
    "псэухэр":          ("LIVING_BEINGS", "LIVING_BEINGS", "noun"),
    "псэушъхь":         ("ANIMAL", "ANIMAL_LIVING_BEING", "noun"),
    "псэушъхьэ":        ("ANIMAL", "ANIMAL_LIVING_BEING", "noun"),
    "псэушъхьэхэр":     ("ANIMALS", "ANIMALS", "noun"),
    "псэущ":            ("IS_LIVING", "IS_LIVING", "verb"),
    "псэущт":           ("WILL_LIVE", "WILL_LIVE", "verb"),
    "псэущхьэ":         ("LIVING_BEING", "LIVING_BEING", "noun"),
    "псэущхьэхэм":      ("ANIMALS", "ANIMALS_OBLIQUE", "noun"),
    "псэущхьэхэр":      ("ANIMALS", "ANIMALS", "noun"),
    "псэущхьэшх":       ("CARNIVORE", "CARNIVORE", "noun"),
    "псэф":             ("PREGNANT_ANIMAL", "PREGNANT_ANIMAL", "adjective/noun"),
    "псэфылъэ":         ("RESTING_PLACE", "RESTING_PLACE", "noun"),
    "псэху":            ("PEACEFUL", "PEACEFUL", "adjective"),
    "псэхугъуэ":        ("RELIEF", "RELIEF", "noun"),
    "псэхужын":         ("REST", "REST", "verb"),
    "псэхун":           ("REST", "REST", "verb"),
    "псэхуныгъэ":       ("REST", "REST", "noun"),
    "псэхупӀэ":         ("RESTING_PLACE", "RESTING_PLACE", "noun"),
    "псэхыжын":         ("EXPIRE_DIE", "EXPIRE_DIE", "verb"),
    "псэхэлӀэ":         ("DEVOTED", "DEVOTED", "adjective"),
    "псэхэм":           ("SOULS", "SOULS_OBLIQUE", "noun"),
    "псэхэр":           ("SOULS", "SOULS", "noun"),
    "псэхэх":           ("EXHAUSTED", "EXHAUSTED", "adjective"),
    "псэӀух":           ("CHEERFUL", "CHEERFUL", "adjective"),
}

TAXONOMY = "Ruh & Can"
ROOT = "псэ"

uygulanan = 0
guncellenen = 0
bulunamayan = []

for l in lex:
    form = l.get("form", "")
    if form in MIMAR_105:
        concept, sub, pos = MIMAR_105[form]
        eski_concept = l.get("conceptId")
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = TAXONOMY
        l["rootForm"] = ROOT
        # POS güncelle (boşsa)
        if not l.get("partOfSpeech"):
            l["partOfSpeech"] = pos
        uygulanan += 1

# Bulunamayanları kontrol et
mevcut = {l.get("form") for l in lex}
bulunamayan = [f for f in MIMAR_105 if f not in mevcut]

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"OK - {uygulanan} kayit guncellendi")
if bulunamayan:
    print(f"Bulunamayan: {len(bulunamayan)}")
    for f in bulunamayan:
        print(f"  - {f}")
else:
    print("Tum kayitlar bulundu!")
