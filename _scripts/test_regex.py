import re
from pathlib import Path

content = Path('docs/architecture/adr/ADR_INDEX.md').read_text(encoding='utf-8')
lines = content.split('\n')

# Test regex on line 151 (0-indexed 150)
line = lines[150]
print(f'Satir 151: {line}')
print()

# Hangi regex match?
match = re.search(r'\|\s*(ADR[-_][A-Z0-9_-]+)\s*\|', line)
if match:
    print(f'Match: [{match.group(1)}]')
else:
    print('MATCH YOK!')
