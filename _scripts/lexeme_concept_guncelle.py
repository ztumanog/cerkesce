import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

# 2) Guncellenecek lexemeler
guncellemeler = {
    'L-GUASHE': 'LADY',
    'L-P1E': 'PLACE',
    'L-KHY': 'SEA',
    'L-FO': 'HONEY',
    'L-DZE': 'TOOTH',
}

# 3) Guncelle
guncellenen = 0
for l in lex:
    if l['id'] in guncellemeler:
        yeni = guncellemeler[l['id']]
        eski = l.get('conceptId', '')
        if eski != yeni:
            l['conceptId'] = yeni
            guncellenen += 1
            print(f"{l['id']}: '{eski}' -> '{yeni}'")

# 4) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nGuncellenen: {guncellenen}")
