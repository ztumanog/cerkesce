import json
from pathlib import Path

# 1. missing-words yükle
missing = json.loads(Path("data/corpus/missing-words.json").read_text(encoding="utf-8"))

# 2. lexemes yükle
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
mevcut = {l.get("form", "").lower() for l in lex if l.get("form")}

print(f"Mevcut lexemes: {len(lex)}")
print(f"Mevcut form: {len(mevcut)}")

# 3. Kalan eksikleri hesapla
kalan_kbd = [w for w in missing["kbd"] if w["word"].lower() not in mevcut]
kalan_ady = [w for w in missing["ady"] if w["word"].lower() not in mevcut]

print(f"\n=== Kalan eksik ===")
print(f"KBD: {len(kalan_kbd)}")
print(f"ADY: {len(kalan_ady)}")
print(f"Toplam: {len(kalan_kbd) + len(kalan_ady)}")

# 4. En yüksek frekanslı 20
kalan_hepsi = kalan_kbd + kalan_ady
kalan_hepsi.sort(key=lambda x: -x["freq"])

print(f"\n=== En yüksek 30 ===")
for w in kalan_hepsi[:30]:
    print(f"  {w['word']:20s} freq: {w['freq']}")

# 5. Frekans dağılımı
print(f"\n=== Frekans dağılımı ===")
for esik in [1000, 500, 100, 50, 10, 5, 1]:
    sayi = sum(1 for w in kalan_hepsi if w["freq"] >= esik)
    print(f"  freq >= {esik}: {sayi}")
