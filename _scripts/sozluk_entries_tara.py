import json
import re
from pathlib import Path
from collections import defaultdict

# 1) Sozluk dosyalari
data_dir = Path('public/data')
sozluk_dosyalari = [f for f in data_dir.glob('*.json') 
                   if f.name not in ['dictionaries.json', 'dictionaries copy.json']]

print(f"Sozluk dosyasi: {len(sozluk_dosyalari)}")

# 2) Mevcut lexemes
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_formlar = {l['form'] for l in lex if l.get('form')}

print(f"Mevcut form: {len(mevcut_formlar)}")

# 3) HTML'den anlam cikar
def html_to_text(html):
    if not html:
        return ''
    # HTML tag'lerini temizle
    text = re.sub(r'<[^>]+>', ' ', html)
    # Fazla bosluklari temizle
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:200]

# 4) Her sozluk dosyasini incele
tum_formlar = defaultdict(list)
toplam_kayit = 0

for sozluk_path in sozluk_dosyalari:
    try:
        data = json.loads(sozluk_path.read_text(encoding='utf-8'))
        
        # entries dizisini bul
        entries = None
        if isinstance(data, dict):
            entries = data.get('entries')
        
        if not entries:
            print(f"  {sozluk_path.name}: entries yok")
            continue
        
        kayit = 0
        for form, entry in entries.items():
            if not form or not isinstance(form, str) or len(form) < 2:
                continue
            
            # Anlam cikar
            anlam = ''
            if isinstance(entry, dict):
                anlam = html_to_text(entry.get('full_definition_in_html', ''))
            
            tum_formlar[form].append({
                'kaynak': sozluk_path.name,
                'anlam': anlam
            })
            kayit += 1
        
        toplam_kayit += kayit
        print(f"  {sozluk_path.name}: {kayit} kelime")
    except Exception as e:
        print(f"  HATA: {sozluk_path.name} - {e}")

print(f"\nToplam kayit: {toplam_kayit}")
print(f"Toplam farkli form: {len(tum_formlar)}")

# 5) Eksik formlari bul
eksik = {form: kaynaklar for form, kaynaklar in tum_formlar.items() 
         if form not in mevcut_formlar}

print(f"Eksik form: {len(eksik)}")

# 6) Ilk 50 eksik
print("\n=== ILK 50 EKSIK ===")
for i, (form, kaynaklar) in enumerate(sorted(eksik.items())[:50]):
    anlam = kaynaklar[0]['anlam'] if kaynaklar else '?'
    print(f"  {form} -> {anlam[:80]}")

# 7) Kaydet
cikti = {
    'toplam_form': len(tum_formlar),
    'mevcut_form': len(mevcut_formlar),
    'eksik_form': len(eksik),
    'eksikler': {form: kaynaklar for form, kaynaklar in sorted(eksik.items())[:3000]}
}

cikti_path = Path('data/eksik_kelimeler.json')
cikti_path.write_text(json.dumps(cikti, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nKaydedildi: {cikti_path}")
