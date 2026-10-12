"""
shchy_tara.py — щы- grubu kelimelerini sözlüklerde tara, CSV çıkar

Kullanim:
  1. Thonny'de ac
  2. Run
  3. Kelimeleri virgülle ayirip yapistir
  4. Sonuc: _scripts/shchy_XX_sonuc.csv

CSV formati:
  FORM,ANLAM,CONCEPT,SUB,AİLE,ROOT
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import csv
import os
import re
from pathlib import Path

# ============================================
# AYARLAR
# ============================================

PROJE_KOKU = Path("E:/projeler/Cerkesce")
CIKTI_DOSYA = "_scripts/shchy_02_sonuc.csv"  # her grup icin degistir

# ============================================

def sozlukleri_yukle():
    """Tum sozlukleri yukle"""
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
    """Bir sozluk kaydindan anlam cikar"""
    for field in ["translation", "meaning", "definition"]:
        if field in data and data[field]:
            return str(data[field])[:120]

    html = data.get("full_definition_in_html", "")
    if html:
        return re.sub(r'<[^>]+>', '', str(html))[:120].strip()

    return ""


def main():
    print("Sozlukler yukleniyor...")
    sozlukler = sozlukleri_yukle()
    print(f"{len(sozlukler)} sozluk yuklendi")
    print("=" * 70)
    print("Kelimeleri virgul ile ayirin.")
    print("Ornek: щылъын,щылъэн,щылъэтын")
    print("=" * 70)

    girdi = input("\nKelime(ler): ").strip()
    if not girdi:
        print("Bos girdi, cikiliyor.")
        return

    kelimeler = [k.strip() for k in girdi.split(",") if k.strip()]
    print(f"\n{len(kelimeler)} kelime taraniyor...\n")

    # CSV satirlari
    satirlar = []

    for kelime in kelimeler:
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
            # En kisa anlami sec (genelde en oz)
            en_kisa = min(bulunan, key=lambda x: len(x["anlam"]))
            print(f"[OK] {kelime}")
            print(f"     {en_kisa['sozluk']}")
            print(f"     {en_kisa['anlam']}")

            satirlar.append({
                "form": kelime,
                "anlam": en_kisa["anlam"][:80],
                "kaynak": en_kisa["sozluk"][:30],
            })
        else:
            print(f"[YOK] {kelime}")
            satirlar.append({
                "form": kelime,
                "anlam": "",
                "kaynak": "",
            })

    # CSV'ye yaz
    cikti_path = Path(CIKTI_DOSYA)
    cikti_path.parent.mkdir(parents=True, exist_ok=True)

    with open(cikti_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["FORM", "ANLAM", "CONCEPT", "SUB", "AILE", "ROOT", "KAYNAK"])
        for s in satirlar:
            writer.writerow([
                s["form"],
                s["anlam"],
                "",  # CONCEPT — mimar dolduracak
                "",  # SUB — mimar dolduracak
                "",  # AILE — mimar dolduracak
                "щы-",
                s["kaynak"],
            ])

    print("=" * 70)
    print(f"CSV yazildi: {cikti_path}")
    print(f"Toplam: {len(satirlar)} satir")
    ok = sum(1 for s in satirlar if s["anlam"])
    print(f"Bulunan: {ok}, Bulunamayan: {len(satirlar) - ok}")


if __name__ == "__main__":
    main()