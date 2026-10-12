import json
from pathlib import Path

# Türkçe sözlükler
tur_sozlukler = [
    '8.Ady-Tur_Huvaj.json',
    '21.Kbd-Tu-Jonty.json',
    '26.Tu-Kbd-Jonty.json',
    '27.Tur-Ady_Abaze.json',
    '28.Tur-Ady_Huvaj.json',
    '29.Tur-Ady_Teshu.json',
    '31.Tu-Ady_Hilmi.json',
]

print("=" * 70)
print("TURKCE SOZLUKLER")
print("=" * 70)

toplam_kelime = 0
for fname in tur_sozlukler:
    f = Path('public/data') / fname
    if not f.exists():
        print(f'{fname:35s} YOK')
        continue
    d = json.load(open(f, encoding='utf-8'))
    w = d.get('words', {})
    print(f'{fname:35s} {len(w):6d}')
    toplam_kelime += len(w)

print(f'{"TOPLAM":35s} {toplam_kelime:6d}')

print()
print("=" * 70)
print("L-KBD KAPSAMA")
print("=" * 70)

lex = json.load(open('public/data/linguistic/lexemes.json', encoding='utf-8'))
kbd = {l['form'] for l in lex if l.get('id','').startswith('L-KBD-')}
print(f'L-KBD toplam: {len(kbd)}')

# Türkçe sözlüklerden
tur_esles = set()
for fname in tur_sozlukler:
    f = Path('public/data') / fname
    if not f.exists():
        continue
    d = json.load(open(f, encoding='utf-8'))
    w = d.get('words', {})
    tur_esles.update({k for k in w.keys() if k in kbd})

print(f'Türkçe sözlüklerden eşleşen: {len(tur_esles)}')
print(f'Kapsama: {len(tur_esles)/len(kbd)*100:.1f}%')

# 18.Kbd-Ru&En
ap18 = json.load(open('public/data/18.Kbd-Ru&En.json', encoding='utf-8')).get('words', {})
ap18_set = set(ap18.keys())
print()
print(f'18.Kbd-Ru&En toplam: {len(ap18_set)}')
print(f'L-KBD ∩ 18.Kbd-Ru&En: {len(kbd & ap18_set)}')
print(f'Kapsama: {len(kbd & ap18_set)/len(kbd)*100:.1f}%')

# 1.Ady-Ady_AP
ap1 = json.load(open('public/data/1.Ady-Ady_AP.json', encoding='utf-8')).get('words', {})
ap1_set = set(ap1.keys())
print()
print(f'1.Ady-Ady_AP toplam: {len(ap1_set)}')
print(f'L-KBD ∩ 1.Ady-Ady_AP: {len(kbd & ap1_set)}')
print(f'Kapsama: {len(kbd & ap1_set)/len(kbd)*100:.1f}%')