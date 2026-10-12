import json
from pathlib import Path
import glob

# Lexeme'leri oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))

# Frekanssız olanlar
sifir = [l for l in lex if not l.get('corpusFrequency') or l['corpusFrequency'] == 0]
print(f"Frekanssiz: {len(sifir)} lexeme")

# Frekans dosyalarını bul
freq_files = glob.glob('data/**/lexeme_freq_*.json', recursive=True)
print(f"Frekans dosyalari: {freq_files}")

# Verification dosyalarını bul
ver_files = glob.glob('data/**/verification_*.{txt,json}', recursive=True)
print(f"Verification dosyalari: {ver_files}")

# Coverage dosyasını bul
cov_files = glob.glob('data/**/coverage_*.json', recursive=True)
print(f"Coverage dosyalari: {cov_files}")
