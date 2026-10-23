import json, re, csv, subprocess
from pathlib import Path
from collections import defaultdict

LEX = "public/data/linguistic/lexemes.json"
ROOTS = "public/data/linguistic/roots.json"
OUT = Path("_scripts/raporlar/hex_on_head_karsilastirma.csv")
HEX = re.compile(r"^L-((?:D[01][0-9A-F]{2})+)(?:-(\d+))?$")
TABAN = ["D188D18DD0BD", "D0B4D18DD0BA", "D0BAD18AD183", "D0BDD0B0D0BF", "D183D18DD180"]
KOK = ["R-BLY", "R-GUASCHA", "R-AUE", "R-ZYR", "R-PSO", "R-DZHY", "R-IY", "R-GE", "R-NAMYS", "R-ZESH"]

def head(path):
    r = subprocess.run(["git", "show", "HEAD:" + path], capture_output=True)
    if r.returncode != 0:
        print("UYARI: HEAD okunamadi ->", path)
        return None
    return json.loads(r.stdout.decode("utf-8-sig"))

def kok_idleri(veri):
    if veri is None:
        return None
    if isinstance(veri, dict):
        return set(veri.keys())
    return {str(x.get("id")) for x in veri if isinstance(x, dict)}

lex_w = json.loads(Path(LEX).read_text(encoding="utf-8-sig"))
roots_w = json.loads(Path(ROOTS).read_text(encoding="utf-8-sig"))
lex_h = head(LEX)
roots_h = head(ROOTS)

kw = kok_idleri(roots_w)
kh = kok_idleri(roots_h)
print("== Kok kimlikleri: calisma / HEAD ==")
for k in KOK:
    h = "?" if kh is None else str(k in kh)
    print(f"  {k:<12} calisma={k in kw!s:<5} HEAD={h}")

ids_w = {e["id"]: e for e in lex_w}
ids_h = {e["id"]: e for e in lex_h} if lex_h else None
print("\n== Lexeme sayisi: calisma", len(ids_w), "| HEAD", len(ids_h) if ids_h else "?")
print("\n== Taban kayitlar ==")
for h in TABAN:
    lid = "L-" + h
    hh = "?" if ids_h is None else str(lid in ids_h)
    print(f"  {lid:<22} calisma={lid in ids_w!s:<5} HEAD={hh}")

print("\n== Hex kayitlarin tanimsiz rootIds (ust duzey + derivation) ==")
tanimsiz = defaultdict(int)
for e in lex_w:
    if not HEX.match(str(e.get("id", ""))):
        continue
    adaylar = list(e.get("rootIds") or [])
    d = e.get("derivation") if isinstance(e.get("derivation"), dict) else {}
    adaylar += list(d.get("rootIds") or [])
    for r in adaylar:
        if str(r) not in kw:
            tanimsiz[str(r)] += 1
for k, v in sorted(tanimsiz.items(), key=lambda x: -x[1]):
    print(f"  {k}: {v}")

by_form = defaultdict(list)
for e in lex_w:
    by_form[str(e.get("form", "")).lower()].append(e)

rows = []
for e in lex_w:
    if not HEX.match(str(e.get("id", ""))):
        continue
    f = str(e.get("form", "")).lower()
    diger = [x for x in by_form[f] if x["id"] != e["id"]]
    if not diger:
        continue
    anlam = str(e.get("literalMeaning", "")).strip().lower()
    ayni_anlam = bool(anlam) and any(str(x.get("literalMeaning", "")).strip().lower() == anlam for x in diger)
    rows.append([e["id"], e.get("form", ""),
                 ";".join(x["id"] for x in diger),
                 ";".join(str(x.get("form", "")) for x in diger),
                 ";".join(str(x.get("partOfSpeech", "")) for x in diger),
                 ";".join(str(x.get("literalMeaning", "")) for x in diger),
                 "EVET" if ayni_anlam else ""])

OUT.parent.mkdir(parents=True, exist_ok=True)
with OUT.open("w", encoding="utf-8-sig", newline="") as fh:
    w = csv.writer(fh, delimiter=";")
    w.writerow(["hex_id", "form", "esi_id", "esi_form", "esi_pos", "esi_anlam", "ayni_anlam"])
    w.writerows(rows)

print("\n== Mukerrer form (kucuk harf) ==")
print("  hex kayit:", len(rows), "| ayni anlamli:", sum(1 for r in rows if r[6]))
print("CSV:", OUT)
