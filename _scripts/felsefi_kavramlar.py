import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_ids = {l['id'] for l in lex}

# 2) Yeni kelimeler
yeni = [
    # 1. Ontoloji
    {"id": "L-PSE", "form": "псэ", "literalMeaning": "can, ruh", "conceptId": "SOUL", "wordFamilyId": "WF-PSE", "partOfSpeech": "noun"},
    {"id": "L-GHASH1E", "form": "гъащӀэ", "literalMeaning": "yasam, omur", "conceptId": "LIFE", "wordFamilyId": "WF-GHASH1E", "partOfSpeech": "noun"},
    {"id": "L-TKHE", "form": "тхьэ", "literalMeaning": "Tanri, yaratici", "conceptId": "GOD", "wordFamilyId": "WF-TKHE", "partOfSpeech": "noun"},
    {"id": "L-DUNEY", "form": "дуней", "literalMeaning": "dunya, evren", "conceptId": "WORLD", "wordFamilyId": "WF-DUNEY", "partOfSpeech": "noun"},
    {"id": "L-SH1Y", "form": "щӀы", "literalMeaning": "yer, zemin", "conceptId": "EARTH", "wordFamilyId": "WF-SH1Y", "partOfSpeech": "noun"},
    {"id": "L-WAFE", "form": "уафэ", "literalMeaning": "gok, sema", "conceptId": "SKY", "wordFamilyId": "WF-WAFE", "partOfSpeech": "noun"},
    {"id": "L-PSEUNYGHE", "form": "псэуныгъэ", "literalMeaning": "var olma durumu", "conceptId": "EXISTENCE", "wordFamilyId": "WF-PSE", "partOfSpeech": "noun"},
    {"id": "L-L1ENYGHE", "form": "лӀэныгъэ", "literalMeaning": "olum, yok olus", "conceptId": "DEATH", "wordFamilyId": "WF-L1E", "partOfSpeech": "noun"},
    
    # 2. Epistemoloji
    {"id": "L-GUPSYSE", "form": "гупсысэ", "literalMeaning": "dusunce, tefekkur", "conceptId": "THOUGHT", "wordFamilyId": "WF-GU", "partOfSpeech": "noun"},
    {"id": "L-SH1ENYGHE", "form": "щӀэныгъэ", "literalMeaning": "bilgi, bilim", "conceptId": "KNOWLEDGE", "wordFamilyId": "WF-SH1E", "partOfSpeech": "noun"},
    {"id": "L-AQYL", "form": "акъыл", "literalMeaning": "akil, us", "conceptId": "MIND", "wordFamilyId": "WF-AQYL", "partOfSpeech": "noun"},
    {"id": "L-GULHYTE", "form": "гулъытэ", "literalMeaning": "idrak, kavrayis", "conceptId": "PERCEPTION", "wordFamilyId": "WF-GU", "partOfSpeech": "noun"},
    {"id": "L-PEZH", "form": "пэж", "literalMeaning": "gercek, hakikat", "conceptId": "TRUTH", "wordFamilyId": "WF-PEZH", "partOfSpeech": "adjective"},
    {"id": "L-PC1Y", "form": "пцӀы", "literalMeaning": "yalan, illuzyon", "conceptId": "LIE", "wordFamilyId": "WF-PC1Y", "partOfSpeech": "adjective"},
    {"id": "L-SHECH", "form": "шэч", "literalMeaning": "suphe, tereddut", "conceptId": "DOUBT", "wordFamilyId": "WF-SHECH", "partOfSpeech": "noun"},
    {"id": "L-1UEKHUGHE", "form": "Ӏуэхугъэ", "literalMeaning": "olgu, mesele", "conceptId": "FACT", "wordFamilyId": "WF-1UEKHU", "partOfSpeech": "noun"},
    
    # 3. Etik
    {"id": "L-KHABZE", "form": "хабзэ", "literalMeaning": "tore, gelenek", "conceptId": "CUSTOM", "wordFamilyId": "WF-KHABZE", "partOfSpeech": "noun"},
    {"id": "L-NEMYS", "form": "нэмыс", "literalMeaning": "saygi, edep", "conceptId": "RESPECT", "wordFamilyId": "WF-NEMYS", "partOfSpeech": "noun"},
    {"id": "L-NAPE", "form": "напэ", "literalMeaning": "onur, vicdan", "conceptId": "HONOR", "wordFamilyId": "WF-NAPE", "partOfSpeech": "noun"},
    {"id": "L-L1YGHE", "form": "лӀыгъэ", "literalMeaning": "erdem, yigitlik", "conceptId": "VIRTUE", "wordFamilyId": "WF-L1Y", "partOfSpeech": "noun"},
    {"id": "L-C1YXUGHE", "form": "цӀыхугъэ", "literalMeaning": "insanlik, humanizm", "conceptId": "HUMANITY", "wordFamilyId": "WF-C1YXU", "partOfSpeech": "noun"},
    {"id": "L-QEBZAGHE", "form": "къэбзагъэ", "literalMeaning": "saflik, durustluk", "conceptId": "PURITY", "wordFamilyId": "WF-QEBZE", "partOfSpeech": "noun"},
    {"id": "L-ZAKHUAGHE", "form": "захуагъэ", "literalMeaning": "adalet, hakkaniyet", "conceptId": "JUSTICE", "wordFamilyId": "WF-ZAKHUE", "partOfSpeech": "noun"},
    {"id": "L-ZEKHUDENYGHE", "form": "зэхуэдэныгъэ", "literalMeaning": "esitlik, denklik", "conceptId": "EQUALITY", "wordFamilyId": "WF-ZEKHUD", "partOfSpeech": "noun"},
    
    # 4. Varolussal
    {"id": "L-GUGHE", "form": "гугъэ", "literalMeaning": "umut, beklenti", "conceptId": "HOPE", "wordFamilyId": "WF-GU", "partOfSpeech": "noun"},
    {"id": "L-SHHYEKHUIT", "form": "щхьэхуитыныгъэ", "literalMeaning": "ozgurluk, hurriyet", "conceptId": "FREEDOM", "wordFamilyId": "WF-SHHYE", "partOfSpeech": "noun"},
    {"id": "L-LHAGHUNYGHE", "form": "лъагъуныгъэ", "literalMeaning": "sevgi, ask", "conceptId": "LOVE", "wordFamilyId": "WF-LHAGHU", "partOfSpeech": "noun"},
    {"id": "L-MURAD", "form": "мурад", "literalMeaning": "gaye, niyet", "conceptId": "GOAL", "wordFamilyId": "WF-MURAD", "partOfSpeech": "noun"},
    {"id": "L-GUKHELH", "form": "гухэлъ", "literalMeaning": "niyet, icsel arzu", "conceptId": "INTENTION", "wordFamilyId": "WF-GU", "partOfSpeech": "noun"},
    {"id": "L-SHYNE", "form": "шынэ", "literalMeaning": "korku, kaygi", "conceptId": "FEAR", "wordFamilyId": "WF-SHYNE", "partOfSpeech": "noun"},
    {"id": "L-GUENYQAGHE", "form": "гуэныкъуэгъэ", "literalMeaning": "keder, huzun", "conceptId": "GRIEF", "wordFamilyId": "WF-GU", "partOfSpeech": "noun"},
]

# 3) Ekle
eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        y['notes'] = 'Felsefi/ontolojik kavram'
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")
    else:
        print(f"Zaten var: {y['id']} - {y['form']}")

# 4) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
