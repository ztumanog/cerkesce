import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
roots_path = Path('public/data/linguistic/roots.json')

lex = json.loads(lex_path.read_text(encoding='utf-8'))
roots = json.loads(roots_path.read_text(encoding='utf-8'))

mevcut_ids = {l['id'] for l in lex}
mevcut_root_ids = {r['id'] for r in roots}

# 2) Yeni lexeme
yeni_lexemes = [
    {"id": "L-KUANDZH", "form": "къандж", "literalMeaning": "saksagan",
     "wordFamilyId": "WF-KUANDZH", "conceptId": "MAGPIE",
     "partOfSpeech": "noun",
     "notes": "Aig (2006); Tharkaho (1991); Lash (2013); Enstitusu (2011)",
     "dialectVariants": {"adyghe": "къандж", "kabardian": "къанжэ"}},
]

# 3) Yeni root
yeni_roots = [
    {"id": "R-KUANDZH", "form": "къандж", "primaryMeaning": "saksagan",
     "ipa": "/qʷaːndʒ/",
     "secondaryMeanings": [],
     "semanticDomains": ["animal", "bird"],
     "dialectVariants": {"adyghe": "къандж", "kabardian": "къанжэ"},
     "wordFamily": {
         "id": "WF-KUANDZH",
         "lexemeIds": ["L-KUANDZH"],
         "conceptIds": ["MAGPIE"],
         "morphemeIds": [],
         "productivity": {"totalLexemes": 1, "corpusFrequency": 0},
         "notes": "Kus ailesi - saksagan"
     },
     "notes": "Aig (2006); Tharkaho (1991)"}
]

# 4) Ekle
eklenen_lex = 0
for y in yeni_lexemes:
    if y['id'] not in mevcut_ids:
        lex.append(y)
        eklenen_lex += 1
        print(f"Lexeme eklendi: {y['id']} - {y['form']}")

eklenen_root = 0
for r in yeni_roots:
    if r['id'] not in mevcut_root_ids:
        roots.append(r)
        eklenen_root += 1
        print(f"Root eklendi: {r['id']} - {r['form']}")

# 5) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
roots_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding='utf-8')

print(f"\nLexeme eklenen: {eklenen_lex}")
print(f"Root eklenen: {eklenen_root}")
print(f"Toplam lexeme: {len(lex)}")
print(f"Toplam root: {len(roots)}")
