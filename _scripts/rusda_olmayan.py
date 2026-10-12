import json
from pathlib import Path

lex = json.load(open('public/data/linguistic/lexemes.json', encoding='utf-8'))
kbd = [l for l in lex if l.get('id','').startswith('L-KBD-')]

# Rusça karşılıklar — alan adı 'ru'
ru_data = json.load(open('lkbd-ru-glosses.json', encoding='utf-8'))
ru_olan = {k for k, v in ru_data.items() if v.get('ru')}

# Türkçe adaylar — lexemes.tr-candidates.json
tr_path = Path('lexemes.tr-candidates.json')
tr_olan = set()
if tr_path.exists():
    tr_data = json.load(open(tr_path, encoding='utf-8'))
    tr_olan = {k for k, v in tr_data.items() if v}

# Kategoriler
kbd_ids = {l['id'] for l in kbd}
ikisi = ru_olan & tr_olan
sadece_ru = ru_olan - tr_olan
sadece_tr = tr_olan - ru_olan
hicbiri = kbd_ids - ru_olan - tr_olan

print(f'Toplam L-KBD: {len(kbd)}')
print(f'Rusça var: {len(ru_olan)}')
print(f'Türkçe var: {len(tr_olan)}')
print(f'İkisi de: {len(ikisi)}')
print(f'Sadece Rusça: {len(sadece_ru)}')
print(f'Sadece Türkçe: {len(sadece_tr)}')
print(f'Hiçbiri: {len(hicbiri)}')
print()

# Hiçbiri olanları yaz
out = []
for l in kbd:
    if l['id'] in hicbiri:
        out.append({
            'id': l['id'],
            'form': l['form'],
            'literalMeaning': l.get('literalMeaning', ''),
            'partOfSpeech': l.get('partOfSpeech', ''),
        })

Path('koksuz.json').write_text(
    json.dumps(out, ensure_ascii=False, indent=2),
    encoding='utf-8'
)
print(f'Yazildi: koksuz.json ({len(out)} kayit)')
print()
print('İlk 20:')
for l in out[:20]:
    print(f'  {l["id"]:15s} {l["form"]}')