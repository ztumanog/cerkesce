import json
import re
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

print(f"Once: {len(lex)}")

# 1) SADECE hex ID'leri sil (L-D0B0... gibi)
def is_hex_id(id_str):
    """Sadece L-D0B0D0B1D18B gibi hex ID'ler"""
    if not id_str:
        return False
    # L- sonrasi 10+ hex karakter
    match = re.match(r'^L-([0-9A-F]{10,})$', id_str)
    return bool(match)

hex_silinen = 0
temiz = []
for l in lex:
    id_str = l.get('id', '')
    if is_hex_id(id_str):
        hex_silinen += 1
        print(f"  Silindi: {id_str} -> {l.get('form', '?')}")
        continue
    temiz.append(l)

print(f"\nHex ID silinen: {hex_silinen}")
print(f"Kalan: {len(temiz)}")

# 2) Duplicate formlari birlestir
by_form = {}
for l in temiz:
    form = l.get('form', '')
    if form not in by_form:
        by_form[form] = []
    by_form[form].append(l)

print(f"\nFarkli form: {len(by_form)}")

duplicate_gruplar = [(f, g) for f, g in by_form.items() if len(g) > 1]
print(f"Duplicate grup: {len(duplicate_gruplar)}")

# 3) Her grup icin en iyi kaydi sec
sonuc = []
for form, group in by_form.items():
    if len(group) == 1:
        sonuc.append(group[0])
    else:
        def skor(l):
            s = 0
            if l.get('conceptId'): s += 100
            if l.get('wordFamilyId') and not l['wordFamilyId'].startswith('WF-L-'): s += 50
            if l.get('ipa'): s += 30
            if l.get('notes'): s += 20
            if l.get('dialectVariants'): s += 10
            if l.get('corpusFrequency', 0) > 0: s += 5
            # ID formati (L-XXX kisa)
            if re.match(r'^L-[A-Z0-9-]{2,20}$', l.get('id', '')): s += 10
            return s
        
        best = max(group, key=skor)
        
        # Anlamlari birlestir
        anlamlar = []
        for g in group:
            a = g.get('literalMeaning', '')
            if a and a not in anlamlar:
                anlamlar.append(a)
        if anlamlar:
            best['literalMeaning'] = '; '.join(anlamlar[:2])
        
        # Dialect variants
        dialects = {}
        for g in group:
            if g.get('dialectVariants'):
                dialects.update(g['dialectVariants'])
        if dialects:
            best['dialectVariants'] = dialects
        
        sonuc.append(best)

print(f"\nSon: {len(sonuc)}")

# 4) Duplicate gruplari goster (ilk 10)
print("\n=== DUPLICATE GRUPLAR (ilk 10) ===")
for form, group in duplicate_gruplar[:10]:
    print(f"\n{form} ({len(group)} kez):")
    for g in group:
        print(f"  {g['id']}: {g.get('literalMeaning', '?')[:50]}")

# 5) Yaz
lex_path.write_text(json.dumps(sonuc, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nToplam: {len(sonuc)}")
