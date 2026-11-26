#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 5: Semsiye WF Filtreleme (<=10 kok) + Guvenli WF Tahmini
============================================================
1. wordFamilyId -> unique rootIds sayisini hesaplar; >10 kok iceren semsiye WF'leri dislar.
2. wordFamilyId bos ama rootIds dolu (421 kayit) icinde:
   - Sadece TEK guvenli WF adayi cikanlari (132 kayit) otomatik doldurur.
   - Cok adayli (261) ve eslesmeyen (28) kayitlari `wf-candidates-review.csv` olarak raporlar.
"""
import json, csv, shutil, datetime, collections, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
BACKUP_DIR   = pathlib.Path('backups') / 'faz5_wf_infer'
OUT_REVIEW   = pathlib.Path('wf-candidates-review.csv')
UMBRELLA_MAX_ROOTS = 10

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)

BACKUP_DIR.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
backup_path = BACKUP_DIR / f'lexemes_before_faz5_{ts}.json'
shutil.copy2(LEXEMES_PATH, backup_path)

# 1. WF -> kok sayisi
wf_roots = collections.defaultdict(set)
for x in lex:
    if x.get('wordFamilyId') and x.get('rootIds'):
        wf_roots[x['wordFamilyId']].update(x['rootIds'])

safe_wfs = {wfid for wfid, rset in wf_roots.items() if 1 <= len(rset) <= UMBRELLA_MAX_ROOTS}
umbrella_wfs = {wfid for wfid, rset in wf_roots.items() if len(rset) > UMBRELLA_MAX_ROOTS}

# 2. rootId -> safe WF'ler
root_to_safe_wfs = collections.defaultdict(set)
for x in lex:
    wf = x.get('wordFamilyId')
    if wf in safe_wfs and x.get('rootIds'):
        for rid in x['rootIds']:
            root_to_safe_wfs[rid].add(wf)

filled = 0
review_rows = []
ambiguous = 0
unmatched = 0

for x in lex:
    if x.get('wordFamilyId') or not x.get('rootIds'):
        continue
    candidates = set()
    for rid in x['rootIds']:
        candidates.update(root_to_safe_wfs.get(rid, set()))

    if len(candidates) == 1:
        x['wordFamilyId'] = next(iter(candidates))
        filled += 1
    else:
        status = 'ambiguous' if len(candidates) > 1 else 'unmatched'
        if status == 'ambiguous':
            ambiguous += 1
        else:
            unmatched += 1
        review_rows.append({
            'id': x['id'],
            'form': x.get('form', ''),
            'rootIds': ','.join(x.get('rootIds', [])),
            'status': status,
            'wfCandidates': ','.join(sorted(candidates)),
            'meaning': (x.get('meaning') or '')[:60],
        })

with open(OUT_REVIEW, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=['id', 'form', 'rootIds', 'status', 'wfCandidates', 'meaning'])
    w.writeheader()
    w.writerows(review_rows)

tmp_path = LEXEMES_PATH.with_suffix('.json.tmp')
with open(tmp_path, 'w', encoding='utf-8') as f:
    json.dump(lex, f, ensure_ascii=False, separators=(',', ':'))
tmp_path.replace(LEXEMES_PATH)

print("=== FAZ 5 TAMAMLANDI ===")
print(f"Yedek                              : {backup_path}")
print(f"Guvenli WF (<=10 kok) / Semsiye WF : {len(safe_wfs)} / {len(umbrella_wfs)}")
print(f"Otomatik doldurulan wordFamilyId   : {filled}")
print(f"Cok adayli (manuel inceleme)       : {ambiguous}")
print(f"Eslesmeyen                         : {unmatched}")
print(f"Inceleme raporu                    : {OUT_REVIEW}")
