import json, glob, re, shutil, datetime

net = json.load(open('docs/reports/faz16a/108_net_sizi_listesi.json', encoding='utf-8'))
lex_path = 'public/data/linguistic/lexemes.json'
lex = json.load(open(lex_path, encoding='utf-8'))
items = lex.values() if isinstance(lex, dict) else lex
by_id = {x['id']: x for x in items if isinstance(x, dict) and 'id' in x}

# 1) Yerel sozlukleri yukle (Huvaj, Jonty, Abaze)
huvaj, jonty, abaze = {}, {}, {}
for p in glob.glob('**/*Huvaj*.json', recursive=True):
    d = json.load(open(p, encoding='utf-8'))
    if isinstance(d, dict): huvaj.update(d)
for p in glob.glob('**/*Jonty*.json', recursive=True):
    d = json.load(open(p, encoding='utf-8'))
    if isinstance(d, dict): jonty.update(d)
for p in glob.glob('**/*Abaze*.json', recursive=True):
    d = json.load(open(p, encoding='utf-8'))
    if isinstance(d, dict):
        for tr_k, vals in d.items():
            if isinstance(vals, list):
                for v in vals:
                    w = v.split()[0].strip(',.;:()') if isinstance(v, str) and v.strip() else ''
                    if w: abaze.setdefault(w, []).append(tr_k)

def lookup_dicts(form):
    res = []
    for src_d in (huvaj, jonty):
        v = src_d.get(form)
        if isinstance(v, str) and v.strip() and not re.search(r'[\u0400-\u04FF]', v):
            res.append(v.strip())
        elif isinstance(v, dict):
            g = v.get('tr') or v.get('gloss') or v.get('meaning') or ''
            if isinstance(g, str) and g.strip() and not re.search(r'[\u0400-\u04FF]', g):
                res.append(g.strip())
    if form in abaze:
        res.append(', '.join(abaze[form][:3]))
    return res

# 2) Gramer/etimoloji + sozluk esleme analizi
out = []
auto_resolved = 0
for r in net:
    rec = by_id.get(r['id'], {})
    form = r['form'].strip()
    hits = lookup_dicts(form)
    pos = rec.get('partOfSpeech')
    etym = rec.get('etymologyType')
    # Yapisal kurallar
    if form.endswith(('ншэу', 'уэ', 'рэ')) and pos in (None, 'noun'):
        pos = 'adverb'
    if r['id'].startswith('L-AUTO-') and not pos:
        pos = 'noun'
    if form in ('уэлэхьи', 'афэрым', 'гъейрэт', 'шэфталей', 'мэрчэн', 'дибэ', 'ахъшэншэу', 'сыхьатныкъо'):
        etym = 'loanword'
    if hits:
        auto_resolved += 1
    out.append({
        'id': r['id'], 'form': form, 'pos': pos, 'etym': etym,
        'dict_hits': hits, 'old_tr': r['tr'], 'en': r['en'], 'ru': r['ru']
    })

json.dump(out, open('docs/reports/faz16a/109_analiz_sonucu.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('Toplam incelenen:', len(out))
print('Yerel sozluklerden dogrudan TR bulunan:', auto_resolved)
print('Kalan (en/ru uzerinden cevirilecek):', len(out) - auto_resolved)
print('Ornek 15 eslesme:')
for x in [o for o in out if o['dict_hits']][:15]:
    print(f"  {x['id']} | {x['form']} ({x['pos']}, {x['etym']}) -> {x['dict_hits'][0]}")
