import json
from pathlib import Path
from collections import Counter, defaultdict

LEX = Path(Path("_scripts/.lexpath").read_text(encoding="utf-8").strip())
lex = json.loads(LEX.read_text(encoding="utf-8"))

print("=" * 70)
print("1. TÜM ANAHTARLAR (hangi alanlar var?)")
print("=" * 70)

# Tüm kayıtlarda geçen anahtarları topla
anahtarlar = Counter()
for l in lex:
    for k in l.keys():
        anahtarlar[k] += 1

for k, v in anahtarlar.most_common():
    yuzde = v / len(lex) * 100
    print(f"  {k:25} {v:6} / {len(lex)}  ({yuzde:.1f}%)")

print()
print("=" * 70)
print("2. TİP ANALİZİ (her alan hangi tipte?)")
print("=" * 70)

# Her alanın tiplerini topla
tipler = defaultdict(Counter)
ornekler = {}
for l in lex:
    for k, v in l.items():
        tip = type(v).__name__
        tipler[k][tip] += 1
        if k not in ornekler and v is not None:
            ornekler[k] = v

for k in anahtarlar:
    tip_str = ", ".join(f"{t}({c})" for t, c in tipler[k].most_common())
    print(f"  {k:25} {tip_str}")
    if k in ornekler:
        ornek = json.dumps(ornekler[k], ensure_ascii=False)
        if len(ornek) > 80:
            ornek = ornek[:77] + "..."
        print(f"  {'':25} örnek: {ornek}")

print()
print("=" * 70)
print("3. ANIMAL'DAKİ ALANLAR (kategoriye özel)")
print("=" * 70)

animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]
animal_anahtarlar = Counter()
for l in animal:
    for k in l.keys():
        animal_anahtarlar[k] += 1

for k, v in animal_anahtarlar.most_common():
    yuzde = v / len(animal) * 100
    print(f"  {k:25} {v:6} / {len(animal)}  ({yuzde:.1f}%)")

print()
print("=" * 70)
print("4. TRANSLATIONS YAPISI")
print("=" * 70)

# translations içinde hangi diller var?
diller = Counter()
for l in lex:
    tr = l.get("translations")
    if isinstance(tr, dict):
        for d in tr.keys():
            diller[d] += 1

for d, c in diller.most_common():
    print(f"  {d}: {c} kayıt")

# Örnek translations
print("\n  Örnek translations:")
for l in lex[:3]:
    tr = l.get("translations")
    if tr:
        print(f"    {l.get('form', '?')}: {json.dumps(tr, ensure_ascii=False)}")

print()
print("=" * 70)
print("5. ANIMAL'DAN 3 TAM ÖRNEK")
print("=" * 70)

for i, l in enumerate(animal[:3]):
    print(f"\n  --- ANIMAL Örnek {i+1} ---")
    print(json.dumps(l, ensure_ascii=False, indent=4)[:800])
