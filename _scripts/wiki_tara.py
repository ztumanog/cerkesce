"""
wiki_tara.py — Wiktionary'de kelime ara
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import csv
from pathlib import Path

WIKI_DOSYA = "_scripts/wiktionary_veri_v2.json"
CIKTI = "_scripts/wiki_sonuc.csv"

# Aranacak kelimeler (Grubu 3/5'ten YOK cikanlar)
KELIMELER = "щыпхъу,щыпщӏэр,щысэтехыпӏэхэр,щыт,щытакъым,щытатэмэ,щыткъым,щытми,щытт,щытти,щыту,щытхъоу,щытхъушхор,щытхэм,щытхэр,щытхэу,щытщ,щытгъэх,щытым"

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04C0')
    return text.strip().lower()

def main():
    print(f"Wiki yukleniyor: {WIKI_DOSYA}")
    wiki = json.loads(Path(WIKI_DOSYA).read_text(encoding="utf-8"))
    print(f"{len(wiki)} kayit")

    # Form -> kayit haritasi
    form_map = {}
    for k in wiki:
        f = k.get("form", "")
        if f:
            key = normalize(f)
            if key not in form_map:
                form_map[key] = []
            form_map[key].append(k)

    kelimeler = [k.strip() for k in KELIMELER.split(",") if k.strip()]
    print(f"{len(kelimeler)} kelime taraniyor...\n")

    satirlar = []
    for kelime in kelimeler:
        key = normalize(kelime)
        bulunan = form_map.get(key, [])

        if bulunan:
            ilk = bulunan[0]
            anlam = ilk.get("meaning", "") or ""
            pos = ilk.get("partOfSpeech", "") or ""
            ipa = ilk.get("ipa", "") or ""
            print(f"[OK] {kelime} ({pos})")
            print(f"     {anlam[:100]}")
            if ipa:
                print(f"     IPA: {ipa}")
            satirlar.append({
                "form": kelime,
                "anlam": anlam[:80],
                "pos": pos,
                "ipa": ipa,
                "kaynak": "wiktionary_v2",
            })
        else:
            print(f"[YOK] {kelime}")
            satirlar.append({
                "form": kelime,
                "anlam": "",
                "pos": "",
                "ipa": "",
                "kaynak": "",
            })

    # CSV
    cikti = Path(CIKTI)
    cikti.parent.mkdir(parents=True, exist_ok=True)
    with open(cikti, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["FORM", "ANLAM", "POS", "IPA", "KAYNAK"])
        for s in satirlar:
            writer.writerow([s["form"], s["anlam"], s["pos"], s["ipa"], s["kaynak"]])

    print("=" * 70)
    print(f"CSV: {cikti}")
    ok = sum(1 for s in satirlar if s["anlam"])
    print(f"Bulunan: {ok}, Bulunamayan: {len(satirlar) - ok}")

if __name__ == "__main__":
    main()
