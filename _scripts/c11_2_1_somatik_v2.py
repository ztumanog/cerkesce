import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# Yeni ve guncellenmis lexeme'ler
yeni = [
    # === цы (sac/yun) ===
    {"id": "L-TSY", "form": "цы", "literalMeaning": "sac, yun",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-TSY", "conceptId": "HAIR",
     "dialectVariants": {"adyghe": "цы", "kabardian": "цы"},
     "dictionaryEvidence": {"sourceCount": 18, "sources": ["Aig (2006)", "Apashev (2008)", "Yamisha (2018)", "Kokov (2008)", "Kardanov (1957)"]},
     "notes": "C-11.2.1: sac, yun. 18 sozluk.", "corpusFrequency": 0},
    {"id": "L-TSYGHO", "form": "цыгъо", "literalMeaning": "fare",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-TSY", "conceptId": "MOUSE",
     "dialectVariants": {"adyghe": "цыгъо", "kabardian": "цыгъуэ"},
     "notes": "C-11.2.1: fare. цы + гъо.", "corpusFrequency": 0},
    {"id": "L-TSYDZHAN", "form": "цыджан", "literalMeaning": "yun elbise",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-TSY", "conceptId": "WOOLEN_DRESS",
     "dialectVariants": {"adyghe": "цыджан", "kabardian": "цыджан"},
     "notes": "C-11.2.1: yun elbise. цы + джан.", "corpusFrequency": 0},
    {"id": "L-TSYY", "form": "цый", "literalMeaning": "cerkeska",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-TSY", "conceptId": "CHERKESKA",
     "dialectVariants": {"adyghe": "цый", "kabardian": "цей"},
     "notes": "C-11.2.1: cerkeska. Geleneksel giysi.", "corpusFrequency": 0},
    {"id": "L-TSYZE", "form": "цызэ", "literalMeaning": "sansar",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-TSY", "conceptId": "MARTEN",
     "dialectVariants": {"adyghe": "цызэ", "kabardian": "цызэ"},
     "notes": "C-11.2.1: sansar. Hayvan.", "corpusFrequency": 0},
    {"id": "L-TSYDY", "form": "цыды", "literalMeaning": "yapiskan",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-TSY", "conceptId": "STICKY",
     "dialectVariants": {"adyghe": "цыды", "kabardian": "цыды"},
     "notes": "C-11.2.1: yapiskan.", "corpusFrequency": 0},
    {"id": "L-TSYZHY", "form": "цыжъы", "literalMeaning": "kecelesmis yun",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-TSY", "conceptId": "FELTED_WOOL",
     "dialectVariants": {"adyghe": "цыжъы", "kabardian": "цыжьы"},
     "notes": "C-11.2.1: keceleşmiş yun.", "corpusFrequency": 0},
    {"id": "L-TSYZASHO", "form": "цызашъо", "literalMeaning": "kurk",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-TSY", "conceptId": "FUR",
     "dialectVariants": {"adyghe": "цызашъо", "kabardian": "цызащӀэ"},
     "notes": "C-11.2.1: kürk.", "corpusFrequency": 0},
    {"id": "L-TSYLH", "form": "цылъ", "literalMeaning": "yun sepeti",
     "derivation": {"rootIds": ["R-TSY"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-TSY", "conceptId": "WOOL_BASKET",
     "dialectVariants": {"adyghe": "цылъ", "kabardian": "цылъ"},
     "notes": "C-11.2.1: yun sepeti.", "corpusFrequency": 0},

    # === пкъы (govde) ===
    {"id": "L-PQY", "form": "пкъы", "literalMeaning": "govde, beden",
     "derivation": {"rootIds": ["R-PQY"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-PQY", "conceptId": "BODY",
     "dialectVariants": {"adyghe": "пкъы", "kabardian": "пкъы"},
     "dictionaryEvidence": {"sourceCount": 20, "sources": ["Aig (2006)", "Apashev (2008)", "Yamisha (2018)", "Kardanov (1957)"]},
     "notes": "C-11.2.1: govde, beden, iskelet. 20 sozluk.", "corpusFrequency": 0},
    {"id": "L-PQYGHUE", "form": "пкъыгъу", "literalMeaning": "organ",
     "derivation": {"rootIds": ["R-PQY"], "morphemeIds": [], "rule": "suffix"},
     "wordFamilyId": "WF-PQY", "conceptId": "ORGAN",
     "dialectVariants": {"adyghe": "пкъыгъу", "kabardian": "пкъыгъуэ"},
     "notes": "C-11.2.1: organ. пкъы + гъу.", "corpusFrequency": 0},
    {"id": "L-PQYSHOL", "form": "пкъышъол", "literalMeaning": "vucut",
     "derivation": {"rootIds": ["R-PQY"], "morphemeIds": [], "rule": "compound"},
     "wordFamilyId": "WF-PQY", "conceptId": "BODY",
     "dialectVariants": {"adyghe": "пкъышъол", "kabardian": "пкъыщӀэлъ"},
     "notes": "C-11.2.1: vücut. пкъы + шъол.", "corpusFrequency": 0},

    # === фэ (deri) ===
    {"id": "L-FE", "form": "фэ", "literalMeaning": "deri, tendon",
     "derivation": {"rootIds": ["R-FE"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-FE", "conceptId": "SKIN",
     "dialectVariants": {"adyghe": "фэ", "kabardian": "фэ"},
     "dictionaryEvidence": {"sourceCount": 18, "sources": ["Aig (2006)", "Yamisha (2018)", "Kokov (2008)"]},
     "notes": "C-11.2.1: deri, tendon. 18 sozluk.", "corpusFrequency": 0},
    {"id": "L-SHHO", "form": "шъо", "literalMeaning": "deri",
     "derivation": {"rootIds": ["R-SHHE"], "morphemeIds": [], "rule": "root"},
     "wordFamilyId": "WF-SHHE", "conceptId": "SKIN",
     "dialectVariants": {"adyghe": "шъо", "kabardian": "фэ"},
     "dictionaryEvidence": {"sourceCount": 5, "sources": ["Abaze (2005)", "Huvaj (2007)", "Hasan (1991)"]},
     "notes": "C-11.2.1: deri (ADY). 5 sozluk. KBD karsiligi: фэ", "corpusFrequency": 0},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")
    else:
        print(f"Mevcut: {y['id']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
