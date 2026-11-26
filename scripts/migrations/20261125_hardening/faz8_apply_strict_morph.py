#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 8 (Uygulama): Digraf-duyarli + Non-verb + Kok >= 6 Harf Kok Baglama
=======================================================================
1. quarantine/linking.json havuzunda kok >= 6 harf, digraf siniri korunan,
   tek eslesmeli non-verb kayitlarina (83 kayit, 20/20 orneklem %100 isabet)
   rootId + rootIds (ve varsa guvenli <=10 koklu wordFamilyId) atar.
2. kok == 5 harf adaylarini (108 kayit, ~%85 isabet) manuel hizli onay icin
   quarantine/morph-len5-review.csv dosyasina yazar.
"""
import json, csv, shutil, datetime, collections, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
ROOTS_PATH   = pathlib.Path('public/data/linguistic/roots.json')
BACKUP_DIR   = pathlib.Path('backups') / 'faz8_morph_strict'
OUT_LEN5     = pathlib.Path('quarantine') / 'morph-len5-review.csv'

DIGRAPH_CONTINUATIONS = {'ъ', 'ь', 'Ӏ', 'I', '1'}
LABIAL_BASES = {'г', 'к', 'х', 'ъ', 'Ӏ', 'ж', 'ш', 'щ', 'ц', 'д', 'т', 'п'}
PAIR_BLOCK = {('д', 'з'), ('д', 'ж'), ('т', 'с'), ('п', 'щ'), ('ш', 'х'), ('щ', 'х')}

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)
with open(ROOTS_PATH, encoding='utf-8') as f:
    roots = json.load(f)

BACKUP_DIR.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
backup_path = BACKUP_DIR / f'lexemes_before_faz8_{ts}.json'
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

root_entries = [
    (r['id'], r['form'].strip(), r.get('primaryMeaning', ''))
    for r in roots
    if r.get('form') and len(r['form'].strip()) >= 5
]
root_entries.sort(key=lambda t: len(t[1]), reverse=True)

def safe_boundary(form, rf):
    if not form.startswith(rf):
        return False
    if len(form) == len(rf):
        return True
    nxt = form[len(rf)]
    last = rf[-1]
    if nxt in DIGRAPH_CONTINUATIONS:
        return False
    if nxt == 'у' and last in LABIAL_BASES:
        return False
    if (last, nxt) in PAIR_BLOCK:
        return False
    return True

applied_root = 0
applied_wf = 0
len5_rows = []

for x in lex:
    if x.get('wordFamilyId') or x.get('rootId') or x.get('rootIds'):
        continue
    if not x.get('pos') or x.get('pos') == 'verb':
        continue
    form = (x.get('form') or '').strip().lower()
    if not form or ' ' in form:
        continue

    matches = []
    for rid, rform, rmean in root_entries:
        rf = rform.lower()
        if safe_boundary(form, rf):
            matches.append((rid, rform, rmean, len(rf)))

    if not matches:
        continue
    max_l = matches[0][3]
    best = [m for m in matches if m[3] == max_l]
    if len(best) != 1:
        continue

    rid, rform, rmean, rlen = best[0]
    if rlen >= 6:
        x['rootIds'] = [rid]
        x['rootId'] = rid
        applied_root += 1
        if rid in root_to_safe_wf:
            x['wordFamilyId'] = root_to_safe_wf[rid]
            applied_wf += 1
    elif rlen == 5:
        len5_rows.append({
            'id': x['id'],
            'form': x.get('form', ''),
            'pos': x.get('pos', ''),
            'candidateRootId': rid,
            'candidateRootForm': rform,
            'rootMeaning': rmean[:60],
            'lexemeMeaning': (x.get('meaning') or '')[:60],
        })

with open(OUT_LEN5, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=[
        'id', 'form', 'pos', 'candidateRootId', 'candidateRootForm', 'rootMeaning', 'lexemeMeaning'
    ])
    w.writeheader()
    w.writerows(len5_rows)

tmp_path = LEXEMES_PATH.with_suffix('.json.tmp')
with open(tmp_path, 'w', encoding='utf-8') as f:
    json.dump(lex, f, ensure_ascii=False, separators=(',', ':'))
tmp_path.replace(LEXEMES_PATH)

print("=== FAZ 8 UYGULAMA TAMAMLANDI ===")
print(f"Yedek                              : {backup_path}")
print(f"Otomatik baglanan kok (>=6 harf)   : {applied_root}")
print(f"  Bunlardan WF de baglanan         : {applied_wf}")
print(f"5 harfli inceleme listesi          : {len(len5_rows)} -> {OUT_LEN5}")
