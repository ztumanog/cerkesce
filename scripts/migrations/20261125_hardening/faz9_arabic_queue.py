#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 9B: Arapca Eksiklik Kuyrugu (Frekans Oncelikli, Salt Okunur)
================================================================
translations.ar bos olan kayitlari corpusFrequency'ye gore azalan sirada
quarantine/arabic-missing-queue.csv dosyasina yazar (en sik kullanilan
kelimeler en ustte).
"""
import json, csv, collections, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
OUT_CSV      = pathlib.Path('quarantine') / 'arabic-missing-queue.csv'

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)

missing = []
for x in lex:
    tr_obj = x.get('translations') or {}
    if not (tr_obj.get('ar') or '').strip():
        missing.append({
            'id': x['id'],
            'form': x.get('form', ''),
            'pos': x.get('pos', ''),
            'dialect': x.get('dialect', ''),
            'corpusFrequency': int(x.get('corpusFrequency') or 0),
            'tr': (tr_obj.get('tr') or '')[:80],
            'en': (tr_obj.get('en') or '')[:80],
            'ru': (tr_obj.get('ru') or '')[:80],
        })

missing.sort(key=lambda r: (-r['corpusFrequency'], r['id']))

OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
with open(OUT_CSV, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=['id', 'form', 'pos', 'dialect', 'corpusFrequency', 'tr', 'en', 'ru'])
    w.writeheader()
    w.writerows(missing)

freq_gt0 = sum(1 for r in missing if r['corpusFrequency'] > 0)
freq_gt10 = sum(1 for r in missing if r['corpusFrequency'] >= 10)
dial_dist = dict(collections.Counter(r['dialect'] for r in missing))

print("=== FAZ 9B TAMAMLANDI ===")
print(f"Arapca eksik toplam       : {len(missing)}")
print(f"  corpusFrequency > 0     : {freq_gt0}")
print(f"  corpusFrequency >= 10   : {freq_gt10} (en yuksek oncelik)")
print(f"  Dialect dagilimi        : {dial_dist}")
print(f"Kuyruk yazildi            : {OUT_CSV}")
