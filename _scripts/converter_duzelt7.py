import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

# 1) Satir 45'teki шъэ kuralini sil
icerik = icerik.replace(
    "    c = c.replace(/шъэ/g, 'щэ');\n",
    ""
)

# 2) En sona (return'den once) ekle
# return c; satirini bul
if "return c;" in icerik:
    icerik = icerik.replace(
        "    return c;",
        "    // EN SON: шъэ -> щэ\n    c = c.replace(/шъэ/g, 'щэ');\n    return c;"
    )
    print("шъэ kurali en sona tasindi")

f.write_text(icerik, encoding="utf-8")
print("DialectConverter.ts guncellendi")
