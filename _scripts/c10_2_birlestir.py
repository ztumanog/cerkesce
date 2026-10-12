import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path
import re

f = Path("src/domain/linguistic/DialectConverter.ts")
c = f.read_text(encoding="utf-8")

# TÜM PHASE 5.5 bloklarını sil
c = re.sub(r'\s*// PHASE 5\.5.*?\n\n', '\n', c, flags=re.DOTALL)

# TEK bir PHASE 5.5 ekle
yeni = """
    // PHASE 5.5: C-9.2 + C-10.2 KURALLAR (ADY -> KBD)
    c = c.replace(/гуфIэ/g, 'гушIо');
    c = c.replace(/гукIэгъу/g, 'гущIэгъу');
    c = c.replace(/гупшысэ/g, 'гупсысэ');
    c = c.replace(/шъхьащэ/g, 'щхьэщэ');
    c = c.replace(/нэшъу/g, 'нэф');
    c = c.replace(/шъыпкъэ/g, 'щыпкъэ');
    c = c.replace(/гъусэ/g, 'гусэ');
    c = c.replace(/джэд/g, 'зэд');
    c = c.replace(/чъыгы/g, 'щыгы');
    c = c.replace(/цӀы/g, 'дзӀы');
    c = c.replace(/пӀэ/g, 'Ӏэ');
    c = c.replace(/тӀы/g, 'Ӏы');
    c = c.replace(/кӀэ/g, 'чэ');

"""

marker = "// PHASE 6: LEXICAL SOUND LAWS"
if marker in c:
    c = c.replace(marker, yeni + marker, 1)
    f.write_text(c, encoding="utf-8")
    print("OK: PHASE 5.5 birlestirildi")
else:
    print("HATA: marker bulunamadi")
