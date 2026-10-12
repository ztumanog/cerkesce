import json
import re
from pathlib import Path

# 1. Ham JSON oku
raw_path = Path("data/grammar/roots-30-raw.json")
content = raw_path.read_text(encoding="utf-8")

# 2. [cite: ...] kısımlarını sil
content = re.sub(r'\[cite:[^\]]*\]', '', content)

# 3. Fazla boşlukları temizle
content = re.sub(r'\s+', ' ', content)
content = re.sub(r'\s*([\[\]{},:])\s*', r'\1', content)

# 4. JSON parse et
try:
    roots = json.loads(content)
    print(f"✅ Toplam kök: {len(roots)}")
except json.JSONDecodeError as e:
    print(f"❌ JSON hatası: {e}")
    print(f"İlk 500 karakter: {content[:500]}")
    exit(1)

# 5. Temiz JSON kaydet
out_path = Path("data/grammar/roots-30.json")
out_path.write_text(json.dumps(roots, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Kaydedildi: {out_path}")

# 6. İlk 5
print("\n=== İlk 5 ===")
for r in roots[:5]:
    print(f"  {r['form']:15s} | {r['rootIds']} | {r['wordFamilyId']}")
