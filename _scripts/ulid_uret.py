import json
from pathlib import Path

try:
    from ulid import ULID
except ImportError:
    import subprocess
    subprocess.check_call(['py', '-m', 'pip', 'install', 'python-ulid'])
    from ulid import ULID

# 1) lexemes.json'dan kavramlari al
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

kavramlar = sorted(set(l['conceptId'] for l in lex if l.get('conceptId')))
print(f"Mevcut kavram: {len(kavramlar)}")

# 2) Mevcut ULID'leri oku
ts_path = Path('src/domain/concept/ConceptRegistry.ts')
ts_content = ts_path.read_text(encoding='utf-8') if ts_path.exists() else ''

import re
mevcut_ulid = {}
for match in re.finditer(r'^\s+([A-Z_]+):\s*[\x27"](01ARZ[^\x27"]+)[\x27"]', ts_content, re.MULTILINE):
    mevcut_ulid[match.group(1)] = match.group(2)

print(f"Mevcut ULID: {len(mevcut_ulid)}")

# 3) Mapping olustur
mapping = {}
yeni_ulid = 0
for kavram in kavramlar:
    if kavram in mevcut_ulid:
        mapping[kavram] = mevcut_ulid[kavram]
    else:
        mapping[kavram] = str(ULID())
        yeni_ulid += 1

print(f"Yeni ULID uretildi: {yeni_ulid}")
print(f"Toplam mapping: {len(mapping)}")

# 4) Mapping kaydet
mapping_path = Path('public/data/linguistic/concept_mapping.json')
mapping_path.write_text(json.dumps(mapping, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Mapping kaydedildi: {mapping_path}")

# 5) Ornek
print("\n=== ORNEK ===")
for k in list(mapping.keys())[:10]:
    print(f"  {k} -> {mapping[k]}")
