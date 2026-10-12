import json
from pathlib import Path
from collections import Counter

LEX = Path(Path("_scripts/.lexpath").read_text(encoding="utf-8").strip())
lex = json.loads(LEX.read_text(encoding="utf-8"))

print(f"Toplam kayıt: {len(lex)}")

# 1. Şema analizi — ilk 3 kaydın alanları
print("\n=== İLK 3 KAYDIN ALANLARI ===")
for i, l in enumerate(lex[:3]):
    print(f"\n[{i}] Anahtarlar: {list(l.keys())}")
    print(f"     Örnek: {json.dumps(l, ensure_ascii=False)[:400]}")

# 2. ANIMAL kategorisinin POS dağılımı
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]
print(f"\n=== ANIMAL: {len(animal)} kayıt ===")
print("POS dağılımı:", dict(Counter(l.get("pos", "?") for l in animal)))
print("isLemma dağılımı:", dict(Counter(l.get("isLemma", "?") for l in animal)))

# 3. ANIMAL'dan 20 örnek (form + anlam + pos)
print("\n=== ANIMAL'DAN 20 ÖRNEK ===")
for l in animal[:20]:
    tr = l.get("translations", {}).get("tr", "?")
    print(f"  {l.get('form', '?'):20} | {l.get('pos', '?'):10} | {tr}")

# 4. Diğer kategoriler (conceptId) — sayıları
print("\n=== TÜM CONCEPTID DAĞILIMI ===")
for cid, sayi in Counter(l.get("conceptId") for l in lex).most_common(30):
    print(f"  {cid}: {sayi}")

# 5. Mükerrer ID kontrolü
ids = [l.get("id") for l in lex if l.get("id")]
mukerrer = {k: v for k, v in Counter(ids).items() if v > 1}
print(f"\n=== MÜKERRER ID: {len(mukerrer)} farklı ID ===")
for k, v in sorted(mukerrer.items(), key=lambda x: -x[1])[:10]:
    print(f"  {k}: {v} kez")
