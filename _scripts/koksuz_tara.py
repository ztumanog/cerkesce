"""
koksuz_tara.py — koksuz.json'daki 2228 kaydı sözlüklerde tara, CSV çıkar
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import csv
import os
import re
from pathlib import Path

PROJE_KOKU = Path("E:/projeler/Cerkesce")
CIKTI_DOSYA = "_scripts/koksuz_tarama.csv"
GIRDI_DOSYA = "koksuz.json"

def sozlukleri_yukle():
    if PROJE_KOKU.exists():
        os.chdir(PROJE_KOKU)

    data_dir = Path("public/data")
    sozlukler = {}

    for f in sorted(data_dir.glob("*.json")):
        if not f.name[0].isdigit():
            continue
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
            words = data.get("words", {})
            if not isinstance(words, dict):
                continue

            spelling_map = {}
            for w, wdata in words.items():
                if not isinstance(wdata, dict):
                    continue
                sp = wdata.get("spelling", w)
                if sp:
                    key = sp.lower()
                    if key not in spelling_map:
                        spelling_map[key] = []
                    spelling_map[key].append({
                        "spelling": sp,
                        "data": wdata
                    })

            sozlukler[f.name] = {
                "title": data.get("title", f.name),
                "from": data.get("fromLang", "?"),
                "to": data.get("toLang", "?"),
                "spelling_map": spelling_map
            }
        except Exception as e:
            print(f"HATA {f.name}: {e}")

    return sozlukler


def anlam_cikar(data):
    for field in ["translation", "meaning", "definition"]:
        if field in data and data[field]:
            return str(data[field])[:200]

    html = data.get("full_definition_in_html", "")
    if html:
        return re.sub(r'<[^>]+>', '', str(html))[:200].strip()

    return ""


def main():
    print("Sozlukler yukleniyor...")
    sozlukler = sozlukleri_yukle()
    print(f"{len(sozlukler)} sozluk yuklendi")
    print("=" * 70)

    # koksuz.json'dan kayitlari oku
    girdi_path = Path(GIRDI_DOSYA)
    if not girdi_path.exists():
        print(f"HATA: {GIRDI_DOSYA} bulunamadi")
        return

    kayitlar = json.loads(girdi_path.read_text(encoding="utf-8"))
    print(f"Toplam kayit: {len(kayitlar)}")
    print("=" * 70)

    satirlar = []
    bulunan_sayisi = 0
    bulunamayan_sayisi = 0

    for i, kayit in enumerate(kayitlar):
        kelime = kayit["form"]
        key = kelime.lower()
        bulunan = []

        for fname, s in sozlukler.items():
            if key in s["spelling_map"]:
                for entry in s["spelling_map"][key]:
                    anlam = anlam_cikar(entry["data"])
                    if anlam:
                        bulunan.append({
                            "sozluk": fname,
                            "title": s["title"][:50],
                            "anlam": anlam
                        })

        if bulunan:
            en_kisa = min(bulunan, key=lambda x: len(x["anlam"]))
            satirlar.append({
                "id": kayit["id"],
                "form": kelime,
                "anlam_ru": en_kisa["anlam"][:200],
                "kaynak": en_kisa["sozluk"],
                "bulundu": "E"
            })
            bulunan_sayisi += 1
        else:
            satirlar.append({
                "id": kayit["id"],
                "form": kelime,
                "anlam_ru": "",
                "kaynak": "",
                "bulundu": "H"
            })
            bulunamayan_sayisi += 1

        # Her 100 kayitta ilerleme
        if (i + 1) % 100 == 0:
            print(f"  {i+1}/{len(kayitlar)} islendi (bulunan: {bulunan_sayisi})")

    # CSV'ye yaz
    cikti_path = Path(CIKTI_DOSYA)
    cikti_path.parent.mkdir(parents=True, exist_ok=True)

    with open(cikti_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["ID", "FORM", "ANLAM_RU", "KAYNAK", "BULUNDU"])
        for s in satirlar:
            writer.writerow([
                s["id"],
                s["form"],
                s["anlam_ru"],
                s["kaynak"],
                s["bulundu"],
            ])

    print("=" * 70)
    print(f"CSV yazildi: {cikti_path}")
    print(f"Toplam: {len(satirlar)}")
    print(f"Bulunan: {bulunan_sayisi}")
    print(f"Bulunamayan: {bulunamayan_sayisi}")
    print(f"Kapsama: {bulunan_sayisi/len(satirlar)*100:.1f}%")


if __name__ == "__main__":
    main()