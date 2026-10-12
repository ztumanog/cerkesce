import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    {"id": "L-BGHUE3", "form": "бгъуэ", "literalMeaning": "genis", "cat": "Adjective"},
    {"id": "L-BGHUEGHU2", "form": "бгъуэгъу", "literalMeaning": "genislik", "cat": "Noun"},
    {"id": "L-BZHYH'E3", "form": "бжьыхьэ", "literalMeaning": "sonbahar", "cat": "Time"},
    {"id": "L-BZYW2", "form": "бзу", "literalMeaning": "kus", "cat": "Animal"},
    {"id": "L-SHCHA2", "form": "щӀэ", "literalMeaning": "yeni", "cat": "Adjective"},
    {"id": "L-SHCHALE3", "form": "щӀалэ", "literalMeaning": "oglan", "cat": "People"},
    {"id": "L-SHCHEN4", "form": "щэн", "literalMeaning": "satmak", "cat": "Verb"},
    {"id": "L-SHCHA2", "form": "щӀэ", "literalMeaning": "yeni", "cat": "Adjective"},
    {"id": "L-SHCHYGU2", "form": "щӀыгу", "literalMeaning": "toprak, ulke", "cat": "Noun"},
    {"id": "L-SHCHYMAKHUE3", "form": "щӀымахуэ", "literalMeaning": "kis", "cat": "Time"},
    {"id": "L-SHYPQE2", "form": "щыпкъэ", "literalMeaning": "mukemmel", "cat": "Adjective"},
    {"id": "L-SHYQHU2", "form": "щыкъу", "literalMeaning": "es tarafi", "cat": "Family"},
    {"id": "L-SHHXHE3", "form": "щхьэ", "literalMeaning": "bas", "cat": "Anatomy"},
    {"id": "L-SHHXHEL2", "form": "щхьэл", "literalMeaning": "degirmen", "cat": "Noun"},
    {"id": "L-SHTEN2", "form": "щтэн", "literalMeaning": "almak/korkmak", "cat": "Verb"},
    {"id": "L-SHTENYGHE2", "form": "щтэныгъэ", "literalMeaning": "endise", "cat": "Noun"},
    {"id": "L-SHHXHUE3", "form": "щхъуэ", "literalMeaning": "mavi", "cat": "Color"},
    {"id": "L-SHHXHUANT1E2", "form": "щхъуантӀэ", "literalMeaning": "yesil/mavi", "cat": "Color"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = f"WF-{y.pop('cat')}"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: IPA kaynakli."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
