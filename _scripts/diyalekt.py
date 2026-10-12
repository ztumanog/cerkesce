import json
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

# Bozuk form'ları tespit et
bozuk = []
for l in lex:
    form = l.get('form', '')
    # Bozuk karakterler: º, ª, Ë, Ç, ╣, ║, ╗, ╝, ░, ▒, ▓, │, ┤, Á, Â, Ã
    if any(c in form for c in 'ºªËÇ╣║╗╝░▒▓│┤ÁÂÃ'):
        bozuk.append({
            'id': l['id'],
            'form': form,
            'len': len(form)
        })

print(f"Bozuk encoding: {len(bozuk)} lexeme")
for b in bozuk[:10]:
    print(f"  {b['id']}: {b['form']}")