import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
ady_freq_path = Path('data/corpus/frequency/lexeme_freq_ady.json')
kbd_freq_path = Path('data/corpus/frequency/lexeme_freq_kbd.json')

lex = json.loads(lex_path.read_text(encoding='utf-8'))
ady_freq = json.loads(ady_freq_path.read_text(encoding='utf-8'))
kbd_freq = json.loads(kbd_freq_path.read_text(encoding='utf-8'))

# 2) Guncelle
guncellenen = 0
bulunamayan = 0

for l in lex:
    form = l.get('form', '')
    if not form:
        continue
    
    # Frekans
    ady = ady_freq.get(form, 0)
    kbd = kbd_freq.get(form, 0)
    toplam = ady + kbd
    
    if toplam > 0:
        if l.get('corpusFrequency') != toplam:
            l['corpusFrequency'] = toplam
            guncellenen += 1
    else:
        bulunamayan += 1

# 3) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')

print(f"Guncellenen: {guncellenen}")
print(f"Bulunamayan: {bulunamayan}")
print(f"Toplam: {len(lex)}")
