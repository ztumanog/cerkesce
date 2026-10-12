import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    # лъэгъун (görmek - ADY)
    {"id": "L-LHEGHUN", "form": "лъэгъун", "literalMeaning": "gormek",
     "wordFamilyId": "WF-LHEGHU", "conceptId": "SEE",
     "dialectVariants": {"adyghe": "лъэгъун", "kabardian": "лъагъун"},
     "dictionaryEvidence": {"sourceCount": 2, "sources": ["Huvaj (2007)", "Teshu (1991)"]},
     "notes": "C-11.3: gormek. ADY: лъэгъун, KBD: лъагъун.", "corpusFrequency": 0},
    # лъагъун (görmek - KBD)
    {"id": "L-LHAGHUN", "form": "лъагъун", "literalMeaning": "gormek; sevmek",
     "wordFamilyId": "WF-LHEGHU", "conceptId": "SEE",
     "conceptIds": ["SEE", "LOVE"],
     "dialectVariants": {"adyghe": "лъэгъун", "kabardian": "лъагъун"},
     "dictionaryEvidence": {"sourceCount": 1, "sources": ["Jonty (Tr-Kbd)"]},
     "notes": "C-11.3: gormek; sevmek. KBD.", "corpusFrequency": 0},
    # плъагъун (görmek - KBD varyant)
    {"id": "L-PLHEGHUN", "form": "плъагъун", "literalMeaning": "gormek",
     "wordFamilyId": "WF-PLHEGHU", "conceptId": "SEE",
     "dialectVariants": {"adyghe": "лъэгъун", "kabardian": "плъагъун"},
     "dictionaryEvidence": {"sourceCount": 1, "sources": ["Abaze (2005)"]},
     "notes": "C-11.3: gormek. KBD varyant.", "corpusFrequency": 0},
    # плъэн (bakmak - KBD)
    {"id": "L-PLHEN", "form": "плъэн", "literalMeaning": "bakmak",
     "wordFamilyId": "WF-PLHE", "conceptId": "LOOK",
     "dialectVariants": {"adyghe": "плъэн", "kabardian": "плъэн"},
     "dictionaryEvidence": {"sourceCount": 1, "sources": ["Abaze (2005)"]},
     "notes": "C-11.3: bakmak. KBD.", "corpusFrequency": 0},
    # лъагъуныгъэ (sevgi)
    {"id": "L-LHAGHUNYGHE", "form": "лъагъуныгъэ", "literalMeaning": "sevgi",
     "wordFamilyId": "WF-LHEGHU", "conceptId": "LOVE",
     "dialectVariants": {"adyghe": "лъэгъуныгъэ", "kabardian": "лъагъуныгъэ"},
     "dictionaryEvidence": {"sourceCount": 1, "sources": ["Wiktionary (2023)"]},
     "notes": "C-11.3: sevgi. Etimoloji: лъагъу (gormek) + -ныгъэ.",
     "corpusFrequency": 0},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam: {len(lex)}")
