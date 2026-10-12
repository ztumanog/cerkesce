import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    # лэжь (çalış - kök)
    {"id": "L-LEZH", "form": "лэжь", "literalMeaning": "calis (kok)",
     "wordFamilyId": "WF-LEZH", "conceptId": "WORK",
     "dialectVariants": {"adyghe": "лэжь", "kabardian": "лэжь"},
     "notes": "C-11.3: calis kok. Korpus: 6.", "corpusFrequency": 6},
    # лэжьэн (çalışmak)
    {"id": "L-LEZHEN", "form": "лэжьэн", "literalMeaning": "calismak",
     "wordFamilyId": "WF-LEZH", "conceptId": "WORK",
     "dialectVariants": {"adyghe": "лэжьэн", "kabardian": "лэжьэн"},
     "dictionaryEvidence": {"sourceCount": 3, "sources": ["Jonty (Tr-Kbd)", "Abaze (2005)", "Teshu (1991)"]},
     "notes": "C-11.3: calismak. Korpus: 162.", "corpusFrequency": 162},
    # лэжьыгъэ (iş, emek)
    {"id": "L-LEZHYGHE", "form": "лэжьыгъэ", "literalMeaning": "is, emek",
     "wordFamilyId": "WF-LEZH", "conceptId": "WORK",
     "dialectVariants": {"adyghe": "лэжьыгъэ", "kabardian": "лэжьыгъэ"},
     "notes": "C-11.3: is, emek. Korpus: 372.", "corpusFrequency": 372},
    # лэжьэным (çalışma - isim)
    {"id": "L-LEZHENYM", "form": "лэжьэным", "literalMeaning": "calisma (isim)",
     "wordFamilyId": "WF-LEZH", "conceptId": "WORK",
     "dialectVariants": {"adyghe": "лэжьэным", "kabardian": "лэжьэным"},
     "notes": "C-11.3: calisma. Ergatif. Korpus: 19.", "corpusFrequency": 19},
    # лэжьак1уэ (işçi)
    {"id": "L-LEZHAK1UE", "form": "лэжьак1уэ", "literalMeaning": "isci",
     "wordFamilyId": "WF-LEZH", "conceptId": "WORKER",
     "dialectVariants": {"adyghe": "лэжьак1уэ", "kabardian": "лэжьак1уэ"},
     "notes": "C-11.3: isci. лэжь + ак1уэ.", "corpusFrequency": 0},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

# WF-LEZH ailesi
wf_path = Path("public/data/linguistic/word_families.json")
wf = json.loads(wf_path.read_text(encoding="utf-8"))
if "WF-LEZH" not in {w["id"] for w in wf}:
    wf.append({
        "id": "WF-LEZH", "rootId": "R-LEZH",
        "category": "other", "subcategory": "action",
        "semanticDomains": ["work", "action"],
        "morphemeIds": [],
        "lexemeIds": ["L-LEZH", "L-LEZHEN", "L-LEZHYGHE", "L-LEZHENYM", "L-LEZHAK1UE"],
        "productivity": {"totalLexemes": 5, "corpusFrequency": 559, "mostFrequentLexemeId": "L-LEZHYGHE"},
        "dialectNote": {"adyghe": "лэжь", "kabardian": "лэжь"},
        "notes": "C-11.3 yeni aile. Calismak kok ailesi. Korpus: 559."
    })
    print("Eklendi: WF-LEZH")

# R-LEZH root
root_path = Path("public/data/linguistic/roots.json")
roots = json.loads(root_path.read_text(encoding="utf-8"))
if "R-LEZH" not in {r["id"] for r in roots}:
    roots.append({
        "id": "R-LEZH", "form": "лэжь",
        "primaryMeaning": "calismak",
        "secondaryMeanings": ["emek", "is"],
        "semanticDomains": ["work"],
        "dialectVariants": {"adyghe": "лэжь", "kabardian": "лэжь"},
        "notes": "C-11.3: calismak koku. Korpus: 559."
    })
    print("Eklendi: R-LEZH")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
wf_path.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding="utf-8")
root_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"\nLexeme: {len(lex)}")
print(f"Aile: {len(wf)}")
print(f"Root: {len(roots)}")
