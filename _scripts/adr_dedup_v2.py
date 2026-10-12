import re
from pathlib import Path

index_path = Path('docs/architecture/adr/ADR_INDEX.md')
lines = index_path.read_text(encoding='utf-8').split('\n')

print('=== ONCE ===')
print(f'Toplam satir: {len(lines)}')

seen = {}
new_lines = []
removed = 0

for i, line in enumerate(lines):
    if line.strip().startswith('|'):
        m = re.search(r'\|\s*(ADR[-_][A-Za-z0-9_-]+)\s*\|', line)
        if m:
            canonical = m.group(1)
            if canonical in seen:
                print(f'  Satir {i+1} silindi: [{canonical}]')
                removed += 1
                continue
            seen[canonical] = i
    new_lines.append(line)

result = '\n'.join(new_lines)
index_path.write_text(result, encoding='utf-8')

print(f'\n=== SONRA ===')
print(f'Eski: {len(lines)}')
print(f'Yeni: {len(new_lines)}')
print(f'Silinen: {removed}')
