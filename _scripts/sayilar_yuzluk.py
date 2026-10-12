import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_ids = {l['id'] for l in lex}

# 2) Yeni sayılar
yeni = [
    {"id": "L-SHHE", "form": "щэ", "literalMeaning": "yuz (100)", "conceptId": "HUNDRED", "wordFamilyId": "WF-SHHE", "partOfSpeech": "numeral", "notes": "Yuzluk sayi koku"},
    {"id": "L-SHCHIT1", "form": "щитӀ", "literalMeaning": "iki yuz (200)", "conceptId": "TWO_HUNDRED", "wordFamilyId": "WF-SHHE", "partOfSpeech": "numeral", "notes": "щэ + тӀу"},
    {"id": "L-SHCHISHCH", "form": "щищ", "literalMeaning": "uc yuz (300)", "conceptId": "THREE_HUNDRED", "wordFamilyId": "WF-SHHE", "partOfSpeech": "numeral", "notes": "щэ + щы"},
    {"id": "L-SHCHIPL1", "form": "щиплӀ", "literalMeaning": "dort yuz (400)", "conceptId": "FOUR_HUNDRED", "wordFamilyId": "WF-SHHE", "partOfSpeech": "numeral", "notes": "щэ + плӀы"},
    {"id": "L-SHCHITKHU", "form": "щитху", "literalMeaning": "bes yuz (500)", "conceptId": "FIVE_HUNDRED", "wordFamilyId": "WF-SHHE", "partOfSpeech": "numeral", "notes": "щэ + тху"},
    {"id": "L-SHCHIKH", "form": "щих", "literalMeaning": "alti yuz (600)", "conceptId": "SIX_HUNDRED", "wordFamilyId": "WF-SHHE", "partOfSpeech": "numeral", "notes": "щэ + хы"},
    {"id": "L-SHCHIBL", "form": "щибл", "literalMeaning": "yedi yuz (700)", "conceptId": "SEVEN_HUNDRED", "wordFamilyId": "WF-SHHE", "partOfSpeech": "numeral", "notes": "щэ + блы"},
    {"id": "L-SHCHIY", "form": "щий", "literalMeaning": "sekiz yuz (800)", "conceptId": "EIGHT_HUNDRED", "wordFamilyId": "WF-SHHE", "partOfSpeech": "numeral", "notes": "щэ + и"},
    {"id": "L-SHCHIBGHU", "form": "щибгъу", "literalMeaning": "dokuz yuz (900)", "conceptId": "NINE_HUNDRED", "wordFamilyId": "WF-SHHE", "partOfSpeech": "numeral", "notes": "щэ + бгъу"},
    {"id": "L-MIN", "form": "мин", "literalMeaning": "bin (1000)", "conceptId": "THOUSAND", "wordFamilyId": "WF-MIN", "partOfSpeech": "numeral", "notes": "Binlik sayi koku"},
]

# 3) Ekle
eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} = {y['literalMeaning']}")
    else:
        print(f"Zaten var: {y['id']} - {y['form']}")

# 4) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
