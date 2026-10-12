import re
from pathlib import Path

content = Path('docs/architecture/adr/ADR_INDEX.md').read_text(encoding='utf-8')
lines = content.split('\n')

# Satır 151 ve 162'yi test et
for line_num in [150, 151, 152, 161, 162, 163]:
    if line_num < len(lines):
        line = lines[line_num]
        match = re.search(r'\|\s*(ADR[-_][A-Z0-9_-]+)\s*\|', line)
        print(f'Satir {line_num+1}:')
        print(f'  Icerik: {line[:80]}')
        if match:
            print(f'  Match: [{match.group(1)}]')
        else:
            print(f'  Match YOK')
        print()
