import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_ids = {l['id'] for l in lex}

# 2) Yeni kelimeler
yeni = [
    {"id": "L-KHEBLEN", "form": "хьэблэн", "literalMeaning": "komsu, cevre", "conceptId": "NEIGHBORHOOD", "wordFamilyId": "WF-HEBLE", "partOfSpeech": "noun", "ipa": "/ħablan/", "corpusFrequency": 440, "notes": "KBD Corpus rank 201"},
    {"id": "L-SH1ENYGHE", "form": "щӀэныгъэ", "literalMeaning": "bilgi, bilim", "conceptId": "KNOWLEDGE", "wordFamilyId": "WF-SCH1E", "partOfSpeech": "noun", "ipa": "/ɕʼanəʁa/", "corpusFrequency": 410, "notes": "KBD Corpus rank 208"},
    {"id": "L-VAGHUE", "form": "вагъуэ", "literalMeaning": "yildiz", "conceptId": "STAR", "wordFamilyId": "WF-VAGHWE", "partOfSpeech": "noun", "ipa": "/vaːʁʷa/", "corpusFrequency": 335, "notes": "KBD Corpus rank 224"},
    {"id": "L-UAFE", "form": "уафэ", "literalMeaning": "gokyuzu", "conceptId": "SKY", "wordFamilyId": "WF-WAFE", "partOfSpeech": "noun", "ipa": "/waːfa/", "corpusFrequency": 330, "notes": "KBD Corpus rank 225"},
    {"id": "L-SH1YLHE", "form": "щӀылъэ", "literalMeaning": "yeryuzu, toprak", "conceptId": "EARTH", "wordFamilyId": "WF-SH1YLHE", "partOfSpeech": "noun", "ipa": "/ɕʼəɬa/", "corpusFrequency": 325, "notes": "KBD Corpus rank 226"},
    {"id": "L-UESHX", "form": "уэшх", "literalMeaning": "yagmur", "conceptId": "RAIN", "wordFamilyId": "WF-WESHX", "partOfSpeech": "noun", "ipa": "/waʃx/", "corpusFrequency": 320, "notes": "KBD Corpus rank 227"},
    {"id": "L-UES", "form": "уэс", "literalMeaning": "kar", "conceptId": "SNOW", "wordFamilyId": "WF-WES", "partOfSpeech": "noun", "ipa": "/was/", "corpusFrequency": 315, "notes": "KBD Corpus rank 228"},
    {"id": "L-AKHSHE", "form": "ахъшэ", "literalMeaning": "para", "conceptId": "MONEY", "wordFamilyId": "WF-AXHSHE", "partOfSpeech": "noun", "ipa": "/aːxʃa/", "corpusFrequency": 285, "notes": "KBD Corpus rank 238"},
    {"id": "L-K1WEC1", "form": "кӀуэцӀ", "literalMeaning": "ic, ic taraf", "conceptId": "INSIDE", "wordFamilyId": "WF-K1WEC1", "partOfSpeech": "noun", "ipa": "/kʷʼatsʼ/", "corpusFrequency": 100, "notes": "KBD Corpus rank 300"},
]

# 3) Ekle
eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")
    else:
        print(f"Zaten var: {y['id']} - {y['form']}")

# 4) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
