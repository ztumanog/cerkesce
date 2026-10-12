import json
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut = {l['form'] for l in lex}

# кIуэ ekle
if 'кIуэ' not in mevcut:
    yeni = {
        "id": "L-K1UE",
        "form": "кIуэ",
        "literalMeaning": "gelmek (kök)",
        "conceptId": "COME",
        "wordFamilyId": "WF-K1U",
        "partOfSpeech": "verb",
        "notes": "Kok - fiil"
    }
    lex.append(yeni)
    print(f"✅ Eklendi: {yeni['form']}")
else:
    print("⚠️ Zaten var: кIуэ")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Toplam: {len(lex)}")
