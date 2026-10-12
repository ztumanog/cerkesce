import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-emotion-fix-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Mimar'in siniflandirmasi (conceptId <- subConceptId)
DUZELT = {
    # JOY
    "гуфӀэ": "JOY", "гуфӀэн": "JOY", "гуфӀэгъуэ": "JOY",
    "гушхо": "JOY", "гухэхъуэ": "JOY", "гурыфӀыгъуэ": "JOY",
    "насып": "JOY", "нэфӀэгуфӀагъэ": "JOY", "нэщхъыфӀагъэ": "JOY",
    "къэгуфӀэн": "JOY", "нэжэгужэн": "JOY", "гурыфӀ": "JOY",
    "гуапэ": "JOY", "гурыхь": "JOY", "гъэгуфӀэн": "JOY",
    # ANGER
    "губжь": "ANGER", "губжьын": "ANGER", "губжьауэ": "ANGER",
    "губжьащ": "ANGER", "къэгубжьын": "ANGER", "зыфыщӀыжын": "ANGER",
    "зэгуэп": "ANGER", "гужъ": "ANGER", "гужьгъэжь": "ANGER",
    "дзэлэшхэн": "ANGER", "къэчэн": "ANGER", "мэхъэшэн": "ANGER",
    "къэлыбын": "ANGER", "гъэгубжьын": "ANGER",
    # FEAR
    "шынэ": "FEAR", "шынагъуэ": "FEAR", "шынэн": "FEAR",
    "щышынэн": "FEAR", "щыщтэн": "FEAR", "къэщтэн": "FEAR",
    "гужьеигъуэ": "FEAR", "гужьей": "FEAR", "гужьеин": "FEAR",
    "гуиих": "FEAR", "гуиихпсэих": "FEAR", "гузавэ": "FEAR",
    "гузэвэгъуэ": "FEAR", "гузэвэн": "FEAR", "гузэжъогъу": "FEAR",
    "гущтэ": "FEAR", "гулэзын": "FEAR",
    # GRIEF
    "гуауэ": "GRIEF", "гуауэшхуэ": "GRIEF", "гуауэщхьэуэ": "GRIEF",
    "гукъутэ": "GRIEF", "гущӀыхьэ": "GRIEF", "гуӀэгъуэ": "GRIEF",
    "гукъеуэ": "GRIEF", "гукъау": "GRIEF", "гухэкӀ": "GRIEF",
    "гууз": "GRIEF", "гумэкӀ": "GRIEF", "гумэщӀын": "GRIEF",
    "гуныкъуэгъуэ": "GRIEF", "гукӀодыгъо": "GRIEF", "гуӀэн": "GRIEF",
    "нэщхъеин": "GRIEF", "нэщхъеягъэ": "GRIEF", "къэнэщхъеин": "GRIEF",
    # COMPASSION
    "щысхь": "COMPASSION", "щысхьын": "COMPASSION", "лыуз": "COMPASSION",
    "гущӀэгъу": "COMPASSION", "гукӀэгъу": "COMPASSION",
    "гущӀэгъугъэ": "COMPASSION", "гумыгъуэ": "COMPASSION",
    "гущӀэгъуншагъэ": "COMPASSION", "щысхьыншэу": "COMPASSION",
    "гумахэ": "COMPASSION",
    # HOPE
    "гугъэ": "HOPE", "гугъапӀэ": "HOPE", "гугъащ": "HOPE",
    "гугъэн": "HOPE", "гухэлъ": "HOPE", "гурылъ": "HOPE",
    "гукъыдэж": "HOPE", "гуращэ": "HOPE", "щӀэхъуэпсын": "HOPE",
    # LOVE
    "егуэкӀуэн": "LOVE", "лъагъуныгъэ": "LOVE", "гупсэ": "LOVE",
    "гупсэф": "LOVE", "гупсэхугъуэ": "LOVE", "гуакӀуагъ": "LOVE",
    "гущӀэ": "LOVE", "гукъабзагъэ": "LOVE",
    # SHAME
    "укӀытэ": "SHAME", "укӀытэн": "SHAME", "щыукӀытэн": "SHAME",
    "укӀытэх": "SHAME", "зыкъузын": "SHAME", "напэ": "SHAME",
    # BOREDOM
    "зэш": "BOREDOM", "езэшыныгъэ": "BOREDOM", "езэшын": "BOREDOM",
    "хуезэшын": "BOREDOM", "бампӀэ": "BOREDOM", "бампӀэн": "BOREDOM",
    # RESENTMENT
    "гуажэ": "RESENTMENT", "гукъанэ": "RESENTMENT",
    "гукъинэж": "RESENTMENT", "зыгъэгусэн": "RESENTMENT",
    # PRIDE (onceki)
    "пагагъ": "PRIDE",
    # DISGUSTING (onceki)
    "хьэудз-хьэгын": "DISGUSTING",
}

sayac = 0
for l in lex:
    form = l.get("form", "")
    if form in DUZELT:
        l["conceptId"] = DUZELT[form]
        l["subConceptId"] = "EMOTION"
        l["taxonomyFamily"] = "Duygu & Zihin"
        sayac += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {sayac} kayit guncellendi")

# Kontrol
from collections import Counter
emotion = [l for l in lex if l.get("subConceptId") == "EMOTION"]
print(f"\nEMOTION kayitlari: {len(emotion)}")
cid = Counter(l.get("conceptId") for l in emotion)
for c, s in cid.most_common(20):
    print(f"  {c}: {s}")
