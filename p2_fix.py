# -*- coding: utf-8 -*-
import json, os, glob
BASE = r"E:\projeler\Cerkesce"
# sozluk.json yoksa en buyuk jsonu bul
SOZLUK = os.path.join(BASE, "sozluk.json")
if not os.path.exists(SOZLUK):
    print(f"{SOZLUK} yok, en buyuk JSON araniyor...")
    files = glob.glob(os.path.join(BASE, "**/*.json"), recursive=True)
    if not files:
        print("HIC JSON BULUNAMADI")
        exit(1)
    SOZLUK = max(files, key=lambda p: os.path.getsize(p))
    print(f"BULUNDU: {SOZLUK} ({os.path.getsize(SOZLUK)} byte)")
with open(SOZLUK, 'r', encoding='utf-8') as f:
    data = json.load(f)
print(f"Giris: {len(data)} kayit")
IMLA_IDS = ["R-BZHYXHU","R-GUBGHWE","R-GUENYH","R-ILHES","R-ISH","R-NEKH","R-SHCHISH","R-SHIPLR","R-SHITE","R-TXU"]
IMLA_FORMS = ["bzhyxhu","gubghwe","guenyh","ilhes","ish","nekh","shchish","shiplr","shite","txu"]
temiz = []
silinen = []
for r in data:
    fid = str(r.get('id','')).strip().upper()
    fform = str(r.get('form','')).strip().lower()
    if fid in IMLA_IDS or fform in IMLA_FORMS:
        silinen.append(r)
        print(f"SILINDI: {r.get('id')} | {r.get('form')}")
    else:
        temiz.append(r)
print(f"\nSilinen: {len(silinen)} Kalan: {len(temiz)}")
out = os.path.join(BASE, "sozluk_P2_imlafix_temiz.json")
with open(out, 'w', encoding='utf-8') as f:
    json.dump(temiz, f, ensure_ascii=False, indent=2)
print(f"YAZILDI: {out}")
