from pathlib import Path

file = Path('src/infra/governance/AdrValidator.ts')
content = file.read_text(encoding='utf-8')

old = r"/\|\s*(ADR[-_][A-Z0-9_-]+)\s*\|[^|]*\|\s*`([^`]+\.md)`/gi"
new = r"/\|\s*(ADR[-_][A-Za-z0-9_-]+)\s*\|[^|]*\|\s*`([^`]+\.md)`/gi"

if old in content:
    content = content.replace(old, new)
    file.write_text(content, encoding='utf-8')
    print('✅ AdrValidator.ts regex duzeltildi')
else:
    print('⚠️ Eski regex bulunamadi')
    # Alternatif eski versiyon
    old2 = r"/\|\s*(ADR[-_][A-Z0-9_-]+)\s*\|[^|]*\|\s*`([^`]+\.md)`/gi"
    if old2 in content:
        content = content.replace(old2, new)
        file.write_text(content, encoding='utf-8')
        print('✅ Alternatif regex duzeltildi')
    else:
        print('Manuel kontrol gerekli')
