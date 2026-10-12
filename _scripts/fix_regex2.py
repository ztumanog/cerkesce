from pathlib import Path

file = Path('src/infra/ui/KnowledgeExplorerViewService.ts')
content = file.read_text(encoding='utf-8')

old = "[A-Z0-9_-]+) \\|[^|]*\\| `"
new = "[A-Za-z0-9_-]+)\\s*\\|[^|]*\\|\\s*`"

if old in content:
    content = content.replace(old, new)
    file.write_text(content, encoding='utf-8')
    print('OK')
else:
    print('HATA')
