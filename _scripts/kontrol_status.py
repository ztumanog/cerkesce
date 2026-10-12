import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

p = Path("docs/PROJECT_STATUS.md")
content = p.read_text(encoding="utf-8")

# Once kontrol et
print("Mevcut baslik:")
print(content[:500])
