import re
from pathlib import Path

# Direkt test
test_line = "| ADR-P10-001-Completion | Phase 10 Completion Approval | `ADR-P10-001-PHASE_10_COMPLETION_APPROVAL.md` | Accepted | 10 |"

print(f'Test satiri: {test_line}')
print()

# Regex 1: orijinal
r1 = r'\|\s*(ADR[-_][A-Z0-9_-]+)\s*\|'
m1 = re.search(r1, test_line)
print(f'Regex 1: {r1}')
print(f'  Match: {m1.group(1) if m1 else "YOK"}')
print()

# Regex 2: basit
r2 = r'ADR[-_][A-Z0-9_-]+'
m2 = re.search(r2, test_line)
print(f'Regex 2: {r2}')
print(f'  Match: {m2.group(0) if m2 else "YOK"}')
print()

# Regex 3: pipe + ID
r3 = r'\|\s*(ADR-[A-Z0-9-]+)'
m3 = re.search(r3, test_line)
print(f'Regex 3: {r3}')
print(f'  Match: {m3.group(1) if m3 else "YOK"}')
