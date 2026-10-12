import json
from pathlib import Path

# 1) Oku
roots_path = Path('public/data/linguistic/roots.json')
lex_path = Path('public/data/linguistic/lexemes.json')

roots = json.loads(roots_path.read_text(encoding='utf-8'))
lex = json.loads(lex_path.read_text(encoding='utf-8'))

mevcut_ids = {l['id'] for l in lex}

# 2) Yeni lexeme
yeni = [
    {"id": "L-GUSHHE", "form": "гущэ", "literalMeaning": "besik, kundak",
     "wordFamilyId": "WF-GUSHCH", "conceptId": "CRADLE",
     "partOfSpeech": "noun",
     "ipa": "/ˈgʷǝɕɐ/",
     "notes": "Wiktionary; Apaşev (2008); Yamisha (2023); Kardanov (1957); Huvaj (2007)"},
]

# 3) Ekle
for y in yeni:
    if y['id'] not in mevcut_ids:
        lex.append(y)
        print(f"Eklendi: {y['id']} - {y['form']}")

# 4) R-GUSHCH root'unu guncelle
for root in roots:
    if root['id'] == 'R-GUSHCH':
        for y in yeni:
            if y['id'] not in root['wordFamily']['lexemeIds']:
                root['wordFamily']['lexemeIds'].append(y['id'])
            if y['conceptId'] not in root['wordFamily']['conceptIds']:
                root['wordFamily']['conceptIds'].append(y['conceptId'])
        print(f"R-GUSHCH guncellendi:")
        print(f"  lexemeIds: {root['wordFamily']['lexemeIds']}")
        print(f"  conceptIds: {root['wordFamily']['conceptIds']}")

# 5) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
roots_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding='utf-8')

print(f"\nToplam lexeme: {len(lex)}")
print(f"Toplam root: {len(roots)}")
