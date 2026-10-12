import json
from pathlib import Path

# 1) Oku
roots_path = Path('public/data/linguistic/roots.json')
lex_path = Path('public/data/linguistic/lexemes.json')

roots = json.loads(roots_path.read_text(encoding='utf-8'))
lex = json.loads(lex_path.read_text(encoding='utf-8'))

mevcut_ids = {l['id'] for l in lex}

# 2) Yeni kelimeler (22 root icin)
yeni = [
    # R-GUASHCH (prenses, hanım)
    {"id": "L-GUASHCH", "form": "гуащэ", "literalMeaning": "prenses, hanım",
     "wordFamilyId": "WF-GUASHCH", "conceptId": "LADY",
     "partOfSpeech": "noun"},
    # R-GHUSE (yol arkadaşı)
    {"id": "L-GHUSE", "form": "гъусэ", "literalMeaning": "yol arkadaşı, eş",
     "wordFamilyId": "WF-GHUSE", "conceptId": "COMPANION",
     "partOfSpeech": "noun"},
    # R-FE (deri)
    {"id": "L-FE", "form": "фэ", "literalMeaning": "deri, cilt",
     "wordFamilyId": "WF-FE", "conceptId": "SKIN",
     "partOfSpeech": "noun"},
    # R-P1C1 (aldatma)
    {"id": "L-P1C1", "form": "пцӀ", "literalMeaning": "aldatma, yalan",
     "wordFamilyId": "WF-P1C1", "conceptId": "DECEIT",
     "partOfSpeech": "noun"},
    # R-DAGHE (yağ)
    {"id": "L-DAGHE", "form": "дагъэ", "literalMeaning": "yağ, iç yağı",
     "wordFamilyId": "WF-DAGHE", "conceptId": "FAT",
     "partOfSpeech": "noun"},
    # R-SHE (yağ)
    {"id": "L-SHE", "form": "щэ", "literalMeaning": "yağ, iç yağı",
     "wordFamilyId": "WF-SHE", "conceptId": "FAT",
     "partOfSpeech": "noun"},
    # R-SHE2 (süt)
    {"id": "L-SHE2", "form": "шэ", "literalMeaning": "süt",
     "wordFamilyId": "WF-SHE2", "conceptId": "MILK",
     "partOfSpeech": "noun"},
    # R-TKHEK1UME (kulak)
    {"id": "L-TKHEK1UME", "form": "тхьэкӀумэ", "literalMeaning": "kulak",
     "wordFamilyId": "WF-TKHEK1UME", "conceptId": "EAR",
     "partOfSpeech": "noun"},
    # R-K1YH (uzun)
    {"id": "L-K1YH", "form": "кӀыхь", "literalMeaning": "uzun",
     "wordFamilyId": "WF-K1YH", "conceptId": "LONG",
     "partOfSpeech": "adjective"},
    # R-DYGHU (hırsız)
    {"id": "L-DYGHU", "form": "дыгъу", "literalMeaning": "hırsız",
     "wordFamilyId": "WF-DYGHU", "conceptId": "THIEF",
     "partOfSpeech": "noun"},
    # R-ZHY (eski)
    {"id": "L-ZHY", "form": "жьы", "literalMeaning": "eski, yaşlı",
     "wordFamilyId": "WF-ZHY", "conceptId": "OLD",
     "partOfSpeech": "adjective"},
    # R-VY (öküz)
    {"id": "L-VY", "form": "вы", "literalMeaning": "öküz",
     "wordFamilyId": "WF-VY", "conceptId": "OX",
     "partOfSpeech": "noun"},
    # R-KHY2 (altı)
    {"id": "L-KHY2", "form": "хы", "literalMeaning": "altı (6)",
     "wordFamilyId": "WF-KHY2", "conceptId": "SIX",
     "partOfSpeech": "numeral"},
    # R-KKHUHE (domuz)
    {"id": "L-KKHUHE", "form": "кхъуэ", "literalMeaning": "domuz",
     "wordFamilyId": "WF-KKHUHE", "conceptId": "PIG",
     "partOfSpeech": "noun"},
    # R-KKHUXY (gemi)
    {"id": "L-KKHUXY", "form": "кхъухь", "literalMeaning": "gemi",
     "wordFamilyId": "WF-KKHUXY", "conceptId": "SHIP",
     "partOfSpeech": "noun"},
    # R-KUEREDERE (ardıç)
    {"id": "L-KUEREDERE", "form": "къуэрэдэрэ", "literalMeaning": "ardıç",
     "wordFamilyId": "WF-KUEREDERE", "conceptId": "JUNIPER",
     "partOfSpeech": "noun"},
    # R-NYBZHY (yaş)
    {"id": "L-NYBZHY", "form": "ныбжь", "literalMeaning": "yaş",
     "wordFamilyId": "WF-NYBZHY", "conceptId": "AGE",
     "partOfSpeech": "noun"},
    # R-1UEKHU (iş)
    {"id": "L-1UEKHU", "form": "Ӏуэху", "literalMeaning": "iş, mesele",
     "wordFamilyId": "WF-1UEKHU", "conceptId": "WORK",
     "partOfSpeech": "noun"},
    # R-MAKHUE (gün)
    {"id": "L-MAKHUE", "form": "махуэ", "literalMeaning": "gün",
     "wordFamilyId": "WF-MAKHUE", "conceptId": "DAY",
     "partOfSpeech": "noun"},
    # R-SHCH (uç)
    {"id": "L-SHCH", "form": "щы", "literalMeaning": "uç",
     "wordFamilyId": "WF-SHCH", "conceptId": "POINT",
     "partOfSpeech": "noun"},
    # R-ZE (R-ZE - ?)
    {"id": "L-ZE", "form": "зэ", "literalMeaning": "bir (1)",
     "wordFamilyId": "WF-ZE", "conceptId": "ONE",
     "partOfSpeech": "numeral"},
    # R-NAPE (yüz)
    {"id": "L-NAPE", "form": "напэ", "literalMeaning": "yüz, onur",
     "wordFamilyId": "WF-NAPE", "conceptId": "FACE",
     "partOfSpeech": "noun"},
]

# 3) Ekle
eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

# 4) Root'lari guncelle
for root in roots:
    rid = root['id']
    for y in yeni:
        wf_id = y['wordFamilyId']
        # Root ID ile WF ID eslesmesi
        if wf_id == f"WF-{rid[2:]}" or wf_id == f"WF-{rid[2:].replace('1','1')}":
            if y['id'] not in root['wordFamily']['lexemeIds']:
                root['wordFamily']['lexemeIds'].append(y['id'])
            if y['conceptId'] not in root['wordFamily']['conceptIds']:
                root['wordFamily']['conceptIds'].append(y['conceptId'])

# 5) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
roots_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding='utf-8')

print(f"\nEklenen lexeme: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
print(f"Toplam root: {len(roots)}")

# 6) Kalan bos root'lar
bos = [r for r in roots if not r['wordFamily']['conceptIds'] or len(r['wordFamily']['conceptIds']) == 0]
print(f"\nKalan conceptIds bos: {len(bos)}")
for r in bos:
    print(f"  {r['id']} - {r['form']}")
