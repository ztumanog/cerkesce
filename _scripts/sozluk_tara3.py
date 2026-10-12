import json
import re
from pathlib import Path
from collections import defaultdict

data_dir = Path('public/data')
sozluk_dosyalari = [f for f in data_dir.glob('*.json') 
                   if f.name not in ['dictionaries.json', 'dictionaries copy.json']]

print(f"Sozluk dosyasi: {len(sozluk_dosyalari)}")

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_formlar = {l['form'] for l in lex if l.get('form')}
print(f"Mevcut form: {len(mevcut_formlar)}")

def html_to_text(html):
    if not html:
        return ''
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:200]

tum_formlar = defaultdict(list)
toplam_kayit = 0

for sozluk_path in sozluk_dosyalari:
    try:
        data = json.loads(sozluk_path.read_text(encoding='utf-8'))
        
        # Meta alanlari
        META = {'id', 'title', 'fromLang', 'toLang', 'format', 'version', 'source'}
        
        # Kelimeleri bul
        kelimeler = {}
        
        if isinstance(data, dict):
            # Format 1: entries var mi?
            if 'entries' in data and isinstance(data['entries'], dict):
                kelimeler = data['entries']
            # Format 2: words var mi?
            elif 'words' in data:
                if isinstance(data['words'], list):
                    for item in data['words']:
                        if isinstance(item, dict):
                            form = item.get('form') or item.get('spelling')
                            if form:
                                kelimeler[form] = item
                elif isinstance(data['words'], dict):
                    kelimeler = data['words']
            # Format 3: Dogrudan (meta olmayan anahtarlar)
            else:
                for key, val in data.items():
                    if key not in META and isinstance(val, dict):
                        if 'spelling' in val or 'full_definition_in_html' in val:
                            kelimeler[key] = val
        
        if not kelimeler:
            print(f"  {sozluk_path.name}: 0 kelime (format tespit edilemedi)")
            continue
        
        kayit = 0
        for form, entry in kelimeler.items():
            if not form or not isinstance(form, str) or len(form) < 2:
                continue
            
            anlam = ''
            if isinstance(entry, dict):
                anlam = html_to_text(
                    entry.get('full_definition_in_html') or 
                    entry.get('meaning') or 
                    entry.get('definition') or ''
                )
            
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

eksik = {form: kaynaklar for form, kaynaklar in tum_formlar.items() 
         if form not in mevcut_formlar}
print(f"Eksik form: {len(eksik)}")

print("\n=== ILK 50 EKSIK ===")
for i, (form, kaynaklar) in enumerate(sorted(eksik.items())[:50]):
    anlam = kaynaklar[0]['anlam'] if kaynaklar else '?'
    print(f"  {form} -> {anlam[:80]}")

cikti = {
    'toplam_form': len(tum_formlar),
    'mevcut_form': len(mevcut_formlar),
    'eksik_form': len(eksik),
    'eksikler': {form: kaynaklar for form, kaynaklar in sorted(eksik.items())[:3000]}
}

cikti_path = Path('data/eksik_kelimeler.json')
cikti_path.write_text(json.dumps(cikti, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nKaydedildi: {cikti_path}")
