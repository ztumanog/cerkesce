import json
import re
from pathlib import Path

d = json.load(open('public/data/8.Ady-Tur_Huvaj.json', encoding='utf-8'))
w = d.get('words', {})

print(f'Toplam kelime: {len(w)}')
print()

# 1. '/' içeren
slash = [k for k in w.keys() if '/' in k]
print(f'1. Slash iceren: {len(slash)}')
for k in slash[:5]:
    print(f'   {repr(k)}')

# 2. 'abz' içeren (key'de)
abz_key = [k for k in w.keys() if 'abz' in k.lower()]
print(f'\n2. Key\'de abz: {len(abz_key)}')
for k in abz_key[:5]:
    print(f'   {repr(k)}')

# 3. 'abz' HTML'de
abz_html = []
for k, v in w.items():
    html = str(v.get('full_definition_in_html', ''))
    if 'abz' in html.lower():
        abz_html.append(k)
print(f'\n3. HTML\'de abz: {len(abz_html)}')
for k in abz_html[:5]:
    print(f'   {repr(k)}')

# 4. 'abz' definitions içinde
abz_def = []
for k, v in w.items():
    defs = v.get('definitions', [])
    if isinstance(defs, list):
        for de in defs:
            if isinstance(de, dict):
                m = str(de.get('meaning', ''))
                if 'abz' in m.lower():
                    abz_def.append(k)
                    break
print(f'\n4. definitions\'da abz: {len(abz_def)}')
for k in abz_def[:5]:
    print(f'   {repr(k)}')

# 5. Örnek bir kaydın tam yapısı (slash içeren)
print('\n5. Slash örnek yapı:')
for k in slash[:2]:
    print(f'--- {repr(k)}')
    print(json.dumps(w[k], ensure_ascii=False, indent=2)[:700])

# 6. Slash olmayan örnek
print('\n6. Slash olmayan örnek:')
k = list(w.keys())[0]
print(f'--- {repr(k)}')
print(json.dumps(w[k], ensure_ascii=False, indent=2)[:700])