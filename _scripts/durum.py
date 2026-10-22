import json
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
if isinstance(lex, dict):
    lex = lex.get("lexemes", [])

total = len(lex)

proper = sum(1 for e in lex if e.get("etymologyType") == "proper_noun")
loan = sum(1 for e in lex if e.get("etymologyType") == "loanword")
native = sum(1 for e in lex if e.get("etymologyType") == "native")
unknown = sum(1 for e in lex if e.get("etymologyType") == "unknown")

exempt = proper + loan
rootable = total - exempt

has_root = sum(1 for e in lex if e.get("rootIds"))
has_wf = sum(1 for e in lex if e.get("wordFamilyId"))

print(f"==================================================")
print(f"=== PROJE GENEL DURUM RAPORU (SPRINT R2) ===")
print(f"==================================================")
print(f"Toplam Lexeme          : {total}")
print(f"Etimoloji Dagilimi:")
print(f"  native               : {native:6d}")
print(f"  unknown              : {unknown:6d}")
print(f"  proper_noun          : {proper:6d}")
print(f"  loanword             : {loan:6d}")
print(f"--------------------------------------------------")
print(f"Kok Disi / Muaf        : {exempt:5d}")
print(f"Koklenebilir Havuz     : {rootable:5d}")
print(f"--------------------------------------------------")

alanlar = [
    ("form","Form"), ("ipa","IPA"), ("partOfSpeech","POS"),
    ("conceptId","Concept"), ("derivation","Derivation"),
    ("literalMeaning","Meaning"), ("examples","Examples"),
    ("audioUrl","Audio"), ("corpusFrequency","Frequency"),
]
for alan, isim in alanlar:
    dolu = sum(1 for l in lex if l.get(alan))
    pct = 100 * dolu / total
    bar = "█" * int(pct/5) + "░" * (20 - int(pct/5))
    print(f"  {isim:15s} {dolu:6d}/{total} ({pct:5.1f}%) {bar}")

print(f"--------------------------------------------------")
root_raw = 100 * has_root / total
root_real = 100 * has_root / rootable if rootable > 0 else 0
bar_r = "█" * int(root_real/5) + "░" * (20 - int(root_real/5))
print(f"  Root (Ham)      {has_root:6d}/{total} ({root_raw:5.1f}%)")
print(f"  Root (GERCEK)   {has_root:6d}/{rootable} ({root_real:5.1f}%) {bar_r} 🎯")

wf_raw = 100 * has_wf / total
wf_real = 100 * has_wf / rootable if rootable > 0 else 0
bar_w = "█" * int(wf_real/5) + "░" * (20 - int(wf_real/5))
print(f"  WF   (Ham)      {has_wf:6d}/{total} ({wf_raw:5.1f}%)")
print(f"  WF   (GERCEK)   {has_wf:6d}/{rootable} ({wf_real:5.1f}%) {bar_w} 🎯")
print(f"==================================================")
