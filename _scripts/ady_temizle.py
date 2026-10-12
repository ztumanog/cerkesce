import json
from pathlib import Path

# Diamond örnekleri yükle
diamond_path = Path("_scripts/diamond_ornekler.json")
diamond = json.loads(diamond_path.read_text(encoding="utf-8"))
print(f"Toplam ◊ örnek: {len(diamond)}")

# ADY olanları çıkar (kaynak dosyasında "Ady" geçenler)
temiz = {}
ady_sayisi = 0
kbd_sayisi = 0

for word, data in diamond.items():
    source = data.get("source", "")
    # ADY kaynakları çıkar
    if "Ady" in source and "Kbd" not in source:
        ady_sayisi += 1
        continue
    # KBD kaynakları tut
    if "Kbd" in source or "Kabardey" in source or "Nalchik" in source:
        kbd_sayisi += 1
        temiz[word] = data

print(f"ADY çıkarılan: {ady_sayisi}")
print(f"KBD kalan: {kbd_sayisi}")
print(f"Toplam temiz: {len(temiz)}")

# Örnek göster
print("\n=== İlk 10 temiz örnek ===")
for k, v in list(temiz.items())[:10]:
    print(f"  {k} ({v['source']}):")
    for ex in v["examples"][:1]:
        print(f"    ◊ {ex[:80]}")

# Kaydet
Path("_scripts/diamond_ornekler_kbd.json").write_text(
    json.dumps(temiz, ensure_ascii=False, indent=2), encoding="utf-8"
)
print("\nOK Kaydedildi: _scripts/diamond_ornekler_kbd.json")
