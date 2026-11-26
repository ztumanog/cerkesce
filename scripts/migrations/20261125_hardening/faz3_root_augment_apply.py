#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ROOT-AUGMENT-001 FAZ 3: Faz 2 Dry-Run kararlarinin uygulanmasi
==============================================================
Girdi : quarantine/root-augment-001-faz2-dryrun.csv (77 WF)
Kapsam:
  - B1  (6 WF, 2 kokusuz lexeme) : mevcut koklere ata
  - B2c (31 WF, 55 kokusuz lexeme): yeni kok yarat + ata
  - B2a/B2b (11 WF): dry-run satirlari bayat - kokler faz11'de zaten
    atanmis, aksiyon YOK (raporlanir)
  - B4  (29 WF, 62 kokusuz lexeme): Dokunma - elle kurasyon bekliyor
Yontem (repo deseni - faz11 ile ayni):
  - Once yedek (backups/faz3_root_augment/)
  - roots.json'a 31 yeni kok (form=core, anlam=sample_tr ilk madde,
    provenance notu ROOT-AUGMENT-001 Faz 3)
  - word_families.json: WF'ye rootId + rootForm
  - lexemes.json: kokusuz uyelere rootId + rootIds
  - audit_log.jsonl'e CURATION_BULK_UPDATE kaydi
