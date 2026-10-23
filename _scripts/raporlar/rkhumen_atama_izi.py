import json, subprocess

DOSYA = "public/data/linguistic/lexemes.json"
KOK = "R-KHUMEN"
FORMLAR = ["къуэпсы", "къуэлабэ", "къуэкӀэмыщӀэ", "къуажедээс", "къуажехь"]

def git_metin(*a):
    return subprocess.run(["git", *a], capture_output=True, text=True,
                          encoding="utf-8", errors="replace").stdout

def lex_at(c):
    r = subprocess.run(["git", "show", f"{c}:{DOSYA}"], capture_output=True)
    if r.returncode != 0:
        return None
    return json.loads(r.stdout.decode("utf-8-sig"))

def rids(e):
    d = e.get("derivation") if isinstance(e.get("derivation"), dict) else {}
    return {str(x) for x in (e.get("rootIds") or [])} | {str(x) for x in (d.get("rootIds") or [])}

def anahtar(e):
    return (str(e.get("id") or ""), str(e.get("form") or ""))

def yollar(o, yol=""):
    if isinstance(o, dict):
        for k, v in o.items():
            yield from yollar(v, f"{yol}.{k}")
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from yollar(v, f"{yol}[{i}]")
    elif isinstance(o, str):
        yield yol, o

base = lex_at("65d1b31")
head = lex_at("HEAD")
base_map = {anahtar(e): rids(e) for e in base}

print("== 1. R-KHUMEN, 65d1b31..HEAD commit bazinda ==")
onceki = base_map
for c in git_metin("rev-list", "--reverse", "65d1b31..HEAD", "--", DOSYA).split():
    lex = lex_at(c)
    if lex is None:
        continue
    kok = kokusuz = yeni = 0
    for e in lex:
        if KOK not in rids(e):
            continue
        kok += 1
        k = anahtar(e)
        if k not in onceki:
            yeni += 1
        elif not onceki[k]:
            kokusuz += 1
    print(f"  {c[:7]}  R-KHUMEN={kok:<4} kokusuz->KHUMEN={kokusuz:<4} yeni_kayit={yeni}")
    onceki = {anahtar(e): rids(e) for e in lex}

print("\n== 2. Bes formun 65d1b31'deki tam kaydi ==")
for f in FORMLAR:
    for e in base:
        if str(e.get("form") or "") == f:
            print(f"  {f}: " + json.dumps(e, ensure_ascii=False)[:300])

print("\n== 3. HEAD'de formlar form alani disinda geciyor mu? ==")
for f in FORMLAR:
    for e in head:
        for yol, s in yollar(e):
            if f in s and not yol.endswith(".form"):
                print(f"  {f} | {e.get('id')} | {yol} | {s[:60]}")

print("\n== 4. roots.json (HEAD) icinde R-KHUMEN tanimi ==")
roots = git_metin("show", "HEAD:public/data/linguistic/roots.json")
print(f"  tirnakli gecis sayisi = {roots.count(chr(34) + KOK + chr(34))}")

print("\n== 5. 65d1b31'de kokusuz, HEAD'de R-KHUMEN'li kayitlar ==")
gecis = [e for e in head if KOK in rids(e) and anahtar(e) in base_map and not base_map[anahtar(e)]]
print(f"  adet={len(gecis)}  formda 'хъум' gecen={sum(1 for e in gecis if 'хъум' in str(e.get('form') or ''))}")
for e in gecis[:20]:
    print(f"  {str(e.get('id')):<22} {str(e.get('form') or ''):<14} {str(e.get('literalMeaning') or '')[:35]}")

print("\n== 6. 9f874da ile 0584009 farki (bos = ayni) ==")
print(git_metin("diff", "--stat", "9f874da", "0584009", "--", DOSYA) or "  fark yok")
