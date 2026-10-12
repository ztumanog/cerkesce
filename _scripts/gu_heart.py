import json
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

guncellenen = 0
for l in lex:
    if l.get('form') == 'гу' and not l.get('conceptId'):
        l['conceptId'] = 'HEART'
        guncellenen += 1
        print(f"Guncellendi: {l['id']} -> HEART")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nGuncellenen: {guncellenen}")
