import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
c = f.read_text(encoding="utf-8")

# Mevcut 3 satırı bul
eski = """    c = c.replace(/цӀы/g, 'дзӀы');
    c = c.replace(/цӏ/g, 'ЦЦЦ');
    c = c.replace(/ЦЦЦ/g, 'цӏ');"""

yeni = """    c = c.replace(/цӏ/g, 'ЦЦЦ');
    c = c.replace(/цӀы/g, 'дзӀы');
    c = c.replace(/ц/g, 'дз');
    c = c.replace(/ЦЦЦ/g, 'цӏ');"""

if eski in c:
    c = c.replace(eski, yeni)
    f.write_text(c, encoding="utf-8")
    print("OK: Siralama duzeltildi")
else:
    print("HATA: Eski kural bulunamadi")
    # Alternatif: satir satir bul
    lines = c.split("\n")
    yeni_lines = []
    for line in lines:
        if "цӀы" in line:
            # цӀы kuralını ЦЦЦ'den sonra koy
            continue
        yeni_lines.append(line)
    c = "\n".join(yeni_lines)
    # ЦЦЦ kuralından sonra ekle
    c = c.replace(
        "c = c.replace(/ЦЦЦ/g, 'цӏ');",
        "c = c.replace(/цӀы/g, 'дзӀы');\n    c = c.replace(/ЦЦЦ/g, 'цӏ');"
    )
    f.write_text(c, encoding="utf-8")
    print("OK: Alternatif duzeltme")
