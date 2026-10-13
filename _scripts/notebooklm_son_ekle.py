import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# NotebookLM'in EKLE listesi (6 kelime)
ekle_listesi = {
    "ийщӀ": ("R-NUM", "NUMBER_EIGHTY", "compound"),
    "жъгъей": ("R-ZHGEY", "SMALL", "root"),
    "иутын": ("R-WT", "STRIKE_PRESS", "prefix"),
    "пштэмэ": ("R-SHTE", "TAKE_IF", "suffix"),
    "зандэу": ("R-ZANDE", "STRAIGHTLY", "suffix"),
    "тохуэ": ("R-TOXWE", "FAWN_COLOR", "root"),
}

guncellenen = 0
for l in lex:
    form = l.get("form", "").lower().strip()
    if form in ekle_listesi:
        root_id, concept_id, rule = ekle_listesi[form]
        if not l.get("rootIds"):
            l["rootIds"] = [root_id]
            l["wordFamilyId"] = f"WF-{root_id}"
            l["conceptId"] = concept_id
            l["derivation"] = {
                "rootIds": [root_id],
                "morphemeIds": [],
                "rule": rule
            }
            guncellenen += 1

print(f"Guncellenen: {guncellenen}")
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK")

# Yeni durum
for alan in ["rootIds", "wordFamilyId", "conceptId", "derivation", "ipa"]:
    dolu = sum(1 for l in lex if l.get(alan))
    print(f"  {alan:20s} {dolu:6}/{len(lex)} ({100*dolu/len(lex):.1f}%)")
