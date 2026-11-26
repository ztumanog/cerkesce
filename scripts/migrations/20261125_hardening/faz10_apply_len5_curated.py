#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 10 (Kurasyon): morph-len5-review.csv Onayli Kok Baglama
===========================================================
108 aday tek tek incelendi: 35 yanlis pozitif / es-sesli cakisma reddedildi,
73 dogrulanmis kok baglantisi (ve varsa guvenli <=10 koklu WF) lexemes.json'a
yazilir.
"""
import json, csv, shutil, datetime, collections, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
ROOTS_PATH   = pathlib.Path('public/data/linguistic/roots.json')
CSV_PATH     = pathlib.Path('quarantine') / 'morph-len5-review.csv'
BACKUP_DIR   = pathlib.Path('backups') / 'faz10_len5_curated'

REJECT_IDS = {
    'L-BOTANIK-KBD-28005',
    'L-WIKT-KBD-28197',
    'L-WIKT-KBD-28440',
    'L-WIKT-KBD-28441',
    'L-WIKT-KBD-28442',
    'L-KHELECHYGE',
    'L-WIKT-KBD-28528',
    'L-WIKT-KBD-29111',
    'L-WIKT-KBD-29112',
    'L-DYGUASEZHESHCH',
    'L-WIKT-KBD-29128',
    'L-WIKT-KBD-29293',
    'L-T1ET1AGEKHE',
    'L-WIKT-KBD-29601',
    'L-WIKT-KBD-30379',
    'L-WIKT-KBD-30559',
    'L-P1ET1ERAUE',
    'L-ABAZE-P3-007',
    'L-VAGUEKAN',
    'L-ZHYSHCH1EF-2',
    'L-ZERYBGURY1UE',
    'L-KKHUEFEZHEYTS1YK1U',
    'L-KIK1UETYZHYP1E',
    'L-KUENTKHKHYK1UE',
    'L-KUENTKHYN',
    'L-K1ESHCH1USHCHYGENSHE',
    'L-K1ESHCH1USHCHYNSHE',
    'L-K1ESHCH1ETKHEZHA',
    'L-LAKHSTENLYD',
    'L-LESHCH1YKHE',
    'L-FEKHUSU',
    'L-SHCHYGUPSHCHEREY',
    'L-SHCH1YK1AGEZH',
    'L-SHCH1YKHEPSHCH1E',
    'L-KHEKASHYRYDZHEGU',
    'L-GUEBESHYKHEM',
    'L-MYSYRYBDZ',
    'L-SHYUANKUEPS',
}

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)
with open(ROOTS_PATH, encoding='utf-8') as f:
    roots = json.load(f)
with open(CSV_PATH, encoding='utf-8-sig') as f:
    candidates = list(csv.DictReader(f))

BACKUP_DIR.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
backup_path = BACKUP_DIR / f'lexemes_before_len5_{ts}.json'
shutil.copy2(LEXEMES_PATH, backup_path)

# Guvenli WF haritasi (<=10 koklu WF'ler)
wf_roots = collections.defaultdict(set)
for x in lex:
    if x.get('wordFamilyId') and x.get('rootIds'):
        wf_roots[x['wordFamilyId']].update(x['rootIds'])
safe_wfs = {wfid for wfid, rset in wf_roots.items() if 1 <= len(rset) <= 10}

root_to_safe_wf = {}
for r in roots:
    wfid = (r.get('wordFamily') or {}).get('id')
    if wfid and wfid in safe_wfs:
        root_to_safe_wf[r['id']] = wfid

approved_map = {
    row['id']: row['candidateRootId']
    for row in candidates
    if row['id'] not in REJECT_IDS
}

applied_root = 0
applied_wf = 0
for x in lex:
    rid = approved_map.get(x['id'])
    if not rid or x.get('rootId') or x.get('rootIds'):
        continue
    x['rootIds'] = [rid]
    x['rootId'] = rid
    applied_root += 1
    if not x.get('wordFamilyId') and rid in root_to_safe_wf:
        x['wordFamilyId'] = root_to_safe_wf[rid]
        applied_wf += 1

tmp = LEXEMES_PATH.with_suffix('.json.tmp')
with open(tmp, 'w', encoding='utf-8') as f:
    json.dump(lex, f, ensure_ascii=False, separators=(',', ':'))
tmp.replace(LEXEMES_PATH)

print("=== FAZ 10 LEN-5 KURASYON TAMAMLANDI ===")
print(f"Yedek                      : {backup_path}")
print(f"Incelenen / Reddedilen     : {len(candidates)} / {len(candidates) - len(approved_map)}")
print(f"Baglanan kok               : {applied_root}")
print(f"Bunlardan WF de baglanan   : {applied_wf}")
