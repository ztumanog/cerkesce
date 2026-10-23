import json, pathlib

FORMLAR = ["къуэпсы", "къуэкӀэмыщӀэ", "къуажэхь"]
DOSYALAR = ["1.Ady-Ady_AP.json", "8.Ady-Tur_Huvaj.json"]
kok = pathlib.Path("public/data")

for ad in DOSYALAR:
    p = kok / ad
    if not p.exists():
        print(f"YOK: {p}")
        continue
    metin = p.read_text(encoding="utf-8-sig", errors="ignore")
    print(f"\n######## {ad} ########")
    for f in FORMLAR:
        i = 0
        sayi = 0
        while True:
            i = metin.find(f, i)
            if i < 0 or sayi >= 4:
                break
            sayi += 1
            parca = metin[max(0, i - 150): i + len(f) + 150].replace("\n", " ")
            print(f"\n--- {f} #{sayi} ---")
            print(parca)
            i += len(f)
