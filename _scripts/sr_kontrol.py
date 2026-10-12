import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# Runtime'daki dosyayi kontrol et
f = Path("src/domain/linguistic/SemanticRelation.ts")
if f.exists():
    icerik = f.read_text(encoding="utf-8")
    print("=== SemanticRelation.ts ICERIGI ===")
    print(icerik[:500])
    print("...")
