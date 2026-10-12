"""
huvaj_final.py — Huvaj'ı doğru kuralla işle
Kural: sol=Adigece, sağ=Kabardeyce. Tek form=Adigece (veya aynı).
"""

import json
import re
from pathlib import Path

d = json.load(open('public/data/8.Ady-Tur_Huvaj.json', encoding='utf-8'))
w = d.get('words', {})

def tr_cikar(html):
    if not html:
        return ""
    italik = re.findall(r'<i[^>]*>([^<]+)</i>', str(html))
    for i in reversed(italik):
        i = i.strip()
        if 'еплъ' in i.lower() or '<<' in i:
            continue
        if i.isupper() and len(i) > 2:
            return i
        if any(c in i for c in 'ıİğĞüÜşŞöÖçÇâÂ'):
            return i
    return italik[-1].strip() if italik else ""

def temizle(form):
    """Formu temizle: tire, parantez, çoklu boşluk"""
    f = form.lstrip('-').strip()
    f = re.sub(r'\([^)]*\)', '', f).strip()
    f = re.sub(r'\s+', ' ', f).strip()
    return f

def formlari_cikar(spelling):
    """
    Kural:
    - sol / sağ → her ikisini de al (sol Adigece, sağ Kabardeyce)
    - tek form → al
    """
    if not spelling:
        return []
    s = spelling.rstrip('/ ').strip()
    parcalar = [p.strip() for p in s.split('/') if p.strip()]
    formlar = []
    for p in parcalar:
        t = temizle(p)
        if t:
            formlar.append(t)
    return formlar

# form → tr haritası
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
    tr = tr_cikar(html)
    if not tr:
        continue

    for f in formlar:
        if f not in form_tr:
            form_tr[f] = {'tr': tr, 'kaynak': '8.Ady-Tur_Huvaj.json'}

    if len(ornek) < 10:
        ornek.append((spelling, formlar, tr))

print(f'Toplam Huvaj kayit: {len(w)}')
print(f'form_tr harita: {len(form_tr)}')
print()
print('İlk 10 örnek:')
for s, f, t in ornek:
    print(f'  spelling: {repr(s)}')
    print(f'  formlar: {f}')
    print(f'  tr: {repr(t)}')
    print()

Path('huvaj_tr_map3.json').write_text(
    json.dumps(form_tr, ensure_ascii=False, indent=2),
    encoding='utf-8'
)
print('Kaydedildi: huvaj_tr_map3.json')

# L-KBD kapsama
lex = json.load(open('public/data/linguistic/lexemes.json', encoding='utf-8'))
kbd = {l['form'] for l in lex if l.get('id','').startswith('L-KBD-')}
esles = kbd & set(form_tr.keys())
print()
print(f'L-KBD toplam: {len(kbd)}')
print(f'Huvaj ile esles: {len(esles)}')
print(f'Kapsama: {len(esles)/len(kbd)*100:.1f}%')

# Eşleşen ilk 10
print()
print('Eşleşen ilk 10:')
for e in list(esles)[:10]:
    print(f'  {e} → {form_tr[e]["tr"]}')