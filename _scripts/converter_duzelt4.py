import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

# 1) шъэ kuralini en sona tasi
icerik = icerik.replace(
    '    c = c.replace(/шъэ/g, "щэ");\n',
    ''
)

# 2) чъыгы kurallarini en sona tasi
icerik = icerik.replace(
    "    c = c.replace(/чъыгы/g, 'жыгы');\n    c = c.replace(/чъыг(?=ы)/g, 'жыг');\n    c = c.replace(/чъыг/g, 'жыг');\n",
    ''
)

# 3) En sona ekle (return'den once)
icerik = icerik.replace(
    "    // PHASE 6: FINAL",
    "    // PHASE 6.5: SON KURALLAR\n    c = c.replace(/шъэ/g, \"щэ\");\n    c = c.replace(/чъыгы/g, 'жыг');\n    c = c.replace(/чъыг/g, 'жыг');\n    // PHASE 6: FINAL"
)

f.write_text(icerik, encoding="utf-8")
print("DialectConverter.ts guncellendi (son kurallar eklendi)")
