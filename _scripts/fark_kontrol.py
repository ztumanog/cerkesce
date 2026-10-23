import json, subprocess
from pathlib import Path

P = "public/data/linguistic/lexemes.json"
R = "public/data/linguistic/roots.json"
W = "public/data/linguistic/word_families.json"

def head(path):
    return json.loads(subprocess.run(["git", "show", f"HEAD:{path}"], capture_output=True, check=True).stdout.decode("utf-8"))

def ids_top(data):
    items = data.values() if isinstance(data, dict) else data
    return {x.get("id") for x in items if isinstance(x, dict) and x.get("id")}

roots_w = json.loads(Path(R).read_text(encoding="utf-8"))
roots_h = head(R)
wf_w = json.loads(Path(W).read_text(encoding="utf-8"))
wf_h = head(W)
lex_w = json.loads(Path(P).read_text(encoding="utf-8"))
lex_h = {e.get("id"): e for e in head(P)}
lex_w_map = {e.get("id"): e for e in lex_w}

print("== Hedef koklerin varligi (calisma | HEAD) ==")
for x in ["R-TKH", "R-LEZH", "R-MAXWA", "R-TKHY_1", "R-LEZH_1", "R-SHCHIY"]:
    print(f"  {x}: {x in ids_top(roots_w)} | {x in ids_top(roots_h)}")

print("== Hedef ailelerin varligi (calisma | HEAD) ==")
for x in ["WF-TKH", "WF-LEZH", "WF-MAXWA", "WF-TKHY_1", "WF-LEZH_1", "WF-SHCHIY"]:
    print(f"  {x}: {x in ids_top(wf_w)} | {x in ids_top(wf_h)}")

print("== HEAD ile farkli tum kayitlar (alan bazli) ==")
n = 0
for k, e in lex_w_map.items():
    h = lex_h.get(k)
    if h is None:
        print(f"  [YENI] {k}")
        n += 1
        continue
    if h != e:
        n += 1
        diffs = []
        for f in sorted(set(h) | set(e)):
            if h.get(f) != e.get(f):
                diffs.append(f"{f}: HEAD={h.get(f)!r} -> CALISMA={e.get(f)!r}")
        print(f"  {k}")
        for d in diffs:
            print(f"      {d}")
print(f"Toplam farkli kayit: {n}")
print("Silinmis kayitlar (HEAD'de var, calismada yok):")
for k in lex_h:
    if k not in lex_w_map:
        print(f"  [SILINDI] {k}")
