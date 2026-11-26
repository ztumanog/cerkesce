#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 1: POS Kanonik Senkronizasyon (pos -> partOfSpeech) + 332 Bos POS Doldurma
==============================================================================
1. Sistem karari: `pos` kanonik; `src/` halen `partOfSpeech` okudugu icin
   partOfSpeech = pos olarak senkronize edilir.
2. Hem pos hem partOfSpeech bos olan 332 kayitta yuksek guvenli kurallarla
   POS doldurulur; kalanlar `pos-empty-manual.csv` dosyasina raporlanir.
"""
import json, csv, shutil, datetime, pathlib, re

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
BACKUP_DIR   = pathlib.Path('backups') / 'faz1_pos_sync'
OUT_MANUAL   = pathlib.Path('pos-empty-manual.csv')

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)

BACKUP_DIR.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
backup_path = BACKUP_DIR / f'lexemes_before_faz1_{ts}.json'
shutil.copy2(LEXEMES_PATH, backup_path)

synced = 0
inferred = 0
inferred_by_rule = {}
still_empty = []

TR_VERB_RE = re.compile(r'\b\w+(mak|mek)\b', re.IGNORECASE)

for x in lex:
    p = x.get('pos')
    po = x.get('partOfSpeech')

    # 1) pos kanonik -> partOfSpeech senkronizasyonu
    if p and po != p:
        x['partOfSpeech'] = p
        synced += 1
        continue
    if not p and po:
        x['pos'] = po
        synced += 1
        continue

    # 2) Ikisi de bos (332 kayit)
    if not p and not po:
        form = (x.get('form') or '').strip()
        tr = (x.get('translations') or {}).get('tr', '').strip()
        en = (x.get('translations') or {}).get('en', '').strip()
        en_low = en.lower()
        tr_first = tr.split(',')[0].split(';')[0].strip().lower()

        guess = None
        reason = None

        if form.endswith('!') or (en.endswith('!') and len(form.split()) <= 2):
            guess, reason = 'interj', 'exclamation_mark'
        elif ' ' in form and len(form.split()) >= 2:
            guess, reason = 'phrase', 'multi_word_form'
        elif en_low.startswith('to ') or tr_first.endswith('mak') or tr_first.endswith('mek'):
            guess, reason = 'verb', 'tr_mak_mek_or_en_to'

        if guess:
            x['pos'] = guess
            x['partOfSpeech'] = guess
            x['pos_status'] = 'auto-inferred'
            x['pos_reason'] = f'faz1:{reason}'
            inferred += 1
            inferred_by_rule[reason] = inferred_by_rule.get(reason, 0) + 1
        else:
            still_empty.append({
                'id': x['id'],
                'form': form,
                'dialect': x.get('dialect', ''),
                'conceptId': x.get('conceptId', ''),
                'tr': tr[:80],
                'en': en[:80],
            })

with open(OUT_MANUAL, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=['id', 'form', 'dialect', 'conceptId', 'tr', 'en'])
    w.writeheader()
    w.writerows(still_empty)

with open(LEXEMES_PATH, 'w', encoding='utf-8') as f:
    json.dump(lex, f, ensure_ascii=False, separators=(',', ':'))

remaining_conflicts = sum(
    1 for x in lex
    if x.get('pos') and x.get('partOfSpeech') and x['pos'] != x['partOfSpeech']
)
print("=== FAZ 1 TAMAMLANDI ===")
print(f"Yedek                      : {backup_path}")
print(f"pos -> partOfSpeech sync   : {synced}")
print(f"Kalan POS catismasi        : {remaining_conflicts}")
print(f"332 bos POS otomatik dolan : {inferred} {inferred_by_rule}")
print(f"Manuel inceleme kalan      : {len(still_empty)} -> {OUT_MANUAL}")
