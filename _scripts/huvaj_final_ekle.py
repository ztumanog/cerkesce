"""
huvaj_final_ekle.py — huvaj_tr_map3.json'dan L-KBD'ye tr ekle
"""

import json
import shutil
from pathlib import Path

huvaj = json.load(open('huvaj_tr_map3.json', encoding='utf-8'))
print(f'Huvaj harita: {len(huvaj)} form')

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.load(open(lex_path, encoding='utf-8'))

yedek = lex_path.with_suffix('.json.bak-huvaj-final')
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

# Genel doluluk
kbd = [l for l in lex if l.get('id', '').startswith('L-KBD-')]
tr = sum(1 for l in kbd if (l.get('translations') or {}).get('tr'))
print()
print(f'L-KBD toplam: {len(kbd)}')
print(f'Türkçe dolu: {tr}')
print(f'Oran: {tr/len(kbd)*100:.1f}%')