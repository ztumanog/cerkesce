import json, csv, traceback
from pathlib import Path

SILINECEK = """ABE AKT APCH AY BA BAZ BEY BOF BYM CHAP CHAR CHEKH CHEY EL ETU G GAZ K KHOD KHOR KUP LOM MAY MECH MIF MOS NAL NAN NAR NIL NUR POP PU PUT PYL RAM RIM ROL SAD SHAG SHEY SHEYA SHOT SOM SUD TAS TAZH TOM TOP TSEKH TSS TUF TYR UA UAY UEI UEKH UIY UKHO UM UOU UOY VEK VID VNE VU ZET ZHOR ZU""".split()
HEDEF = {"R-" + s for s in SILINECEK}

LEX = Path("public/data/linguistic/lexemes.json")
OUT = Path("_scripts/raporlar/derivation_temizlik_onizleme.csv")

def normalize(x):
    if x is None: return None
    if isinstance(x, str): return [x]
    if isinstance(x, list): return [str(i) for i in x]
    return None

try:
    lex = json.loads(LEX.read_text(encoding="utf-8"))
    print("lexeme sayisi:", len(lex))

    satirlar = []
    bulunan_kok = set()
    etkilenen = 0
    cikarilacak = 0
    bos_kalacak = 0

    for l in lex:
        d = l.get("derivation")
        if not isinstance(d, dict):
            continue
        r = normalize(d.get("rootIds"))
        if not r:
            continue
        cikan = [k for k in r if k in HEDEF]
        if not cikan:
            continue
        yeni = [k for k in r if k not in HEDEF]
        etkilenen += 1
        cikarilacak += len(cikan)
        bulunan_kok.update(cikan)
        bos = not yeni
        if bos:
            bos_kalacak += 1
        satirlar.append([l.get("id", ""), l.get("form", ""), ";".join(r),
                         ";".join(yeni), len(cikan),
                         "BOS_KALIR" if bos else ""])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["lexeme_id", "form", "mevcut_rootIds", "yeni_rootIds", "cikarilacak_sayi", "not"])
        w.writerows(satirlar)

    print("\n=== DRY-RUN OZET ===")
    print("etkilenen lexeme:", etkilenen)
    print("cikarilacak referans:", cikarilacak)
    print("bos kalacak derivation.rootIds:", bos_kalacak)
    print("farkli hedef kok bulunan:", len(bulunan_kok), "/", len(HEDEF))
    print("eksik (hic bulunmayan) hedef kok:", sorted(HEDEF - bulunan_kok))
    print("onizleme CSV:", OUT, "satir:", len(satirlar))
except Exception:
    traceback.print_exc()
