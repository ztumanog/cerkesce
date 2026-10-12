import json
import re
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

print(f"Once: {len(lex)}")

# DOGRU hex ID kontrolu - SADECE tam hex
def is_hex_id(id_str):
    """Sadece L-D0B0D0B1D18B gibi TAM hex ID'ler"""
    if not id_str:
        return False
    if not id_str.startswith('L-'):
        return False
    suffix = id_str[2:]
    # Sadece hex karakterler (0-9, A-F)
    if not all(c in '0123456789ABCDEF' for c in suffix):
        return False
    # 10+ karakter
    if len(suffix) < 10:
        return False
    return True

# Test
test_ids = ['L-D0B0D0B1D18B', 'L-DYGHUZH', 'L-AKHER', 'L-GUF1E']
print("\n=== TEST ===")
for tid in test_ids:
    print(f"  {tid}: {is_hex_id(tid)}")

# Sil
hex_silinen = 0
temiz = []
for l in lex:
    id_str = l.get('id', '')
    if is_hex_id(id_str):
        hex_silinen += 1
        continue
    temiz.append(l)

print(f"\nHex ID silinen: {hex_silinen}")
print(f"Kalan: {len(temiz)}")

# Duplicate birlestir
by_form = {}
for l in temiz:
    form = l.get('form', '')
    if form not in by_form:
        by_form[form] = []
    by_form[form].append(l)

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
            if re.match(r'^L-[A-Z0-9-]{2,20}$', l.get('id', '')): s += 10
            return s
        
        best = max(group, key=skor)
        
        anlamlar = []
        for g in group:
            a = g.get('literalMeaning', '')
            if a and a not in anlamlar:
                anlamlar.append(a)
        if anlamlar:
            best['literalMeaning'] = '; '.join(anlamlar[:2])
        
        dialects = {}
        for g in group:
            if g.get('dialectVariants'):
                dialects.update(g['dialectVariants'])
        if dialects:
            best['dialectVariants'] = dialects
        
        sonuc.append(best)

print(f"\nSon: {len(sonuc)}")
lex_path.write_text(json.dumps(sonuc, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Toplam: {len(sonuc)}")
