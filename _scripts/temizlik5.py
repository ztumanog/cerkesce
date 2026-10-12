import json
import re
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

print(f"Once: {len(lex)}")

def is_hex_id(id_str):
    """Sadece L-D0B0D0B1D18B gibi TAM hex ID'ler"""
    if not id_str or not id_str.startswith('L-'):
        return False
    suffix = id_str[2:]
    if not all(c in '0123456789ABCDEF' for c in suffix):
        return False
    return len(suffix) >= 10

# 1) Form gruplari
formlar = {}
for l in lex:
    form = l.get('form', '')
    if form not in formlar:
        formlar[form] = []
    formlar[form].append(l)

# 2) SADECE duplicate hex'leri sil
silinen = 0
temiz = []
for l in lex:
    id_str = l.get('id', '')
    form = l.get('form', '')
    
    if is_hex_id(id_str):
        # Ayni formda baska ID var mi?
        ayni_form = [x for x in formlar.get(form, []) if x.get('id') != id_str]
        if len(ayni_form) > 0:
            # Duplicate - sil
            silinen += 1
            print(f"  Silindi (duplicate): {id_str} -> {form}")
            continue
    
    temiz.append(l)

print(f"\nSilinen: {silinen}")
print(f"Kalan: {len(temiz)}")

# 3) Duplicate formlari birlestir (kalanlar)
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
            if not is_hex_id(l.get('id', '')): s += 20
            return s
        
        best = max(group, key=skor)
        
        anlamlar = []
        for g in group:
            a = g.get('literalMeaning', '')
            if a and a not in anlamlar:
                anlamlar.append(a)
        if anlamlar:
            best['literalMeaning'] = '; '.join(anlamlar[:2])
        
        sonuc.append(best)

print(f"\nSon: {len(sonuc)}")

# 4) Yaz
lex_path.write_text(json.dumps(sonuc, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Toplam: {len(sonuc)}")
