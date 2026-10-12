import re
from pathlib import Path

index_path = Path('docs/architecture/adr/ADR_INDEX.md')
content = index_path.read_text(encoding='utf-8')
lines = content.split('\n')

print('=== ONCE ===')
print(f'Toplam satir: {len(lines)}')

# 1. Duplicate COMPLETION APPROVALS basliklarini say
completion_count = sum(1 for l in lines if '## COMPLETION APPROVALS' in l)
print(f'COMPLETION APPROVALS basligi: {completion_count} kez')

# 2. Fiziksel dosyaya gore dedupe
seen_physical = {}
new_lines = []
removed = 0

for line in lines:
    is_table = line.strip().startswith('|')
    
    if is_table:
        id_match = re.search(r'\|\s*(ADR[-_][A-Z0-9_-]+)\s*\|', line)
        file_match = re.search(r'`([^`]+\.md)`', line)
        
        if id_match and file_match:
            physical = file_match.group(1).strip()
            
            if physical in seen_physical:
                removed += 1
                continue
            else:
                seen_physical[physical] = True
                new_lines.append(line)
                continue
    
    new_lines.append(line)

# 3. Duplicate COMPLETION APPROVALS basligini sil
final_lines = []
completion_seen = 0

for line in new_lines:
    if '## COMPLETION APPROVALS' in line:
        completion_seen += 1
        if completion_seen > 1:
            continue
    final_lines.append(line)

# 4. Orphaned ADR ekle
orphan_id = 'ADR-ROOT-002'
orphan_file = 'ADR-ROOT-002-ROOT-WORDFAMILY-UNIFICATION.md'
has_orphan = any(orphan_id in l and orphan_file in l for l in final_lines)

if not has_orphan:
    orphan_line = f'| {orphan_id} | Root WordFamily Unification | `{orphan_file}` | Accepted | 4 |'
    insert_idx = None
    for i, l in enumerate(final_lines):
        if 'ADR-ROOT-001' in l:
            insert_idx = i + 1
            break
    if insert_idx:
        final_lines.insert(insert_idx, orphan_line)
    else:
        final_lines.append(orphan_line)
    print(f'Orphaned eklendi: {orphan_id}')

# 5. Yaz
result = '\n'.join(final_lines)
index_path.write_text(result, encoding='utf-8')

print(f'\n=== SONRA ===')
print(f'Eski satir: {len(lines)}')
print(f'Yeni satir: {len(final_lines)}')
print(f'Silinen duplicate: {removed}')
