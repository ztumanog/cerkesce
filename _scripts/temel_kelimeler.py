import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_ids = {l['id'] for l in lex}

# 2) Yeni kelimeler
yeni = [
    # 1. Zamirler
    {"id": "L-SE", "form": "сэ", "literalMeaning": "ben", "conceptId": "I", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-UE", "form": "уэ", "literalMeaning": "sen", "conceptId": "YOU", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-AR", "form": "ар", "literalMeaning": "o", "conceptId": "HE", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-DE", "form": "дэ", "literalMeaning": "biz", "conceptId": "WE", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-FE", "form": "фэ", "literalMeaning": "siz", "conceptId": "YOU_PL", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-AKHER", "form": "ахэр", "literalMeaning": "onlar", "conceptId": "THEY", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-MY", "form": "мы", "literalMeaning": "bu", "conceptId": "THIS", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-A", "form": "а", "literalMeaning": "o (uzak)", "conceptId": "THAT", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-ABY", "form": "абы", "literalMeaning": "ona", "conceptId": "HIM", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-MYBY", "form": "мыбы", "literalMeaning": "buna", "conceptId": "THIS_ONE", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-ZY", "form": "зы", "literalMeaning": "bir", "conceptId": "ONE", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-EZY", "form": "езы", "literalMeaning": "kendi", "conceptId": "SELF", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-SYT", "form": "сыт", "literalMeaning": "ne", "conceptId": "WHAT", "wordFamilyId": "WF-ZAMIR"},
    {"id": "L-KHET", "form": "хэт", "literalMeaning": "kim", "conceptId": "WHO", "wordFamilyId": "WF-ZAMIR"},
    
    # 2. Zaman/Yer Zarflari
    {"id": "L-IDZHY", "form": "иджы", "literalMeaning": "simdi", "conceptId": "NOW", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-NOBE", "form": "нобэ", "literalMeaning": "bugun", "conceptId": "TODAY", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-DYGHUASE", "form": "дыгъуасэ", "literalMeaning": "dun", "conceptId": "YESTERDAY", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-PSHCHEDEY", "form": "пщэдей", "literalMeaning": "yarin", "conceptId": "TOMORROW", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-KUEDK1E", "form": "куэдкӀэ", "literalMeaning": "cokca", "conceptId": "MUCH", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-ABDEZH", "form": "абдеж", "literalMeaning": "orada", "conceptId": "THERE", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-NEKH", "form": "нэхъ", "literalMeaning": "daha", "conceptId": "MORE", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-ZEMAN", "form": "зэман", "literalMeaning": "zaman", "conceptId": "TIME", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-SYKHET", "form": "сыхьэт", "literalMeaning": "saat", "conceptId": "HOUR", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-MAKHUE", "form": "махуэ", "literalMeaning": "gun", "conceptId": "DAY", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-ZHESHCH", "form": "жэщ", "literalMeaning": "gece", "conceptId": "NIGHT", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-PSHCHEDDZHYZH", "form": "пщэдджыжь", "literalMeaning": "sabah", "conceptId": "MORNING", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-SH1YMAKHUE", "form": "щӀымахуэ", "literalMeaning": "kis", "conceptId": "WINTER", "wordFamilyId": "WF-ZAMAN"},
    {"id": "L-GHEMAKHUE", "form": "гъэмахуэ", "literalMeaning": "yaz", "conceptId": "SUMMER", "wordFamilyId": "WF-ZAMAN"},
    
    # 3. Temel Fiiller
    {"id": "L-KHUN", "form": "хъун", "literalMeaning": "olmak", "conceptId": "BE", "wordFamilyId": "WF-FIIL"},
    {"id": "L-SH1YN", "form": "щӀын", "literalMeaning": "yapmak", "conceptId": "DO", "wordFamilyId": "WF-FIIL"},
    {"id": "L-K1UEN", "form": "кӀуэн", "literalMeaning": "gitmek", "conceptId": "GO", "wordFamilyId": "WF-FIIL"},
    {"id": "L-KEK1UEN", "form": "къэкӀуэн", "literalMeaning": "gelmek", "conceptId": "COME", "wordFamilyId": "WF-FIIL"},
    {"id": "L-PSELHEN", "form": "псэлъэн", "literalMeaning": "konusmak", "conceptId": "SPEAK", "wordFamilyId": "WF-FIIL"},
    {"id": "L-ZHY1EN", "form": "жыӀэн", "literalMeaning": "soylemek", "conceptId": "SAY", "wordFamilyId": "WF-FIIL"},
    {"id": "L-EDZHEN", "form": "еджэн", "literalMeaning": "okumak", "conceptId": "READ", "wordFamilyId": "WF-FIIL"},
    {"id": "L-TKHYN", "form": "тхын", "literalMeaning": "yazmak", "conceptId": "WRITE", "wordFamilyId": "WF-FIIL"},
    {"id": "L-SHKHEN", "form": "шхэн", "literalMeaning": "yemek", "conceptId": "EAT", "wordFamilyId": "WF-FIIL"},
    {"id": "L-EFEN", "form": "ефэн", "literalMeaning": "icmek", "conceptId": "DRINK", "wordFamilyId": "WF-FIIL"},
    {"id": "L-GHUELHYN", "form": "гъуэлъын", "literalMeaning": "yatmak", "conceptId": "LIE", "wordFamilyId": "WF-FIIL"},
    {"id": "L-TSYXUN", "form": "цӀыхун", "literalMeaning": "tanimak", "conceptId": "KNOW", "wordFamilyId": "WF-FIIL"},
    {"id": "L-ZEKHEKHEN", "form": "зэхэхын", "literalMeaning": "duymak", "conceptId": "HEAR", "wordFamilyId": "WF-FIIL"},
    {"id": "L-LHAGHUN", "form": "лъагъун", "literalMeaning": "gormek", "conceptId": "SEE", "wordFamilyId": "WF-FIIL"},
    {"id": "L-LEZHEN", "form": "лэжьэн", "literalMeaning": "calismak", "conceptId": "WORK", "wordFamilyId": "WF-FIIL"},
    {"id": "L-DELHYN", "form": "дэлъын", "literalMeaning": "yatmak", "conceptId": "LIE", "wordFamilyId": "WF-FIIL"},
    {"id": "L-KESHCHEN", "form": "къэшын", "literalMeaning": "sagmak", "conceptId": "MILK", "wordFamilyId": "WF-FIIL"},
    
    # 4. Insan/Aile/Toplum
    {"id": "L-TSYXHU", "form": "цӀыху", "literalMeaning": "insan", "conceptId": "HUMAN", "wordFamilyId": "WF-TSYXHU"},
    {"id": "L-LHY", "form": "лӀы", "literalMeaning": "adam", "conceptId": "MAN", "wordFamilyId": "WF-LHY"},
    {"id": "L-BZYLKHUGHE", "form": "бзылъхугъэ", "literalMeaning": "kadin", "conceptId": "WOMAN", "wordFamilyId": "WF-BZYL"},
    {"id": "L-SH1ALE", "form": "щӀалэ", "literalMeaning": "genc", "conceptId": "YOUTH", "wordFamilyId": "WF-SH1ALE"},
    {"id": "L-KHYDZHEBZ", "form": "хъыджэбз", "literalMeaning": "kiz", "conceptId": "GIRL", "wordFamilyId": "WF-KHYDZHEBZ"},
    {"id": "L-ANE", "form": "анэ", "literalMeaning": "anne", "conceptId": "MOTHER", "wordFamilyId": "WF-ANE"},
    {"id": "L-ADE", "form": "адэ", "literalMeaning": "baba", "conceptId": "FATHER", "wordFamilyId": "WF-ADE"},
    {"id": "L-QUE", "form": "къуэ", "literalMeaning": "ogul", "conceptId": "SON", "wordFamilyId": "WF-QUE"},
    {"id": "L-PKHU", "form": "пхъу", "literalMeaning": "kiz evlat", "conceptId": "DAUGHTER", "wordFamilyId": "WF-PKHU"},
    {"id": "L-DELKHU", "form": "дэлъху", "literalMeaning": "kardes", "conceptId": "BROTHER", "wordFamilyId": "WF-DELKHU"},
    {"id": "L-SHYPKHU", "form": "шыпхъу", "literalMeaning": "kiz kardes", "conceptId": "SISTER", "wordFamilyId": "WF-SHYPKHU"},
    {"id": "L-QUAZHE", "form": "къуажэ", "literalMeaning": "koy", "conceptId": "VILLAGE", "wordFamilyId": "WF-QUAZHE"},
    {"id": "L-QALE", "form": "къалэ", "literalMeaning": "sehir", "conceptId": "CITY", "wordFamilyId": "WF-QALE"},
    {"id": "L-UNE", "form": "унэ", "literalMeaning": "ev", "conceptId": "HOUSE", "wordFamilyId": "WF-UNE"},
    {"id": "L-NYBZHEGU", "form": "ныбжьэгъу", "literalMeaning": "arkadas", "conceptId": "FRIEND", "wordFamilyId": "WF-NYBZHEGU"},
    {"id": "L-UNAGHUE", "form": "унагъуэ", "literalMeaning": "aile", "conceptId": "FAMILY", "wordFamilyId": "WF-UNAGHUE"},
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
