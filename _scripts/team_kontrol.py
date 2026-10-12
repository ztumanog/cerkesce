import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# Ekip dosyalarini kontrol et
print("=== EKIP KONTROL ===")

# package.json'da scripts
import json
pkg = json.loads(Path("package.json").read_text(encoding="utf-8"))
print(f"Scripts: {list(pkg.get('scripts', {}).keys())}")

# CI/CD dosyalari
ci_files = list(Path(".").rglob(".github/**/*.yml"))
print(f"CI/CD: {len(ci_files)}")
for f in ci_files:
    print(f"  {f}")

# Deployment dosyalari
deploy = list(Path(".").rglob("vercel.json")) + list(Path(".").rglob("Dockerfile"))
print(f"Deployment: {len(deploy)}")
for f in deploy:
    print(f"  {f}")

# Test dosyalari (ekip hazirligi icin)
tests = list(Path("src/tests").rglob("*.test.ts"))
print(f"\nTest dosyasi: {len(tests)}")

# Docs klasoru
docs = list(Path("docs").rglob("*.md"))
print(f"Dokuman: {len(docs)}")
