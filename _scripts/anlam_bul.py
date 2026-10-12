import json
import re
from pathlib import Path

# 1) Eksik kokler
eksik_kokler = json.loads(Path('data/eksik_kokler.json').read_text(encoding='utf-8'))
ilk_5000 = eksik_kokler['ilk_5000']
print(f"Eksik kok: {len(ilk_5000)}")

# 2) Sozlukleri yukle
data_dir = Path('public/data')
sozlukler = {}
for f in data_dir.glob('*.json'):
    if f.name in ['dictionaries.json', 'dictionaries copy.json']:
        continue
    try:
        sozlukler[f.name] = json.loads(f.read_text(encoding='utf-8'))
    except:
        pass

print(f"Sozluk: {len(sozlukler)}")

def html_to_text(html):
    if not html:
        return ''
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:200]

def anlam_bul(form):
    """Sozluklerden anlam bul"""
    anlamlar = []
    
    for sozluk_name, sozluk in sozlukler.items():
        # entries
        entries = None
        if isinstance(sozluk, dict):
            entries = sozluk.get('entries') or sozluk.get('words')
        
        if not entries:
            continue
        
        if isinstance(entries, dict):
            if form in entries:
                entry = entries[form]
                if isinstance(entry, dict):
                    anlam = html_to_text(entry.get('full_definition_in_html', ''))
                    if not anlam and entry.get('definitions'):
                        anlam = entry['definitions'][0].get('meaning', '')
                    if anlam:
                        anlamlar.append({
                            'kaynak': sozluk_name,
                            'anlam': anlam
                        })
        elif isinstance(entries, list):
            for item in entries:
                if isinstance(item, dict):
                    if item.get('form') == form or item.get('spelling') == form:
                        anlam = item.get('meaning') or item.get('full_definition_in_html', '')
                        anlam = html_to_text(anlam) if anlam else ''
                        if anlam:
                            anlamlar.append({
                                'kaynak': sozluk_name,
                                'anlam': anlam
                            })
    
    return anlamlar[:3]  # Ilk 3 anlam

# 3) Anlam bul
sonuc = {}
for i, (form, freq) in enumerate(list(ilk_5000.items())[:100], 1):
    anlamlar = anlam_bul(form)
    sonuc[form] = {
        'frekans': freq,
        'anlamlar': anlamlar
    }
    print(f"\n{i}. {form} ({freq})")
    for a in anlamlar:
        print(f"   [{a['kaynak']}] {a['anlam'][:80]}")

# 4) Kaydet
Path('data/eksik_anlamlar.json').write_text(
    json.dumps(sonuc, ensure_ascii=False, indent=2),
    encoding='utf-8'
)
print(f"\nKaydedildi: data/eksik_anlamlar.json")
