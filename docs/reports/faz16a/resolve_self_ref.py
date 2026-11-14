import json, glob

net = json.load(open('docs/reports/faz16a/108_net_sizi_listesi.json', encoding='utf-8'))
dicts = {}
for p in glob.glob('**/*Huvaj*.json', recursive=True) + glob.glob('**/*Jonty*.json', recursive=True) + glob.glob('**/*Abaze*.json', recursive=True):
    try:
        dicts[p] = json.load(open(p, encoding='utf-8'))
    except Exception as e:
        pass

print('Yuklenen sozlukler:', list(dicts.keys()))
self_ref = [r for r in net if r['tr'].strip() == r['form'].strip()]
print('Oz-yansimali (tr==form) kayit sayisi:', len(self_ref))
for r in self_ref:
    hits = []
    for name, d in dicts.items():
        if isinstance(d, dict) and r['form'] in d:
            hits.append((name.split('\\')[-1], str(d[r['form']])[:80]))
        elif isinstance(d, list):
            for it in d:
                if isinstance(it, dict) and r['form'] in (it.get('form'), it.get('headword'), it.get('ady'), it.get('kbd'), it.get('word')):
                    hits.append((name.split('\\')[-1], str(it)[:80]))
                    break
    print(f"{r['id']} | {r['form']} -> {hits}")
