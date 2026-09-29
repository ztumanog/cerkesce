import re
import unicodedata

# Debug test dosyasini oku
with open("src/tests/domain/discovery/Debug_Ӏэ.test.ts", encoding="utf-8") as f:
    content = f.read()

# resolver.resolve('...') icindeki karakteri bul
matches = re.findall(r"resolve\('([^']+)'\)", content)
for m in matches:
    print(f"=== resolve('{m}') ===")
    for i, char in enumerate(m):
        code = ord(char)
        name = unicodedata.name(char, "BILINMEYEN")
        print(f"  [{i}] U+{code:04X} - {char} - {name}")
    print()

# WordFamilyResolver.ts'deki resolveConcept metodunu oku
with open("src/domain/discovery/services/WordFamilyResolver.ts", encoding="utf-8") as f:
    resolver_content = f.read()

# resolveConcept metodunu bul
match = re.search(r"resolveConcept\([^)]*\)[^{]*\{(.*?)\n  \}", resolver_content, re.DOTALL)
if match:
    print("=== WordFamilyResolver.resolveConcept ===")
    print(match.group(0)[:500])
