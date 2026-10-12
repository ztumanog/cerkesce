import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter
import re

# Kelimeler
kelimeler = ["тэтэжъ", "тэтэ", "тат", "татэ", "ситат", "ситэтэжъ", "адэ", "дадэ", "адэшхуэ", "тэтэжь"]

sonuclar = Counter()
ornekler = {}

# 1) JSONL dosyalari
jsonl_files = list(Path("data/corpus/raw").glob("*.jsonl"))
print(f"=== {len(jsonl_files)} JSONL ===")

for jsonl_file in jsonl_files:
    if "bak" in jsonl_file.name:
        continue
    try:
        with jsonl_file.open(encoding="utf-8") as f:
            for line in f:
                for kelime in kelimeler:
                    pattern = r'\b' + re.escape(kelime) + r'\b'
                    bulunan = re.findall(pattern, line)
                    if bulunan:
                        sonuclar[kelime] += len(bulunan)
                        if kelime not in ornekler:
                            ornekler[kelime] = line[:100]
    except Exception as e:
        print(f"HATA {jsonl_file.name}: {e}")

# 2) Frekans dosyalari
freq_files = list(Path("data/corpus/frequency").glob("*.json"))
for freq_file in freq_files:
    if "frekans" in freq_file.name or "lexeme" in freq_file.name:
        try:
            data = json.loads(freq_file.read_text(encoding="utf-8"))
            if isinstance(data, dict):
                for kelime in kelimeler:
                    if kelime in data:
                        sonuclar[kelime] += data[kelime]
        except:
            pass

print("\n=== KELIME FREKANSLARI ===")
for kelime, sayi in sonuclar.most_common():
    if sayi > 0:
        print(f"  {kelime:15} {sayi:5} kez")
        if kelime in ornekler:
            print(f"    Ornek: {ornekler[kelime][:80]}")
