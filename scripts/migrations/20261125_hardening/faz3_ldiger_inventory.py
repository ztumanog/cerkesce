#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 3: L-diger Alt-Havuz Envanteri (Salt Okunur)
================================================
22,542 L-diger kaydini 3 alt havuza ayirir ve ldiger-breakdown.csv uretir:
  1) kaynak_prefixli : ID'si bilinen kaynak prefix'i tasiyan (L-WIKI-, L-AMALTUS-, vb.)
  2) morfolojik_kaynaksiz : Semantik/morfolojik ID + source/sources bos
  3) morfolojik_kaynakli  : Semantik/morfolojik ID + source/sources dolu
"""
import json, csv, collections, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
OUT_CSV      = pathlib.Path('ldiger-breakdown.csv')

KNOWN_MAIN_PREFIXES = ['KBD', 'VERIFIED', 'AUTO', 'WIKT', 'BITKI', 'ABAZE', 'NAT', 'PROMPT', 'BOTANIK']
SOURCE_PREFIX_TOKENS = {'WIKI', 'AMALTUS', 'CEFR', 'ADY', 'LATIN', 'ZHAN', 'DICT', 'CORPUS'}

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)

ldiger = [
    x for x in lex
    if x['id'].startswith('L-') and not any(k in x['id'] for k in KNOWN_MAIN_PREFIXES)
]

buckets = collections.Counter()
subgroups = collections.Counter()
rows = []

for x in ldiger:
    xid = x['id']
    parts = xid.split('-')
    second = parts[1].upper() if len(parts) >= 2 else ''
    has_src = bool(x.get('sources') or x.get('source') or x.get('dictionaryEvidence'))

    if second in SOURCE_PREFIX_TOKENS:
        bucket = '1_kaynak_prefixli'
        sub = f'L-{second}-*'
    elif has_src:
        bucket = '3_morfolojik_kaynakli'
        sub = 'semantic_with_source'
    else:
        bucket = '2_morfolojik_kaynaksiz'
        sub = 'semantic_no_source'

    buckets[bucket] += 1
    subgroups[(bucket, sub, x.get('dialect', ''))] += 1

for (bucket, sub, dialect), cnt in sorted(subgroups.items()):
    rows.append({'havuz': bucket, 'alt_grup': sub, 'dialect': dialect, 'kayit_sayisi': cnt})

with open(OUT_CSV, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=['havuz', 'alt_grup', 'dialect', 'kayit_sayisi'])
    w.writeheader()
    w.writerows(rows)

print("=== FAZ 3 TAMAMLANDI (Salt Okunur) ===")
print(f"Toplam L-diger: {len(ldiger)}")
for b, c in sorted(buckets.items()):
    print(f"  {b:25s}: {c:6d} (%{100*c/len(ldiger):.1f})")
print(f"Rapor yazildi -> {OUT_CSV}")
