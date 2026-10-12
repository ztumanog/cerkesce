import json
from pathlib import Path

lex = json.loads(Path('public/data/linguistic/lexemes.json').read_text(encoding='utf-8'))
bozuk = [l for l in lex if any(c in l.get('form','') for c in 'ºªËÇ╣║╗╝░▒▓│┤')]
print(f"Bozuk form: {len(bozuk)}")
for b in bozuk:
    print(f"  {b['id']}: {b['form']}")
