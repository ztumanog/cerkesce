import json
from pathlib import Path

# Mevcut lexemes
lex = json.loads(Path('public/data/linguistic/lexemes.json').read_text(encoding='utf-8'))
mevcut_ids = {e['id'] for e in lex}
print(f'✅ Mevcut: {len(mevcut_ids)} kelime')

# Sözlük dosyalarını bul
dict_files = list(Path('data/dictionaries').glob('*.json'))
print(f'📁 Toplam sözlük dosyaları: {len(dict_files)} adet\n')

# KBD dosyalarını filtrele
kbd_files = [f for f in dict_files if 'kbd' in f.name.lower()]
print(f'🇦🇩 KBD dosyaları: {len(kbd_files)} adet')

# En büyük KBD sözlüğünü bul
largest_kbd = None
largest_size = 0

for kbd_file in kbd_files:
    try:
        content = json.loads(kbd_file.read_text(encoding='utf-8'))
        if isinstance(content, list):
            size = len(content)
        elif isinstance(content, dict):
            size = len(content.get('entries', content.get('data', [])))
        else:
            size = 0
        print(f'  📊 {kbd_file.name}: {size} kayıt')
        if size > largest_size:
            largest_size = size
            largest_kbd = kbd_file
    except:
        pass

if largest_kbd:
    print(f'\n🏆 En büyük: {largest_kbd.name} ({largest_size} kayıt)')
    largest_data = json.loads(largest_kbd.read_text(encoding='utf-8'))
    if isinstance(largest_data, dict):
        entries = largest_data.get('entries', largest_data.get('data', []))
    else:
        entries = largest_data
    print(f'📥 Yüklenen: {len(entries)} kayıt')
    
    yeni = []
    for idx, entry in enumerate(entries[:5000]):
        entry_id = entry.get('id') or f'L-kbd-{idx}'
        if entry_id not in mevcut_ids:
            yeni_entry = {
                'id': entry_id,
                'form': entry.get('form') or entry.get('word') or entry.get('lemma') or '',
                'literalMeaning': entry.get('meaning') or entry.get('definition') or '',
                'language': 'kbd',
                'sourceLanguage': 'kbd',
                'sourceId': largest_kbd.stem,
                'partOfSpeech': entry.get('pos') or entry.get('partOfSpeech') or 'noun',
                'conceptId': entry.get('conceptId') or f'CONCEPT_KBD_{idx}'
            }
            yeni.append(yeni_entry)
    
    yeni_4000 = yeni[:4000]
    output_path = Path('extracted_4000_kbd_words.json')
    output_path.write_text(json.dumps(yeni_4000, ensure_ascii=False, indent=2), encoding='utf-8')
    
    print(f'\n🎉 Başarılı!')
    print(f'📁 Dosya: {output_path}')
    print(f'📊 Yeni: {len(yeni_4000)} kelime')
else:
    print('❌ KBD sözlüğü bulunamadı!')
