import json
from pathlib import Path
from collections import defaultdict, Counter

lex_path = Path("public/data/linguistic/lexemes.json")
roots_path = Path("public/data/linguistic/roots.json")

lex = json.loads(lex_path.read_text(encoding="utf-8"))
roots = json.loads(roots_path.read_text(encoding="utf-8"))

# Mevcut root ID'leri
existing_roots = {r.get("id") for r in roots if r.get("id")}
print(f"Mevcut root sayisi: {len(existing_roots)}")

# Lexeme'lerdeki tum rootIds
lexeme_roots = Counter()
for l in lex:
    for rid in l.get("rootIds", []):
        lexeme_roots[rid] += 1

print(f"Lexeme'lerdeki unique root: {len(lexeme_roots)}")
print(f"Lexeme'lerdeki toplam kullanim: {sum(lexeme_roots.values())}")

# Kiril iceren root'lar
kiril_roots = [r for r in lexeme_roots if any('\u0400' <= c <= '\u04FF' for c in r)]
latin_roots = [r for r in lexeme_roots if r not in kiril_roots]

print(f"\n=== DAGILIM ===")
print(f"Kiril root: {len(kiril_roots)}")
print(f"Latin root: {len(latin_roots)}")

# roots.json'da olmayanlar
eksik = [r for r in lexeme_roots if r not in existing_roots]
print(f"\nroots.json'da OLMAYAN: {len(eksik)}")

# Kiril -> Latin donusumu icin basit harita
KIRIL_TO_LATIN = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E',
    'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'KH', 'Ц': 'TS', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH',
    'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA',
    'Ӏ': 'I', 'ӏ': 'I',
}

def kiril_to_latin(s):
    result = []
    for c in s:
        if c in KIRIL_TO_LATIN:
            result.append(KIRIL_TO_LATIN[c])
        elif c == '-':
            result.append('-')
        elif c.isascii():
            result.append(c.upper())
        else:
            result.append(c)
    return ''.join(result)

# Kiril root'lari Latin'e cevir
kiril_to_latin_map = {}
for kr in kiril_roots:
    lr = kiril_to_latin(kr)
    if lr not in kiril_to_latin_map:
        kiril_to_latin_map[lr] = []
    kiril_to_latin_map[lr].append((kr, lexeme_roots[kr]))

# Cakismalar
cakismalar = {lr: krs for lr, krs in kiril_to_latin_map.items() if len(krs) > 1}
print(f"\n=== CAKISMALAR ===")
print(f"Cakisma grubu: {len(cakismalar)}")
for lr, krs in sorted(cakismalar.items(), key=lambda x: -sum(k[1] for k in x[1]))[:20]:
    print(f"  {lr}:")
    for kr, count in sorted(krs, key=lambda x: -x[1]):
        print(f"    {kr} ({count} kullanim)")

# En cok kullanilan Latin root'lar
print(f"\n=== EN COK KULLANILAN LATIN ROOT'LAR ===")
latin_sorted = sorted([(r, lexeme_roots[r]) for r in latin_roots], key=lambda x: -x[1])[:30]
for r, count in latin_sorted:
    durum = "✅" if r in existing_roots else "❌ (roots.json'da yok)"
    print(f"  {r:20s} {count:5d} {durum}")

# Eksik root'lar
print(f"\n=== EKSIK ROOT'LAR (ilk 30) ===")
eksik_sorted = sorted(eksik, key=lambda r: -lexeme_roots[r])[:30]
for r in eksik_sorted:
    print(f"  {r:25s} {lexeme_roots[r]:5d}")
