import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
c = f.read_text(encoding="utf-8")

yeni = """
    // C-11.2.1: ц -> дз
    c = c.replace(/цыгъо/g, 'дзыгъуэ');
    c = c.replace(/ц/g, 'дз');
    // C-11.2.1: гъо -> гъуэ
    c = c.replace(/гъо/g, 'гъуэ');

"""

marker = "// PHASE 6: LEXICAL SOUND LAWS"
if marker in c and "цыгъо" not in c:
    c = c.replace(marker, yeni + marker)
    f.write_text(c, encoding="utf-8")
    print("OK: 2 yeni kural eklendi")
else:
    print("Zaten var veya marker yok")
