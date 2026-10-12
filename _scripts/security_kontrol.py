import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# Mevcut testleri kontrol et
tests = list(Path("src/tests").rglob("*.test.ts"))
security_tests = [t for t in tests if "security" in t.name.lower()]

print(f"Toplam test dosyasi: {len(tests)}")
print(f"Security test dosyasi: {len(security_tests)}")
for t in security_tests:
    print(f"  - {t.name}")

# Package.json'da guvenlik paketleri var mi?
import json
pkg = json.loads(Path("package.json").read_text(encoding="utf-8"))
deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
guvenlik = {k: v for k, v in deps.items() if any(x in k.lower() for x in ["security", "helmet", "cors", "csrf", "xss", "owasp"])}
print(f"\nGuvenlik paketleri: {guvenlik}")
