import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    # Aile
    {"id": "L-ADE", "form": "адэ", "literalMeaning": "baba", "conceptId": "FATHER"},
    {"id": "L-ANE", "form": "анэ", "literalMeaning": "anne", "conceptId": "MOTHER"},
    {"id": "L-DADE", "form": "дадэ", "literalMeaning": "dede", "conceptId": "GRANDFATHER"},
    {"id": "L-ANESHHUE", "form": "анэшхуэ", "literalMeaning": "nine", "conceptId": "GRANDMOTHER"},
    {"id": "L-ADENAP1AS", "form": "адэнапӀас", "literalMeaning": "uvey baba", "conceptId": "STEPFATHER"},
    {"id": "L-ANENAP1AS", "form": "анэнапӀас", "literalMeaning": "uvey anne", "conceptId": "STEPMOTHER"},
    {"id": "L-ANEDELHXU", "form": "анэ дэлъху", "literalMeaning": "dayi", "conceptId": "UNCLE_MATERNAL"},
    {"id": "L-ANEPHYPHU", "form": "анэ пщыпхъу", "literalMeaning": "teyze", "conceptId": "AUNT_MATERNAL"},
    {"id": "L-ANEKYLHXU", "form": "анэкъилъху", "literalMeaning": "oz kardes", "conceptId": "SIBLING"},
    {"id": "L-SHYQHU", "form": "щыкъу", "literalMeaning": "es tarafi", "conceptId": "IN_LAW"},
    {"id": "L-SHYQHUSHCHALE", "form": "щыкъу щӀалэ", "literalMeaning": "kayinbirader", "conceptId": "BROTHER_IN_LAW"},
    {"id": "L-SHYQHUKHEDZHABZ", "form": "щыкъу хьэджэбз", "literalMeaning": "baldiz", "conceptId": "SISTER_IN_LAW"},
    # Zaman
    {"id": "L-BZHYH'E", "form": "бжьыхьэ", "literalMeaning": "sonbahar", "conceptId": "AUTUMN"},
    {"id": "L-SHCHYMAKHUE", "form": "щӀымахуэ", "literalMeaning": "kis", "conceptId": "WINTER"},
    # Hayvan
    {"id": "L-BZYW", "form": "бзу", "literalMeaning": "kus", "conceptId": "BIRD"},
    # Renk
    {"id": "L-SHHXHUE2", "form": "щхъуэ", "literalMeaning": "mavi", "conceptId": "BLUE"},
    {"id": "L-SHHXHUANT1E", "form": "щхъуантӀэ", "literalMeaning": "yesil/mavi", "conceptId": "GREEN"},
    # Sayi
    {"id": "L-SHCHA", "form": "щӀэ", "literalMeaning": "yeni", "conceptId": "NEW"},
    # Insan
    {"id": "L-SHCHALE2", "form": "щӀалэ", "literalMeaning": "oglan", "conceptId": "BOY"},
    # Anatomi
    {"id": "L-SHHXHE2", "form": "щхьэ", "literalMeaning": "bas", "conceptId": "HEAD"},
    {"id": "L-AQYL", "form": "акъыл", "literalMeaning": "akil, beyin", "conceptId": "MIND"},
    # Diger
    {"id": "L-BGHUE", "form": "бгъуэ", "literalMeaning": "genis", "conceptId": "WIDE"},
    {"id": "L-BGHUEGHU", "form": "бгъуэгъу", "literalMeaning": "genislik", "conceptId": "WIDTH"},
    {"id": "L-SHCHYGU", "form": "щӀыгу", "literalMeaning": "toprak", "conceptId": "LAND"},
    {"id": "L-SHYPQE", "form": "щыпкъэ", "literalMeaning": "mukemmel", "conceptId": "EXCELLENT"},
    {"id": "L-SHHXHEL", "form": "щхьэл", "literalMeaning": "degirmen", "conceptId": "MILL"},
    {"id": "L-SHTEN", "form": "щтэн", "literalMeaning": "almak/korkmak", "conceptId": "TAKE"},
    {"id": "L-SHTENYGHE", "form": "щтэныгъэ", "literalMeaning": "endise", "conceptId": "ANXIETY"},
    {"id": "L-BLECH1A", "form": "блэчӀа", "literalMeaning": "gecmis", "conceptId": "PAST"},
    {"id": "L-BLECH1YN", "form": "блэчӀын", "literalMeaning": "gecmek", "conceptId": "PASS"},
    {"id": "L-DAME", "form": "дамэ", "literalMeaning": "kanat", "conceptId": "WING"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-BASIC"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: IPA kaynakli."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
