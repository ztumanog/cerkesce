import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

# DUZELTILMIS EKLE listesi
ekle_listesi = {
    # Cerkesce oz
    "ушъхьагъу": ("R-SHHA", "REASON", "compound"),
    "апхуэдэу": ("R-A", "MANNER", "suffix"),
    "хуому": ("R-XWEM", "SLOW", "root"),
    "аныхэ": ("R-ANE", "GRANDMOTHER", "root"),
    "ийщӀ": ("R-NUM", "NUMBER_EIGHTY", "compound"),
    "и": ("R-NUM", "NUMBER_EIGHT", "root"),
    "уорк": ("R-WERQ", "NOBLE", "root"),
    "щысхь": ("R-SHYSH", "MERCY", "root"),
    "таучэл": ("R-TAWCHEL", "COURAGE", "root"),
    "щатэ": ("R-SHATE", "CREAM", "root"),
    "щитӀ": ("R-NUM", "NUMBER_TWO_HUNDRED", "compound"),
    "щиплӀ": ("R-NUM", "NUMBER_FOUR_HUNDRED", "compound"),
    "щитху": ("R-NUM", "NUMBER_FIVE_HUNDRED", "compound"),
    "апхуэдэ": ("R-A", "DEMONSTRATIVE", "compound"),
    "аущтэу": ("R-A", "MANNER", "suffix"),
    "пстэуми": ("R-PSTEW", "ALL", "suffix"),
    "пстэури": ("R-PSTEW", "ALL", "suffix"),
    "адрэ": ("R-A", "OTHER", "compound"),
    "адрей": ("R-A", "OTHER", "compound"),
    "хуит": ("R-XWIT", "FREE", "root"),
    "апхуэдизу": ("R-A", "DEGREE", "suffix"),
    "яужь": ("R-WZJH", "SEQUENCE", "prefix"),
    "щабэ": ("R-SHABE", "SOFT", "root"),
    "тыдэ": ("R-DEN", "WHERE", "compound"),
    "чъыг": ("R-ZHYG", "TREE", "root"),
    "хуитыныгъэ": ("R-XWIT", "FREEDOM", "suffix"),
    "пасэрей": ("R-PASE", "ANCIENT", "suffix"),
    "зехьэн": ("R-HE", "CARRY", "prefix"),
    "арэущтэу": ("R-A", "DISCOURSE", "suffix"),
    "апхуэдиз": ("R-A", "QUANTITY", "compound"),
    "ипкъ": ("R-PQY", "BASIS", "prefix"),
    "адрэр": ("R-A", "OTHER", "suffix"),
    "ауан": ("R-AWAN", "MOCKERY", "root"),
    "хуиту": ("R-XWIT", "FREELY", "suffix"),
    # Cerkescelesmis alintilar (EKLE!)
    "насып": ("R-NASYP", "HAPPINESS", "root"),
    "мамыр": ("R-MAMYR", "PEACE", "root"),
    "амал": ("R-AMAL", "POSSIBILITY", "root"),
    "арэзы": ("R-AREZY", "CONTENTMENT", "root"),
    "жэуап": ("R-ZHEUAP", "ANSWER", "root"),
    "пачъыхьэ": ("R-PACHYHE", "KING", "root"),
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
