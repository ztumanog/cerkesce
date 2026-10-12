import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

adr = list(Path("docs").rglob("ADR-*.md"))
print(f"ADR: {len(adr)}")
for a in sorted(adr)[:15]:
    print(f"  {a.name}")

readme = Path("README.md")
print(f"README: {'VAR' if readme.exists() else 'YOK'}")

api = list(Path("docs").rglob("*api*.md"))
print(f"API doc: {len(api)}")

user = list(Path("docs").rglob("*kullanici*.md")) + list(Path("docs").rglob("*user*.md"))
print(f"Kullanici: {len(user)}")

test = list(Path("docs").rglob("*test*.md"))
print(f"Test: {len(test)}")

all_docs = list(Path("docs").rglob("*.md"))
print(f"\nToplam: {len(all_docs)}")
