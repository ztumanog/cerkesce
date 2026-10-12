"""
shchy_tara_v2.py — Kok + ek eslesmesi ile tara
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import csv
import os
import re
from pathlib import Path

PROJE_KOKU = Path("E:/projeler/Cerkesce")
CIKTI_DOSYA = "_scripts/shchy_03_sonuc.csv"

# Aranacak kelimeler
KELIMELER = "щыпхъу,щыпхъуэн,щыпхыкӀын,щыпхэн,щыпщӏэр,щыпэ,щыпэкӀун,щыпэлъагъу,щыпэлъф,щыпэлъху,щыпэлӀ,щыпэшэж,щыр,щыри,щырыщ,щырэ,щыс,щысащ,щысу,щысхьын,щысхьыншэу,щысщ,щысыгъ,щысын,щысэ,щысэтехыпӏэ,щысэтехыпӏэу,щысэтехыпӏэхэр,щысэу,щыт,щыта,щытакъым,щытам,щытами,щытамэ,щытапхъэ,щытар,щытат,щытатэмэ,щытауэ,щытахэм,щытахэр,щытащ,щытепщэ,щыткъым,щытми,щытмэ,щытт,щытти,щыту,щытхъоу,щытхъу,щытхъугъ,щытхъуи,щытхъукӀей,щытхъун,щытхъуныгъэ,щытхъупс,щытхъур,щытхъухь,щытхъушхо,щытхъушхор,щытхъущэн,щытхъын,щытхэм,щытхэр,щытхэу,щытщ,щытыгъ,щытыгъэ,щытыгъэмэ,щытыгъэп,щытыгъэр,щытгъэх,щытыкӏэ,щытыкӏэм,щытыкӏэр,щытыкӏэхэр,щытым,щытын"

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04C0')
    return text.strip().lower()

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
                    key = normalize(sp)
                    if key not in spelling_map:
                        spelling_map[key] = []
                    spelling_map[key].append(wdata)
            sozlukler[f.name] = {
                "title": data.get("title", f.name),
                "from": data.get("fromLang", "?"),
                "to": data.get("toLang", "?"),
                "spelling_map": spelling_map,
            }
        except Exception as e:
            print(f"HATA {f.name}: {e}")
    return sozlukler

def anlam_cikar(data):
    for field in ["translation", "meaning", "definition"]:
        if field in data and data[field]:
            return str(data[field])[:100]
    html = data.get("full_definition_in_html", "")
    if html:
        return re.sub(r'<[^>]+>', '', str(html))[:100].strip()
    return ""

def ara(kelime, sozlukler):
    """Tam eslesme + kok eslesmesi"""
    key = normalize(kelime)
    bulunan = []

    # Kok: son 2-3 harfi at (ekleri kirp)
    kok = key
    for uzunluk in [len(key), len(key)-1, len(key)-2, len(key)-3]:
        if uzunluk < 3:
            break
        kok = key[:uzunluk]

        for fname, s in sozlukler.items():
            for sp_key, entries in s["spelling_map"].items():
                # Tam eslesme
                if sp_key == key or sp_key == kok:
                    for data in entries:
                        anlam = anlam_cikar(data)
                        if anlam:
                            bulunan.append({
                                "sozluk": fname,
                                "anlam": anlam,
                                "eslesme": "tam" if sp_key == key else "kok",
                            })
                    break

    return bulunan

def main():
    print("Sozlukler yukleniyor...")
    sozlukler = sozlukleri_yukle()
    print(f"{len(sozlukler)} sozluk yuklendi")
    print("=" * 70)

    kelimeler = [k.strip() for k in KELIMELER.split(",") if k.strip()]
    print(f"{len(kelimeler)} kelime taraniyor...\n")

    satirlar = []
    for kelime in kelimeler:
        bulunan = ara(kelime, sozlukler)
        if bulunan:
            ilk = bulunan[0]
            print(f"[OK] {kelime}")
            print(f"     {ilk['sozluk']} ({ilk['eslesme']})")
            print(f"     {ilk['anlam']}")
            satirlar.append({
                "form": kelime,
                "anlam": ilk["anlam"][:80],
                "kaynak": ilk["sozluk"][:30],
                "eslesme": ilk["eslesme"],
            })
        else:
            print(f"[YOK] {kelime}")
            satirlar.append({
                "form": kelime,
                "anlam": "",
                "kaynak": "",
                "eslesme": "",
            })

    cikti = Path(CIKTI_DOSYA)
    cikti.parent.mkdir(parents=True, exist_ok=True)
    with open(cikti, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["FORM", "ANLAM", "KAYNAK", "ESLESME"])
        for s in satirlar:
            writer.writerow([s["form"], s["anlam"], s["kaynak"], s["eslesme"]])

    print("=" * 70)
    print(f"CSV yazildi: {cikti}")
    ok = sum(1 for s in satirlar if s["anlam"])
    print(f"Bulunan: {ok}, Bulunamayan: {len(satirlar) - ok}")

if __name__ == "__main__":
    main()
