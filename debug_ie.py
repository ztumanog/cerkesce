import re
import unicodedata

# WordFamilyConceptMap.ts'i oku
with open("src/domain/discovery/services/WordFamilyConceptMap.ts", encoding="utf-8") as f:
    content = f.read()

# Ӏэ ailesini bul (tam blok)
match = re.search(r"('Ӏэ':\s*\{[^}]*\})", content, re.DOTALL)
if match:
    block = match.group(1)
    print("=== Ӏэ ailesi blogu ===")
    print(block)
    print()

# Bu blogun icindeki anahtarlari bul
keys = re.findall(r"'([^']+)':", block)
print("=== Ӏэ ailesindeki anahtarlar ===")
for key in keys:
    codes = [f"U+{ord(c):04X}" for c in key]
    print(f"  '{key}' - {codes}")
else:
    print("Ӏэ ailesi bulunamadi!")

# WordFamilyConceptMap'in tum root'larini bul (sadece en dis seviye)
print("\n=== conceptMap root'lari (en dis seviye) ===")
# Basit yaklasim: '...': { ile baslayan satirlar
roots = re.findall(r"^\s{2}'([^']+)':\s*\{", content, re.MULTILINE)
for root in roots:
    codes = [f"U+{ord(c):04X}" for c in root]
    print(f"  '{root}' - {codes}")
