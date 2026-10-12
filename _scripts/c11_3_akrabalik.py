import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-ANESH", "form": "анэш", "literalMeaning": "dayi (anne kardesi)",
     "wordFamilyId": "WF-ANE", "conceptId": "UNCLE_MATERNAL",
     "dialectVariants": {"adyghe": "анэш", "kabardian": "анэш"},
     "notes": "C-11.3: dayi. Abaze, Teshu.", "corpusFrequency": 0},
    {"id": "L-TYSHYPHUE", "form": "тышыпхъу", "literalMeaning": "hala (baba kiz kardesi)",
     "wordFamilyId": "WF-ADE", "conceptId": "AUNT_PATERNAL",
     "dialectVariants": {"adyghe": "тышыпхъу", "kabardian": "адэшыпхъу"},
     "notes": "C-11.3: hala. Huvaj, Teshu.", "corpusFrequency": 0},
    {"id": "L-NYSHYPHUE", "form": "нышыпхъу", "literalMeaning": "teyze (anne kiz kardesi)",
     "wordFamilyId": "WF-ANE", "conceptId": "AUNT_MATERNAL",
     "dialectVariants": {"adyghe": "нышыпхъу", "kabardian": "анэшыпхъу"},
     "notes": "C-11.3: teyze (ADY varyant). Huvaj.", "corpusFrequency": 0},
    {"id": "L-YATESH", "form": "ятэш", "literalMeaning": "amca (baba erkek kardesi)",
     "wordFamilyId": "WF-ADE", "conceptId": "UNCLE_PATERNAL",
     "dialectVariants": {"adyghe": "ятэш", "kabardian": "адэ къуэш"},
     "notes": "C-11.3: amca. Abaze.", "corpusFrequency": 0},
    {"id": "L-SHYPHUE-NAKHYZH", "form": "шыпхъу нахьыжъ", "literalMeaning": "abla",
     "wordFamilyId": "WF-SHYPHUE", "conceptId": "ELDER_SISTER",
     "dialectVariants": {"adyghe": "шыпхъу нахьыжъ", "kabardian": "шыпхъу нэхъыжь"},
     "notes": "C-11.3: abla. Huvaj, Teshu.", "corpusFrequency": 0},
]

for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        print(f"Eklendi: {y['id']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Toplam: {len(lex)}")
