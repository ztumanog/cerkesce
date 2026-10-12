from pathlib import Path

file = Path('src/infra/governance/AdrValidator.ts')
content = file.read_text(encoding='utf-8')

# Gercek eski string (kopyala-yapistir)
old = "const regex = /\\| (ADR[-_][A-Z0-9_-]+) \\|[^|]*\\| `([^`]+\\.md)`/gi;"
new = "const regex = /\\|\\s*(ADR[-_][A-Za-z0-9_-]+)\\s*\\|[^|]*\\|\\s*`([^`]+\\.md)`/gi;"

print(f'Eski bulundu mu: {old in content}')

if old in content:
    content = content.replace(old, new)
    file.write_text(content, encoding='utf-8')
    print('OK - Regex guncellendi')
else:
    print('HATA - Eski string bulunamadi')
    # Alternatif
    old2 = "[A-Z0-9_-]+) \\|[^|]*\\| `"
    new2 = "[A-Za-z0-9_-]+)\\s*\\|[^|]*\\|\\s*`"
    if old2 in content:
        content = content.replace(old2, new2)
        file.write_text(content, encoding='utf-8')
        print('OK - Alternatif regex guncellendi')
    else:
        print('Manuel duzeltme gerekli')
