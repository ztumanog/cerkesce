import json
from pathlib import Path

# 1) Oku
roots_path = Path('public/data/linguistic/roots.json')
lex_path = Path('public/data/linguistic/lexemes.json')

roots = json.loads(roots_path.read_text(encoding='utf-8'))
lex = json.loads(lex_path.read_text(encoding='utf-8'))

mevcut_ids = {l['id'] for l in lex}

# 2) Yeni kelimeler
yeni_lexemes = [
    # R-P1E (yer, mekân)
    {"id": "L-P1E", "form": "пӀэ", "literalMeaning": "yer, mekân",
     "wordFamilyId": "WF-P1E", "conceptId": "PLACE",
     "partOfSpeech": "noun"},
    # R-FO (bal)
    {"id": "L-FO", "form": "фо", "literalMeaning": "bal",
     "wordFamilyId": "WF-FO", "conceptId": "HONEY",
     "partOfSpeech": "noun"},
    # R-DZE (diş / ordu)
    {"id": "L-DZE", "form": "дзэ", "literalMeaning": "diş; ordu",
     "wordFamilyId": "WF-DZE", "conceptId": "TOOTH",
     "partOfSpeech": "noun"},
    # R-KHY (deniz)
    {"id": "L-KHY", "form": "хы", "literalMeaning": "deniz, okyanus",
     "wordFamilyId": "WF-KHY", "conceptId": "SEA",
     "partOfSpeech": "noun"},
    # R-GUASHE (hanım, prenses)
    {"id": "L-GUASHE", "form": "гуащэ", "literalMeaning": "hanım, prenses",
     "wordFamilyId": "WF-GUASHE", "conceptId": "LADY",
     "partOfSpeech": "noun"},
]

# 3) Ekle
eklenen = 0
for y in yeni_lexemes:
    if y['id'] not in mevcut_ids:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

# 4) Roots guncelle
for root in roots:
    rid = root['id']
    # Yeni eklenen lexeme'leri root'a bagla
    for y in yeni_lexemes:
        wf_id = y['wordFamilyId']
        if wf_id == f"WF-{rid[2:]}":
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
