#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 10 (WF Cozumu): Primary Root WF + Agirlikli Oylama (>=80%, n>=3)
====================================================================
wordFamilyId bos ama rootId dolu (324 kayit) icinde:
  1) roots.json[rootId].wordFamily.id dolu ise -> direkt ata (89 kayit)
  2) Degilse rootId bazli agirlikli WF oylamasi >=%80 ve n>=3 -> ata (139 kayit)
  3) Kalan 96 kaydi guncel wf-candidates-review.csv olarak raporla.
"""
import json, csv, shutil, datetime, collections, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
ROOTS_PATH   = pathlib.Path('public/data/linguistic/roots.json')
BACKUP_DIR   = pathlib.Path('backups') / 'faz10_wf_weighted'
OUT_REVIEW   = pathlib.Path('wf-candidates-review.csv')

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)
with open(ROOTS_PATH, encoding='utf-8') as f:
    roots = json.load(f)

BACKUP_DIR.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
backup_path = BACKUP_DIR / f'lexemes_before_wf_weighted_{ts}.json'
shutil.copy2(LEXEMES_PATH, backup_path)

root_map = {r['id']: r for r in roots}

root_wf_votes = collections.defaultdict(collections.Counter)
for x in lex:
    wf = x.get('wordFamilyId')
    rid = x.get('rootId')
    if wf and rid:
        root_wf_votes[rid][wf] += 1

by_own = 0
by_vote = 0
remaining = []

for x in lex:
    if x.get('wordFamilyId') or not x.get('rootId'):
        continue
    rid = x['rootId']

    # 1) roots.json own wordFamily.id
    own_wf = (root_map.get(rid, {}).get('wordFamily') or {}).get('id')
    if own_wf:
        x['wordFamilyId'] = own_wf
        by_own += 1
        continue

    # 2) Weighted vote >= 80% and total >= 3
    votes = root_wf_votes.get(rid)
    if votes:
        top_wf, top_cnt = votes.most_common(1)[0]
        total = sum(votes.values())
        if top_cnt / total >= 0.8 and total >= 3:
            x['wordFamilyId'] = top_wf
            by_vote += 1
            continue

    top_str = ','.join(f'{w}:{c}' for w, c in (votes.most_common(3) if votes else []))
    remaining.append({
        'id': x['id'],
        'form': x.get('form', ''),
        'rootId': rid,
        'topVotes': top_str,
        'meaning': (x.get('meaning') or '')[:60],
    })

with open(OUT_REVIEW, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=['id', 'form', 'rootId', 'topVotes', 'meaning'])
    w.writeheader()
    w.writerows(remaining)

tmp = LEXEMES_PATH.with_suffix('.json.tmp')
with open(tmp, 'w', encoding='utf-8') as f:
    json.dump(lex, f, ensure_ascii=False, separators=(',', ':'))
tmp.replace(LEXEMES_PATH)

print("=== FAZ 10 WF COZUMU TAMAMLANDI ===")
print(f"Yedek                              : {backup_path}")
print(f"roots.json[rootId].wordFamily.id   : {by_own}")
print(f"Agirlikli oylama (>=%80, n>=3)     : {by_vote}")
print(f"Toplam doldurulan wordFamilyId     : {by_own + by_vote}")
print(f"Kalan inceleme                     : {len(remaining)} -> {OUT_REVIEW}")
