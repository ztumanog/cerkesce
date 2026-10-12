import json
from pathlib import Path

koksuz = json.load(open('koksuz.json', encoding='utf-8'))
print(f'Toplam koksuz: {len(koksuz)}')

# Rusça tanımları da yükle
ru_data = json.load(open('lkbd-ru-glosses.json', encoding='utf-8'))

# İlk 75
ilk_75 = koksuz[:75]

cikti = []
for k in ilk_75:
    id_ = k['id']
    form = k['form']
    ru = ru_data.get(id_, {}).get('ru', [])
    cikti.append({
        'id': id_,
        'form': form,
        'ru': ru[:5] if ru else [],
    })

Path('parti_01.json').write_text(
    json.dumps(cikti, ensure_ascii=False, indent=2),
    encoding='utf-8'
)
print(f'Yazildi: parti_01.json ({len(cikti)} kayit)')

# İlk 5 örnek
print()
print('İlk 5:')
for c in cikti[:5]:
    print(f'  {c["id"]}: {c["form"]}')
    print(f'    RU: {c["ru"]}')