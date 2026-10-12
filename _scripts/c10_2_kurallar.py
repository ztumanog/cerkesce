import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path
import re

f = Path("src/domain/linguistic/DialectConverter.ts")
c = f.read_text(encoding="utf-8")

# PHASE 5.5'i bul
if "PHASE 5.5" in c:
    print("PHASE 5.5 zaten var")
else:
    print("PHASE 5.5 eklenecek")

# Yeni PHASE 5.5
yeni = """
    // PHASE 5.5: C-10.2 YENI FONETIK KURALLAR (ADY -> KBD)
    // Yeni diyalekt ciftleri icin
    c = c.replace(/гъусэ/g, 'гусэ');
    c = c.replace(/джэд/g, 'зэд');
    c = c.replace(/чъыгы/g, 'щыгы');
    c = c.replace(/цӀы/g, 'дзӀы');
    c = c.replace(/пӀэ/g, 'Ӏэ');
    c = c.replace(/тӀы/g, 'Ӏы');
    c = c.replace(/кӀэ/g, 'чэ');

"""

marker = "// PHASE 6"
if marker in c:
    c = c.replace(marker, yeni + marker)
    f.write_text(c, encoding="utf-8")
    print("OK: PHASE 5.5 eklendi (7 yeni kural)")
else:
    print("HATA: PHASE 6 bulunamadi")
