import json
import re
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

print(f"Once: {len(lex)}")

# 1) Hex ID'leri temizle
def is_hex_id(id_str):
    """L-D0B0... gibi hex ID mi?"""
    if not id_str:
        return False
    if id_str in ['L-_', 'L-__']:
        return True
    # L- sonrasi 6+ hex karakter
    match = re.match(r'^L-([0-9A-F]{6,})$', id_str)
    return bool(match)

hex_silinen = 0
temiz = []
for l in lex:
    if is_hex_id(l.get('id', '')):
        hex_silinen += 1
        continue
    temiz.append(l)

print(f"Hex ID silinen: {hex_silinen}")
print(f"Kalan: {len(temiz)}")

# 2) Duplicate'leri birlestir
by_form = {}
for l in temiz:
    form = l.get('form', '')
    if form not in by_form:
        by_form[form] = []
    by_form[form].append(l)

birlestirilen = 0
temiz2 = []
for form, group in by_form.items():
    if len(group) == 1:
        temiz2.append(group[0])
    else:
        # Birlestir
        # En iyi kayit: en cok alan dolu olan
        best = max(group, key=lambda x: (
            bool(x.get('conceptId')),
            bool(x.get('wordFamilyId')),
            bool(x.get('ipa')),
            bool(x.get('notes')),
            x.get('corpusFrequency', 0)
        ))
        
        # Anlamlari birlestir
        anlamlar = set()
        for g in group:
            if g.get('literalMeaning'):
                anlamlar.add(g['literalMeaning'])
        best['literalMeaning'] = '; '.join(sorted(anlamlar))
        
        # Dialect variants birlestir
        dialects = {}
        for g in group:
            if g.get('dialectVariants'):
                dialects.update(g['dialectVariants'])
        if dialects:
            best['dialectVariants'] = dialects
        
        temiz2.append(best)
        birlestirilen += 1

print(f"Birlestirilen: {birlestirilen}")
print(f"Son: {len(temiz2)}")

# 3) Yaz
lex_path.write_text(json.dumps(temiz2, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nToplam: {len(temiz2)}")
