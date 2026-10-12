import json
from pathlib import Path
from ulid import ULID

mapping_path = Path('public/data/linguistic/concept_mapping.json')
mapping = json.loads(mapping_path.read_text(encoding='utf-8'))

# Lexemes'teki conceptId'ler
lex = json.loads(Path('public/data/linguistic/lexemes.json').read_text(encoding='utf-8'))
lex_concepts = set(l['conceptId'] for l in lex if l.get('conceptId'))

print(f"Lexemes concept: {len(lex_concepts)}")
print(f"Mapping: {len(mapping)}")

# Eksikler
eksik = sorted(lex_concepts - set(mapping.keys()))
print(f"\nEksik: {len(eksik)}")
for e in eksik:
    print(f"  - {e}")

# Eksikleri ekle
for e in eksik:
    mapping[e] = str(ULID())
    print(f"  + {e} -> {mapping[e]}")

mapping_path.write_text(json.dumps(mapping, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nYeni mapping: {len(mapping)}")
