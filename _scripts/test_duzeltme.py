import json
from pathlib import Path

lex = json.loads(Path('public/data/linguistic/lexemes.json').read_text(encoding='utf-8'))
freq_ady = json.loads(Path('data/corpus/frequency/lexeme_freq_ady.json').read_text(encoding='utf-8'))
freq_kbd = json.loads(Path('data/corpus/frequency/lexeme_freq_kbd.json').read_text(encoding='utf-8'))

# Düzeltilen 10 lexeme'i test et
test_ids = ['L-GUETYNEGHE', 'L-NE1EY', 'L-NEZHAN', 'L-NEF', 'L-NEF1',
            'L-BZEBZA', 'L-PEBZHE', 'L-DZEGHUE', 'L-KUAPEZADE', 'L-ANEKUESHH']

for lid in test_ids:
    l = next((x for x in lex if x['id'] == lid), None)
    if not l: continue
    form = l.get('form', '')
    ady = l.get('dialectVariants', {}).get('adyghe', form)
    kbd = l.get('dialectVariants', {}).get('kabardian', form)
    a = freq_ady.get(ady, 0)
    k = freq_kbd.get(kbd, 0)
    print(f"{lid:20} form={form:15} ady={ady:15} kbd={kbd:15} A={a} K={k}")
