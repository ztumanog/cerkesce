import json
import re
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_formlar = {l['form'] for l in lex}

def html_to_text(html):
    if not html:
        return ''
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:200]

def is_kbd_word(form):
    if not form or not isinstance(form, str):
        return False
    form = form.strip()
    if len(form) < 3 or len(form) > 30:
        return False
    if form.startswith('-') or form.endswith('-'):
        return False
    if '(' in form or ')' in form:
        return False
    if ' ' in form:
        return False
    return True

def pos_map(pos):
    """POS donusumu"""
    m = {
        'noun': 'noun', 'verb': 'verb', 'adjective': 'adjective',
        'adverb': 'adverb', 'pronoun': 'pronoun', 'numeral': 'numeral',
        'preposition': 'postposition', 'conjunction': 'conjunction',
        'particle': 'particle', 'interjection': 'interjection',
    }
    return m.get(pos.lower(), 'unknown')

# 2) Yeni kelimeler
yeni = []
kaynak_sayisi = 0

# 18.Kbd-Ru&En.json
p18 = Path('public/data/18.Kbd-Ru&En.json')
if p18.exists():
    data = json.loads(p18.read_text(encoding='utf-8'))
    META = {'id', 'title', 'fromLang', 'toLang', 'format', 'version', 'source'}
    
    for form, entry in data.items():
        if form in META:
            continue
        if not isinstance(entry, dict):
            continue
        if not is_kbd_word(form):
            continue
        if form in mevcut_formlar:
            continue
        
        # Anlam
        anlam = ''
        if entry.get('definitions'):
            anlam = entry['definitions'][0].get('meaning', '')
        if not anlam:
            anlam = html_to_text(entry.get('full_definition_in_html', ''))
        
        # POS
        pos = entry.get('type', '') or 'unknown'
        
        yeni.append({
            'form': form,
            'literalMeaning': anlam[:200],
            'partOfSpeech': pos_map(pos),
            'notes': '18.Kbd-Ru&En.json',
            '_kaynak': '18.Kbd-Ru&En.json'
        })
        kaynak_sayisi += 1

print(f"18.Kbd-Ru&En.json: {kaynak_sayisi} yeni kelime")

# 3) ID uret
def make_id(form, prefix='L'):
    """Form'dan ID uret"""
    # Kiril -> Latin transliterasyon (basit)
    tr = {
        'а':'A','б':'B','в':'V','г':'G','д':'D','е':'E','ё':'E','ж':'ZH','з':'Z',
        'и':'I','й':'J','к':'K','л':'L','м':'M','н':'N','о':'O','п':'P','р':'R',
        'с':'S','т':'T','у':'U','ф':'F','х':'H','ц':'C','ч':'CH','ш':'SH','щ':'SHCH',
        'ъ':'','ы':'Y','ь':'','э':'E','ю':'YU','я':'YA',
        'Ӏ':'1','ӏ':'1','ӏ':'1',
    }
    latin = ''
    for c in form:
        latin += tr.get(c.lower(), c.upper() if c.isalpha() else '')
    latin = re.sub(r'[^A-Z0-9]', '', latin.upper())[:20]
    return f"{prefix}-{latin}"

# 4) Eklenen
eklenen = 0
for y in yeni:
    y['id'] = make_id(y['form'])
    if y['id'] in {l['id'] for l in lex}:
        continue
    
    # wordFamilyId
    y['wordFamilyId'] = f"WF-{y['id'][2:]}"
    y['conceptId'] = ''
    y['corpusFrequency'] = 0
    
    # Temizle
    del y['_kaynak']
    
    lex.append(y)
    eklenen += 1

print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")

# 5) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
