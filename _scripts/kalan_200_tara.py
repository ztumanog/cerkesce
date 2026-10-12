"""
kalan_200_tara.py — Kalan 200 boş kelimeyi sözlükten tara
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import csv
import os
import re
from pathlib import Path

PROJE_KOKU = Path("E:/projeler/Cerkesce")

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
    sozluk = {}
    for f in sorted(data_dir.glob("*.json")):
        if not f.name[0].isdigit():
            continue
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
            words = data.get("words", {})
            if isinstance(words, dict):
                for w, wdata in words.items():
                    if isinstance(wdata, dict):
                        sp = wdata.get("spelling", w)
                        if sp:
                            sozluk[normalize(sp)] = sp
        except Exception as e:
            print(f"HATA {f.name}: {e}")
    return sozluk

def anlam_cikar(data):
    for field in ["translation", "meaning", "definition"]:
        if field in data and data[field]:
            return str(data[field])[:100]
    html = data.get("full_definition_in_html", "")
    if html:
        return re.sub(r'<[^>]+>', '', str(html))[:100].strip()
    return ""

def ara(kelime, sozlukler):
    key = normalize(kelime)
    bulunan = []
    # Tam eslesme
    for fname, s in sozlukler.items():
        if key in s["spelling_map"]:
            for data in s["spelling_map"][key]:
                anlam = anlam_cikar(data)
                if anlam:
                    bulunan.append({"sozluk": fname, "anlam": anlam, "eslesme": "tam"})
    return bulunan

def main():
    # Sozlukleri yukle
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
            smap = {}
            for w, wdata in words.items():
                if isinstance(wdata, dict):
                    sp = wdata.get("spelling", w)
                    if sp:
                        k = normalize(sp)
                        if k not in smap:
                            smap[k] = []
                        smap[k].append(wdata)
            sozlukler[f.name] = {"title": data.get("title", f.name), "spelling_map": smap}
        except:
            pass

    print(f"{len(sozlukler)} sozluk yuklendi")

    # 200 kelime
    KELIMELER = """щымыхъум,щыӏэкъым,щытащ,щыӏэп,щыӏэщ,щыхъум,щытхъур,щытар,щыщӏэдзауэ,щытщ,щыпкъагъэр,щытам,щыӏэныгъэм,щыӏэм,щыпкъагъэм,щытэп,щытми,щыӏэр,щыӏи,щыӏэу,щыӏащ,щыӏа,щытми,щыӏэм,щытамэ,щытынущ,щыпсэурэ,щыткъым,щыӏагъ,щыӏэт,щытыкӏэр,щыӏэу,щытахэм,щыӏэх,щыӏэр,щытыкӏэм,щытахэр,щыгъыныр,щызэхихым,щытт,щыщхэм,щыӏэныгъэр,щыӏэтэкъым,щыӏа,щыжиӏэм,щытыну,щыӏэну,щыщхэм,щытыгъэх,щытакъым,щытыр,щынэсым,щыщыткӏэ,щытхъушхор,щыщхэу,щыгъуэми,щыгъыным,щынагъом,щысщ,щыуагъэхэр,щынэм,щыту,щыщхэр,щыӏэжкъым,щыпсэухэм,щытыгъэп,щыщщ,щыщхэр,щытыгъэмэ,щыхьэту,щыхьэтхэр,щытыр,щыӏэщт,щыӏагъэхэм,щыхъукӏи,щыхъуащ,щытат,щыщми,щыпкъагъэу,щытауэ,щыӏакъым,щыӏэнущ,щытэу,щынэр,щытхэм,щыӏэмэ,щыпсэухэрэм,щыпкъагъэмрэ,щыӏэжьэп,щыӏагъэх,щыгъуазэщ,щытых,щыӏэхэу,щыпкъэхэм,щысу,щытым,щытатэмэ,щыӏагъэп,щыпачъыхьагъ,щынагъор,щыгъыу,щыщӏыхьэм,щысэу,щыӏакӏэм,щыгъуэщ,щыщым,щыпсэууэ,щыхьэтхэм,щытхъур,щыхьэтыгъэр,щыфэныгъэкӏэ,щыпсэухэрэр,щыӏагъэр,щыпкъагъэкӏэ,щытти,щымытами,щыӏэхэр,щытами,щыщи,щыӏакӏэр,щыпкъэр,щыӏэми,щылъщ,щыпсэурт,щыпсэущтых,щыӏэха,щытхъоу,щылэу,щытхэм,щысащ,щыхуэныгъэкӏэ,щыпкъэу,щыӏэху,щытхэр,щыпсэуащ,щытыщт,щытыгъэ,щыкӏагъэхэр,щынэгъончъэу,щыӏагъэ,щыуагъэм,щыхьэтщ,щытхэу,щыӏэри,щыжаӏэм,щыщӏэныгъэхэр,щыӏэжтэкъым,щыри,щымытми,щыхуежьэм,щыӏагъэхэр,щынэгъошхом,щыпсэущтыгъ,щыӏэныгъэу,щышынэу,щыхупӏэм,щымыӏэжу,щыӏауэ,щыщым,щырэ,щыӏэхэр,щысэтехыпӏэхэр,щыхуэныгъэр,щыуагъэхэм,щымытэу,щыгъыныр,щыӏэхэм,щытхъуи,щыӏэмэ,щыжиӏэкӏэ,щыпкъагъэрэ,щыхъуам,щыпсэунущ,щыхуэныгъэрэ,щытыкӏэхэр,щыщт,щыпкъэхэр,щымыӏэж,щыхуэныгъэм,щыпсэуну,щыгъуазэт,щымыщу,щысэтехыпӏэу,щыщхэми,щыщкӏи,щыӏагъэхэми,щыфэныгъэ,щыфэныр,щылъу,щыжиӏащ,щызиӏэ,щыми,щыуагъэу,щыщхэми,щыщыта,щыхуэ,щыкъуейуэ,щыгъэтыжауэ,щымыхъужым,щыхугъуэ"""

    kelimeler = [k.strip() for k in KELIMELER.split(",") if k.strip()]
    kelimeler = list(dict.fromkeys(kelimeler))
    print(f"{len(kelimeler)} kelime taraniyor...\n")

    bulunanlar = []
    bulunamayanlar = []

    for kelime in kelimeler:
        bul = ara(kelime, sozlukler)
        if bul:
            bulunanlar.append((kelime, bul[0]))
            print(f"[OK] {kelime:30s} | {bul[0]['anlam'][:60]}")
        else:
            bulunamayanlar.append(kelime)

    # CSV
    cikti = Path("_scripts/kalan_200_tarama.csv")
    with open(cikti, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["FORM", "ANLAM", "KAYNAK", "DURUM"])
        for kelime, bul in bulunanlar:
            writer.writerow([kelime, bul["anlam"][:80], bul["sozluk"][:30], "OK"])
        for kelime in bulunamayanlar:
            writer.writerow([kelime, "", "", "YOK"])

    print("\n" + "=" * 70)
    print(f"Bulunan: {len(bulunanlar)}")
    print(f"Bulunamayan: {len(bulunamayanlar)}")
    print(f"CSV: {cikti}")

if __name__ == "__main__":
    main()
