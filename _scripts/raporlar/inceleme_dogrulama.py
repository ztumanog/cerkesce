import json, csv
from pathlib import Path

DIR = Path("public/data/linguistic")
OUT = Path("_scripts/raporlar/inceleme_dogrulama.csv")
lex = json.loads((DIR / "lexemes.json").read_text(encoding="utf-8-sig"))
by_id = {e["id"]: e for e in lex}

HEDEF = ["L-D0BAD18AD18D", "L-D0BAD18AD18D-6", "L-D0BAD18AD18D-13",
         "L-D09AD18AD18D-4", "L-D185D183D18D", "L-D0B3D18AD183",
         "L-D0B3D18AD183-4", "L-D0B7D18BD0B3-3", "L-D0BAD18AD0B0"]

def rids(e):
    d = e.get("derivation") if isinstance(e.get("derivation"), dict) else {}
    return [str(x) for x in (e.get("rootIds") or [])] + [str(x) for x in (d.get("rootIds") or [])]

print("== R-KHUMEN kullanan kayitlar ==")
kh = [e for e in lex if "R-KHUMEN" in rids(e)]
print("  toplam:", len(kh))
for e in kh:
    print(f"  {e['id']:<22} {e.get('form',''):<18} {e.get('literalMeaning','')[:35]}")

print("\n== Inceleme kayitlari ==")
for i in HEDEF:
    e = by_id.get(i)
    if e is None:
        print(f"  {i}: BULUNAMADI")
        continue
    print(f"  {i:<22} form={e.get('form',''):<14} anlam={e.get('literalMeaning','')!s:<30} rootIds={rids(e)}")

print("\n== Silinecek/birlestirilecek adaylarin dis referanslari ==")
for dosya in DIR.glob("*.json"):
    if dosya.name == "lexemes.json":
        continue
    metin = dosya.read_text(encoding="utf-8-sig", errors="replace")
    for i in ["L-D0BAD18AD18D-13", "L-D0BAD18AD0B0"]:
        n = metin.count(i)
        if n:
            print(f"  {dosya.name}: {i} x{n}")

print("\n== Tum 'сым' grubu (tam liste) ==")
for e in lex:
    if str(e.get("id", "")).startswith("L-D181D18BD0BC"):
        print(f"  {e['id']:<22} {e.get('form',''):<18} {e.get('literalMeaning','')[:35]}")

print("\n== Buyuk harfle baslayan formlar ==")
buyuk = [e for e in lex if str(e.get("form", ""))[:1].isupper()
         and str(e.get("form", ""))[:1] not in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
print("  sayi:", len(buyuk))
for e in buyuk[:30]:
    print(f"  {e['id']:<22} {e.get('form','')}")

with OUT.open("w", encoding="utf-8-sig", newline="") as fh:
    w = csv.writer(fh, delimiter=";")
    w.writerow(["id", "form", "anlam", "rootIds", "onerilen_not"])
    for i in HEDEF:
        e = by_id.get(i)
        if e:
            w.writerow([i, e.get("form", ""), e.get("literalMeaning", ""),
                        ";".join(rids(e)), "KAYNAK GEREKLI"])
print("\nCSV:", OUT)
