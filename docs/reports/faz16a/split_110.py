import json, re

rows = json.load(open('docs/reports/faz16a/109_analiz_sonucu.json', encoding='utf-8'))
lex = json.load(open('public/data/linguistic/lexemes.json', encoding='utf-8'))
items = lex.values() if isinstance(lex, dict) else lex

# Ayni form'a sahip temiz ikiz kayitlari topla
by_form = {}
for it in items:
    if not isinstance(it, dict): continue
    f = (it.get('form') or '').strip()
    tr = (it.get('translations') or {}).get('tr', '')
    if isinstance(tr, list): tr = ', '.join(map(str, tr))
    if f and tr and tr.strip() != f and not re.search(r'[\u0400-\u04FF]', tr) and not re.search(r'(^to |^with |^without |^an \d|\bcausative\b|\bkind of\b|\bstyle of\b|\bbereft\b|\bindefinite\b|\bname of\b)', tr.strip(), re.I):
        by_form.setdefault(f, []).append((it.get('id'), tr.strip(), it.get('partOfSpeech'), it.get('etymologyType')))

cats = {'huvaj_hazir': [], 'ikiz_eslesme': [], 'botanik_auto': [], 'ettirgen_causative': [], 'diger_en_ru': []}
for r in rows:
    if r['huvaj_tr']:
        cats['huvaj_hazir'].append(r)
    elif r['form'] in by_form:
        r['twin_hits'] = by_form[r['form']]
        cats['ikiz_eslesme'].append(r)
    elif r['id'].startswith('L-AUTO-'):
        cats['botanik_auto'].append(r)
    elif 'causative' in r['old_tr'].lower() or 'каузатив' in r['old_tr'].lower():
        cats['ettirgen_causative'].append(r)
    else:
        cats['diger_en_ru'].append(r)

json.dump(cats, open('docs/reports/faz16a/110_kalan_kategoriler.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
for k, v in cats.items():
    print(f"{k}: {len(v)}")
print("Ikiz eslesme ornekleri:", [(x['id'], x['form'], x['twin_hits'][0][1]) for x in cats['ikiz_eslesme'][:12]])
