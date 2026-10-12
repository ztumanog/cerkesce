import json
from pathlib import Path

# Wiktionary dosyalarini bul
print("=== Wiktionary dosyalari ===")
for f in Path("_scripts").glob("*wiktionary*"):
    print(f"  {f.name} ({f.stat().st_size / 1024:.1f} KB)")

for f in Path("_scripts").glob("*wiki*"):
    if "wiktionary" not in f.name.lower():
        print(f"  {f.name} ({f.stat().st_size / 1024:.1f} KB)")

# data klasorunde de ara
print("\n=== data/ altinda ===")
for f in Path("data").rglob("*wiki*"):
    print(f"  {f} ({f.stat().st_size / 1024:.1f} KB)")

# public/data altinda
print("\n=== public/data/ altinda ===")
for f in Path("public/data").rglob("*wiki*"):
    print(f"  {f} ({f.stat().st_size / 1024:.1f} KB)")
