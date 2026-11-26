#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 10 (Kurasyon): Kalan 299 Bos POS Kaydini Doldurma (%100 POS Kapsami)
========================================================================
pos-empty-manual.csv icindeki 299 kaydin tamami tek tek incelenerek
siniflandirildi. Her kayda hem `pos` hem `partOfSpeech` yazilir ve
`pos_status: "curated-faz10"` ile izlenebilir kilinir.
"""
import json, shutil, datetime, collections, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
BACKUP_DIR   = pathlib.Path('backups') / 'faz10_pos_curation'

EXPLICIT_POS = {
    # conj
    'L-AME': 'conj',
    # interj
    'L-KYSHCH': 'interj',
    # adv
    'L-AZBAR': 'adv',
    'L-KHEMYLU': 'adv',
    'L-EKH-EKHK1E': 'adv',
    'L-NE1UAKHUE': 'adv',
    'L-UEIBZH': 'adv',
    'L-UNEGUEDZHE': 'adv',
    'L-KHESHCH1E-GUASHCH1E': 'adv',
    # verb
    'L-BZADZHERYLKHU': 'verb',
    'L-DOU': 'verb',
    'L-EVEKUEK1YN': 'verb',
    'L-EDZEKHUL1EN': 'verb',
    'L-ESHKHEBLEZHYN': 'verb',
    'L-MYCHYN': 'verb',
    'L-LEPANTKHUEN': 'verb',
    'L-TEGESHYUEN': 'verb',
    'L-TET1EN': 'verb',
    'L-USHKHUEN': 'verb',
    'L-ZEKHUESHCHKHETSPESHCHTEN': 'verb',
    'L-KHUEMYGUETYN': 'verb',
    'L-1EZHUZH': 'verb',
    'L-ZETEMYLKHEN': 'verb',
    'L-KHIDZASHCH': 'verb',
    # adj
    'L-AZBARGUE': 'adj',
    'L-KUESHCHEPKYSHCHE': 'adj',
    'L-YN': 'adj',
    'L-LKHUADENSHE': 'adj',
    'L-SEKHYZHA': 'adj',
    'L-TKHEBLEGUDZHE': 'adj',
    'L-KHEKSYK': 'adj',
    'L-1EPTS11UPTS1': 'adj',
    'L-IGUSHCH1YK1A': 'adj',
    'L-NAP1EPSHCHA': 'adj',
    'L-ZEPYRYL': 'adj',
    # propn
    'L-AZGE': 'propn',
    'L-ASKALE': 'propn',
    'L-KARS': 'propn',
    'L-SOTEY': 'propn',
    'L-SUNLY': 'propn',
    'L-SHCHERMET': 'propn',
    'L-SHCHKHEGY': 'propn',
    'L-KASHCHK': 'propn',
    'L-SHESHENKHEM': 'propn',
    'L-KESEY': 'propn',
    'L-MARGUSH': 'propn',
    'L-MERKHEN': 'propn',
    'L-MET-2': 'propn',
    'L-TAMBIY': 'propn',
    'L-TRAM': 'propn',
    'L-SHEBEZDZHERIY': 'propn',
    'L-SHYNEBATE': 'propn',
    'L-AGUSHCH1YPSE': 'propn',
    # phrase
    'L-1EGUI-GUEGUI': 'phrase',
    'L-TOSHCHE-MESHCHE': 'phrase',
}

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)

BACKUP_DIR.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
backup_path = BACKUP_DIR / f'lexemes_before_faz10_pos_{ts}.json'
shutil.copy2(LEXEMES_PATH, backup_path)

counts = collections.Counter()
for x in lex:
    if x.get('pos') or x.get('partOfSpeech'):
        continue
    assigned = EXPLICIT_POS.get(x['id'], 'noun')
    x['pos'] = assigned
    x['partOfSpeech'] = assigned
    x['pos_status'] = 'curated-faz10'
    x['pos_reason'] = 'faz10:explicit_curation' if x['id'] in EXPLICIT_POS else 'faz10:ethnographic_noun_curation'
    counts[assigned] += 1

tmp = LEXEMES_PATH.with_suffix('.json.tmp')
with open(tmp, 'w', encoding='utf-8') as f:
    json.dump(lex, f, ensure_ascii=False, separators=(',', ':'))
tmp.replace(LEXEMES_PATH)

print("=== FAZ 10 POS KURASYONU TAMAMLANDI ===")
print(f"Yedek              : {backup_path}")
print(f"Doldurulan toplam  : {sum(counts.values())}")
for k, v in counts.most_common():
    print(f"  {k:10s}: {v}")
