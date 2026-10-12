import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-LAZHE-N", "form": "лажьэ", "ipa": "/ˈɮɑ:ʑɐ/",
     "partOfSpeech": "noun", "literalMeaning": "kusur, keder, suc",
     "wordFamilyId": "WF-LAZHE", "conceptId": "DEFECT",
     "senses": [
         {"senseId": 1, "gloss": "defect, flaw", "tr": "kusur, eksiklik"},
         {"senseId": 2, "gloss": "grief, misfortune", "tr": "keder, bela"},
         {"senseId": 3, "gloss": "guilt, fault", "tr": "suç, kabahat"}
     ],
     "sources": ["Apasev 2008", "Kokov 2008", "Amcad Camuha 1997", "Tharkaho 1991"],
     "notes": "C-11.3: kusur/keder/suc. 11 deyim. Korpus: 1212.",
     "corpusFrequency": 1212},
    {"id": "L-LAZHENSHE", "form": "лажьэншэ", "literalMeaning": "kusursuz, masum",
     "wordFamilyId": "WF-LAZHE", "conceptId": "INNOCENT",
     "notes": "C-11.3: kusursuz, masum. Korpus: 15.", "corpusFrequency": 15},
    {"id": "L-LAZHEREY", "form": "лажьэрей", "literalMeaning": "caliskan",
     "wordFamilyId": "WF-LAZHE", "conceptId": "DILIGENT",
     "notes": "C-11.3: caliskan. Korpus: 1.", "corpusFrequency": 1},
    {"id": "L-LAZHESHKHUE", "form": "лажьэшхуэ", "literalMeaning": "bela",
     "wordFamilyId": "WF-LAZHE", "conceptId": "DISASTER",
     "notes": "C-11.3: bela. Korpus: 1.", "corpusFrequency": 1},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

# WF-LAZHE ailesi
wf_path = Path("public/data/linguistic/word_families.json")
wf = json.loads(wf_path.read_text(encoding="utf-8"))
if "WF-LAZHE" not in {w["id"] for w in wf}:
    wf.append({
        "id": "WF-LAZHE", "rootId": "R-LAZH",
        "category": "abstract", "subcategory": "quality",
        "semanticDomains": ["defect", "misfortune", "guilt"],
        "lexemeIds": ["L-LAZHE-N", "L-LAZHENSHE", "L-LAZHEREY", "L-LAZHESHKHUE"],
        "productivity": {"totalLexemes": 4, "corpusFrequency": 1229, "mostFrequentLexemeId": "L-LAZHE-N"},
        "relatedFamilies": ["WF-LEZH"],
        "dialectNote": {"adyghe": "лажьэ", "kabardian": "лажьэ"},
        "notes": "C-11.3 yeni aile. Kusur/keder/suc. 11 deyim. Homonim: WF-LEZH (calismak) ile karistirilmamali."
    })
    print("Eklendi: WF-LAZHE")

# R-LAZH root
root_path = Path("public/data/linguistic/roots.json")
roots = json.loads(root_path.read_text(encoding="utf-8"))
if "R-LAZH" not in {r["id"] for r in roots}:
    roots.append({
        "id": "R-LAZH", "form": "лажь",
        "primaryMeaning": "kusur, keder, suc",
        "secondaryMeanings": ["defect", "misfortune", "guilt"],
        "semanticDomains": ["quality", "emotion"],
        "dialectVariants": {"adyghe": "лажь", "kabardian": "лажь"},
        "notes": "C-11.3: kusur koku. Korpus: 1229. Homonim: R-LEZH (calismak)."
    })
    print("Eklendi: R-LAZH")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding="utf-8")
root_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"\nLexeme: {len(lex)}")
print(f"Aile: {len(wf)}")
print(f"Root: {len(roots)}")
