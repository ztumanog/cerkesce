#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 6: Quarantine Ayristirmasi (Salt Okunur / lexemes.json degismez)
====================================================================
Tamamen kopuk kayitlari (WF bos + rootId/rootIds bos) iki ayri kuyruga ayirir:
  - quarantine/critical.json : POS da bos (coklu sorunlu, oncelikli kurasyon)
  - quarantine/linking.json  : POS dolu (sadece kok/WF baglantisi eksik)
  - quarantine/summary.json  : Ozet istatistikler
"""
import json, collections, pathlib

LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
OUT_DIR      = pathlib.Path('quarantine')

with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)

OUT_DIR.mkdir(parents=True, exist_ok=True)

critical = []
linking = []

for x in lex:
    has_wf = bool(x.get('wordFamilyId'))
    has_root = bool(x.get('rootId') or x.get('rootIds'))
    if has_wf or has_root:
        continue

    has_pos = bool(x.get('pos') or x.get('partOfSpeech'))
    slim = {
        'id': x['id'],
        'form': x.get('form', ''),
        'pos': x.get('pos', ''),
        'dialect': x.get('dialect', ''),
        'conceptId': x.get('conceptId', ''),
        'meaning': x.get('meaning', ''),
        'translations': x.get('translations', {}),
        'sources': x.get('sources', x.get('source', '')),
    }
    if not has_pos:
        critical.append(slim)
    else:
        linking.append(slim)

def write_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

write_json(OUT_DIR / 'critical.json', critical)
write_json(OUT_DIR / 'linking.json', linking)

summary = {
    'total_disconnected': len(critical) + len(linking),
    'critical_count': len(critical),
    'linking_count': len(linking),
    'critical_dialects': dict(collections.Counter(x['dialect'] for x in critical)),
    'linking_dialects': dict(collections.Counter(x['dialect'] for x in linking)),
    'linking_pos_top10': dict(collections.Counter(x['pos'] for x in linking).most_common(10)),
}
write_json(OUT_DIR / 'summary.json', summary)

print("=== FAZ 6 TAMAMLANDI ===")
print(f"Toplam kopuk (WF + root bos) : {summary['total_disconnected']}")
print(f"  quarantine/critical.json   : {summary['critical_count']} (POS + WF + root bos)")
print(f"  quarantine/linking.json    : {summary['linking_count']} (POS dolu, WF + root bos)")
print(f"  quarantine/summary.json    : yazildi")
