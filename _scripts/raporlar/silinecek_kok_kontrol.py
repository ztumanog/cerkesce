import json, subprocess, csv, traceback
from pathlib import Path
from collections import Counter

SILINECEK = """ABE AKT APCH AY BA BAZ BEY BOF BYM CHAP CHAR CHEKH CHEY EL ETU G GAZ K KHOD KHOR KUP LOM MAY MECH MIF MOS NAL NAN NAR NIL NUR POP PU PUT PYL RAM RIM ROL SAD SHAG SHEY SHEYA SHOT SOM SUD TAS TAZH TOM TOP TSEKH TSS TUF TYR UA UAY UEI UEKH UIY UKHO UM UOU UOY VEK VID VNE VU ZET ZHOR ZU""".split()
HEDEF = {"R-" + s for s in SILINECEK}
LEHCE = {"R-ABKHAZ", "R-ABZ", "R-ABADZEH", "R-ABDZ", "R-ABZAKH"}
TUM = HEDEF | LEHCE

def liste(x):
    if x is None: return []
    if isinstance(x, str): return [x]
    return [str(i) for i in x]

def kok_kimlikleri(data):
    if isinstance(data, dict):
        if "roots" in data: data = data["roots"]
        else: return set(data.keys())
    return {r["id"] for r in data if isinstance(r, dict) and "id" in r}

try:
    lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
    print("lexeme sayisi:", len(lex))
    roots_now = kok_kimlikleri(json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8")))
    print("roots.json (calisma) kok sayisi:", len(roots_now))
    try:
        raw = subprocess.run(["git", "show", "HEAD:public/data/linguistic/roots.json"], capture_output=True, check=True).stdout.decode("utf-8")
        roots_head = kok_kimlikleri(json.loads(raw))
        print("roots.json (HEAD) kok sayisi:", len(roots_head))
    except Exception as x:
        roots_head = None
        print("HEAD okunamadi:", x)

    sayac = Counter()
    satirlar = []
    for l in lex:
        lid, form = l.get("id", ""), l.get("form", "")
        d = l.get("derivation") if isinstance(l.get("derivation"), dict) else {}
        for alan, deger in (("lexeme.rootIds", l.get("rootIds")), ("derivation.rootIds", d.get("rootIds"))):
            for k in liste(deger):
                if k in TUM:
                    sayac[(alan, k)] += 1
                    satirlar.append([lid, form, alan, k])

    out = Path("_scripts/raporlar/silinecek_kok_kullanim.csv")
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["lexeme_id", "form", "alan", "root_id"])
        w.writerows(satirlar)

    print("\n=== OZET ===")
    for alan in ("lexeme.rootIds", "derivation.rootIds"):
        print(alan, "referans:", sum(v for (a, _), v in sayac.items() if a == alan))
    print("hedef kok, roots.json'da (calisma):", len(HEDEF & roots_now))
    if roots_head is not None:
        print("hedef kok, roots.json'da (HEAD):", len(HEDEF & roots_head))
    print("lehce etiketi, roots.json'da (calisma):", len(LEHCE & roots_now))
    print("detay CSV:", out, "satir:", len(satirlar))
except Exception:
    traceback.print_exc()
