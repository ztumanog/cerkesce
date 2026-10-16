"""
koksuz_tara.py — Kullanicidan kelime alir, TUM sozluklerde arar, kokunu ayirir
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import os
import re
from pathlib import Path

PROJE_KOKU = Path("E:/projeler/Cerkesce")

EKLER = [
    "ныгъэ", "ныгъ", "гъэ", "гъ", "щӀэ", "щӏэ", "щ",
    "хэмкӏэ", "хэмкӀэ", "хэм", "хэр", "хэ",
    "мкӏэ", "мкӀэ", "кӏэ", "кӀэ",
    "мэ", "м", "рэ", "р", "н", "у", "и",
]

def kok_ayir(form):
    if not form: return form
    f = form.lower()
    for ek in sorted(EKLER, key=len, reverse=True):
        if f.endswith(ek) and len(f) > len(ek) + 2:
            return f[:-len(ek)]
    return form

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
                    spelling_map[key].append({"spelling": sp, "data": wdata})
            sozlukler[f.name] = {
                "title": data.get("title", f.name),
                "spelling_map": spelling_map
            }
        except Exception:
            pass
    return sozlukler

def anlam_cikar(data):
    for field in ["translation", "meaning", "definition"]:
        if field in data and data[field]:
            return str(data[field])[:200]
    html = data.get("full_definition_in_html", "")
    if html:
        return re.sub(r'<[^>]+>', '', str(html))[:200].strip()
    return ""

def ara(sozlukler, kelime):
    key = kelime.lower().strip()
    kok = kok_ayir(key)
    bulunan = []
    for arama in [key, kok]:
        for fname, s in sozlukler.items():
            if arama in s["spelling_map"]:
                for entry in s["spelling_map"][arama]:
                    anlam = anlam_cikar(entry["data"])
                    if anlam:
                        bulunan.append({
                            "sozluk": fname,
                            "anlam": anlam,
                            "aranan": arama
                        })
        if bulunan:
            break
    return kok, bulunan

def main():
    print("Sozlukler yukleniyor...")
    sozlukler = sozlukleri_yukle()
    print(f"{len(sozlukler)} sozluk yuklendi")
    print("=" * 70)
    print("Kelime gir (virgulle ayir), cikmak icin 'q' yaz")
    print("=" * 70)

    while True:
        try:
            satir = input("\nKelime: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nCikiliyor...")
            break

        if not satir:
            continue
        if satir.lower() == "q":
            print("Cikiliyor...")
            break

        kelimeler = [k.strip() for k in satir.split(",") if k.strip()]

        for kelime in kelimeler:
            kok, bulunan = ara(sozlukler, kelime)
            if bulunan:
                en_kisa = min(bulunan, key=lambda x: len(x["anlam"]))
                print(f"  ✅ {kelime:20s} KOK: {kok:15s} -> {en_kisa['anlam'][:60]}")
            else:
                print(f"  ❌ {kelime:20s} KOK: {kok:15s} -> BULUNAMADI")

if __name__ == "__main__":
    main()