Atomik: hata olursa hicbir dosya yazilmaz (tmp + dogrulama + replace).
"""
import json, csv, shutil, datetime, pathlib, sys

LEX_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
ROOTS_PATH = pathlib.Path('public/data/linguistic/roots.json')
WF_PATH = pathlib.Path('public/data/linguistic/word_families.json')
AUDIT_PATH = pathlib.Path('public/data/linguistic/audit_log.jsonl')
CSV_PATH = pathlib.Path('quarantine/root-augment-001-faz2-dryrun.csv')
BAK_DIR = pathlib.Path('backups') / 'faz3_root_augment'
ERTELENE_CSV = pathlib.Path('quarantine/root-augment-001-faz3-ertelendi.csv')

# Bas Mimar karari (secenek b): anlami kirli/supheli olan 10 kok bu turda
# OLUSTURULMAZ - anlam zenginlestirme kurationu sonrasi gelir.
# Kirli = Ingilizce kalan (wheeze, true story, tolerant, prospective,
# impossibility, scattered), bozuk (kvadratlkvadratny, biberlik),
# supheli (Nane, Surgun).
ERTelenen_KOKLER = {
    'R-KHYRKHYN', 'R-SHCHY_AGH', 'R-SHECHYGHUAF', 'R-UZERIGUGH',
    'R-XUZEF_EMYK_YN', 'R-ZYBGYRYDZ', 'R-LHABZHEB', 'R-SHYBZHIILH',
    'R-BARAT_IN', 'R-KULKESH',
}


def load(p):
    return json.loads(p.read_text(encoding='utf-8-sig').replace('﻿', ''))


def save_atomic(p, data):
    tmp = p.with_suffix(p.suffix + '.tmp')
    tmp.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    # Dogrulama: geri okunabilmeli
    json.loads(tmp.read_text(encoding='utf-8'))
    tmp.replace(p)


def main():
    dry = DRY_RUN = ('--dry-run' in sys.argv)
    ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')

    lex = load(LEX_PATH)
    roots = load(ROOTS_PATH)
    wfs = load(WF_PATH)
    with open(CSV_PATH, encoding='utf-8-sig') as f:
        rows = list(csv.DictReader(f))

    rootIds = {r['id'] for r in roots}
    rootById = {r['id']: r for r in roots}
    rootForms = {}
    for r in roots:
        if r.get('form'):
            rootForms.setdefault(r['form'], []).append(r['id'])
    wfById = {w['id']: w for w in wfs}
    lexByWf = {}
    for l in lex:
        if l.get('wordFamilyId'):
            lexByWf.setdefault(l['wordFamilyId'], []).append(l)

    b1 = [r for r in rows if r['bucket'].startswith('B1')]
    b2 = [r for r in rows if r['bucket'].startswith('B2')]
    b2a = [r for r in b2 if r['proposed_root'] in rootIds]
    b2b = [r for r in b2 if r['proposed_root'] not in rootIds
           and r['lcp'].strip() in rootForms]
    b2c = [r for r in b2 if r['proposed_root'] not in rootIds
           and r['lcp'].strip() not in rootForms]

    yeni_kokler = []
    atanan_lexeme = 0
    guncellenen_wf = 0

    # ---- B1: mevcut koklere ata ----
    for r in b1:
        kok = r['proposed_root']
        assert kok in rootIds, f'B1 kok yok: {kok}'
        uye = [l for l in lexByWf.get(r['wf_id'], []) if not l.get('rootId')]
        wf = wfById.get(r['wf_id'])
        if not uye and (wf and wf.get('rootId')):
            continue
        for l in uye:
            l['rootId'] = kok
            l['rootIds'] = [kok]
            atanan_lexeme += 1
        if wf is not None and not wf.get('rootId'):
            wf['rootId'] = kok
            wf['rootForm'] = rootById[kok].get('form', '')
            guncellenen_wf += 1

    # ---- B2c: yeni kok yarat + ata (ertelenenler haric - secenek b) ----
    ertelenen = [r for r in b2c if r['proposed_root'] in ERTelenen_KOKLER]
    b2c = [r for r in b2c if r['proposed_root'] not in ERTelenen_KOKLER]
    for r in b2c:
        kok_id = r['proposed_root']
        form = r['lcp'].strip() or r['stripped_core'].strip()
        assert kok_id not in rootIds, f'B2c kok zaten var: {kok_id}'
        assert form, f'B2c form bos: {r["wf_id"]}'
        anlam = (r.get('sample_tr') or '').split('|')[0].split(',')[0].strip() or 'belirtilmedi'
        yeni = {
            'id': kok_id,
            'form': form,
            'primaryMeaning': anlam,
            'secondaryMeanings': [],
            'semanticDomains': [],
            'dialectVariants': {},
            'notes': 'ROOT-AUGMENT-001 Faz 3 (faz2 dry-run B2_TRUE_NEW_CORE_ROOT) - otomatik uretildi.',
            'wordFamily': {'id': r['wf_id'], 'lexemeIds': []},
            'lexemeIds': [],
        }
        roots.append(yeni)
        rootIds.add(kok_id)
        rootById[kok_id] = yeni
        yeni_kokler.append(kok_id)

        uye = [l for l in lexByWf.get(r['wf_id'], []) if not l.get('rootId')]
        for l in uye:
            l['rootId'] = kok_id
            l['rootIds'] = [kok_id]
            atanan_lexeme += 1
        yeni['lexemeIds'] = [l['id'] for l in uye]
        yeni['wordFamily']['lexemeIds'] = [l['id'] for l in uye]

        wf = wfById.get(r['wf_id'])
        if wf is not None and not wf.get('rootId'):
            wf['rootId'] = kok_id
            wf['rootForm'] = form
            guncellenen_wf += 1

    # ---- Ozet ----
    print(f'B1  mevcut koke atanan WF      : {len(b1)} WF')
    print(f'B2a bayat (aksiyon yok)        : {len(b2a)} WF')
    print(f'B2b bayat (aksiyon yok)        : {len(b2b)} WF')
    print(f'B2c yeni kok (bu tur)          : {len(yeni_kokler)} kok')
    print(f'B2c ertelendi (anlam kirli)    : {len(ertelenen)} kok -> {ERTELENE_CSV.name}')
    print(f'B4  dokunulmadi                : 29 WF / 62 lexeme (elle kurasyon)')
    print(f'TOPLAM: yeni kok={len(yeni_kokler)}, atanan lexeme={atanan_lexeme}, guncellenen WF={guncellenen_wf}')

    # Ertelenenler takip CSV'sine yazilir (her modda)
    with open(ERTELENE_CSV, 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.DictWriter(f, fieldnames=['wf_id', 'proposed_root', 'lcp', 'sample_tr', 'sebep'])
        w.writeheader()
        for r in ertelenen:
            w.writerow({
                'wf_id': r['wf_id'], 'proposed_root': r['proposed_root'],
                'lcp': r['lcp'], 'sample_tr': r['sample_tr'],
                'sebep': 'primaryMeaning kirli/supheli - anlam zenginlestirme bekliyor (Bas Mimar secenek b)',
            })

    if DRY_RUN:
        print('\n[DRY-RUN] Yazim yapilmadi. Yeni kokler (ilk 10):')
        for k in yeni_kokler[:10]:
            print(' ', k, '=', rootById[k]['form'], '->', rootById[k]['primaryMeaning'])
        return

    # ---- Yedek + yazim ----
    BAK_DIR.mkdir(parents=True, exist_ok=True)
    for p in [LEX_PATH, ROOTS_PATH, WF_PATH, AUDIT_PATH]:
        shutil.copy2(p, BAK_DIR / f'{p.name}.{ts}.bak')

    save_atomic(LEX_PATH, lex)
    save_atomic(ROOTS_PATH, roots)
    save_atomic(WF_PATH, wfs)

    with open(AUDIT_PATH, 'a', encoding='utf-8') as f:
        f.write(json.dumps({
            'timestamp': datetime.datetime.utcnow().isoformat() + 'Z',
            'action': 'CURATION_BULK_UPDATE',
            'lexemeId': f'ROOT-AUGMENT-001-FAZ3-{ts}',
            'form': f'yeni_kok={len(yeni_kokler)}, atanan_lexeme={atanan_lexeme}, wf={guncellenen_wf}',
            'diff': [{'field': 'rootId', 'oldValue': None,
                      'newValue': f'{len(yeni_kokler)} yeni kok + B1 atamalari (faz2 dry-run B1+B2c)'}],
            'source': 'root-augment-001-faz3',
        }, ensure_ascii=False) + '\n')

    print(f'\nYazildi. Yedek: {BAK_DIR} (ts={ts})')


if __name__ == '__main__':
    main()
