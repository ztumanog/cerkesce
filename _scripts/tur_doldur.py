"""
tur_doldur.py — Türkçe sözlüklerden L-KBD kayıtlarına translations.tr ekle
"""

import json
import shutil
from pathlib import Path

TUR_SOZLUKLER = [
    '8.Ady-Tur_Huvaj.json',
    '21.Kbd-Tu-Jonty.json',
    '26.Tu-Kbd-Jonty.json',
    '27.Tur-Ady_Abaze.json',
    '28.Tur-Ady_Huvaj.json',
    '29.Tur-Ady_Teshu.json',
    '31.Tu-Ady_Hilmi.json',
]

def anlam_cikar(data):
    if not isinstance(data, dict):
        return ""
    for field in ['translation', 'meaning', 'definition', 'anlam']:
        if field in data and data[field]:
            v = data[field]
            if isinstance(v, str):
                return v.strip()
            if isinstance(v, dict) and 'tr' in v:
                return str(v['tr']).strip()
    html = data.get('full_definition_in_html', '')
    if html:
        import re
        temiz = re.sub(r'<[^>]+>', ' ', str(html))
        temiz = re.sub(r'\s+', ' ', temiz).strip()
        return temiz[:200]
    return ""

def main():
    form_tr = {}
    for fname in TUR_SOZLUKLER:
        f = Path('public/data') / fname
        if not f.exists():
            print(f'YOK: {fname}')
            continue
        d = json.load(open(f, encoding='utf-8'))
        w = d.get('words', {})
        for form, data in w.items():
            anlam = anlam_cikar(data)
            if anlam and form not in form_tr:
                form_tr[form] = {'tr': anlam, 'kaynak': fname}

    print(f'Türkçe haritada: {len(form_tr)} kelime')

    lex_path = Path('public/data/linguistic/lexemes.json')
    lex = json.load(open(lex_path, encoding='utf-8'))

    yedek = lex_path.with_suffix('.json.bak-tur-doldur')
    if not yedek.exists():
        shutil.copy(lex_path, yedek)
        print(f'Yedek: {yedek}')

    guncellenen = 0
    atlanan = 0
    for l in lex:
        if not l.get('id', '').startswith('L-KBD-'):
            continue
        form = l.get('form', '')
        if form in form_tr:
            if 'translations' not in l or not isinstance(l['translations'], dict):
                l['translations'] = {}
            if not l['translations'].get('tr'):
                l['translations']['tr'] = form_tr[form]['tr']
                l['translations']['trSource'] = form_tr[form]['kaynak']
                l['translations']['trVerified'] = False
                guncellenen += 1
            else:
                atlanan += 1

    print(f'Güncellenen: {guncellenen}')
    print(f'Zaten dolu (atlanan): {atlanan}')

    lex_path.write_text(
        json.dumps(lex, ensure_ascii=False, indent=2),
        encoding='utf-8'
    )
    print(f'Yazıldı: {lex_path}')

if __name__ == '__main__':
    main()