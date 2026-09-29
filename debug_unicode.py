import re
import unicodedata

# WordFamilyConceptMap.ts'i oku
with open("src/domain/discovery/services/WordFamilyConceptMap.ts", encoding="utf-8") as f:
    content = f.read()

# Ӏэ ailesini bul
match = re.search(r"'([^']*э)':\s*\{", content)
if match:
    key = match.group(1)
    print(f"=== Anahtar: '{key}' ===")
    print(f"Karakter sayisi: {len(key)}")
    for i, char in enumerate(key):
        code = ord(char)
        name = unicodedata.name(char, "BILINMEYEN")
        print(f"  [{i}] U+{code:04X} - {char} - {name}")
else:
    print("Ӏэ ailesi bulunamadi!")

# Tum root anahtarlarini listele
print("\n=== Tum root anahtarlari ===")
roots = re.findall(r"^\s+'([^']+)':\s*\{", content, re.MULTILINE)
for i, root in enumerate(roots):
    codes = [f"U+{ord(c):04X}" for c in root]
    print(f"  [{i}] '{root}' - {codes}")
