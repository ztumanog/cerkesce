#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 2: rootId = rootIds[0] Migrasyonu (690 bos + 1 tutarsiz L-K-YRYK)
=====================================================================
rootIds[] kanonik alan kabul edilir. src/ halen rootId okudugu icin
rootId = rootIds[0] olarak senkronize edilir.
"""
import json, shutil, datetime, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
BACKUP_DIR   = pathlib.Path('backups') / 'faz2_rootid_sync'

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)

BACKUP_DIR.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
backup_path = BACKUP_DIR / f'lexemes_before_faz2_{ts}.json'
shutil.copy2(LEXEMES_PATH, backup_path)

filled = 0
fixed_mismatch = []

for x in lex:
    rids = x.get('rootIds') or []
    if not rids:
        continue
    primary = rids[0]
    cur = x.get('rootId')
    if not cur:
        x['rootId'] = primary
        filled += 1
    elif cur != primary:
        fixed_mismatch.append((x['id'], cur, primary))
        x['rootId'] = primary

tmp_path = LEXEMES_PATH.with_suffix('.json.tmp')
with open(tmp_path, 'w', encoding='utf-8') as f:
    json.dump(lex, f, ensure_ascii=False, separators=(',', ':'))
tmp_path.replace(LEXEMES_PATH)

rem_bos = sum(1 for x in lex if not x.get('rootId') and x.get('rootIds'))
rem_mis = sum(1 for x in lex if x.get('rootId') and x.get('rootIds') and x['rootId'] != x['rootIds'][0])

print("=== FAZ 2 TAMAMLANDI ===")
print(f"Yedek                         : {backup_path}")
print(f"Bos rootId doldurulan         : {filled}")
print(f"Tutarsiz rootId duzeltilen    : {len(fixed_mismatch)} {fixed_mismatch}")
print(f"Kalan (rootId bos & rootIds)  : {rem_bos}")
print(f"Kalan tutarsizlik             : {rem_mis}")
