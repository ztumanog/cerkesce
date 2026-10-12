import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-KUESHH", "form": "къуэш", "literalMeaning": "erkek kardes",
     "conceptId": "BROTHER", "dialectVariants": {"adyghe": "къош", "kabardian": "къуэш"}},
    {"id": "L-SHYPHUE", "form": "шыпхъу", "literalMeaning": "kiz kardes",
     "conceptId": "SISTER", "dialectVariants": {"adyghe": "шыпхъу", "kabardian": "шыпхъу"}},
    {"id": "L-ADEKUESHH", "form": "адэ къуэш", "literalMeaning": "amca",
     "conceptId": "UNCLE_PATERNAL", "dialectVariants": {"adyghe": "ятэш", "kabardian": "адэ къуэш"}},
    {"id": "L-ANEKUESHH", "form": "анэ къуэш", "literalMeaning": "dayi",
     "conceptId": "UNCLE_MATERNAL", "dialectVariants": {"adyghe": "анэш", "kabardian": "анэ къуэш"}},
    {"id": "L-TYSHYPHUE", "form": "адэ шыпхъу", "literalMeaning": "hala",
     "conceptId": "AUNT_PATERNAL", "dialectVariants": {"adyghe": "тышыпхъу", "kabardian": "адэ шыпхъу"}},
    {"id": "L-NYSHYPHUE", "form": "анэ шыпхъу", "literalMeaning": "teyze",
     "conceptId": "AUNT_MATERNAL", "dialectVariants": {"adyghe": "нышыпхъу", "kabardian": "анэ шыпхъу"}},
    {"id": "L-KUERYLHXU", "form": "къуэрылъху", "literalMeaning": "kuzen (erkek)",
     "conceptId": "COUSIN_MALE"},
    {"id": "L-PKHURY LHXU", "form": "пхъурылъху", "literalMeaning": "kuzen (kiz)",
     "conceptId": "COUSIN_FEMALE"},
    {"id": "L-NYBZHEGHU", "form": "ныбжьэгъу", "literalMeaning": "arkadas",
     "conceptId": "FRIEND"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-KINSHIP"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: akrabalik terimi. Kabardeyce."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
