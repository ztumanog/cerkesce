"""
tur_kok_tara.py — L-KBD formlarını kök ayırıp Türkçe sözlüklerde tara
Sadece RAPOR üretir, lexemes.json'a DOKUNMAZ.
"""

import json
import re
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

# Kabardeyce ekler (basit liste)
ONEKLER = ['Ӏу', 'Ӏуэ', 'къы', 'зэ', 'зды', 'щы', 'пы', 'те', 'ды', 'и', 'е']
SONEKLER = ['кӀын', 'кӀыжын', 'ын', 'эн', 'жын', 'щ', 'р', 'м', 'уэ', 'э']

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
        temiz = re.sub(r'<[^>]+>', ' ', str(html))
        temiz = re.sub(r'\s+', ' ', temiz).strip()
        return temiz[:150]
    return ""

def kok_adaylari(form):
    """Bir formdan olası kökleri üret"""
    adaylar = set()
    adaylar.add(form)

    # 1. Önek at
    for onek in ONEKLER:
        if form.startswith(onek) and len(form) > len(onek) + 1:
            kalan = form[len(onek):]
            adaylar.add(kalan)
            # Önek + sonek at
            for sonek in SONEKLER:
                if kalan.endswith(sonek) and len(kalan) > len(sonek):
                    adaylar.add(kalan[:-len(sonek)])

    # 2. Sonek at
    for sonek in SONEKLER:
        if form.endswith(sonek) and len(form) > len(sonek):
            adaylar.add(form[:-len(sonek)])

    # 3. Önek + sonek at
    for onek in ONEKLER:
        if form.startswith(onek) and len(form) > len(onek) + 1:
            kalan = form[len(onek):]
            for sonek in SONEKLER:
                if kalan.endswith(sonek) and len(kalan) > len(sonek):
                    adaylar.add(kalan[:-len(sonek)])

    # 4. Tek karakter kısaltma (her aday için)
    ek = set()
    for a in adaylar:
        if len(a) > 4:
            ek.add(a[:-1])
            ek.add(a[:-2])
    adaylar.update(ek)

    return adaylar

def main():
    # Türkçe harita
    form_tr = {}
    for fname in TUR_SOZLUKLER:
        f = Path('public/data') / fname
        if not f.exists():
            continue
        d = json.load(open(f, encoding='utf-8'))
        w = d.get('words', {})
        for form, data in w.items():
            anlam = anlam_cikar(data)
            if anlam and form not in form_tr:
                form_tr[form] = {'tr': anlam, 'kaynak': fname}

    print(f'Türkçe sözlük kelime: {len(form_tr)}')

    # L-KBD kayıtları
    lex = json.load(open('public/data/linguistic/lexemes.json', encoding='utf-8'))
    kbd = [l for l in lex if l.get('id', '').startswith('L-KBD-')]
    print(f'L-KBD toplam: {len(kbd)}')
    print('=' * 70)

    # Tarama
    bulunan = 0
    bulunan_kok = 0
    bulunamayan = 0
    ornek_bulunan = []
    ornek_kok = []
    ornek_yok = []

    for l in kbd:
        form = l['form']

        # Birebir
        if form in form_tr:
            bulunan += 1
            if len(ornek_bulunan) < 10:
                ornek_bulunan.append((form, form_tr[form]['tr'], 'birebir'))
            continue

        # Kök adayları
        adaylar = kok_adaylari(form)
        bulundu = False
        for a in adaylar:
            if a in form_tr and a != form:
                bulunan_kok += 1
                if len(ornek_kok) < 10:
                    ornek_kok.append((form, a, form_tr[a]['tr']))
                bulundu = True
                break
        if not bulundu:
            bulunamayan += 1
            if len(ornek_yok) < 10:
                ornek_yok.append(form)

    print(f'Birebir bulunan: {bulunan}')
    print(f'Kök ile bulunan: {bulunan_kok}')
    print(f'Bulunamayan: {bulunamayan}')
    print(f'Toplam kapsama: {(bulunan+bulunan_kok)/len(kbd)*100:.1f}%')
    print()

    print('Birebir örnekler:')
    for form, tr, tip in ornek_bulunan:
        print(f'  {form:20s} → {tr[:50]}')

    print()
    print('Kök ile örnekler:')
    for form, kok, tr in ornek_kok:
        print(f'  {form:20s} → kök: {kok:15s} → {tr[:50]}')

    print()
    print('Bulunamayan örnekler:')
    for form in ornek_yok:
        print(f'  {form}')

if __name__ == '__main__':
    main()