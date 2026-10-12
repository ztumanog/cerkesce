import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    # Renkler (Kabardeyce)
    {"id": "L-PLHYZH", "form": "плъыжь", "literalMeaning": "kirmizi", "conceptId": "RED"},
    {"id": "L-KHUZH", "form": "хужь", "literalMeaning": "beyaz", "conceptId": "WHITE"},
    {"id": "L-F1YC1E", "form": "фӀыцӀэ", "literalMeaning": "siyah", "conceptId": "BLACK"},
    {"id": "L-SHHXHUE", "form": "щхъуэ", "literalMeaning": "mavi", "conceptId": "BLUE"},
    {"id": "L-UDZYFE", "form": "удзыфэ", "literalMeaning": "yesil", "conceptId": "GREEN"},
    {"id": "L-GHUEZHY", "form": "гъуэжь", "literalMeaning": "sari", "conceptId": "YELLOW"},
    {"id": "L-GHUABZHE", "form": "гъуабжэ", "literalMeaning": "gri", "conceptId": "GRAY"},
    {"id": "L-MORAFE", "form": "морафэ", "literalMeaning": "kahverengi", "conceptId": "BROWN"},
    # Haftanin gunleri (Kabardeyce)
    {"id": "L-TKHEMAKHUE", "form": "тхьэмахуэ", "literalMeaning": "pazar", "conceptId": "SUNDAY"},
    {"id": "L-BLYSHCHE", "form": "блыщхьэ", "literalMeaning": "pazartesi", "conceptId": "MONDAY"},
    {"id": "L-GHUBZH", "form": "гъубжь", "literalMeaning": "sali", "conceptId": "TUESDAY"},
    {"id": "L-BEREZHEY2", "form": "бэрэжьей", "literalMeaning": "carsamba", "conceptId": "WEDNESDAY"},
    {"id": "L-MEKHUAUE", "form": "мэкъуауэгъуэ", "literalMeaning": "persembe", "conceptId": "THURSDAY"},
    {"id": "L-MEKHUGHUE", "form": "мэкъуогъу", "literalMeaning": "cuma", "conceptId": "FRIDAY"},
    {"id": "L-SHEBET", "form": "щэбэт", "literalMeaning": "cumartesi", "conceptId": "SATURDAY"},
    # Zaman (Kabardeyce)
    {"id": "L-MAKHUE", "form": "махуэ", "literalMeaning": "gun", "conceptId": "DAY"},
    {"id": "L-MAZE", "form": "мазэ", "literalMeaning": "ay", "conceptId": "MONTH"},
    {"id": "L-ILHES", "form": "илъэс", "literalMeaning": "yil", "conceptId": "YEAR"},
    {"id": "L-GHE", "form": "гъэ", "literalMeaning": "yil", "conceptId": "YEAR"},
    {"id": "L-ZHESHCH", "form": "жэщ", "literalMeaning": "gece", "conceptId": "NIGHT"},
    {"id": "L-PSHCHEDDZHYZH", "form": "пщэдджыжь", "literalMeaning": "sabah", "conceptId": "MORNING"},
    {"id": "L-PSHCHYKHESHCH", "form": "пщыхьэщхьэ", "literalMeaning": "aksam", "conceptId": "EVENING"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = "WF-BASIC"
        y["dialectVariants"] = {"adyghe": y["form"], "kabardian": y["form"]}
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: temel kelime. Kabardeyce."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
