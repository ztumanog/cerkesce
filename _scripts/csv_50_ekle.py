import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
roots_path = Path('public/data/linguistic/roots.json')

lex = json.loads(lex_path.read_text(encoding='utf-8'))
roots = json.loads(roots_path.read_text(encoding='utf-8'))

mevcut_ids = {l['id'] for l in lex}
mevcut_root_ids = {r['id'] for r in roots}

# 2) Yeni kelimeler (add-words.ts'den)
yeni = [
    {"id": "L-GHASH1E", "form": "гъащӀэ", "literalMeaning": "hayat, yasam", "conceptId": "LIFE", "wordFamilyId": "WF-SCH1E", "partOfSpeech": "noun", "ipa": "/ʁaːɕʼa/", "corpusFrequency": 8420, "notes": "KBD Corpus rank 51"},
    {"id": "L-PSEUNYGHE", "form": "псэуныгъэ", "literalMeaning": "yasam bicimi, dirlik", "conceptId": "LIFE", "wordFamilyId": "WF-PSE", "partOfSpeech": "noun", "ipa": "/psawnəʁa/", "corpusFrequency": 8100, "notes": "KBD Corpus rank 52"},
    {"id": "L-KHABZE", "form": "хабзэ", "literalMeaning": "gelenek, orf, kural", "conceptId": "CUSTOM", "wordFamilyId": "WF-XABZE", "partOfSpeech": "noun", "ipa": "/xaːbza/", "corpusFrequency": 7950, "notes": "KBD Corpus rank 53"},
    {"id": "L-LHEPQU", "form": "лъэпкъ", "literalMeaning": "halk, soy, ulus", "conceptId": "NATION", "wordFamilyId": "WF-LHEPQU", "partOfSpeech": "noun", "ipa": "/ɬapq/", "corpusFrequency": 7800, "notes": "KBD Corpus rank 54"},
    {"id": "L-KHEGHEGU", "form": "хэгъэгу", "literalMeaning": "vatan, memleket", "conceptId": "HOMELAND", "wordFamilyId": "WF-XEGHEGU", "partOfSpeech": "noun", "ipa": "/xaʁawgw/", "corpusFrequency": 7610, "notes": "KBD Corpus rank 55"},
    {"id": "L-C1E", "form": "цӀэ", "literalMeaning": "isim, ad", "conceptId": "NAME", "wordFamilyId": "WF-C1E", "partOfSpeech": "noun", "ipa": "/tsʼa/", "corpusFrequency": 7500, "notes": "KBD Corpus rank 56"},
    {"id": "L-AQYL", "form": "акъыл", "literalMeaning": "akil, zeka", "conceptId": "MIND", "wordFamilyId": "WF-AQYL", "partOfSpeech": "noun", "ipa": "/aːqəl/", "corpusFrequency": 7320, "notes": "KBD Corpus rank 57"},
    {"id": "L-NAPE", "form": "напэ", "literalMeaning": "yuz, onur, vicdan", "conceptId": "HONOR", "wordFamilyId": "WF-NAPE", "partOfSpeech": "noun", "ipa": "/naːpa/", "corpusFrequency": 7200, "notes": "KBD Corpus rank 58"},
    {"id": "L-GUSH1E", "form": "гущӀэ", "literalMeaning": "merhamet, duygu, sefkat", "conceptId": "COMPASSION", "wordFamilyId": "WF-GU", "partOfSpeech": "noun", "ipa": "/gwəɕʼa/", "corpusFrequency": 7050, "notes": "kbd.wiktionary.org / KBD Corpus rank 59"},
    {"id": "L-GUGHE", "form": "гугъэ", "literalMeaning": "umut, beklenti", "conceptId": "HOPE", "wordFamilyId": "WF-GU", "partOfSpeech": "noun", "ipa": "/gwəʁa/", "corpusFrequency": 6900, "notes": "KBD Corpus rank 60"},
    {"id": "L-MEZ", "form": "мэз", "literalMeaning": "orman", "conceptId": "FOREST", "wordFamilyId": "WF-MEZ", "partOfSpeech": "noun", "ipa": "/maz/", "corpusFrequency": 6800, "notes": "KBD Corpus rank 61"},
    {"id": "L-BGY", "form": "бгы", "literalMeaning": "dag, tepe", "conceptId": "MOUNTAIN", "wordFamilyId": "WF-BGY", "partOfSpeech": "noun", "ipa": "/bɣə/", "corpusFrequency": 6710, "notes": "KBD Corpus rank 62"},
    {"id": "L-WEGU", "form": "уэгу", "literalMeaning": "gokyuzu, sema", "conceptId": "SKY", "wordFamilyId": "WF-WEGU", "partOfSpeech": "noun", "ipa": "/wagw/", "corpusFrequency": 6600, "notes": "KBD Corpus rank 63"},
    {"id": "L-BZU", "form": "бзу", "literalMeaning": "kus", "conceptId": "BIRD", "wordFamilyId": "WF-BZU", "partOfSpeech": "noun", "ipa": "/bzwə/", "corpusFrequency": 6480, "notes": "KBD Corpus rank 64"},
    {"id": "L-WERAM", "form": "уэрам", "literalMeaning": "sokak, cadde", "conceptId": "STREET", "wordFamilyId": "WF-WERAM", "partOfSpeech": "noun", "ipa": "/waraːm/", "corpusFrequency": 6350, "notes": "KBD Corpus rank 65"},
    {"id": "L-PSH1ANTE", "form": "пщӀантӀэ", "literalMeaning": "avlu, bahce", "conceptId": "YARD", "wordFamilyId": "WF-PSH1ANTE", "partOfSpeech": "noun", "ipa": "/pɕʼaːntʼa/", "corpusFrequency": 6200, "notes": "KBD Corpus rank 66"},
    {"id": "L-PESH", "form": "пэш", "literalMeaning": "oda", "conceptId": "ROOM", "wordFamilyId": "WF-PESH", "partOfSpeech": "noun", "ipa": "/paʃ/", "corpusFrequency": 6100, "notes": "KBD Corpus rank 67"},
    {"id": "L-TX", "form": "тхылъ", "literalMeaning": "kitap", "conceptId": "BOOK", "wordFamilyId": "WF-TX", "partOfSpeech": "noun", "ipa": "/txəɬ/", "corpusFrequency": 6000, "notes": "KBD Corpus rank 68"},
    {"id": "L-EDZ", "form": "еджапӀэ", "literalMeaning": "okul", "conceptId": "SCHOOL", "wordFamilyId": "WF-EDZ", "partOfSpeech": "noun", "ipa": "/jadʒaːpʼa/", "corpusFrequency": 5900, "notes": "KBD Corpus rank 69"},
    {"id": "L-LEZHAP1E", "form": "лэжьапӀэ", "literalMeaning": "is yeri, calisma alani", "conceptId": "WORKPLACE", "wordFamilyId": "WF-LEZH", "partOfSpeech": "noun", "ipa": "/laʑaːpʼa/", "corpusFrequency": 5810, "notes": "KBD Corpus rank 70"},
    {"id": "L-GHE", "form": "гъэ", "literalMeaning": "yil, sene", "conceptId": "YEAR", "wordFamilyId": "WF-GHE", "partOfSpeech": "noun", "ipa": "/ʁa/", "corpusFrequency": 5700, "notes": "KBD Corpus rank 71"},
    {"id": "L-PSHEDDZHYZH", "form": "пщэдджыжь", "literalMeaning": "sabah", "conceptId": "MORNING", "wordFamilyId": "WF-PSHEDDZHYZH", "partOfSpeech": "noun", "ipa": "/pɕadʒəʑ/", "corpusFrequency": 5600, "notes": "KBD Corpus rank 72"},
    {"id": "L-SH1YMAKHUE", "form": "щӀымахуэ", "literalMeaning": "kis", "conceptId": "WINTER", "wordFamilyId": "WF-SH1Y", "partOfSpeech": "noun", "ipa": "/ɕʼəmaːxwa/", "corpusFrequency": 5500, "notes": "KBD Corpus rank 73"},
    {"id": "L-GHEMAKHUE", "form": "гъэмахуэ", "literalMeaning": "yaz", "conceptId": "SUMMER", "wordFamilyId": "WF-GHE", "partOfSpeech": "noun", "ipa": "/ʁamaːxwa/", "corpusFrequency": 5420, "notes": "KBD Corpus rank 74"},
    {"id": "L-BZHYH", "form": "бжыхьэ", "literalMeaning": "sonbahar", "conceptId": "AUTUMN", "wordFamilyId": "WF-BZHYH", "partOfSpeech": "noun", "ipa": "/bʒəħa/", "corpusFrequency": 5310, "notes": "KBD Corpus rank 75"},
    {"id": "L-GHATXE", "form": "гъатхэ", "literalMeaning": "ilkbahar", "conceptId": "SPRING", "wordFamilyId": "WF-GHATXE", "partOfSpeech": "noun", "ipa": "/ʁaːtxa/", "corpusFrequency": 5200, "notes": "KBD Corpus rank 76"},
    {"id": "L-PEZH", "form": "пэж", "literalMeaning": "dogru, gercek", "conceptId": "TRUTH", "wordFamilyId": "WF-PEZH", "partOfSpeech": "adjective", "ipa": "/paʒ/", "corpusFrequency": 5100, "notes": "KBD Corpus rank 77"},
    {"id": "L-PC1Y", "form": "пцӀы", "literalMeaning": "yalan, yanlis", "conceptId": "LIE", "wordFamilyId": "WF-PC1Y", "partOfSpeech": "adjective", "ipa": "/ptsʼə/", "corpusFrequency": 5010, "notes": "KBD Corpus rank 78"},
    {"id": "L-IN", "form": "ин", "literalMeaning": "buyuk", "conceptId": "BIG", "wordFamilyId": "WF-IN", "partOfSpeech": "adjective", "ipa": "/jən/", "corpusFrequency": 4900, "notes": "KBD Corpus rank 79"},
    {"id": "L-C1YK1U", "form": "цӀыкӀу", "literalMeaning": "kucuk", "conceptId": "SMALL", "wordFamilyId": "WF-C1YK1U", "partOfSpeech": "adjective", "ipa": "/tsʼəkʷ/", "corpusFrequency": 4820, "notes": "KBD Corpus rank 80"},
    {"id": "L-SH1E", "form": "щӀэ", "literalMeaning": "yeni", "conceptId": "NEW", "wordFamilyId": "WF-SH1E", "partOfSpeech": "adjective", "ipa": "/ɕʼa/", "corpusFrequency": 4700, "notes": "KBD Corpus rank 81"},
    {"id": "L-ZHY", "form": "жьы", "literalMeaning": "eski, yasli", "conceptId": "OLD", "wordFamilyId": "WF-ZHY", "partOfSpeech": "adjective", "ipa": "/ʑə/", "corpusFrequency": 4610, "notes": "KBD Corpus rank 82"},
    {"id": "L-K1YH", "form": "кӀыхь", "literalMeaning": "uzun", "conceptId": "LONG", "wordFamilyId": "WF-K1YH", "partOfSpeech": "adjective", "ipa": "/tʃʼəħ/", "corpusFrequency": 4500, "notes": "KBD Corpus rank 83"},
    {"id": "L-K1ESH1", "form": "кӀэщӀ", "literalMeaning": "kisa", "conceptId": "SHORT", "wordFamilyId": "WF-K1ESH1", "partOfSpeech": "adjective", "ipa": "/tʃʼaɕʼ/", "corpusFrequency": 4400, "notes": "KBD Corpus rank 84"},
    {"id": "L-PSYNCH1E", "form": "псынщӀэ", "literalMeaning": "hizli, hafif", "conceptId": "FAST", "wordFamilyId": "WF-PSYNCH1E", "partOfSpeech": "adjective", "ipa": "/psənɕʼa/", "corpusFrequency": 4300, "notes": "KBD Corpus rank 85"},
    {"id": "L-T1U", "form": "тӀу", "literalMeaning": "iki", "conceptId": "TWO", "wordFamilyId": "WF-T1U", "partOfSpeech": "numeral", "ipa": "/tʼwə/", "corpusFrequency": 4200, "notes": "KBD Corpus rank 86"},
    {"id": "L-SHY", "form": "щы", "literalMeaning": "uc", "conceptId": "THREE", "wordFamilyId": "WF-SHY", "partOfSpeech": "numeral", "ipa": "/ɕə/", "corpusFrequency": 4100, "notes": "KBD Corpus rank 87"},
    {"id": "L-PL1Y", "form": "плӀы", "literalMeaning": "dort", "conceptId": "FOUR", "wordFamilyId": "WF-PL1Y", "partOfSpeech": "numeral", "ipa": "/pɬʼə/", "corpusFrequency": 4000, "notes": "KBD Corpus rank 88"},
    {"id": "L-TXU", "form": "тху", "literalMeaning": "bes", "conceptId": "FIVE", "wordFamilyId": "WF-TXU", "partOfSpeech": "numeral", "ipa": "/txʷə/", "corpusFrequency": 3910, "notes": "KBD Corpus rank 89"},
    {"id": "L-XY", "form": "хы", "literalMeaning": "alti", "conceptId": "SIX", "wordFamilyId": "WF-XY", "partOfSpeech": "numeral", "ipa": "/xə/", "corpusFrequency": 3800, "notes": "KBD Corpus rank 90"},
    {"id": "L-BLY", "form": "блы", "literalMeaning": "yedi", "conceptId": "SEVEN", "wordFamilyId": "WF-BLY", "partOfSpeech": "numeral", "ipa": "/blə/", "corpusFrequency": 3700, "notes": "KBD Corpus rank 91"},
    {"id": "L-YI", "form": "и", "literalMeaning": "sekiz", "conceptId": "EIGHT", "wordFamilyId": "WF-YI", "partOfSpeech": "numeral", "ipa": "/jə/", "corpusFrequency": 3600, "notes": "KBD Corpus rank 92"},
    {"id": "L-BGHWU", "form": "бгъу", "literalMeaning": "dokuz", "conceptId": "NINE", "wordFamilyId": "WF-BGHWU", "partOfSpeech": "numeral", "ipa": "/bʁʷə/", "corpusFrequency": 3500, "notes": "KBD Corpus rank 93"},
    {"id": "L-PSH1Y", "form": "пщӀы", "literalMeaning": "on", "conceptId": "TEN", "wordFamilyId": "WF-PSH1Y", "partOfSpeech": "numeral", "ipa": "/pɕʼə/", "corpusFrequency": 3410, "notes": "KBD Corpus rank 94"},
    {"id": "L-PSEUN", "form": "псэун", "literalMeaning": "yasamak, barinmak", "conceptId": "LIVE", "wordFamilyId": "WF-PSE", "partOfSpeech": "verb", "ipa": "/psawn/", "corpusFrequency": 3300, "notes": "KBD Corpus rank 95"},
    {"id": "L-LEZHEN", "form": "лэжьэн", "literalMeaning": "calismak, uretmek", "conceptId": "WORK", "wordFamilyId": "WF-LEZH", "partOfSpeech": "verb", "ipa": "/laʑan/", "corpusFrequency": 3200, "notes": "KBD Corpus rank 96"},
    {"id": "L-TXYN", "form": "тхын", "literalMeaning": "yazmak", "conceptId": "WRITE", "wordFamilyId": "WF-TX", "partOfSpeech": "verb", "ipa": "/txən/", "corpusFrequency": 3100, "notes": "KBD Corpus rank 97"},
    {"id": "L-EDZHEN", "form": "еджэн", "literalMeaning": "okumak, okula gitmek", "conceptId": "READ", "wordFamilyId": "WF-EDZ", "partOfSpeech": "verb", "ipa": "/jadʒan/", "corpusFrequency": 3000, "notes": "KBD Corpus rank 98"},
    {"id": "L-EPLHYN", "form": "еплъын", "literalMeaning": "bakmak, seyretmek", "conceptId": "LOOK", "wordFamilyId": "WF-PLH", "partOfSpeech": "verb", "ipa": "/japɬən/", "corpusFrequency": 2920, "notes": "KBD Corpus rank 99"},
    {"id": "L-ZEKHEKH1YN", "form": "зэхэщӀын", "literalMeaning": "anlamak, hissetmek", "conceptId": "FEEL", "wordFamilyId": "WF-SCH1E", "partOfSpeech": "verb", "ipa": "/zaxaɕʼən/", "corpusFrequency": 2850, "notes": "KBD Corpus rank 100"},
]

# 3) Ekle
eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

# 4) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
