import json, csv, subprocess
from pathlib import Path

def yukle(txt):
    d = json.loads(txt)
    return d if isinstance(d, list) else d["lexemes"]

work = yukle(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
head = yukle(subprocess.run(
    ["git", "show", "HEAD:public/data/linguistic/lexemes.json"],
    capture_output=True, check=True).stdout.decode("utf-8"))

W = {e.get("id") for e in work}
H = {e.get("id") for e in head}
print("Çalışma kopyası:", len(work), "| HEAD:", len(head))
print("Yalnız HEAD'de (çalışma kopyasında kayıp):", len(H - W))
print("Yalnız çalışma kopyasında (HEAD'de yok):", len(W - H))

with open("sonuc.csv", encoding="utf-8-sig", newline="") as f:
    rd = csv.DictReader(f)
    print("CSV sütunları:", rd.fieldnames)
    rows = list(rd)

idc = next(c for c in ("id", "ID", "lexeme_id") if c in rd.fieldnames)
bul = {r[idc] for r in rows if r.get("sonuc") == "BULUNAMADI" and r.get(idc)}
print("\nBULUNAMADI benzersiz:", len(bul))
print("  çalışma kopyasında var:", len(bul & W))
print("  HEAD'de var, çalışma kopyasında yok:", len((bul & H) - W))
print("  hiçbirinde yok:", len(bul - W - H))
