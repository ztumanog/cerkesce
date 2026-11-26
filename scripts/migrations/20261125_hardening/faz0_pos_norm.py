#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FAZ 0: POS Normalizasyonu + Conflict Audit
==========================================
1. partOfSpeech degerlerini pos ile ayni terminolojiye normalize et
2. Gercek catismalari rapor et (pos-conflict-audit.csv)
3. lexemes.json'u guncelle (sadece partOfSpeech normalizasyonu, baska hic bir sey degismez)
4. field-audit.csv uret

BACKUP: Degisiklikten once otomatik yedek alinir.
"""
import json, csv, shutil, datetime, pathlib, collections

# --- Yollar ---
LEXEMES_PATH = pathlib.Path('public/data/linguistic/lexemes.json')
BACKUP_DIR   = pathlib.Path('backups') / 'faz0_pos_norm'
OUT_CONFLICT = pathlib.Path('pos-conflict-audit.csv')
OUT_FIELD    = pathlib.Path('field-audit.csv')

# --- Normalizasyon haritasi: partOfSpeech -> pos terminolojisi ---
NORM_MAP = {
    'adjective'   : 'adj',
    'adverb'      : 'adv',
    'interjection': 'interj',
    'pronoun'     : 'pron',
    'conjunction' : 'conj',
    'particle'    : 'part',
    'numeral'     : 'num',
    'postposition': 'adp',
    'proper_noun' : 'propn',
    # Buyuk harf varyantlari (guvenlik)
    'Adjective'   : 'adj',
    'Adverb'      : 'adv',
    'Noun'        : 'noun',
    'Verb'        : 'verb',
    'Interjection': 'interj',
    'Pronoun'     : 'pron',
    'Numeral'     : 'num',
    'Prefix'      : 'prefix',
}

# =============================================================
print("=" * 60)
print("FAZ 0: POS Normalizasyonu + Conflict Audit")
print("=" * 60)

# 1. Veri yukle
print("\n[1/5] Lexemes yukleniyor...")
with open(LEXEMES_PATH, encoding='utf-8') as f:
    lex = json.load(f)
print(f"      {len(lex)} kayit yuklendi.")

# 2. Backup
BACKUP_DIR.mkdir(parents=True, exist_ok=True)
ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
backup_path = BACKUP_DIR / f'lexemes_before_faz0_{ts}.json'
shutil.copy2(LEXEMES_PATH, backup_path)
print(f"\n[2/5] Yedek alindi: {backup_path}")

# 3. On-durum olcumu
print("\n[3/5] On-durum olcumu...")
pre_conflicts = [(x['id'], x['pos'], x['partOfSpeech'])
                 for x in lex
                 if x.get('pos') and x.get('partOfSpeech') and x['pos'] != x['partOfSpeech']]
print(f"      Normalizasyon ONCE catisma: {len(pre_conflicts)}")

# Normalizasyon simulasyonu
norm_would_fix = sum(
    1 for (xid, p, po) in pre_conflicts
    if NORM_MAP.get(po, po) == p
)
print(f"      Normalizasyonla kapanacak  : {norm_would_fix}")
print(f"      Gercek catisma kalacak     : {len(pre_conflicts) - norm_would_fix}")

# 4. Normalizasyonu uygula
print("\n[4/5] partOfSpeech normalize ediliyor...")
norm_count = 0
for x in lex:
    po = x.get('partOfSpeech', '')
    if po in NORM_MAP:
        x['partOfSpeech'] = NORM_MAP[po]
        norm_count += 1
print(f"      Normalize edilen kayit: {norm_count}")

# 5. Son-durum olcumu
post_conflicts = [
    {
        'id'           : x['id'],
        'form'         : x.get('form', ''),
        'pos'          : x.get('pos', ''),
        'partOfSpeech' : x.get('partOfSpeech', ''),
        'dialect'      : x.get('dialect', ''),
        'conceptId'    : x.get('conceptId', ''),
        'meaning'      : x.get('meaning', '')[:60],
        'en'           : x.get('translations', {}).get('en', '')[:60],
    }
    for x in lex
    if x.get('pos') and x.get('partOfSpeech') and x['pos'] != x['partOfSpeech']
]
print(f"\n[5/5] Normalizasyon SONRASI gercek catisma: {len(post_conflicts)}")

# Catisma tipleri
tip_counter = collections.Counter(
    (c['pos'], c['partOfSpeech']) for c in post_conflicts
)
print("\n  En sik catisma tipleri:")
for (p, po), cnt in tip_counter.most_common(15):
    print(f"    pos={p:12s} <-> partOf={po:12s} : {cnt}")

# Field-audit: tum alanlarin doluluk orani
print("\n  Alan doluluk orani:")
audit_rows = []
fields = ['form','meaning','translations','partOfSpeech','pos','senses','examples',
          'literalMeaning','dialect','conceptId','wordFamilyId','rootIds','rootId',
          'ipa','audioUrl','etymology','updatedAt']
for field in fields:
    dolu = sum(1 for x in lex if x.get(field))
    bos  = len(lex) - dolu
    pct  = 100.0 * dolu / len(lex)
    print(f"    {field:20s}: dolu={dolu:6d} bos={bos:6d} %{pct:.1f}")
    audit_rows.append({'alan': field, 'dolu': dolu, 'bos': bos, 'yuzde': round(pct,1)})

# CSV'leri yaz
print(f"\n  Conflict CSV yaziliyor -> {OUT_CONFLICT}")
with open(OUT_CONFLICT, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=['id','form','pos','partOfSpeech','dialect','conceptId','meaning','en'])
    w.writeheader()
    w.writerows(post_conflicts)

print(f"  Field-audit CSV yaziliyor -> {OUT_FIELD}")
with open(OUT_FIELD, 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.DictWriter(f, fieldnames=['alan','dolu','bos','yuzde'])
    w.writeheader()
    w.writerows(audit_rows)

# lexemes.json kaydet
print(f"\n  lexemes.json guncelleniyor...")
with open(LEXEMES_PATH, 'w', encoding='utf-8') as f:
    json.dump(lex, f, ensure_ascii=False, separators=(',', ':'))
print(f"  Kaydedildi.")

print()
print("=" * 60)
print("FAZ 0 TAMAMLANDI")
print("=" * 60)
print(f"  Yedek                 : {backup_path}")
print(f"  Normalize edilen      : {norm_count} partOfSpeech degeri")
print(f"  Catisma once / sonra  : {len(pre_conflicts)} -> {len(post_conflicts)}")
print(f"  Conflict raporu       : {OUT_CONFLICT}")
print(f"  Field audit           : {OUT_FIELD}")
print()
print("SONRAKI ADIM -> Faz 1: 332 bos POS doldurma scripti")
