import json, re, subprocess

HEX = re.compile(r"^L-(?:D[01][0-9A-F]{2})+")
HEDEF = "L-D0BAD18AD183"
COMMITS = ["7a476c7", "65d1b31", "626f36d", "9f874da"]
DOSYA = "public/data/linguistic/lexemes.json"

print(f"{'commit':<10}{'kayit':>8}{'hex':>7}{'idsiz':>7}{'hedef':>7}")
for c in COMMITS:
    r = subprocess.run(["git", "show", f"{c}:{DOSYA}"], capture_output=True)
    if r.returncode != 0:
        print(f"{c:<10} okunamadi")
        continue
    lex = json.loads(r.stdout.decode("utf-8-sig"))
    ids = [str(e.get("id", "") or "") for e in lex]
    hex_say = sum(1 for i in ids if HEX.match(i))
    idsiz = sum(1 for i in ids if not i)
    print(f"{c:<10}{len(lex):>8}{hex_say:>7}{idsiz:>7}{ids.count(HEDEF):>7}")

print("\nCalisma kopyasi:")
import pathlib
w = json.loads(pathlib.Path(DOSYA).read_text(encoding="utf-8-sig"))
wids = [str(e.get("id", "") or "") for e in w]
print(f"  kayit={len(w)} hex={sum(1 for i in wids if HEX.match(i))} idsiz={sum(1 for i in wids if not i)} hedef={wids.count(HEDEF)}")
