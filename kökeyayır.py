"""
corpus_ara.py — E:/projeler/Cerkesce altinda corpus dosyalarini otomatik bul ve tara
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import csv
import os
import re
from pathlib import Path
from collections import Counter

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

def corpus_dosyalarini_bul():
    """E:/projeler/Cerkesce altinda corpus dosyalarini bul"""
    kok = PROJE_KOKU
    bulunanlar = []

    # Corpus dosya uzantilari
    uzantilar = {".txt", ".tsv", ".csv", ".jsonl", ".json"}

    # Atlanacak klasorler
    atla = {"node_modules", ".git", ".next", "public", "_scripts", "dist"}

    for path in kok.rglob("*"):
        if not path.is_file():
            continue

        # Atlanacak klasorlerde mi?
        if any(part in atla for part in path.parts):
            continue

        # Uzanti uygun mu?
        if path.suffix.lower() not in uzantilar:
            continue

        # Boyut kontrolu (en az 1 KB)
        try:
            if path.stat().st_size < 1024:
                continue
        except:
            continue

        # Corpus benzeri isim mi?
        ad = path.name.lower()
        if any(k in ad for k in ["corpus", "parallel", "corp", "dataset", "adiga"]):
            bulunanlar.append(path)
            continue

        # Buyuk dosya mi? (100 KB+)
        try:
            if path.stat().st_size > 100 * 1024:
                bulunanlar.append(path)
        except:
            pass

    return bulunanlar

def metin_oku(path):
    """Dosyayi oku — uzantiya gore"""
    try:
        if path.suffix.lower() == ".json":
            data = json.loads(path.read_text(encoding="utf-8"))
            if isinstance(data, list):
                # JSON array
                parcalar = []
                for item in data:
                    if isinstance(item, dict):
                        for v in item.values():
                            if isinstance(v, str):
                                parcalar.append(v)
                    elif isinstance(item, str):
                        parcalar.append(item)
                return "\n".join(parcalar)
            elif isinstance(data, dict):
                return json.dumps(data, ensure_ascii=False)
        elif path.suffix.lower() == ".jsonl":
            parcalar = []
            for satir in path.read_text(encoding="utf-8").splitlines():
                try:
                    obj = json.loads(satir)
                    if isinstance(obj, dict):
                        for v in obj.values():
                            if isinstance(v, str):
                                parcalar.append(v)
                except:
                    pass
            return "\n".join(parcalar)
        else:
            return path.read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        print(f"  HATA okuma {path.name}: {e}")
        return ""

def main():
    print("Sozlukler yukleniyor...")
    sozluk = sozlukleri_yukle()
    print(f"Sozlukte {len(sozluk)} kelime")
    print("=" * 70)

    print("Corpus dosyalari araniyor...")
    corpus_dosyalar = corpus_dosyalarini_bul()
    print(f"Bulunan dosya: {len(corpus_dosyalar)}")
    for c in corpus_dosyalar[:20]:
        boyut = c.stat().st_size
        print(f"  {boyut:>10d}  {c.relative_to(PROJE_KOKU)}")

    if not corpus_dosyalar:
        print("Corpus dosyasi bulunamadi!")
        return

    print("=" * 70)
    print("Corpus okunuyor...")

    tum_metin = []
    for path in corpus_dosyalar:
        metin = metin_oku(path)
        if metin:
            tum_metin.append(metin)
            print(f"  OK: {path.name} ({len(metin)} karakter)")

    if not tum_metin:
        print("Hicbir metin okunamadi!")
        return

    metin = "\n".join(tum_metin)
    print(f"Toplam: {len(metin)} karakter")
    print("=" * 70)

    # Kelimeleri ayir
    kelimeler = re.findall(r'[а-яёА-ЯЁӀӏ\u04C0\u04CF]+', metin.lower())
    print(f"Toplam kelime: {len(kelimeler)}")
    print(f"Farkli kelime: {len(set(kelimeler))}")

    frekans = Counter(kelimeler)
    shchy = {k: v for k, v in frekans.items() if k.startswith("щы")}
    print(f"щы- ile baslayan: {len(shchy)} farkli kelime")

    # CSV
    cikti = Path("_scripts/corpus_sonuc.csv")
    cikti.parent.mkdir(parents=True, exist_ok=True)

    with open(cikti, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["KELIME", "FREKANS", "SOZLUKTE", "ROOT"])
        for k in sorted(shchy, key=lambda x: -frekans[x]):
            norm = normalize(k)
            durum = "VAR" if norm in sozluk else "YOK"
            writer.writerow([k, frekans[k], durum, "щы-"])

    print("=" * 70)
    print(f"CSV yazildi: {cikti}")

    var = sum(1 for k in shchy if normalize(k) in sozluk)
    yok = len(shchy) - var
    print(f"VAR: {var}, YOK: {yok}")

    print("\nEn sik 20 щы- kelimesi:")
    for k in sorted(shchy, key=lambda x: -frekans[x])[:20]:
        norm = normalize(k)
        durum = "VAR" if norm in sozluk else "YOK"
        print(f"  {frekans[k]:6d}  {k:30s} {durum}")

if __name__ == "__main__":
    main()
    