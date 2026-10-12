import json
from pathlib import Path

f = Path('data/corpus/frequency/lexeme_freq_ady.json')
data = json.loads(f.read_text(encoding='utf-8'))

print(f"Tip: {type(data)}")
if isinstance(data, dict):
    print(f"Kayit sayisi: {len(data)}")
    print("Ilk 5 anahtar:")
    for i, (k, v) in enumerate(list(data.items())[:5]):
        print(f"  {k}: {v}")
        if i >= 4: break
elif isinstance(data, list):
    print(f"Liste uzunlugu: {len(data)}")
    print("Ilk 3 kayit:")
    for item in data[:3]:
        print(f"  {item}")
