import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/tests/domain/linguistic/DialectConverter.cert.test.ts")
icerik = f.read_text(encoding="utf-8")

# shh-shchh kuralini guncelle
icerik = icerik.replace(
    "['шъхьащэ', 'щхьащэ'",
    "['шъхьащэ', 'щхьэшэ'"
)

f.write_text(icerik, encoding="utf-8")
print("DC-002 testi guncellendi: шъхьащэ -> щхьэшэ")
