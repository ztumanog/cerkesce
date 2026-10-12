import json
from pathlib import Path

# 1) Oku
kbd_path = Path('data/corpus/frequency/lexeme_freq_kbd.json')
lex_path = Path('public/data/linguistic/lexemes.json')

kbd = json.loads(kbd_path.read_text(encoding='utf-8'))
lex = json.loads(lex_path.read_text(encoding='utf-8'))

lex_formlar = {l['form'] for l in lex if l.get('form')}

print(f"KBD frekans: {len(kbd)}")
print(f"Lexemes: {len(lex)}")
print(f"Lexemes form: {len(lex_formlar)}")

# 2) Eksikler
eksik = {form: freq for form, freq in kbd.items() if form not in lex_formlar}
print(f"Eksik: {len(eksik)}")

# 3) En yuksek 50
print("\n=== EN YUKSEK 50 EKSIK ===")
sorted_eksik = sorted(eksik.items(), key=lambda x: -int(x[1]))[:50]
for i, (form, freq) in enumerate(sorted_eksik, 1):
    print(f"  {i}. {form}: {freq}")

# 4) Kaydet
cikti = {
    'toplam_kbd': len(kbd),
    'lexemes': len(lex),
    'eksik': len(eksik),
    'ilk_5000': dict(sorted_eksik[:5000]) if len(sorted_eksik) >= 5000 else dict(sorted_eksik)
}

out_path = Path('data/eksik_frekans_kelimeler.json')
out_path.write_text(json.dumps(cikti, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nKaydedildi: {out_path}")
