import json, re

net = json.load(open('docs/reports/faz16a/108_net_sizi_listesi.json', encoding='utf-8'))
lex = json.load(open('public/data/linguistic/lexemes.json', encoding='utf-8'))
items = lex.values() if isinstance(lex, dict) else lex
by_id = {x['id']: x for x in items if isinstance(x, dict) and 'id' in x}

huvaj_clean = {}
for path in ('huvaj_tr_map.json', 'huvaj_tr_map3.json', 'public/data/linguistic/huvaj_tr_temiz.json'):
    try:
        d = json.load(open(path, encoding='utf-8'))
        if isinstance(d, dict):
            for k, v in d.items():
                tr_val = v.get('tr', '') if isinstance(v, dict) else (v if isinstance(v, str) else '')
                if tr_val and not re.search(r'[\u0400-\u04FF]', tr_val):
                    huvaj_clean.setdefault(k.strip(), tr_val.strip())
    except Exception:
        pass

out = []
matched = 0
for r in net:
    rec = by_id.get(r['id'], {})
    form = r['form'].strip()
    h_tr = huvaj_clean.get(form, '')
    if h_tr:
        matched += 1
    out.append({
        'id': r['id'], 'form': form,
        'pos': rec.get('partOfSpeech'),
        'etym': rec.get('etymologyType'),
        'deriv': rec.get('derivation'),
        'huvaj_tr': h_tr,
        'old_tr': r['tr'], 'en': r['en'], 'ru': r['ru']
    })

json.dump(out, open('docs/reports/faz16a/109_analiz_sonucu.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('Toplam net sizinti:', len(out))
print('Temiz Huvaj eslesmesi bulunan:', matched)
print('Kalan (botanik + ettirgen + zarf/kalip):', len(out) - matched)
