import json, re, csv
from pathlib import Path
from collections import defaultdict, Counter

LEX = Path("public/data/linguistic/lexemes.json")
ROOTS = Path("public/data/linguistic/roots.json")
OUT = Path("_scripts/raporlar/hex_on_derin.csv")
HEX = re.compile(r"^L-((?:D[01][0-9A-F]{2})+)(?:-(\d+))?$")

lex = json.loads(LEX.read_text(encoding="utf-8"))
roots = json.loads(ROOTS.read_text(encoding="utf-8"))
if isinstance(roots, dict):
    root_ids = set(roots.keys())
else:
    root_ids = {str(r.get("id")) for r in roots if isinstance(r, dict)}

form_low = Counter(str(e.get("form", "")).lower() for e in lex)

def onek(h):
    try:
        return bytes.fromhex(h).decode("utf-8")
    except Exception:
        return "?"

hexler = []
for e in lex:
    m = HEX.match(str(e.get("id", "")))
    if m:
        hexler.append((e, m.group(1), int(m.group(2)) if m.group(2) else 1))

sira_seti = defaultdict(set)
for e, h, n in hexler:
    sira_seti[h].add(n)

missing_roots = Counter()
rows = []
for e, h, n in hexler:
    d = e.get("derivation") if isinstance(e.get("derivation"), dict) else {}
    rids = [str(x) for x in (d.get("rootIds") or [])]
    yok = [r for r in rids if r not in root_ids]
    missing_roots.update(yok)
    f = str(e.get("form", ""))
    rows.append([e["id"], f, onek(h), h, n, ";".join(rids), ";".join(yok),
                 form_low[f.lower()], str(e.get("literalMeaning", ""))])

OUT.parent.mkdir(parents=True, exist_ok=True)
with OUT.open("w", encoding="utf-8-sig", newline="") as fh:
    w = csv.writer(fh, delimiter=";")
    w.writerow(["id", "form", "onek", "hex", "sira", "rootIds",
                "tanimsiz_rootIds", "ayni_form_sayisi", "literalMeaning"])
    w.writerows(rows)

print("hex kayit:", len(hexler))
print("\n-- roots.json'da olmayan rootIds (ilk 15) --")
for k, v in missing_roots.most_common(15):
    print(f"  {k}: {v}")
print("\n-- taban kaydi (numarasiz) olmayan hex --")
for h, s in sira_seti.items():
    if 1 not in s:
        print("  ", h, "mevcut numaralar:", sorted(s))
print("\n-- numara bosluklari (en cok kayitli 15 hex) --")
for h, s in sorted(sira_seti.items(), key=lambda x: -len(x[1]))[:15]:
    bosluk = [i for i in range(1, max(s) + 1) if i not in s]
    if bosluk:
        print("  ", h, "eksik:", bosluk)
print("\n-- kucuk harfe cevrildiginde ayni form baska kayitta da var --")
dup = [r for r in rows if r[7] > 1]
print("  sayi:", len(dup))
for r in dup[:20]:
    print("  ", r[0], r[1], "|", r[8][:40])
print("CSV:", OUT)
