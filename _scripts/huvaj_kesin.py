import json
from pathlib import Path

huvaj = json.load(open('huvaj_tr_map3.json', encoding='utf-8'))
print(f'Huvaj: {len(huvaj)} form')

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.load(open(lex_path, encoding='utf-8'))

guncellenen = 0
atlanan_zaten = 0
atlanan_bos = 0

for i, l in enumerate(lex):
    if not l.get('id', '').startswith('L-KBD-'):
        continue
    form = l.get('form', '')
    if not form:
        atlanan_bos += 1
        continue
    if form not in huvaj:
        continue
    # form huvaj'da var
    if 'translations' not in l or not isinstance(l['translations'], dict):
        l['translations'] = {}
    if l['translations'].get('tr'):
        atlanan_zaten += 1
        continue
    l['translations']['tr'] = huvaj[form]['tr']
    l['translations']['trSource'] = '8.Ady-Tur_Huvaj.json'
    l['translations']['trVerified'] = False
    guncellenen += 1

print(f'Guncellenen: {guncellenen}')
print(f'Zaten dolu atlanan: {atlanan_zaten}')
print(f'Bos form atlanan: {atlanan_bos}')

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Yazildi: {lex_path}')

kbd = [l for l in lex if l.get('id', '').startswith('L-KBD-')]
tr = sum(1 for l in kbd if (l.get('translations') or {}).get('tr'))
print()
print(f'L-KBD toplam: {len(kbd)}')
print(f'Türkçe dolu: {tr}')
print(f'Oran: {tr/len(kbd)*100:.1f}%')