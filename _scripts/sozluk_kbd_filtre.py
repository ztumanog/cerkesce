import json
import re
from pathlib import Path
from collections import defaultdict

data_dir = Path('public/data')
sozluk_dosyalari = [f for f in data_dir.glob('*.json') 
                   if f.name not in ['dictionaries.json', 'dictionaries copy.json']]

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_formlar = {l['form'] for l in lex if l.get('form')}

def html_to_text(html):
    if not html:
        return ''
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:200]

def is_kbd_word(form):
    """KBD kelimesi mi? (Kiril, tek kelime, 3+ harf, ek degil)"""
    if not form or not isinstance(form, str):
        return False
    form = form.strip()
    
    # Cok kisa
    if len(form) < 3:
        return False
    
    # Ek (tire ile basliyor veya bitiyor)
    if form.startswith('-') or form.endswith('-'):
        return False
    
    # Parantez iceriyor
    if '(' in form or ')' in form:
        return False
    
    # Bosluk iceriyor (deyim)
    if ' ' in form:
        return False
    
    # Sadece Kiril harfleri + tire
    if not re.match(r'^[а-яА-ЯёЁӀӏ\u04C0\u04CF\u04D8\u04D9\u04E8\u04E9\u04F6\u04F7\u04FA\u04FB\u04FC\u04FD\u04FE\u04FF\u0500\u0501\u0502\u0503\u0504\u0505\u0506\u0507\u0508\u0509\u050A\u050B\u050C\u050D\u050E\u050F]+$', form):
        return False
    
    # Cok uzun (muhtemelen deyim)
    if len(form) > 30:
        return False
    
    return True

tum_formlar = defaultdict(list)
toplam_kayit = 0
kbd_kayit = 0

META = {'id', 'title', 'fromLang', 'toLang', 'format', 'version', 'source'}

for sozluk_path in sozluk_dosyalari:
    try:
        data = json.loads(sozluk_path.read_text(encoding='utf-8'))
        
        # fromLang kontrol
        from_lang = ''
        if isinstance(data, dict):
            from_lang = data.get('fromLang', '')
        
        # Sadece KBD/ADY kaynakli sozlukler
        if from_lang not in ['Kbd', 'Ady', 'ADY', 'KBD', '']:
            continue
        
        kelimeler = {}
        
        if isinstance(data, dict):
            if 'entries' in data and isinstance(data['entries'], dict):
                kelimeler = data['entries']
            elif 'words' in data:
                if isinstance(data['words'], list):
                    for item in data['words']:
                        if isinstance(item, dict):
                            form = item.get('form') or item.get('spelling')
                            if form:
                                kelimeler[form] = item
                elif isinstance(data['words'], dict):
                    kelimeler = data['words']
            else:
                for key, val in data.items():
                    if key not in META and isinstance(val, dict):
                        if 'spelling' in val or 'full_definition_in_html' in val:
                            kelimeler[key] = val
        
        if not kelimeler:
            continue
        
        kayit = 0
        for form, entry in kelimeler.items():
            toplam_kayit += 1
            
            # KBD filtresi
            if not is_kbd_word(form):
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
            kbd_kayit += 1
        
        if kayit > 0:
            print(f"  {sozluk_path.name}: {kayit} KBD kelime")
    except Exception as e:
        print(f"  HATA: {sozluk_path.name} - {e}")

print(f"\nToplam kayit: {toplam_kayit}")
print(f"KBD kelime: {kbd_kayit}")
print(f"Farkli KBD form: {len(tum_formlar)}")

eksik = {form: kaynaklar for form, kaynaklar in tum_formlar.items() 
         if form not in mevcut_formlar}
print(f"Eksik KBD form: {len(eksik)}")

print("\n=== ILK 50 EKSIK KBD ===")
for i, (form, kaynaklar) in enumerate(sorted(eksik.items())[:50]):
    anlam = kaynaklar[0]['anlam'] if kaynaklar else '?'
    print(f"  {form} -> {anlam[:80]}")

cikti = {
    'toplam_form': len(tum_formlar),
    'eksik_form': len(eksik),
    'eksikler': {form: kaynaklar for form, kaynaklar in sorted(eksik.items())[:5000]}
}

cikti_path = Path('data/eksik_kbd_kelimeler.json')
cikti_path.write_text(json.dumps(cikti, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nKaydedildi: {cikti_path}")
