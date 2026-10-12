import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_ids = {l['id'] for l in lex}

# 2) Yeni kelimeler
yeni = [
    {"id": "L-K1UEN", "form": "кӀуэн", "literalMeaning": "gitmek", "conceptId": "GO", "wordFamilyId": "WF-K1U", "partOfSpeech": "verb", "ipa": "/kʷʼan/", "corpusFrequency": 2790, "notes": "KBD Corpus rank 101"},
    {"id": "L-KEK1UEN", "form": "къэкӀуэн", "literalMeaning": "gelmek", "conceptId": "COME", "wordFamilyId": "WF-K1U", "partOfSpeech": "verb", "ipa": "/qaːkʷʼan/", "corpusFrequency": 2710, "notes": "KBD Corpus rank 102"},
    {"id": "L-PSELHEN", "form": "псэлъэн", "literalMeaning": "konusmak", "conceptId": "TALK", "wordFamilyId": "WF-PSE", "partOfSpeech": "verb", "ipa": "/psaɬan/", "corpusFrequency": 2650, "notes": "KBD Corpus rank 103"},
    {"id": "L-ZHY1EN", "form": "жыӀэн", "literalMeaning": "soylemek, demek", "conceptId": "SAY", "wordFamilyId": "WF-ZHY", "partOfSpeech": "verb", "ipa": "/ʒəʔan/", "corpusFrequency": 2580, "notes": "KBD Corpus rank 104"},
    {"id": "L-SHKHEN", "form": "шхэн", "literalMeaning": "yemek yemek", "conceptId": "EAT", "wordFamilyId": "WF-SHX", "partOfSpeech": "verb", "ipa": "/ʃxan/", "corpusFrequency": 2510, "notes": "KBD Corpus rank 105"},
    {"id": "L-EFEN", "form": "ефэн", "literalMeaning": "icmek", "conceptId": "DRINK", "wordFamilyId": "WF-FE", "partOfSpeech": "verb", "ipa": "/jafan/", "corpusFrequency": 2450, "notes": "KBD Corpus rank 106"},
    {"id": "L-GHUELHYN", "form": "гъуэлъын", "literalMeaning": "yatmak, uyumak", "conceptId": "SLEEP", "wordFamilyId": "WF-GHWE", "partOfSpeech": "verb", "ipa": "/ʁʷaɬən/", "corpusFrequency": 2390, "notes": "KBD Corpus rank 107"},
    {"id": "L-KET1ESYN", "form": "къэтӀэсын", "literalMeaning": "oturmak", "conceptId": "SIT", "wordFamilyId": "WF-T1ES", "partOfSpeech": "verb", "ipa": "/qatʼasən/", "corpusFrequency": 2320, "notes": "KBD Corpus rank 108"},
    {"id": "L-C1YXUN", "form": "цӀыхун", "literalMeaning": "tanimak, bilmek", "conceptId": "KNOW", "wordFamilyId": "WF-C1YXU", "partOfSpeech": "verb", "ipa": "/tsʼəxʷn/", "corpusFrequency": 2260, "notes": "KBD Corpus rank 109"},
    {"id": "L-SH1EUN", "form": "щӀэун", "literalMeaning": "anlamak, kavramak", "conceptId": "UNDERSTAND", "wordFamilyId": "WF-SCH1E", "partOfSpeech": "verb", "ipa": "/ɕʼawn/", "corpusFrequency": 2200, "notes": "KBD Corpus rank 110"},
    {"id": "L-SHERDJES", "form": "шэрджэс", "literalMeaning": "Cerkes", "conceptId": "CIRCASSIAN", "wordFamilyId": "WF-SHERDJES", "partOfSpeech": "noun", "ipa": "/ʃardʒas/", "corpusFrequency": 450, "notes": "KBD Corpus rank 200"},
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
