import json, re

lex_p = 'public/data/linguistic/lexemes.json'
lex = json.load(open(lex_p, encoding='utf-8-sig'))
items = lex.values() if isinstance(lex, dict) else lex
by_id = {x['id']: x for x in items if isinstance(x, dict) and 'id' in x}

patches = {}
for i in (1, 2, 3):
    patches.update(json.load(open(f'docs/reports/faz16a/patch_p{i}.json', encoding='utf-8-sig')))

upd = 0
for k, v in patches.items():
    rec = by_id.get(k)
    if not rec:
        continue
    if 'translations' not in rec or not isinstance(rec['translations'], dict):
        rec['translations'] = {}
    rec['translations']['tr'] = v[0]
    if v[1]:
        rec['partOfSpeech'] = v[1]
    if v[2]:
        rec['etymologyType'] = v[2]
    if v[3]:
        rec['derivation'] = v[3]
    upd += 1

with open(lex_p, 'w', encoding='utf-8') as f:
    json.dump(lex, f, ensure_ascii=False, indent=2)

rem = []
for x in by_id.values():
    tr = str((x.get('translations') or {}).get('tr', '')).strip()
    fm = str(x.get('form', '')).strip()
    if tr and (tr == fm or re.search(r'[\u0400-\u04FF]', tr) or re.search(r'(^to |^with |^without |^an \d|\bcausative\b|\bkind of\b|\bstyle of\b|\bbereft\b|\bindefinite\b|\bname of\b)', tr, re.I)):
        rem.append(x['id'])

print('Toplam yama kaydi:', len(patches))
print('Guncellenen kayit:', upd)
print('Kalan net sizinti:', len(rem))
if rem:
    print('Kalan ID listesi:', rem)
