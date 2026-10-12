import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# Yeni lexeme'ler
yeni = [
    # мэз (orman)
    {"id": "L-MEZ", "form": "мэз", "literalMeaning": "orman",
     "wordFamilyId": "WF-MEZ", "conceptId": "FOREST",
     "dialectVariants": {"adyghe": "мэз", "kabardian": "мэз"},
     "notes": "C-11.3: orman. Korpus: 292.", "corpusFrequency": 292},
    # мэзым (ormana)
    {"id": "L-MEZYM", "form": "мэзым", "literalMeaning": "ormana",
     "wordFamilyId": "WF-MEZ", "conceptId": "FOREST",
     "dialectVariants": {"adyghe": "мэзым", "kabardian": "мэзым"},
     "notes": "C-11.3: ormana. Ergatief. Korpus: 289.", "corpusFrequency": 289},
    # мэзхэр (ormanlar)
    {"id": "L-MEZXER", "form": "мэзхэр", "literalMeaning": "ormanlar",
     "wordFamilyId": "WF-MEZ", "conceptId": "FOREST",
     "dialectVariants": {"adyghe": "мэзхэр", "kabardian": "мэзхэр"},
     "notes": "C-11.3: ormanlar. Plural. Korpus: 15.", "corpusFrequency": 15},
    # мэзы (ormanı)
    {"id": "L-MEZY", "form": "мэзы", "literalMeaning": "ormani",
     "wordFamilyId": "WF-MEZ", "conceptId": "FOREST",
     "dialectVariants": {"adyghe": "мэзы", "kabardian": "мэзы"},
     "notes": "C-11.3: ormani. Korpus: 8.", "corpusFrequency": 8},
    # мэзкъогъум (orman vadisi)
    {"id": "L-MEZKOGHUM", "form": "мэзкъогъум", "literalMeaning": "orman vadisi",
     "wordFamilyId": "WF-MEZ", "conceptId": "FOREST_VALLEY",
     "dialectVariants": {"adyghe": "мэзкъогъум", "kabardian": "мэзкъуэгъум"},
     "notes": "C-11.3: orman vadisi. мэз + къогъум.", "corpusFrequency": 0},
    # мэзлъапэ (orman kenarı)
    {"id": "L-MEZLHAPE", "form": "мэзлъапэ", "literalMeaning": "orman kenari",
     "wordFamilyId": "WF-MEZ", "conceptId": "FOREST_EDGE",
     "dialectVariants": {"adyghe": "мэзлъапэ", "kabardian": "мэзлъапэ"},
     "notes": "C-11.3: orman kenari.", "corpusFrequency": 0},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

# WF-MEZ ailesi ekle
wf_path = Path("public/data/linguistic/word_families.json")
wf = json.loads(wf_path.read_text(encoding="utf-8"))
wf_mevcut = {w["id"] for w in wf}

if "WF-MEZ" not in wf_mevcut:
    wf.append({
        "id": "WF-MEZ", "rootId": "R-MEZ",
        "category": "nature", "subcategory": "terrain-plant",
        "semanticDomains": ["nature", "forest"],
        "morphemeIds": [],
        "lexemeIds": ["L-MEZ", "L-MEZYM", "L-MEZXER", "L-MEZY", "L-MEZKOGHUM", "L-MEZLHAPE"],
        "productivity": {"totalLexemes": 6, "corpusFrequency": 604, "mostFrequentLexemeId": "L-MEZ"},
        "dialectNote": {"adyghe": "мэз", "kabardian": "мэз"},
        "notes": "C-11.3 yeni aile. Orman kok ailesi. Korpus: 604."
    })
    print("Eklendi: WF-MEZ")

# R-MEZ root ekle
root_path = Path("public/data/linguistic/roots.json")
roots = json.loads(root_path.read_text(encoding="utf-8"))
root_mevcut = {r["id"] for r in roots}

if "R-MEZ" not in root_mevcut:
    roots.append({
        "id": "R-MEZ", "form": "мэз",
        "primaryMeaning": "orman",
        "secondaryMeanings": ["koru", "ağaçlık"],
        "semanticDomains": ["nature"],
        "dialectVariants": {"adyghe": "мэз", "kabardian": "мэз"},
        "notes": "C-11.3: orman koku. Korpus: 604."
    })
    print("Eklendi: R-MEZ")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding="utf-8")
root_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"\nLexeme: {len(lex)}")
print(f"Aile: {len(wf)}")
print(f"Root: {len(roots)}")
