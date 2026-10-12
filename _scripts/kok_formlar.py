import json
import re
from pathlib import Path
from collections import defaultdict

# 1) Oku
kbd = json.loads(Path('data/corpus/frequency/lexeme_freq_kbd.json').read_text(encoding='utf-8'))
lex = json.loads(Path('public/data/linguistic/lexemes.json').read_text(encoding='utf-8'))
lex_formlar = {l['form'] for l in lex if l.get('form')}

print(f"KBD frekans: {len(kbd)}")
print(f"Lexemes: {len(lex)}")

# 2) Cekim eklerini cikar
def kok_form(form):
    """Cekim eklerini cikar"""
    # Coklu ekleri sirayla cikar
    ekler = [
        'хэм', 'хэр', 'хэ', 'хэу',  # cogul
        'м', 'р', 'щ', 'кӀэ', 'уэ', 'рэ',  # durum
        'мэ', 'ми', 'ти',  # soru
    ]
    for ek in ekler:
        if form.endswith(ek) and len(form) > len(ek) + 2:
            return form[:-len(ek)]
    return form

# 3) Kok formlara indirge
kokler = defaultdict(lambda: {'toplam': 0, 'formlar': []})
for form, freq in kbd.items():
    kok = kok_form(form)
    kokler[kok]['toplam'] += int(freq)
    kokler[kok]['formlar'].append(form)

print(f"Kok form: {len(kokler)}")

# 4) Eksik kokler
eksik_kokler = {k: v for k, v in kokler.items() if k not in lex_formlar}
print(f"Eksik kok: {len(eksik_kokler)}")

# 5) En yuksek 50 eksik kok
print("\n=== EN YUKSEK 50 EKSIK KOK ===")
sorted_kokler = sorted(eksik_kokler.items(), key=lambda x: -x[1]['toplam'])[:50]
for i, (kok, info) in enumerate(sorted_kokler, 1):
    formlar = ', '.join(info['formlar'][:3])
    print(f"  {i}. {kok}: {info['toplam']} ({formlar})")

# 6) Kaydet
cikti = {
    'toplam_kok': len(kokler),
    'eksik_kok': len(eksik_kokler),
    'ilk_5000': {k: v['toplam'] for k, v in sorted_kokler[:5000]}
}
Path('data/eksik_kokler.json').write_text(json.dumps(cikti, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nKaydedildi: data/eksik_kokler.json")
