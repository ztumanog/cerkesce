import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

# TUM NOTEBOOKLM TASNIFLERINDEN EKLE LISTESI
ekle_listesi = {
    # === 49 KELIMELIK LISTE ===
    "ийщӀ": ("R-NUM", "NUMBER_EIGHTY", "compound"),
    "щитӀ": ("R-NUM", "NUMBER_TWO_HUNDRED", "compound"),
    "щиплӀ": ("R-NUM", "NUMBER_FOUR_HUNDRED", "compound"),
    "тыда": ("R-DEN", "WHERE", "compound"),
    "бахъэ": ("R-BAXWE", "STEAM_VAPOR", "root"),
    "кусэ": ("R-KWSE", "STRIPE_LINE", "root"),
    "зехуэн": ("R-XWEN", "DRIVE_HERD", "prefix"),
    "убытын": ("R-WBYD", "CATCH", "root"),
    "онтэгъу": ("R-WNETH", "HEAVY", "suffix"),
    "псей": ("R-PSEY", "FIR_TREE", "compound"),
    "мысэ": ("R-SE", "GUILTY", "prefix"),
    "бзий": ("R-BZIY", "RAY_BEAM", "root"),
    "апшъэрэ": ("R-SHHA", "HIGHEST", "prefix"),
    "пчъэ": ("R-PCHE", "DOOR", "root"),
    "ешъон": ("R-SHWE", "DRINK", "prefix"),
    "зетын": ("R-TEN", "DEDICATE", "prefix"),
    "модэ": ("R-ME", "DEMONSTRATIVE", "compound"),
    "ихун": ("R-XWEN", "EXPEL_DRIVE_OUT", "prefix"),
    "ейуэ": ("R-EY", "BELONGING", "suffix"),
    "иувэн": ("R-WV", "STAND_UP", "prefix"),
    "апхуэдэщ": ("R-A", "DEMONSTRATIVE", "suffix"),
    "хатэ": ("R-XATE", "GARDEN", "root"),
    "шъабэу": ("R-SHABE", "SOFTLY", "suffix"),
    "уцун": ("R-WTS", "STOP_STAND", "root"),
    "тыхь": ("R-TYH", "SACRIFICE", "root"),
    "хахуэу": ("R-XAXWE", "BRAVELY", "suffix"),
    "шухьэ": ("R-SHW", "CAVALRY_GROUP", "compound"),
    "лэдэх": ("R-DEX", "STREAM", "compound"),
    "хахуагъэ": ("R-XAXWE", "BRAVERY", "suffix"),
    "сахуэ": ("R-SAXWE", "FAIR_COLOR", "root"),
    "ор-орэу": ("R-EZH", "SELF", "compound"),
    "пчъагъ": ("R-BZHY", "NUMBER", "suffix"),
    "убын": ("R-WBYN", "CRITICISE", "root"),
    "чыцэ": ("R-CHYCE", "BUSH", "root"),
    "чъыен": ("R-ZHYE", "SLEEP", "root"),
    "стыр": ("R-STY", "HOT_BURNING", "suffix"),
    "бацэ": ("R-BACE", "FLUFFY", "root"),
    "шатэ": ("R-SHATE", "CREAM", "root"),
    "зыер": ("R-EY", "OWNER", "prefix+suffix"),
    "жъгъей": ("R-ZHGEY", "SMALL", "root"),
    "пахъэ": ("R-BAXWE", "STEAM", "root"),
    "ерэхъу": ("R-XWV", "OK_LET_IT_BE", "prefix"),
    "ифын": ("R-FY", "EXPEL", "prefix"),
    "тежын": ("R-ZHY", "ESCAPE_SLIDE", "prefix"),
    "щимэ": ("R-SHYME", "VESSEL", "root"),
    "ябгэ": ("R-YABGE", "FIERCE", "root"),
    "уней": ("R-WNE", "PRIVATE", "suffix"),
    "кудэн": ("R-KWD", "INSERT", "prefix"),
    "пчъагъэрэ": ("R-BZHY", "TIMES", "suffix"),
    "уцугъэ": ("R-WTS", "STOP", "suffix"),
    "огъу": ("R-WEGHW", "DROUGHT", "root"),
    "мобы": ("R-ME", "DEMONSTRATIVE", "suffix"),
    "иуэн": ("R-WE", "HIT", "prefix"),
    "ухуэнын": ("R-WXW", "BUILD_WEAVE", "root"),
    
    # === 53 KELIMELIK LISTE ===
    "шӏошъхъуныгъэ": ("R-SHTSH", "FAITH", "suffix"),
    "рыкӏохэрэм": ("R-KWE", "WALKERS_ERG", "prefix+suffix"),
    "апхуэдизкӏэ": ("R-A", "DEGREE_INSTR", "suffix"),
    "ошӏэ-дэмышӏэу": ("R-SHTSHE", "SUDDENLY", "compound"),
    "рыкӏохэрэр": ("R-KWE", "WALKERS_NOM", "prefix+suffix"),
    "шӏошъхъуныгъэм": ("R-SHTSH", "FAITH_ERG", "suffix"),
    "шӏошъхъуныгъэу": ("R-SHTSH", "FAITH_ADV", "suffix"),
    "хуитыныгъэр": ("R-XWIT", "FREEDOM_NOM", "suffix"),
    "ныжэбэ": ("R-NYZHEBE", "TONIGHT", "compound"),
    "зехьан": ("R-HE", "CARRY_AROUND", "prefix"),
    "язакъоу": ("R-ZAQWE", "ALONE", "suffix"),
    "шхъухьэ": ("R-SHXW", "POISON", "compound"),
    "пчъагъэ": ("R-BZHY", "NUMBER", "suffix"),
    "бэмэ": ("R-BE", "IF_MANY", "suffix"),
    "исын": ("R-SY", "SIT_IN", "prefix"),
    "итыгъ": ("R-TEN", "STOOD_IN", "prefix"),
    "пасэм": ("R-PASE", "IN_OLD_TIMES", "suffix"),
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
