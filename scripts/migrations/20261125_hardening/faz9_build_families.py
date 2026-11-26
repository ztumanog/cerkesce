#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 9A: Canonical families.json Olusturma
=========================================
lexemes.json, roots.json ve docs/linguistics/word-families/word-family-shhye.json
verilerini tek bir kanonik `public/data/linguistic/families.json` indeksinde
birlestirir. Gercek kelime ailelerini (root-family, <=10 kok) ve semsiye
kategorileri (umbrella, >10 kok) acikca ayirir.
"""
import json, collections, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
ROOTS_PATH   = pathlib.Path('public/data/linguistic/roots.json')
SHHYE_PATH   = pathlib.Path('docs/linguistics/word-families/word-family-shhye.json')
OUT_PATH     = pathlib.Path('public/data/linguistic/families.json')

UMBRELLA_THRESHOLD = 10

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)
with open(ROOTS_PATH, encoding='utf-8') as f:
    roots = json.load(f)

# Optional cluster enrichment from word-family-shhye.json
shhye_clusters = {}
if SHHYE_PATH.exists():
    with open(SHHYE_PATH, encoding='utf-8') as f:
        for item in json.load(f):
            w = (item.get('word') or '').strip()
            c = (item.get('cluster') or '').strip()
            if w and c:
                shhye_clusters[w] = c

fam_lexemes = collections.defaultdict(list)
fam_roots   = collections.defaultdict(set)
fam_dialects = collections.defaultdict(collections.Counter)
fam_freq    = collections.defaultdict(int)
fam_clusters = collections.defaultdict(dict)

for r in roots:
    wfid = (r.get('wordFamily') or {}).get('id')
    if wfid:
        fam_roots[wfid].add(r['id'])

for x in lex:
    wfid = x.get('wordFamilyId')
    if not wfid:
        continue
    fam_lexemes[wfid].append(x['id'])
    for rid in (x.get('rootIds') or []):
        fam_roots[wfid].add(rid)
    d = x.get('dialect')
    if d:
        fam_dialects[wfid][d] += 1
    fam_freq[wfid] += int(x.get('corpusFrequency') or 0)
    form = (x.get('form') or '').strip()
    if wfid == 'WF-SHHA' and form in shhye_clusters:
        fam_clusters[wfid][x['id']] = shhye_clusters[form]

all_wf_ids = sorted(set(fam_lexemes.keys()) | set(fam_roots.keys()))
families = []
umbrella_count = 0
root_fam_count = 0
empty_root_fam = 0

for wfid in all_wf_ids:
    rids = sorted(fam_roots.get(wfid, set()))
    lids = sorted(fam_lexemes.get(wfid, []))
    if len(rids) > UMBRELLA_THRESHOLD:
        kind = 'umbrella'
        umbrella_count += 1
    else:
        kind = 'root-family'
        root_fam_count += 1
        if len(rids) == 0:
            empty_root_fam += 1

    entry = {
        'id': wfid,
        'kind': kind,
        'rootIds': rids,
        'rootCount': len(rids),
        'lexemeCount': len(lids),
        'corpusFrequency': fam_freq.get(wfid, 0),
        'dialects': dict(fam_dialects.get(wfid, {})),
        'lexemeIds': lids,
    }
    if wfid in fam_clusters:
        entry['clusters'] = fam_clusters[wfid]
    families.append(entry)

tmp = OUT_PATH.with_suffix('.json.tmp')
with open(tmp, 'w', encoding='utf-8') as f:
    json.dump(families, f, ensure_ascii=False, separators=(',', ':'))
tmp.replace(OUT_PATH)

print("=== FAZ 9A TAMAMLANDI ===")
print(f"Cikti                     : {OUT_PATH}")
print(f"Toplam word family        : {len(families)}")
print(f"  root-family (<=10 kok)  : {root_fam_count} (koksuz: {empty_root_fam})")
print(f"  umbrella    (>10 kok)   : {umbrella_count}")
print(f"WF-SHHA cluster eslesen   : {len(fam_clusters.get('WF-SHHA', {}))}")
