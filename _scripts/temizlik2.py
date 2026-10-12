import json
import re
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

print(f"Once: {len(lex)}")

# 1) Hex ID temizle
def is_hex_id(id_str):
    if not id_str:
        return False
    if id_str in ['L-_', 'L-__']:
        return True
    match = re.match(r'^L-([0-9A-F]{6,})$', id_str)
    return bool(match)

temiz = [l for l in lex if not is_hex_id(l.get('id', ''))]
print(f"Hex silinen: {len(lex) - len(temiz)}")

# 2) Duplicate'leri grupla
by_form = {}
for l in temiz:
    form = l.get('form', '')
    if form not in by_form:
        by_form[form] = []
    by_form[form].append(l)

# 3) Her grup icin en iyi kaydi sec
sonuc = []
duplicate_gruplar = []
for form, group in by_form.items():
    if len(group) == 1:
        sonuc.append(group[0])
    else:
        # Skorla
        def skor(l):
            s = 0
            if l.get('conceptId'): s += 10
            if l.get('wordFamilyId'): s += 5
            if l.get('ipa'): s += 3
            if l.get('notes'): s += 2
            if l.get('corpusFrequency', 0) > 0: s += 1
            if l.get('dialectVariants'): s += 1
            return s
        
        best = max(group, key=skor)
        
        # Anlamlari birlestir
        anlamlar = []
        for g in group:
            a = g.get('literalMeaning', '')
            if a and a not in anlamlar:
                anlamlar.append(a)
        
        # En uzun anlami tut, digerlerini ekle
        if anlamlar:
            best['literalMeaning'] = '; '.join(anlamlar[:3])
        
        # Dialect variants birlestir
        dialects = {}
        for g in group:
            if g.get('dialectVariants'):
                dialects.update(g['dialectVariants'])
        if dialects:
            best['dialectVariants'] = dialects
        
        sonuc.append(best)
        duplicate_gruplar.append((form, len(group), group))

print(f"Birlestirilen grup: {len(duplicate_gruplar)}")
print(f"Son: {len(sonuc)}")

# 4) Duplicate gruplari goster
print("\n=== DUPLICATE GRUPLAR ===")
for form, count, group in duplicate_gruplar[:20]:
    print(f"\n{form} ({count} kez):")
    for g in group:
        print(f"  {g['id']}: {g.get('literalMeaning', '?')}")

# 5) Yaz
lex_path.write_text(json.dumps(sonuc, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nToplam: {len(sonuc)}")
