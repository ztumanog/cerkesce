import json
import re
from pathlib import Path

# 1) Sozlukleri yukle
data_dir = Path('public/data')
sozlukler = {}
for f in data_dir.glob('*.json'):
    if f.name in ['dictionaries.json', 'dictionaries copy.json']:
        continue
    try:
        sozlukler[f.name] = json.loads(f.read_text(encoding='utf-8'))
    except:
        pass

# 2) Aranacak kelimeler
aranacak = {
    'фӏы': 'iyi',
    'лъапӏэ': 'pahali',
    'щӏы': 'sicmak',
    'цӏэ': 'isim',
    'фӏэ': '?',
    'щӏалэ': 'genc',
    'гъащӏэ': 'omur',
    'цӏыкӏу': 'kucuk',
    'хьисэ': '?',
}

def html_to_text(html):
    if not html:
        return ''
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:200]

print("=== SOZLUK ARAMA ===\n")
for form, beklenen in aranacak.items():
    print(f"\n--- {form} ({beklenen}) ---")
    bulundu = 0
    for sozluk_name, sozluk in sozlukler.items():
        entries = None
        if isinstance(sozluk, dict):
            entries = sozluk.get('entries') or sozluk.get('words')
        
        if not entries:
            continue
        
        if isinstance(entries, dict) and form in entries:
            entry = entries[form]
            anlam = html_to_text(entry.get('full_definition_in_html', ''))
            if not anlam and entry.get('definitions'):
                anlam = entry['definitions'][0].get('meaning', '')
            print(f"  [{sozluk_name}] {anlam[:120]}")
            bulundu += 1
            if bulundu >= 3:
                break
    
    if bulundu == 0:
        print(f"  ❌ Bulunamadi")
