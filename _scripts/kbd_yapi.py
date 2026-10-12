import json
from pathlib import Path
freq_kbd = json.loads(Path('data/corpus/frequency/lexeme_freq_kbd.json').read_text(encoding='utf-8'))
print(f"KBD kayit: {len(freq_kbd)}")
for i, (k, v) in enumerate(list(freq_kbd.items())[:5]):
    print(f"  {k}: {v}")
