import json
from pathlib import Path
from collections import Counter

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

# 1) Bos conceptId'ler
bos = [l for l in lex if not l.get('conceptId')]
print(f"Bos conceptId: {len(bos)}")

# 2) WordFamilyId -> ConceptId mapping
# Mevcut dolu kayitlardan ogren
wf_to_concept = {}
for l in lex:
    wf = l.get('wordFamilyId')
    cid = l.get('conceptId')
    if wf and cid:
        if wf not in wf_to_concept:
            wf_to_concept[wf] = Counter()
        wf_to_concept[wf][cid] += 1

# 3) En cok kullanilan concept
print("\n=== WF -> CONCEPT MAPPING (ornek) ===")
for wf, counter in list(wf_to_concept.items())[:20]:
    en_cok = counter.most_common(1)[0]
    print(f"  {wf} -> {en_cok[0]} ({en_cok[1]} kez)")

# 4) Doldur
doldurulan = 0
for l in lex:
    if l.get('conceptId'):
        continue
    wf = l.get('wordFamilyId')
    if wf and wf in wf_to_concept:
        en_cok = wf_to_concept[wf].most_common(1)[0][0]
        l['conceptId'] = en_cok
        doldurulan += 1

print(f"\nDoldurulan: {doldurulan}")

# 5) Kalan bos
kalan_bos = [l for l in lex if not l.get('conceptId')]
print(f"Kalan bos: {len(kalan_bos)}")

# 6) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nToplam: {len(lex)}")
