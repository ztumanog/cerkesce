import json, re

rem = json.load(open('docs/reports/faz16a/107_gercek_kalan_non_tr.json', encoding='utf-8'))
lex = json.load(open('public/data/linguistic/lexemes.json', encoding='utf-8'))
items = lex.values() if isinstance(lex, dict) else lex
by_id = {x['id']: x for x in items if isinstance(x, dict) and 'id' in x}

net = [
    r for r in rem
    if re.search(r'[\u0400-\u04FF]', r['tr'])
    or re.search(
        r'(^to |^with |^without |^an \d|\bcausative\b|\bkind of\b|\bstyle of\b|\bbereft\b|\bindefinite\b|\bname of\b|\bwait a\b|\bwell done\b|\bclearly\b|\bhalf an hour\b|\ba long time\b|\bbrave/)',
        r['tr'].strip(),
        re.I
    )
]

json.dump(net, open('docs/reports/faz16a/108_net_sizi_listesi.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('Net sizinti sayisi:', len(net))
for r in net:
    rec = by_id.get(r['id'], {})
    print(f"{r['id']} | {r['form']} | pos:{rec.get('partOfSpeech')} | etym:{rec.get('etymologyType')} | deriv:{rec.get('derivation')} | tr:{r['tr']} | en:{r['en']} | ru:{r['ru']}")
