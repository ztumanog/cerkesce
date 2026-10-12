import json
import subprocess
from pathlib import Path

# C-8'deki lexemes.json'u Python ile al (UTF-8 garantili)
result = subprocess.run(
    ['git', 'show', 'e7e14b2:public/data/linguistic/lexemes.json'],
    capture_output=True,
    text=False  # bytes olarak al
)
c8_bytes = result.stdout

# UTF-8 olarak decode et
c8_lex = json.loads(c8_bytes.decode('utf-8'))
print(f"C-8 lexeme: {len(c8_lex)}")

# Şu anki lexeme'ler
simdiki = json.loads(Path('public/data/linguistic/lexemes.json').read_text(encoding='utf-8'))
print(f"Şimdiki: {len(simdiki)}")

# C-8'deki ID'ler
c8_map = {l['id']: l for l in c8_lex}
simdiki_ids = {l['id'] for l in simdiki}

# Bozuk olanları bul
bozuk_ids = []
for l in simdiki:
    form = l.get('form', '')
    if any(c in form for c in 'ºªËÇ╣║╗╝░▒▓│┤'):
        bozuk_ids.append(l['id'])

print(f"Bozuk: {len(bozuk_ids)}")

# Bozuk olanları C-8'den doğru formlarla değiştir
duzeltilen = 0
for l in simdiki:
    if l['id'] in bozuk_ids and l['id'] in c8_map:
        c8_lexeme = c8_map[l['id']]
        # Sadece form, ady, kbd alanlarını güncelle
        l['form'] = c8_lexeme.get('form', l['form'])
        if 'dialectVariants' in c8_lexeme:
            l['dialectVariants'] = c8_lexeme['dialectVariants']
        l['literalMeaning'] = c8_lexeme.get('literalMeaning', l.get('literalMeaning', ''))
        l['notes'] = c8_lexeme.get('notes', l.get('notes', ''))
        duzeltilen += 1
        print(f"  Duzeltildi: {l['id']} -> {l['form']}")

print(f"\nDuzeltilen: {duzeltilen}")

# Kaydet
Path('public/data/linguistic/lexemes.json').write_text(
    json.dumps(simdiki, ensure_ascii=False, indent=2),
    encoding='utf-8'
)
print("OK: lexemes.json guncellendi")
