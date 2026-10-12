import json
import re
from pathlib import Path
from ulid import ULID

# 1) Mapping oku
mapping_path = Path('public/data/linguistic/concept_mapping.json')
mapping = json.loads(mapping_path.read_text(encoding='utf-8'))

# 2) Koddan kullanilan kavramlari al
src_dir = Path('src')
kullanilan = set()
for ts_file in src_dir.rglob('*.ts'):
    if 'tests' in str(ts_file):
        continue
    content = ts_file.read_text(encoding='utf-8')
    matches = re.findall(r'CONCEPT_REGISTRY\.([A-Z0-9_]+)', content)
    kullanilan.update(matches)

print(f"Kodda kullanilan: {len(kullanilan)}")
print(f"Mapping'te olan: {len(mapping)}")

# 3) Eksikler
eksik = sorted(kullanilan - set(mapping.keys()))
print(f"\nEksik: {len(eksik)}")
for e in eksik:
    print(f"  - {e}")

# 4) Ekle
for e in eksik:
    mapping[e] = str(ULID())

mapping_path.write_text(json.dumps(mapping, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nYeni mapping: {len(mapping)}")
