import json
from pathlib import Path

# Belirsiz kayıtları oku
belirsiz = []
with open("_scripts/ne_otomatik_rapor.txt", encoding="utf-8") as f:
    for line in f:
        if line.startswith("  ") and "|" in line:
            parts = line.strip().split("|")
            if len(parts) >= 2:
                belirsiz.append((parts[0].strip(), parts[1].strip()[:50]))

# 30'arlı gruplara böl
out = Path("_scripts/ne_belirsiz_gruplar")
out.mkdir(exist_ok=True)

GRUP_BOYUT = 30
gruplar = [belirsiz[i:i+GRUP_BOYUT] for i in range(0, len(belirsiz), GRUP_BOYUT)]

for i, grup in enumerate(gruplar, 1):
    dosya = out / f"belirsiz-{i:02d}.txt"
    with open(dosya, "w", encoding="utf-8") as f:
        f.write(f"# нэ- BELİRSİZ — Grup {i}/{len(gruplar)} — {len(grup)} kayıt\n")
        f.write(f"# Bu kelimelerin göz/yüz ile ilgisi YOK olabilir!\n")
        f.write(f"# Kategoriler: Işık | Üzüntü | Yaş | Din | Görünürlük | Karşılaştırma | Utanç | BAŞKA\n")
        f.write("=" * 130 + "\n\n")
        f.write(f"{'FORM':<25} | {'ANLAM':<50} | {'YENİ_CONCEPT':<15} | {'YENİ_AİLE':<20}\n")
        f.write("-" * 130 + "\n")
        for form, anlam in grup:
            f.write(f"{form:<25} | {anlam:<50} | {'?':<15} | {'?':<20}\n")

print(f"Toplam belirsiz: {len(belirsiz)}")
print(f"Grup sayisi: {len(gruplar)}")
for i, g in enumerate(gruplar, 1):
    print(f"  belirsiz-{i:02d}.txt: {len(g)}")
