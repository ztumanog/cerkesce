import csv
import sys
from pathlib import Path

KAYNAK = Path(r"E:\projeler\Cerkesce\sonuc.csv")
CIKTI_KLASOR = Path(r"E:\projeler\Cerkesce\bulunamadi_gruplar")
GRUP_BOYUTU = 100

# Kaynak dosya kontrolü
if not KAYNAK.exists():
    print(f"HATA: '{KAYNAK}' dosyası bulunamadı!")
    print("Lütfen önce sözlük taramasını yapıp 'sonuc.csv' dosyasını oluşturun.")
    sys.exit(1)

# Çıktı klasörünü oluştur
CIKTI_KLASOR.mkdir(exist_ok=True)
print(f"Çıktı klasörü hazır: {CIKTI_KLASOR}")

# CSV oku
try:
    with KAYNAK.open(encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        
        # Sütun isimlerini kontrol et
        if reader.fieldnames and "sonuc" not in reader.fieldnames:
            print(f"HATA: 'sonuc' sütunu bulunamadı!")
            print(f"Mevcut sütunlar: {reader.fieldnames}")
            sys.exit(1)
            
        satirlar = [r for r in reader if r.get("sonuc") == "BULUNAMADI"]
except Exception as e:
    print(f"CSV okuma hatası: {e}")
    sys.exit(1)

print(f"Toplam BULUNAMADI: {len(satirlar)}")

if not satirlar:
    print("BULUNAMADI kaydı yok, işlem yapılmadı.")
    sys.exit(0)

# Gruplara böl ve kaydet
for i in range(0, len(satirlar), GRUP_BOYUTU):
    grup = satirlar[i:i + GRUP_BOYUTU]
    no = i // GRUP_BOYUTU + 1
    yol = CIKTI_KLASOR / f"grup_{no:02d}.csv"
    with yol.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(["id", "form"])
        for r in grup:
            w.writerow([r.get("id", ""), r.get("form", "")])
    print(f"{yol.name}: {len(grup)} kayıt")

print(f"\n✅ İşlem tamam. Dosyalar: {CIKTI_KLASOR}")
