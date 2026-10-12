import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter
import re

# 1) Lexeme'leri yukle
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Lexeme: {len(lex)}\n")

# 2) Mэз ve turevlerini ara
kelimeler = ["мэз", "мэзы", "мэзым", "мэзхэр", "мэзыжъ", "мэзкъогъум", "мэзлъапэ", "мэзщыгъуэ"]

# 3) Mevcut lexeme'lerde ara
print("=== MEVCUT LEXEMELERDE ===")
for l in lex:
    form = l.get("form", "")
    if any(k in form.lower() for k in ["мэз", "mez"]):
        print(f"  {l['id']:25} {form:20} {l.get('literalMeaning','')}")

# 4) JSONL korpus tara
print("\n=== KORPUS TARAMASI ===")
sonuclar = Counter()
ornekler = {}

jsonl_files = list(Path("data/corpus/raw").glob("*.jsonl"))
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
                            ornekler[kelime] = line[:150]
    except Exception as e:
        print(f"HATA {jsonl_file.name}: {e}")

print("=== KELIME FREKANSLARI ===")
for kelime, sayi in sonuclar.most_common():
    if sayi > 0:
        print(f"  {kelime:15} {sayi:5} kez")
        if kelime in ornekler:
            print(f"    Ornek: {ornekler[kelime][:100]}")
