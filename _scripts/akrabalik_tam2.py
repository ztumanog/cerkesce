import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# 1) Duzeltmeler
duzeltmeler = {
    "L-ANEKUESHH": {"form": "анэш", "literalMeaning": "dayi (anne erkek kardesi)",
                    "corpusFrequency": 167,
                    "notes": "C-11.3: dayi. Kabardeyce: анэш. Abaze 2005."},
    "L-TYSHYPHUE": {"form": "адэшыпхъу", "literalMeaning": "hala (baba kiz kardesi)",
                    "notes": "C-11.3: hala. Kabardeyce: адэшыпхъу. Abaze 2005."},
    "L-NYSHYPHUE": {"form": "анэ шыпхъу", "literalMeaning": "teyze (anne kiz kardesi)",
                    "corpusFrequency": 8,
                    "notes": "C-11.3: teyze. Kabardeyce: анэ шыпхъу. Abaze 2005."},
    "L-ADEKUESHH": {"form": "адэ къуэш", "literalMeaning": "amca (baba erkek kardesi)",
                    "corpusFrequency": 11,
                    "notes": "C-11.3: amca. Kabardeyce: адэ къуэш."},
}

for l in lex:
    if l["id"] in duzeltmeler:
        g = duzeltmeler[l["id"]]
        for k, v in g.items():
            l[k] = v
        print(f"Guncellendi: {l['id']} -> {l['form']}")

# 2) Yeni lexemeler
yeni = [
    {"id": "L-DELHXU", "form": "дэлъху", "literalMeaning": "erkek kardes (kizin)",
     "conceptId": "BROTHER_OF_SISTER", "corpusFrequency": 0},
    {"id": "L-NYSE", "form": "нысэ", "literalMeaning": "gelin",
     "conceptId": "BRIDE", "corpusFrequency": 0},
    {"id": "L-MALHXE", "form": "малъхъэ", "literalMeaning": "damat",
     "conceptId": "GROOM", "corpusFrequency": 0},
    {"id": "L-SHYQHUANE", "form": "щыкъуанэ", "literalMeaning": "kaynana",
     "conceptId": "MOTHER_IN_LAW", "corpusFrequency": 0},
    {"id": "L-SHYQHUKH", "form": "щыкъухъыджэбз", "literalMeaning": "baldiz",
     "conceptId": "SISTER_IN_LAW", "corpusFrequency": 0},
    {"id": "L-MELHXEGHU", "form": "мэлъхъэгъу", "literalMeaning": "bacanak",
     "conceptId": "BROTHER_IN_LAW", "corpusFrequency": 0},
]

for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-KINSHIP"
        y["notes"] = "C-11.3: akrabalik. Kabardeyce."
        lex.append(y)
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
