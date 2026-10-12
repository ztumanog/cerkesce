import json
from pathlib import Path

# Sözlük dosyalarını bul
sozluk_dir = Path("public/data")
hedef_sozlukler = []

for f in sozluk_dir.rglob("*.json"):
    fname = f.name.lower()
    if any(k in fname for k in ["abaze", "abz", "aşamez", "ashamez", "enstitü", "enstit", "kabardey-balkar", "kbd"]):
        hedef_sozlukler.append(f)

print(f"Bulunan sözlükler: {len(hedef_sozlukler)}")
for f in hedef_sozlukler[:20]:
    print(f"  {f.name}")

# İlk sözlüğü incele
if hedef_sozlukler:
    f = hedef_sozlukler[0]
    print(f"\n=== {f.name} ===")
    data = json.loads(f.read_text(encoding="utf-8"))
    if isinstance(data, list):
        print(f"  Kayıt: {len(data)}")
        if data:
            print(f"  Anahtarlar: {list(data[0].keys())}")
            # Örnek cümle var mı?
            ornek = data[0]
            for k, v in ornek.items():
                if isinstance(v, str) and len(v) > 50:
                    print(f"  {k}: {v[:200]}")
    elif isinstance(data, dict):
        print(f"  Anahtarlar: {list(data.keys())[:10]}")
