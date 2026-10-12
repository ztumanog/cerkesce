"""
huvaj_ekle.py — Huvaj haritasından L-KBD'ye translations.tr ekle
"""

import json
import shutil
from pathlib import Path

huvaj = json.load(open('huvaj_tr_map.json', encoding='utf-8'))
print(f'Huvaj harita: {len(huvaj)} form')

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.load(open(lex_path, encoding='utf-8'))

yedek = lex_path.with_suffix('.json.bak-huvaj-ekle')
if not yedek.exists():
    shutil.copy(lex_path, yedek)
    print(f'Yedek: {yedek}')

guncellenen = 0
for l in lex:
    if not l.get('id', '').startswith('L-KBD-'):
        continue
    form = l.get('form', '')
    if form in huvaj:
        if 'translations' not in l or not isinstance(l['translations'], dict):
            l['translations'] = {}
        if not l['translations'].get('tr'):
            l['translations']['tr'] = huvaj[form]['tr']
            l['translations']['trSource'] = '8.Ady-Tur_Huvaj.json'
            l['translations']['trVerified'] = False
            guncellenen += 1

print(f'Güncellenen: {guncellenen}')
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Yazıldı: {lex_path}')