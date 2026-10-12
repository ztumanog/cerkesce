"""
huvaj_duzelt.py — Huvaj'ı doğru yapıya çevir
Çıktı: huvaj_tr_map.json — form → tr haritası
"""

import json
import re
from pathlib import Path

d = json.load(open('public/data/8.Ady-Tur_Huvaj.json', encoding='utf-8'))
w = d.get('words', {})

def tr_anlam_cikar(html):
    """HTML'den Türkçe anlamı çıkar (son <i>...</i>)"""
    if not html:
        return ""
    # Tüm <i>...</i>'leri bul
    italik = re.findall(r'<i[^>]*>([^<]+)</i>', str(html))
    if not italik:
        return ""
    # Sonuncuyu al (genelde Türkçe anlam)
    for i in reversed(italik):
        i = i.strip()
        # еплъ (bakınız) ve <<...>> olanları atla
        if 'еплъ' in i.lower() or '<<' in i or '>>' in i:
            continue
        # Türkçe büyük harf (MİKTAR, RENK, vb.)
        if i.isupper() and len(i) > 2:
            return i
        # Türkçe kelime (küçük harf ama Türkçe karakter)
        if any(c in i for c in 'ıİğĞüÜşŞöÖçÇâÂ'):
            return i
    # Bulamadıysa son italik
    return italik[-1].strip() if italik else ""

def formlari_cikar(spelling):
    """Spelling'den form listesi çıkar"""
    if not spelling:
        return []
    # Sondaki / temizle
    s = spelling.rstrip('/ ').strip()
    # / ile ayır
    parcalar = [p.strip() for p in s.split('/') if p.strip()]
    # Parantez temizle
    temiz = []
    for p in parcalar:
        t = re.sub(r'\([^)]*\)', '', p).strip()
        if t:
            temiz.append(t)
    return temiz

# Tarama
form_tr = {}
ornek = []

for key, data in w.items():
    spelling = data.get('spelling', '')
    if not spelling:
        continue

    formlar = formlari_cikar(spelling)
    if not formlar:
        continue

    html = data.get('full_definition_in_html', '')
    tr = tr_anlam_cikar(html)

    if not tr:
        continue

    for f in formlar:
        if f not in form_tr:
            form_tr[f] = {'tr': tr, 'kaynak': '8.Ady-Tur_Huvaj.json'}

    if len(ornek) < 10:
        ornek.append((spelling, formlar, tr))

print(f'Toplam Huvaj kayit: {len(w)}')
print(f'Türkçe harita: {len(form_tr)} form')
print()

print('İlk 10 örnek:')
for s, f, t in ornek:
    print(f'  spelling: {repr(s)}')
    print(f'  formlar: {f}')
    print(f'  tr: {repr(t)}')
    print()

# Kaydet
Path('huvaj_tr_map.json').write_text(
    json.dumps(form_tr, ensure_ascii=False, indent=2),
    encoding='utf-8'
)
print('Kaydedildi: huvaj_tr_map.json')

# L-KBD kapsama testi
lex = json.load(open('public/data/linguistic/lexemes.json', encoding='utf-8'))
kbd = {l['form'] for l in lex if l.get('id','').startswith('L-KBD-')}
esles = kbd & set(form_tr.keys())
print()
print(f'L-KBD toplam: {len(kbd)}')
print(f'Huvaj ile esles: {len(esles)}')
print(f'Kapsama: {len(esles)/len(kbd)*100:.1f}%')