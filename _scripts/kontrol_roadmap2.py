import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path
p = Path("docs/ROADMAP.md")
content = p.read_text(encoding="utf-8")
print(content[:800])
