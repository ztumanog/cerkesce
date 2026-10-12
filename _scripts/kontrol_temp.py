import json
from pathlib import Path

lex = json.loads(Path('public/data/linguistic/lexemes.json').read_text(encoding='utf-8'))
print(f'Toplam: {len(lex)}')
print(f'L-CORPUS: {len([l for l in lex if l.get("id", "").startswith("L-CORPUS")])}')
print(f'rootIds dolu: {len([l for l in lex if l.get("rootIds")])}')
print(f'wordFamilyId dolu: {len([l for l in lex if l.get("wordFamilyId")])}')
print(f'conceptId dolu: {len([l for l in lex if l.get("conceptId")])}')
