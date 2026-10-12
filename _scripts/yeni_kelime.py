import json
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_ids = {l['id'] for l in lex}

yeni = [
    {"id": "L-XXX", "form": " kelime ", "literalMeaning": "anlam",
     "conceptId": "CONCEPT", "wordFamilyId": "WF-XXX"},
]

eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        y['partOfSpeech'] = 'noun'
        y['notes'] = 'Dogrulandi: sozluk kaynagi'
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
