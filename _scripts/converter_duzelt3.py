import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

# 1) шъуы kuralini duzelt - sadece шъуы'yi yakalasin, шъэ'yi degil
icerik = icerik.replace(
    '    c = c.replace(/шъуы/g, "___F___ы");',
    '    c = c.replace(/шъуы/g, "___F___ы");\n    c = c.replace(/шъэ/g, "щэ");'
)

# 2) чъыгы kuralini duzelt - once чъыгы, sonra чъыг
icerik = icerik.replace(
    "    c = c.replace(/чъыгы/g, 'жыгы');\n    c = c.replace(/чъыг/g, 'жыг');",
    "    c = c.replace(/чъыгы/g, 'жыгы');\n    c = c.replace(/чъыг(?=ы)/g, 'жыг');\n    c = c.replace(/чъыг/g, 'жыг');"
)

f.write_text(icerik, encoding="utf-8")
print("DialectConverter.ts guncellendi")
