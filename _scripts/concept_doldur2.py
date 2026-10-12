import json
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

# DOGRU mapping (manuel)
DOGRU_MAPPING = {
    'WF-GU': 'HEART',           # kalp
    'WF-NE': 'EYE',             # göz
    'WF-PSY': 'WATER',          # su
    'WF-SH1Y': 'EARTH',         # toprak
    'WF-MAF1E': 'FIRE',         # ateş
    'WF-BZE': 'TONGUE',         # dil
    'WF-PE': 'NOSE',            # burun
    'WF-LHE': 'FOOT',           # ayak
    'WF-1E': 'HAND',            # el
    'WF-TKHEK1UME': 'EAR',      # kulak
    'WF-SHHYE': 'HEAD',         # baş
    'WF-PSE': 'SOUL',           # ruh
    'WF-EDZHAP1E': 'SCHOOL',    # okul
    'WF-QALE': 'CITY',          # şehir
    'WF-QUAZHE': 'VILLAGE',     # köy
    'WF-TKHYL': 'BOOK',         # kitap
    'WF-UNE': 'HOUSE',          # ev
    'WF-LEZH': 'WORK',          # iş
    'WF-DUNEY': 'WORLD',        # dünya
    'WF-GHASH1E': 'LIFE',       # yaşam
    'WF-ANE': 'MOTHER',         # anne
    'WF-ADE': 'FATHER',         # baba
    'WF-QUE': 'SON',            # oğul
    'WF-PKHU': 'DAUGHTER',      # kız
    'WF-SHYPKHU': 'SISTER',     # kız kardeş
    'WF-DELKHU': 'BROTHER',     # kardeş
    'WF-NYBZHEGU': 'FRIEND',    # arkadaş
    'WF-UNAGHUE': 'FAMILY',     # aile
    'WF-TSYXHU': 'HUMAN',       # insan
    'WF-LHY': 'MAN',            # adam
    'WF-BZYLKHUGHE': 'WOMAN',   # kadın
}

# 1) Doldur
doldurulan = 0
for l in lex:
    if l.get('conceptId'):
        continue
    wf = l.get('wordFamilyId')
    if wf in DOGRU_MAPPING:
        l['conceptId'] = DOGRU_MAPPING[wf]
        doldurulan += 1

print(f"Doldurulan: {doldurulan}")

# 2) Kalan
kalan = [l for l in lex if not l.get('conceptId')]
print(f"Kalan bos: {len(kalan)}")

# 3) Kalanlari WF bazli grupla
kalan_wf = {}
for l in kalan:
    wf = l.get('wordFamilyId', 'YOK')
    if wf not in kalan_wf:
        kalan_wf[wf] = []
    kalan_wf[wf].append(l)

print(f"\n=== KALAN WF GRUPLARI ({len(kalan_wf)}) ===")
for wf, items in sorted(kalan_wf.items(), key=lambda x: -len(x[1]))[:30]:
    print(f"  {wf}: {len(items)} kelime")
    for i in items[:3]:
        print(f"    - {i.get('form', '?')}: {i.get('literalMeaning', '?')[:50]}")

# 4) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nToplam: {len(lex)}")
