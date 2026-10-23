import json, re, subprocess
from collections import Counter

DOSYA = "public/data/linguistic/lexemes.json"
HEDEF = "L-D0BAD18AD183"
HEX = re.compile(r"^L-((?:D[0-9A-F]{3})+)(?:-(\d+))?$")

def git_json(ref):
    r = subprocess.run(["git", "show", f"{ref}:{DOSYA}"], capture_output=True)
    if r.returncode != 0:
        return None
    return json.loads(r.stdout.decode("utf-8-sig"))

def calisma():
    with open(DOSYA, encoding="utf-8-sig") as f:
        return json.load(f)

def rids(e):
    d = e.get("derivation") if isinstance(e.get("derivation"), dict) else {}
    return [str(x) for x in (e.get("rootIds") or [])] + [str(x) for x in (d.get("rootIds") or [])]

def analiz(ad, lex):
    if lex is None:
        print(f"\n== {ad}: okunamadi ==")
        return
    ids = [str(e.get("id") or "") for e in lex]
    sayac = Counter(i for i in ids if i)
    dup = {i: n for i, n in sayac.items() if n > 1}
    hexler = []
    for e in lex:
        m = HEX.match(str(e.get("id") or ""))
        if m:
            hexler.append((e, m.group(1)))
    uyumlu, uyumsuz, ornek = 0, 0, []
    for e, taban in hexler:
        try:
            coz = bytes.fromhex(taban).decode("utf-8")
        except Exception:
            coz = None
        form = str(e.get("form") or "")
        if coz is not None and form.startswith(coz):
            uyumlu += 1
        else:
            uyumsuz += 1
            if len(ornek) < 8:
                ornek.append((e.get("id"), form, coz))
    print(f"\n== {ad} ==")
    print(f"kayit={len(lex)} tekrarlayan_kimlik={len(dup)} tekrarlayan_kayit={sum(dup.values())} hex={len(hexler)}")
    print(f"on_ek_uyumlu={uyumlu} on_ek_uyumsuz={uyumsuz}")
    for o in ornek:
        print("   uyumsuz:", o)
    rk = [e for e in lex if "R-KHUMEN" in rids(e)]
    grup = Counter()
    for e in rk:
        m = HEX.match(str(e.get("id") or ""))
        grup[m.group(1) if m else "HEX_DEGIL"] += 1
    print(f"R-KHUMEN kayit={len(rk)} gruplar={grup.most_common(5)}")
    print(f"L-__ kayit={sum(1 for i in ids if i == 'L-__')}")

kaynaklar = [("7a476c7", git_json("7a476c7")),
             ("65d1b31", git_json("65d1b31")),
             ("9f874da", git_json("9f874da")),
             ("HEAD", git_json("HEAD")),
             ("CALISMA", calisma())]
for ad, lex in kaynaklar:
    analiz(ad, lex)

ref65 = git_json("65d1b31") or []
formlar = [str(e.get("form")) for e in ref65 if str(e.get("id")) == HEDEF]
print(f"\n== {HEDEF} kopyalarinin 65d1b31'deki formlari nerede? ==")
for ad, lex in [("9f874da", git_json("9f874da")), ("HEAD", git_json("HEAD")), ("CALISMA", calisma())]:
    if lex is None:
        continue
    idx = {}
    for e in lex:
        idx.setdefault(str(e.get("form")), []).append(str(e.get("id")))
    for f in formlar:
        print(f"  {ad:<8} {f:<14} -> {idx.get(f, ['YOK'])}")
