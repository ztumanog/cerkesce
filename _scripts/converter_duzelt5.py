import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

# 1) шъхьащэ -> щхьэшэ (щхьэщэ degil)
icerik = icerik.replace(
    "c = c.replace(/шъхьащэ/g, 'щхьэщэ');",
    "c = c.replace(/шъхьащэ/g, 'щхьэшэ');"
)

# 2) чъыгы kuralini en basa al (PHASE 1 oncesi)
icerik = icerik.replace(
    "    let c = word;",
    "    let c = word;\n\n    // EN BASTA: чъыгы -> жыг\n    c = c.replace(/чъыгы/g, 'жыг');"
)

f.write_text(icerik, encoding="utf-8")
print("DialectConverter.ts guncellendi")
