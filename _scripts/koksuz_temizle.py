"""
koksuz_temizle.py — koksuz_tarama.csv'yi temizle, см. zincirini takip et
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")

import json
import csv
import os
import re
from pathlib import Path

PROJE_KOKU = Path("E:/projeler/Cerkesce")
GIRDI_CSV = "_scripts/koksuz_tarama.csv"
CIKTI_CSV = "_scripts/koksuz_temiz.csv"

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
                    spelling_map[key].append(wdata)

            sozlukler[f.name] = spelling_map
        except Exception as e:
            print(f"HATA {f.name}: {e}")

    return sozlukler


def ham_anlam(data):
    for field in ["translation", "meaning", "definition"]:
        if field in data and data[field]:
            return str(data[field])

    html = data.get("full_definition_in_html", "")
    if html:
        return re.sub(r'<[^>]+>', ' ', str(html))

    return ""


def temizle(metin):
    """Rusca tanimi temizle: etiket, ornek, HTML"""
    if not metin:
        return ""

    t = metin

    # Ornek cumleyi kes
    t = t.split('◊')[0]
    t = t.split('\n')[0]

    # HTML entity
    t = t.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&')
    t = t.replace('&quot;', '"').replace('&#39;', "'")

    # HTML tag
    t = re.sub(r'<[^>]+>', ' ', t)

    # Rusca gramer etiketleri
    etiketler = [
        r'\bперех\.\s*', r'\bнеперех\.\s*', r'\bгл\.\s*', r'\bсущ\.\s*',
        r'\bприл\.\s*', r'\bнареч\.\s*', r'\bмест\.\s*', r'\bчисл\.\s*',
        r'\bкубано-зеленчукские\s*', r'\bпобуд\.\s*ф\.\s*от\s*',
        r'\bкаузатив\s+к\s+', r'\bсм\.\s*', r'\bср\.\s*',
        r'\bфольк\.\s*', r'\bчерк\.\s*', r'\bкъэб\.\s*',
        r'\bпереносное\s*', r'\bпогов\.\s*',
    ]
    for e in etiketler:
        t = re.sub(e, '', t, flags=re.IGNORECASE)

    # Cift bosluk
    t = re.sub(r'\s+', ' ', t)

    # Bas/son trim
    t = t.strip(' ,;:.-–—')

    # Uzunsa kirp
    if len(t) > 150:
        t = t[:150].rsplit(' ', 1)[0] + '…'

    return t


def main():
    print("Sozlukler yukleniyor...")
    sozlukler = sozlukleri_yukle()
    print(f"{len(sozlukler)} sozluk yuklendi")
    print("=" * 70)

    # Girdi CSV oku
    girdi_path = Path(GIRDI_CSV)
    if not girdi_path.exists():
        print(f"HATA: {GIRDI_CSV} bulunamadi")
        return

    with open(girdi_path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        satirlar = list(reader)

    print(f"Toplam: {len(satirlar)}")
    print("Temizleniyor ve см. zinciri takip ediliyor...")
    print("=" * 70)

    cikti = []
    zincir_sayisi = 0

    for satir in satirlar:
        id_ = satir["ID"]
        form = satir["FORM"]
        anlam = satir["ANLAM_RU"]
        kaynak = satir["KAYNAK"]

        temiz = temizle(anlam)

        # см. zincirini takip et
        zincir = 0
        while zincir < 5 and temiz:
            m = re.search(r'см\.\s*([^\s,.;]+)', temiz)
            if not m:
                break
            hedef = m.group(1).strip().lower()
            bulundu_zincir = False
            for fname, smap in sozlukler.items():
                if hedef in smap:
                    yeni_ham = ham_anlam(smap[hedef][0])
                    yeni_temiz = temizle(yeni_ham)
                    if yeni_temiz and yeni_temiz != temiz:
                        temiz = yeni_temiz
                        kaynak = fname
                        bulundu_zincir = True
                        zincir_sayisi += 1
                        break
            if not bulundu_zincir:
                break
            zincir += 1

        cikti.append({
            "id": id_,
            "form": form,
            "anlam_ru_temiz": temiz,
            "kaynak": kaynak,
        })

    # CSV yaz
    cikti_path = Path(CIKTI_CSV)
    with open(cikti_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["ID", "FORM", "ANLAM_RU_TEMIZ", "KAYNAK"])
        for s in cikti:
            writer.writerow([s["id"], s["form"], s["anlam_ru_temiz"], s["kaynak"]])

    print("=" * 70)
    print(f"CSV yazildi: {cikti_path}")
    print(f"Toplam: {len(cikti)}")
    print(f"Temiz olan: {sum(1 for s in cikti if s['anlam_ru_temiz'])}")
    print(f"Zincir takibi: {zincir_sayisi}")
    print()
    print("İlk 10 örnek:")
    for s in cikti[:10]:
        print(f"  {s['form']:20s} → {s['anlam_ru_temiz'][:70]}")


if __name__ == "__main__":
    main()