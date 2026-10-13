import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

kalan = [l for l in lex if not l.get("rootIds")]
print(f"rootIds olmayan: {len(kalan)}")

# SADECE CERKESCЕ oz kelimeler (Rusca/Turkce alintilar HARIC)
cerkesce_kelimeler = {
    # Bitki
    "бжей": "OAK", "кӏей": "MAPLE", "бзииху": "LINDEN",
    "шезае": "ELM", "кхэр": "CARROT", "чъыгай": "OAK_TREE",
    "чъыгае": "OAK_TREE", "мамкъут": "RASPBERRY",
    "пырамыжь": "BLUEBERRY", "щабз": "BOW",
    # Hayvan
    "бджежь": "FISH", "кушъэ": "FISH",
    # Soyut
    "намыс": "HONOR", "ужыныгъэ": "DILIGENCE",
    # Yer
    "абхъаз": "ABKHAZ", "пасэ": "OLD", "пасэу": "FORMERLY",
}

# RUSCA ALINTILAR (EKLENMEYECEK)
rusca_alintilar = {"помидор", "секунд", "кедр", "я", "а", "е"}

guncellenen = 0

for l in kalan:
    form = l.get("form", "")
    if not form:
        continue
    
    # Rusca alintilari atla
    if form.lower() in rusca_alintilar:
        continue
    
    # Cerkesce oz kelimeler
    if form in cerkesce_kelimeler:
        root_id = f"R-{form.upper()}"
        wf_id = f"WF-{cerkesce_kelimeler[form]}"
        concept_id = cerkesce_kelimeler[form]
        
        l["rootIds"] = [root_id]
        l["wordFamilyId"] = wf_id
        l["conceptId"] = concept_id
        l["derivation"] = {
            "rootIds": [root_id],
            "morphemeIds": [],
            "rule": "root"
        }
        guncellenen += 1

print(f"Guncellenen (Cerkesce oz): {guncellenen}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")
