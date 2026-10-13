import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
kalan = [l for l in lex if not l.get("rootIds")]

# NotebookLM'in yeni EKLE listesi (63 kelimeden)
ekle_listesi = {
    # Uzun (10+)
    "шӏошъхъуныгъэ": ("R-SHTSH", "FAITH", "suffix"),
    "рыкӏохэрэм": ("R-KWE", "WALKERS_ERG", "prefix+suffix"),
    "апхуэдизкӏэ": ("R-A", "DEGREE_INSTR", "suffix"),
    "ошӏэ-дэмышӏэу": ("R-SHTSHE", "SUDDENLY", "compound"),
    "рыкӏохэрэр": ("R-KWE", "WALKERS_NOM", "prefix+suffix"),
    "шӏошъхъуныгъэм": ("R-SHTSH", "FAITH_ERG", "suffix"),
    "шӏошъхъуныгъэу": ("R-SHTSH", "FAITH_ADV", "suffix"),
    "хуитыныгъэр": ("R-XWIT", "FREEDOM_NOM", "suffix"),
    
    # Orta (6-9)
    "ныжэбэ": ("R-NYZHEBE", "TONIGHT", "compound"),
    "зехьан": ("R-HE", "CARRY_AROUND", "prefix"),
    "язакъоу": ("R-ZAQWE", "ALONE", "suffix"),
    "шхъухьэ": ("R-SHXW", "POISON", "compound"),
    "пчъагъэ": ("R-BZHY", "NUMBER", "suffix"),
    
    # Kısa (3-5)
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
