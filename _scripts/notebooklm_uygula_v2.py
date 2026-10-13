import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

# NotebookLM'in EKLE listesi (135 kelimeden)
ekle_listesi = {
    # === ILK 60 KELIME ===
    "ийщӀ": ("R-NUM", "NUMBER_EIGHTY", "compound"),
    "щитӀ": ("R-NUM", "NUMBER_TWO_HUNDRED", "compound"),
    "щиплӀ": ("R-NUM", "NUMBER_FOUR_HUNDRED", "compound"),
    "хамэ": ("R-XAME", "FOREIGNER", "root"),
    "ыублагъ": ("R-WBL", "STARTED", "prefix"),
    "убыдын": ("R-WBYD", "CATCH", "root"),
    "сэтэней": ("R-SETENEY", "FLOWER_MYTH", "root"),
    "адрейр": ("R-A", "OTHER", "suffix"),
    "шъабэ": ("R-SHABE", "SOFT", "root"),
    "сэтей": ("R-SETEY", "PLAIN", "root"),
    "шъао": ("R-SHAWE", "SON_YOUTH", "root"),
    "жьгъей": ("R-ZHGEY", "SMALL", "root"),
    "ухуэныгъэ": ("R-WXW", "BUILDING", "suffix"),
    "дэеу": ("R-DEY", "BADLY", "suffix"),
    "итын": ("R-TEN", "STAND_IN", "prefix"),
    "загъорэ": ("R-ZAGW", "SOMETIMES", "suffix"),
    "ухуэн": ("R-WXW", "BUILD", "root"),
    "ардэдэм": ("R-A", "INSTANT", "suffix"),
    "ихуэн": ("R-XWEN", "DRIVE_IN", "prefix"),
    "щабэу": ("R-SHABE", "SOFTLY", "suffix"),
    "щоджэн": ("R-SHOGEN", "PRIEST_TITLE", "root"),
    "чъые": ("R-ZHYE", "SLEEP", "root"),
    "хахуэ": ("R-XAXWE", "BRAVE", "root"),
    "зезыхьэ": ("R-HE", "CARRIER", "prefix"),
    
    # === IKINCI 75 KELIME ===
    "апхуэдэурэ": ("R-A", "MANNER", "suffix"),
    "хуитыныгъэхэр": ("R-XWIT", "FREEDOMS", "suffix"),
    "пчъагъэхэр": ("R-PCHHAGHE", "NUMBERS", "suffix"),
    "апхуэдизрэ": ("R-A", "DEGREE", "suffix"),
    "зехьэныгъэ": ("R-HE", "CARRYING", "suffix"),
    "узижэгъуэн": ("R-ZHEGHE", "HATE", "prefix+suffix"),
    "зехуэныгъэ": ("R-XWEN", "GRAZING", "suffix"),
    "узижэгъуэну": ("R-ZHEGHE", "HATEFULLY", "prefix+suffix"),
    
    # === ALINTI TUREVLERI (INCELE'dan EKLE'ye) ===
    "мыарэзыныгъэ": ("R-AREZY", "DISSATISFACTION", "borrowed+suffix"),
    "арэзыныгъэ": ("R-AREZY", "SATISFACTION", "borrowed+suffix"),
    "пачъыхьагъу": ("R-PACHYHE", "KINGDOM", "borrowed+suffix"),
    "асыхьэтым": ("R-SAHAT", "AT_THAT_HOUR", "borrowed+suffix"),
    "разэ": ("R-RAZE", "CONTENT", "borrowed"),
    "мамырыгъэ": ("R-MAMYR", "PEACE", "borrowed+suffix"),
    "тамыгъэ": ("R-TAMYGHE", "BRAND", "borrowed"),
    "жызум": ("R-ZHYZUM", "GRAPE", "borrowed"),
    "сэдакъэ": ("R-SEDAQE", "ALMS", "borrowed"),
    "такъыр": ("R-TAQYR", "BARREN", "borrowed"),
}

print(f"Toplam EKLE: {len(ekle_listesi)}")
print(f"rootIds olmayan: {len(kalan)}")

guncellenen = 0
atlanan = 0

for l in kalan:
    form = l.get("form", "").lower().strip()
    if form in ekle_listesi:
        root_id, concept_id, rule = ekle_listesi[form]
        l["rootIds"] = [root_id]
        l["wordFamilyId"] = f"WF-{root_id}"
        l["conceptId"] = concept_id
        l["derivation"] = {
            "rootIds": [root_id],
            "morphemeIds": [],
            "rule": rule
        }
        guncellenen += 1
    else:
        atlanan += 1

print(f"Guncellenen: {guncellenen}")
print(f"Atlanan: {atlanan}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
