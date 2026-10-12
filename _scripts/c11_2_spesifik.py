import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path
import re

f = Path("src/domain/linguistic/DialectConverter.ts")
c = f.read_text(encoding="utf-8")

# Tüm C-11.2.1 blokunu temizle
c = re.sub(r'\s*// C-11\.2\.1.*?\n\n', '\n', c, flags=re.DOTALL)

# PHASE 6'dan önce yeni blok ekle
marker = "// PHASE 6: LEXICAL SOUND LAWS"

yeni = """    // C-11.2.1: Spesifik kelimeler (once)
    c = c.replace(/цӏыфы/g, 'цӏыху');
    c = c.replace(/цыгъо/g, 'дзыгъуэ');
    // Genel kurallar (sonra)
    c = c.replace(/цӀы/g, 'дзӀы');
    c = c.replace(/гъо/g, 'гъуэ');
    
"""

if marker in c:
    c = c.replace(marker, yeni + marker)
    f.write_text(c, encoding="utf-8")
    print("OK: Spesifik kurallar eklendi")
else:
    print("HATA: PHASE 6 marker yok")
