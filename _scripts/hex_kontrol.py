import json
import re
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

def is_hex_id(id_str):
    if not id_str or not id_str.startswith('L-'):
        return False
    suffix = id_str[2:]
    if not all(c in '0123456789ABCDEF' for c in suffix):
        return False
    return len(suffix) >= 10

# Hex ID'liler
hex_ids = [l for l in lex if is_hex_id(l.get('id', ''))]
print(f"Hex ID: {len(hex_ids)}")

# Kac tanesi duplicate?
formlar = {}
for l in lex:
    form = l.get('form', '')
    if form not in formlar:
        formlar[form] = []
    formlar[form].append(l)

duplicate_hex = 0
tek_hex = 0

for h in hex_ids:
    form = h.get('form', '')
    if len(formlar.get(form, [])) > 1:
        duplicate_hex += 1
    else:
        tek_hex += 1
        print(f"  TEK: {h['id']} -> {form} ({h.get('literalMeaning', '?')})")

print(f"\nDuplicate hex: {duplicate_hex}")
print(f"Tek hex: {tek_hex}")
