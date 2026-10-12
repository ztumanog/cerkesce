import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

# 1) шъэ kurali ekle (en basa)
icerik = icerik.replace(
    "    let c = word;\n\n    // EN BASTA: чъыгы -> жыг\n    c = c.replace(/чъыгы/g, 'жыг');",
    "    let c = word;\n\n    // EN BASTA: ozel kurallar\n    c = c.replace(/чъыгы/g, 'жыг');\n    c = c.replace(/шъэ/g, 'щэ');\n    c = c.replace(/шъхьащэ/g, 'щхьэшэ');"
)

f.write_text(icerik, encoding="utf-8")
print("DialectConverter.ts guncellendi")
