import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

# 1) шъу -> ф kuralini sil
icerik = icerik.replace(
    '    c = c.replace(/^шъу$/g, "ф");\n    c = c.replace(/^шъу(?=[^ы])/g, "ф");',
    '    // шъу -> ф kaldirildi (шъу -> щу olmali)'
)

# 2) чъыгы -> жыг kuralini duzelt (гы dusmesin)
icerik = icerik.replace(
    "    c = c.replace(/чъыгы/g, 'жыг');",
    "    c = c.replace(/чъыгы/g, 'жыгы');\n    c = c.replace(/чъыг/g, 'жыг');"
)

f.write_text(icerik, encoding="utf-8")
print("DialectConverter.ts guncellendi")
