import json
from pathlib import Path
from collections import defaultdict

# 1) Yedek
lex_path = Path('public/data/linguistic/lexemes.json')
roots_path = Path('public/data/linguistic/roots.json')
wf_path = Path('public/data/linguistic/word_families.json')

# Yedek al
for p in [roots_path, wf_path]:
    bak = p.with_suffix(p.suffix + '.bak-pre-unify')
    bak.write_text(p.read_text(encoding='utf-8'), encoding='utf-8')
    print(f"Yedek: {bak}")

# 2) Oku
lex = json.loads(lex_path.read_text(encoding='utf-8'))
roots = json.loads(roots_path.read_text(encoding='utf-8'))
wf = json.loads(wf_path.read_text(encoding='utf-8'))

# 3) Lexemes'ten conceptId iliskisi
wf_concepts = defaultdict(set)
for l in lex:
    if l.get('wordFamilyId') and l.get('conceptId'):
        wf_concepts[l['wordFamilyId']].add(l['conceptId'])

# 4) WF'leri root'a bagla
wf_by_root = {}
for w in wf:
    rid = w.get('rootId')
    if rid:
        wf_by_root[rid] = w

# 5) Yeni roots yapisi
yeni_roots = []
islenen_wf_ids = set()

for root in roots:
    rid = root['id']
    aile = wf_by_root.get(rid)

    yeni = dict(root)
    if aile:
        wfid = aile['id']
        islenen_wf_ids.add(wfid)
        yeni['wordFamily'] = {
            'id': wfid,
            'lexemeIds': aile.get('lexemeIds', []),
            'conceptIds': sorted(wf_concepts.get(wfid, set())),
            'morphemeIds': aile.get('morphemeIds', []),
            'productivity': aile.get('productivity', {}),
            'notes': aile.get('notes', ''),
        }
    else:
        # Ailesi yok, bos aile olustur
        yeni['wordFamily'] = {
            'id': f'WF-{rid[2:]}',
            'lexemeIds': [],
            'conceptIds': [],
            'morphemeIds': [],
            'productivity': {'totalLexemes': 0, 'corpusFrequency': 0},
            'notes': 'Bos aile - sonra doldurulacak'
        }
    yeni_roots.append(yeni)

# 6) Root'u olmayan aileler icin minimal root
for w in wf:
    if w['id'] not in islenen_wf_ids:
        rid = w.get('rootId')
        if not rid:
            continue
        print(f"Root'suz aile: {w['id']} (rootId: {rid})")
        minimal_root = {
            'id': rid,
            'form': '?',
            'ipa': '',
            'primaryMeaning': w.get('notes', '?'),
            'secondaryMeanings': [],
            'semanticDomains': [],
            'dialectVariants': {},
            'wordFamily': {
                'id': w['id'],
                'lexemeIds': w.get('lexemeIds', []),
                'conceptIds': sorted(wf_concepts.get(w['id'], set())),
                'morphemeIds': w.get('morphemeIds', []),
                'productivity': w.get('productivity', {}),
                'notes': w.get('notes', ''),
            },
            'notes': f'Minimal root - {w["id"]} icin olusturuldu'
        }
        yeni_roots.append(minimal_root)

# 7) Yaz
roots_path.write_text(
    json.dumps(yeni_roots, ensure_ascii=False, indent=2),
    encoding='utf-8'
)

# 8) word_families.json'u arsivle
wf_archive = wf_path.with_suffix('.json.archived')
wf_archive.write_text(
    json.dumps(wf, ensure_ascii=False, indent=2),
    encoding='utf-8'
)

print(f"\nToplam root: {len(yeni_roots)}")
print(f"Arsivlenen WF: {wf_archive}")
print(f"conceptIds dolu aile: {sum(1 for r in yeni_roots if r['wordFamily']['conceptIds'])}")