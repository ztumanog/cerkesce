import json
from pathlib import Path
from collections import Counter

BASE = Path(r"E:\projeler\Cerkesce")

# lexemes.json
lex = json.loads((BASE / "public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
lex = [l for l in lex if l and isinstance(l, dict)]
n = len(lex)

# WordFamily dolu mu?
wf_dolu = sum(1 for l in lex if l.get("wordFamilyId"))
print(f"Toplam lexeme: {n}")
print(f"wordFamilyId dolu: {wf_dolu} ({wf_dolu/n*100:.1f}%)")
print(f"wordFamilyId boş: {n - wf_dolu} ({(n-wf_dolu)/n*100:.1f}%)")
print()

# Root'lu ama WF'siz
rootlu_wf_siz = [l for l in lex if l.get("rootIds") and not l.get("wordFamilyId")]
print(f"Root'lu + WF'siz: {len(rootlu_wf_siz)}")

# Root'lu WF'siz ilk 10
print()
print("Root'lu + WF'siz ilk 10:")
for l in rootlu_wf_siz[:10]:
    print(f"  {l.get('id', '?')}: {l.get('form', '?')} → root: {l.get('rootIds')}")

# roots.json'daki wordFamily
roots = json.loads((BASE / "public/data/linguistic/roots.json").read_text(encoding="utf-8"))
root_wf = {}
for r in roots:
    wf = r.get("wordFamily", {})
    if wf and wf.get("id"):
        root_wf[r["id"]] = wf["id"]

print()
print(f"roots.json'da WF tanımlı root: {len(root_wf)}")

# Kaç lexeme root'unun WF'sini alabilir?
alabilir = 0
for l in rootlu_wf_siz:
    rid = (l.get("rootIds") or [None])[0]
    if rid in root_wf:
        alabilir += 1

print(f"Root'unun WF'sini alabilir: {alabilir}")
print(f"Yeni WF coverage: {(wf_dolu + alabilir) / n * 100:.1f}%")