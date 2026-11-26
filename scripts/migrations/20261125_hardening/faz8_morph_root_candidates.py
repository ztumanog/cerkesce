#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 8 (Analiz): Morfolojik Kok Aday Tespiti (quarantine/linking.json)
=====================================================================
linking.json icindeki kopuk kayitlar icin roots.json formlari (len >= 3) ile
prefix ve substring eslesmesi yapar; en uzun kok eslesmesini onceliklendirir.
Salt okunurdur; cikti: quarantine/morph-root-candidates.csv
"""
import json, csv, collections, pathlib

LINKING_PATH = pathlib.Path('quarantine/linking.json')
ROOTS_PATH   = pathlib.Path('public/data/linguistic/roots.json')
OUT_CSV      = pathlib.Path('quarantine/morph-root-candidates.csv')

with open(LINKING_PATH, encoding='utf-8') as f:
    linking = json.load(f)
with open(ROOTS_PATH, encoding='utf-8') as f:
    roots = json.load(f)

# En az 3 karakterlik kok formlari (uzundan kisaya sirali)
root_entries = [
    (r['id'], r['form'].strip(), r.get('primaryMeaning', ''))
    for r in roots
    if r.get('form') and len(r['form'].strip()) >= 3
]
root_entries.sort(key=lambda t: len(t[1]), reverse=True)

stats = collections.Counter()
rows = []

for x in linking:
    form = (x.get('form') or '').strip().lower()
    prefix_matches = []
    substr_matches = []

    for rid, rform, rmean in root_entries:
        rf = rform.lower()
        if form.startswith(rf):
            prefix_matches.append((rid, rform, len(rf)))
        elif rf in form:
            substr_matches.append((rid, rform, len(rf)))

    # En uzun eslesme grubunu sec (prefix oncelikli)
    if prefix_matches:
        max_len = prefix_matches[0][2]
        best = [m for m in prefix_matches if m[2] == max_len]
        mtype = 'prefix'
    elif substr_matches:
        max_len = substr_matches[0][2]
        best = [m for m in substr_matches if m[2] == max_len]
        mtype = 'substring'
    else:
        best = []
        mtype = 'none'

    if len(best) == 0:
        bucket = '0_eslesme_yok'
    elif len(best) == 1 and mtype == 'prefix':
        bucket = '1_tek_prefix_yuksek_guven'
    elif len(best) == 1:
        bucket = '2_tek_substring_orta_guven'
    else:
        bucket = '3_cok_adayli_belirsiz'

    stats[bucket] += 1
    rows.append({
        'id': x['id'],
        'form': x.get('form', ''),
        'pos': x.get('pos', ''),
        'dialect': x.get('dialect', ''),
        'bucket': bucket,
        'matchType': mtype,
        'candidateRootIds': ','.join(m[0] for m in best[:5]),
        'candidateForms': ','.join(m[1] for m in best[:5]),
        'meaning': (x.get('meaning') or '')[:60],
    })

with open(OUT_CSV, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=[
        'id', 'form', 'pos', 'dialect', 'bucket', 'matchType',
        'candidateRootIds', 'candidateForms', 'meaning'
    ])
    w.writeheader()
    w.writerows(rows)

print("=== FAZ 8 ANALIZ TAMAMLANDI (Salt Okunur) ===")
print(f"Incelenen linking kayit sayisi: {len(linking)}")
for k, v in sorted(stats.items()):
    print(f"  {k:30s}: {v:5d} (%{100*v/len(linking):.1f})")
print(f"Rapor yazildi -> {OUT_CSV}")
