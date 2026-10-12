import re
from pathlib import Path

index_path = Path('docs/architecture/adr/ADR_INDEX.md')
content = index_path.read_text(encoding='utf-8')
lines = content.split('\n')

print('=== ONCE ===')
print(f'Toplam satir: {len(lines)}')

# Canonical bazli dedupe - ILK gorulen tutulur
seen_canonical = {}
new_lines = []
removed_count = 0
removed_details = []

for i, line in enumerate(lines):
    is_table = line.strip().startswith('|')
    
    if is_table:
        id_match = re.search(r'\|\s*(ADR[-_][A-Z0-9_-]+)\s*\|', line)
        
        if id_match:
            canonical = id_match.group(1).strip()
            
            if canonical in seen_canonical:
                removed_count += 1
                removed_details.append(f'  Satir {i+1}: [{canonical}]')
                continue
            else:
                seen_canonical[canonical] = i
                new_lines.append(line)
                continue
    
    new_lines.append(line)

# Yaz
result = '\n'.join(new_lines)
index_path.write_text(result, encoding='utf-8')

print(f'\n=== SILINEN ===')
for d in removed_details:
    print(d)

print(f'\n=== SONRA ===')
print(f'Eski satir: {len(lines)}')
print(f'Yeni satir: {len(new_lines)}')
print(f'Silinen duplicate: {removed_count}')
