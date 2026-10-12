import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
c = f.read_text(encoding="utf-8")

# Eski kuralı bul ve değiştir
eski = """    // C-11.2.1: ц -> дз
    c = c.replace(/цыгъо/g, 'дзыгъуэ');
    c = c.replace(/ц/g, 'дз');
    // C-11.2.1: гъо -> гъуэ
    c = c.replace(/гъо/g, 'гъуэ');"""

yeni = """    // C-11.2.1: ц -> дз (цӏ'yi koru)
    c = c.replace(/цӏ/g, '___TS1___');
    c = c.replace(/цыгъо/g, 'дзыгъуэ');
    c = c.replace(/ц/g, 'дз');
    c = c.replace(/гъо/g, 'гъуэ');
    c = c.replace(/___TS1___/g, 'цӏ');"""

if eski in c:
    c = c.replace(eski, yeni)
    f.write_text(c, encoding="utf-8")
    print("OK: цӏ koruma eklendi")
else:
    print("HATA: Eski kural bulunamadi")
    print(c[:2000])
