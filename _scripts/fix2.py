from pathlib import Path
file = Path('src/infra/ui/KnowledgeExplorerViewService.ts')
content = file.read_text(encoding='utf-8')
old = r"/\|\s*(ADR[-_][A-Z0-9_-]+)\s*\|[^|]*\|\s*`([^`]+\.md)`/gi"
new = r"/\|\s*(ADR[-_][A-Za-z0-9_-]+)\s*\|[^|]*\|\s*`([^`]+\.md)`/gi"
if old in content:
    content = content.replace(old, new)
    file.write_text(content, encoding='utf-8')
    print('OK')
else:
    print('Bulunamadi')
