import json
from pathlib import Path

lex = json.loads(Path('public/data/linguistic/lexemes.json').read_text(encoding='utf-8'))
print(f'📊 Toplam: {len(lex):,}')
print(f'✅ Dolu conceptId: {len([l for l in lex if l.get("conceptId")]):,}')
print(f'❌ Boş conceptId: {len([l for l in lex if not l.get("conceptId")]):,}')
print(f'🔄 Çok anlamlı: {len([l for l in lex if l.get("conceptIds")]):,}')
