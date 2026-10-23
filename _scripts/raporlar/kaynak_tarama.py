import pathlib

FORMLAR = ["къуэпсы", "къуэлабэ", "къуэкӀэмыщӀэ", "къуажедээс", "къуажехь", "къуажэхь"]
kok = pathlib.Path("public")

for f in FORMLAR:
    kacis = f.encode("unicode_escape").decode()
    print(f"== {f} ==")
    toplam = 0
    for p in sorted(kok.rglob("*.json")):
        try:
            t = p.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        n = t.count(f) + t.count(kacis)
        if n:
            toplam += n
            print(f"  {n:>5}  {p}")
    print(f"  toplam={toplam}")
