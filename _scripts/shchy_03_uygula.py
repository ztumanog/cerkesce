import json
import csv
import os
from pathlib import Path
from datetime import datetime

PROJE_KOKU = Path("E:/projeler/Cerkesce")
CSV_DOSYA = "shchy_03_sonuc.csv"
ROOT_FILTRE = "щы"
YEDEK_AL = True

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04C0')
    return text.strip()

def main():
    if PROJE_KOKU.exists():
        os.chdir(PROJE_KOKU)
    print(f"Calisma dizini: {os.getcwd()}")

    lex_path = Path("public/data/linguistic/lexemes.json")
    lex = json.loads(lex_path.read_text(encoding="utf-8"))
    print(f"Toplam lexeme: {len(lex)}")

    if YEDEK_AL:
        tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
        yedek = lex_path.with_suffix(f".json.bak-shchy03-{tarih}")
        yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
        print(f"Yedek: {yedek.name}")

    csv_path = Path("_scripts") / CSV_DOSYA
    veri = {}
    with open(csv_path, encoding="utf-8") as f:
        reader = csv.reader(f)
        for i, satir in enumerate(reader):
            if not satir or len(satir) < 4:
                continue
            if satir[0].strip().lower() == "form":
                continue
            form = satir[0].strip()
            concept = satir[2].strip() if len(satir) > 2 else ""
            sub = satir[3].strip() if len(satir) > 3 else ""
            aile = satir[4].strip() if len(satir) > 4 else ""
            veri[normalize(form)] = (concept, sub, aile)

    print(f"CSV'den: {len(veri)} kayit")

    uygulanan = 0
    bulunamayan = []
    for l in lex:
        form = l.get("form", "")
        if not normalize(form).startswith(ROOT_FILTRE):
            continue
        norm = normalize(form)
        if norm in veri:
            concept, sub, family = veri[norm]
            l["conceptId"] = concept
            l["subConceptId"] = sub
            l["taxonomyFamily"] = family
            l["rootForm"] = ROOT_FILTRE + "-"
            uygulanan += 1
        else:
            bulunamayan.append(form)

    lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"\nOK - {uygulanan} kayit guncellendi")
    print(f"Belirsiz kalan: {len(bulunamayan)}")
    print(f"Ornek belirsizler:")
    for b in bulunamayan[:10]:
        print(f"  - {b}")

if __name__ == "__main__":
    main()
