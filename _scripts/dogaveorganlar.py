import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_ids = {l['id'] for l in lex}

# 2) Yeni kelimeler
yeni = [
    # 5. Doga/Canlilar/Nesneler
    {"id": "L-PSY", "form": "псы", "literalMeaning": "su", "conceptId": "WATER", "wordFamilyId": "WF-PSY"},
    {"id": "L-MAF1E", "form": "мафӀэ", "literalMeaning": "ates", "conceptId": "FIRE", "wordFamilyId": "WF-MAF1E"},
    {"id": "L-SH1Y", "form": "щӀы", "literalMeaning": "toprak", "conceptId": "EARTH", "wordFamilyId": "WF-SH1Y"},
    {"id": "L-DYGHE", "form": "дыгъэ", "literalMeaning": "gunes", "conceptId": "SUN", "wordFamilyId": "WF-DYGHE"},
    {"id": "L-MAZE", "form": "мазэ", "literalMeaning": "ay", "conceptId": "MOON", "wordFamilyId": "WF-MAZE"},
    {"id": "L-ZHY", "form": "жьы", "literalMeaning": "ruzgar", "conceptId": "WIND", "wordFamilyId": "WF-ZHY"},
    {"id": "L-SHY", "form": "шы", "literalMeaning": "at", "conceptId": "HORSE", "wordFamilyId": "WF-SHY"},
    {"id": "L-KHHE", "form": "хьэ", "literalMeaning": "kopek", "conceptId": "DOG", "wordFamilyId": "WF-KHHE"},
    {"id": "L-DZHED", "form": "джэд", "literalMeaning": "tavuk", "conceptId": "CHICKEN", "wordFamilyId": "WF-DZHED"},
    {"id": "L-SH1AKHQUE", "form": "щӀакхъуэ", "literalMeaning": "ekmek", "conceptId": "BREAD", "wordFamilyId": "WF-SH1AKHQUE"},
    {"id": "L-SE2", "form": "сэ", "literalMeaning": "bicak", "conceptId": "KNIFE", "wordFamilyId": "WF-SE"},
    {"id": "L-1ENE", "form": "Ӏэнэ", "literalMeaning": "masa", "conceptId": "TABLE", "wordFamilyId": "WF-1ENE"},
    {"id": "L-TKHYL", "form": "тхылъ", "literalMeaning": "kitap", "conceptId": "BOOK", "wordFamilyId": "WF-TKHYL"},
    {"id": "L-KHQUXY", "form": "кхъухь", "literalMeaning": "gemi", "conceptId": "SHIP", "wordFamilyId": "WF-KHQUXY"},
    
    # 6. Organlar
    {"id": "L-SHHYE", "form": "щхьэ", "literalMeaning": "bas", "conceptId": "HEAD", "wordFamilyId": "WF-SHHYE"},
    {"id": "L-NE", "form": "нэ", "literalMeaning": "goz", "conceptId": "EYE", "wordFamilyId": "WF-NE"},
    {"id": "L-PE", "form": "пэ", "literalMeaning": "burun", "conceptId": "NOSE", "wordFamilyId": "WF-PE"},
    {"id": "L-ZHE", "form": "жьэ", "literalMeaning": "agiz", "conceptId": "MOUTH", "wordFamilyId": "WF-ZHE"},
    {"id": "L-BZE", "form": "бзэ", "literalMeaning": "dil", "conceptId": "TONGUE", "wordFamilyId": "WF-BZE"},
    {"id": "L-TKHEK1UME", "form": "тхьэкӀумэ", "literalMeaning": "kulak", "conceptId": "EAR", "wordFamilyId": "WF-TKHEK1UME"},
    {"id": "L-1E", "form": "Ӏэ", "literalMeaning": "el", "conceptId": "HAND", "wordFamilyId": "WF-1E"},
    {"id": "L-LHE", "form": "лъэ", "literalMeaning": "ayak", "conceptId": "FOOT", "wordFamilyId": "WF-LHE"},
    {"id": "L-GU", "form": "гу", "literalMeaning": "kalp", "conceptId": "HEART", "wordFamilyId": "WF-GU"},
    {"id": "L-PSE", "form": "псэ", "literalMeaning": "ruh", "conceptId": "SOUL", "wordFamilyId": "WF-PSE"},
    {"id": "L-LY", "form": "лы", "literalMeaning": "et", "conceptId": "MEAT", "wordFamilyId": "WF-LY"},
]

# 3) Ekle
eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        y['partOfSpeech'] = 'noun'
        y['notes'] = 'Dogrulandi: temel kelime'
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

# 4) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
