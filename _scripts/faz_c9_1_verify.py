import sys
sys.stdout.reconfigure(encoding='utf-8')
import json
from pathlib import Path

# === 1) Verileri yükle ===
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

freq_ady_path = Path('data/corpus/frequency/lexeme_freq_ady.json')
freq_kbd_path = Path('data/corpus/frequency/lexeme_freq_kbd.json')
freq_ady = json.loads(freq_ady_path.read_text(encoding='utf-8'))
freq_kbd = json.loads(freq_kbd_path.read_text(encoding='utf-8'))

# === 2) Frekanssız lexeme'leri bul ===
sifir = [l for l in lex if not l.get('corpusFrequency') or l['corpusFrequency'] == 0]
print(f"Frekanssiz: {len(sifir)} lexeme\n")

# === 3) Her biri için corpus'ta ara ===
sonuclar = []
bulunan = 0
bulunmayan = 0

for l in sifir:
    lid = l['id']
    form = l.get('form', '')
    variants = l.get('dialectVariants', {})
    ady_form = variants.get('adyghe', form)
    kbd_form = variants.get('kabardian', form)
    
    # ADY ve KBD'de ara
    ady_freq = freq_ady.get(ady_form, 0)
    kbd_freq = freq_kbd.get(kbd_form, 0)
    toplam = ady_freq + kbd_freq
    
    if toplam > 0:
        bulunan += 1
        durum = 'BULUNDU'
    else:
        bulunmayan += 1
        durum = 'YOK'
    
    sonuclar.append({
        'id': lid,
        'form': form,
        'ady': ady_form,
        'kbd': kbd_form,
        'ady_freq': ady_freq,
        'kbd_freq': kbd_freq,
        'toplam': toplam,
        'durum': durum
    })

# === 4) Sonuçları yazdır ===
print("=" * 70)
print("C-9.1 CORPUS DOGRULAMA SONUCLARI")
print("=" * 70)
print(f"Toplam lexeme  : {len(lex)}")
print(f"Frekanssiz     : {len(sifir)}")
print(f"Bulunan        : {bulunan}")
print(f"Bulunmayan     : {bulunmayan}")
print(f"Kapsam         : %{bulunan/len(sifir)*100:.1f}")
print()

# === 5) Detaylı liste ===
print("DETAYLI SONUCLAR:")
print("-" * 70)
for s in sorted(sonuclar, key=lambda x: -x['toplam']):
    print(f"  {s['id']:25} {s['form']:20} ADY={s['ady_freq']:6} KBD={s['kbd_freq']:6} => {s['durum']}")

# === 6) JSON'a kaydet ===
rapor_path = Path('data/corpus/frequency/c9_1_verification.json')
rapor_path.write_text(json.dumps({
    'toplam': len(lex),
    'frekanssiz': len(sifir),
    'bulunan': bulunan,
    'bulunmayan': bulunmayan,
    'kapsam_yuzde': round(bulunan/len(sifir)*100, 1),
    'sonuclar': sonuclar
}, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nRapor kaydedildi: {rapor_path}")
