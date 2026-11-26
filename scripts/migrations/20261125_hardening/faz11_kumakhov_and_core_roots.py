#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 11: 6 Eksik Temel Kok + Kumakhov Dogrulanmis Kok Baglama
============================================================
1. roots.json'a 6 eksik temel kok ekler:
   R-DYGHE (дыгъэ=güneş), R-VAGHUE (вагъуэ=yıldız), R-DYGHUASE (дыгъуасэ=dün),
   R-SHCH1YP1E (щӀыпӀэ=yer), R-UPCH1E (упчӀэ=soru), R-MURAD (мурад=amaç).
2. Kumakhov (morpheme_parser.py) ile dogrulanmis 21 kesin eslesme +
   6 yeni kokun linking.json eslesmelerini lexemes.json'a baglar.
"""
import json, shutil, datetime, collections, pathlib

LEX_PATH   = pathlib.Path('public/data/linguistic/lexemes.json')
ROOTS_PATH = pathlib.Path('public/data/linguistic/roots.json')
BAK_DIR    = pathlib.Path('backups') / 'faz11_kumakhov'

NEW_ROOTS = [
    {
        'id': 'R-DYGHE', 'form': 'дыгъэ', 'ipa': '/dəʁɐ/',
        'primaryMeaning': 'güneş', 'secondaryMeanings': ['gün ışığı', 'sıcak'],
        'semanticDomains': ['nature', 'celestial'],
        'dialectVariants': {'adyghe': 'тыгъэ', 'kabardian': 'дыгъэ'},
        'notes': 'NotebookLM root_adaylari-v2.csv üzerinden eklendi.',
        'wordFamily': {'id': 'WF-DYGHE', 'lexemeIds': []}, 'lexemeIds': [],
    },
    {
        'id': 'R-VAGHUE', 'form': 'вагъуэ', 'ipa': '/vɑ:ʁʷɐ/',
        'primaryMeaning': 'yıldız', 'secondaryMeanings': ['gök cismi'],
        'semanticDomains': ['nature', 'celestial'],
        'dialectVariants': {'adyghe': 'жъуагъо', 'kabardian': 'вагъуэ'},
        'notes': 'NotebookLM root_adaylari-v2.csv üzerinden eklendi (R-VAGHU=darı eş-sesli ayrımı).',
        'wordFamily': {'id': 'WF-VAGHUE', 'lexemeIds': []}, 'lexemeIds': [],
    },
    {
        'id': 'R-DYGHUASE', 'form': 'дыгъуасэ', 'ipa': '/dəʁʷɑ:sɐ/',
        'primaryMeaning': 'dün', 'secondaryMeanings': ['geçen gün'],
        'semanticDomains': ['time'],
        'dialectVariants': {'adyghe': 'тыгъуасэ', 'kabardian': 'дыгъуасэ'},
        'notes': 'NotebookLM root_adaylari-v2.csv üzerinden eklendi (R-DYGHU=hırsız ayrımı).',
        'wordFamily': {'id': 'WF-DYGHUASE', 'lexemeIds': []}, 'lexemeIds': [],
    },
    {
        'id': 'R-SHCH1YP1E', 'form': 'щӀыпӀэ', 'ipa': '/ɕʹəpʹɐ/',
        'primaryMeaning': 'yer, mekan, bölge', 'secondaryMeanings': ['alan', 'konum'],
        'semanticDomains': ['space', 'geography'],
        'dialectVariants': {'adyghe': 'чӀыпӀэ', 'kabardian': 'щӀыпӀэ'},
        'notes': 'NotebookLM root_adaylari-v2.csv üzerinden eklendi.',
        'wordFamily': {'id': 'WF-SHCH1YP1E', 'lexemeIds': []}, 'lexemeIds': [],
    },
    {
        'id': 'R-UPCH1E', 'form': 'упчӀэ', 'ipa': '/wəptɕʹɐ/',
        'primaryMeaning': 'soru', 'secondaryMeanings': ['sorgulama'],
        'semanticDomains': ['communication', 'cognition'],
        'dialectVariants': {'adyghe': 'упчӀэ', 'kabardian': 'упчӀэ'},
        'notes': 'NotebookLM root_adaylari-v2.csv üzerinden eklendi.',
        'wordFamily': {'id': 'WF-UPCH1E', 'lexemeIds': []}, 'lexemeIds': [],
    },
    {
        'id': 'R-MURAD', 'form': 'мурад', 'ipa': '/murɑ:d/',
        'primaryMeaning': 'amaç, niyet, murat', 'secondaryMeanings': ['hedef', 'karar'],
        'semanticDomains': ['cognition', 'volition'],
        'dialectVariants': {'adyghe': 'мурад', 'kabardian': 'мурад'},
        'notes': 'NotebookLM root_adaylari-v2.csv üzerinden eklendi (Arapça alıntı kökü).',
        'wordFamily': {'id': 'WF-MURAD', 'lexemeIds': []}, 'lexemeIds': [],
    },
]

# Kumakhov dogrulanmis 21 kesin eslesme (form -> rootId)
VERIFIED_KUMAKHOV_BY_FORM = {
    'уныкъун': 'R-NYQHU',
    'къэуныкъун': 'R-NYQHU',
    'блэлъэхъукӀын': 'R-LEXU',
    'хуэупщэфӀын': 'R-PSHCHEF',
    'хуэузэхун': 'R-ZEXU',
    'къыпыгъэткӀун': 'R-TKU',
    'мыщӀэжыфын': 'R-MYSHCHE',
    'къэущхъуэнтӀын': 'R-SHCHXHWEENTӀ',
    'зыукъуэншын': 'R-QHUENSH',
    'зыущэхужын': 'R-SHCHEXU',
    'ялейуэ': 'R-LYEY',
    'ясын': 'R-SYN',
    'сияужь': 'R-WZJH',
    'джэдыр': 'R-DZHED',
    'мэлыр': 'R-MEL_2',
    'бабыщыр': 'R-BABYSHCH',
    'гуэгушыр': 'R-GWEGWSH',
    'пылыр': 'R-PYL',
    'бжэныр': 'R-BZHEN',
    'илъащӀэр': 'R-LA',
    'игъуэм': 'R-GHWALH',
    # Yeni 6 temel kokle dogrudan eslesen kopuk kayitlar
    'вагъуэпыху': 'R-VAGHUE',
    'вагъуэкъан': 'R-VAGHUE',
    'дыгъэвэх': 'R-DYGHE',
    'дыгъэхьэв': 'R-DYGHE',
    'дыгъуасэризэ': 'R-DYGHUASE',
    'дыгъуэспшыхь': 'R-DYGHUASE',
    'дыгъуасэжэщ': 'R-DYGHUASE',
}

with open(LEX_PATH, encoding='utf-8') as f:
    lex = json.load(f)
with open(ROOTS_PATH, encoding='utf-8') as f:
    roots = json.load(f)

BAK_DIR.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
shutil.copy2(LEX_PATH, BAK_DIR / f'lexemes_before_faz11_{ts}.json')
shutil.copy2(ROOTS_PATH, BAK_DIR / f'roots_before_faz11_{ts}.json')

existing_root_ids = {r['id'] for r in roots}
added_roots = 0
for nr in NEW_ROOTS:
    if nr['id'] not in existing_root_ids:
        roots.append(nr)
        existing_root_ids.add(nr['id'])
        added_roots += 1

# Guvenli WF haritasi
wf_roots = collections.defaultdict(set)
for x in lex:
    if x.get('wordFamilyId') and x.get('rootIds'):
        wf_roots[x['wordFamilyId']].update(x['rootIds'])
safe_wfs = {wfid for wfid, rset in wf_roots.items() if 1 <= len(rset) <= 10}
# Yeni koklerin WF'leri guvenli
for nr in NEW_ROOTS:
    safe_wfs.add(nr['wordFamily']['id'])

root_to_wf = {}
for r in roots:
    wfid = (r.get('wordFamily') or {}).get('id')
    if wfid and wfid in safe_wfs:
        root_to_wf[r['id']] = wfid

linked_root = 0
linked_wf = 0
root_added_lex = collections.defaultdict(list)

for x in lex:
    if x.get('rootId') or x.get('rootIds') or x.get('wordFamilyId'):
        continue
    f = (x.get('form') or '').strip().lower()
    rid = VERIFIED_KUMAKHOV_BY_FORM.get(f)
    if not rid or rid not in existing_root_ids:
        continue
    x['rootIds'] = [rid]
    x['rootId'] = rid
    linked_root += 1
    root_added_lex[rid].append(x['id'])
    if rid in root_to_wf:
        x['wordFamilyId'] = root_to_wf[rid]
        linked_wf += 1

# Yeni koklerin lexemeIds listelerini guncelle
for r in roots:
    if r['id'] in root_added_lex:
        cur = set(r.get('lexemeIds') or [])
        cur.update(root_added_lex[r['id']])
        r['lexemeIds'] = sorted(cur)
        if isinstance(r.get('wordFamily'), dict):
            r['wordFamily']['lexemeIds'] = r['lexemeIds']

for path, data in [(LEX_PATH, lex), (ROOTS_PATH, roots)]:
    tmp = path.with_suffix('.json.tmp')
    with open(tmp, 'w', encoding='utf-8') as f:
        if path == ROOTS_PATH:
            json.dump(data, f, ensure_ascii=False, indent=2)
        else:
            json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
    tmp.replace(path)

print("=== FAZ 11 TAMAMLANDI ===")
print(f"Eklenen yeni temel kok : {added_roots}")
print(f"Baglanan lexeme koku   : {linked_root}")
print(f"Bunlardan WF baglanan  : {linked_wf}")
