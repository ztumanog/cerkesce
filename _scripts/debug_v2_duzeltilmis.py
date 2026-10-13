# debug_v2_duzeltilmis.py
import json
import unicodedata
from pathlib import Path
from collections import Counter

BASE = Path(r"E:\projeler\Cerkesce")
LEX = BASE/"public/data/linguistic/lexemes.json"
WIK = BASE/"_wiktionary"/"wiktionary_full.json"
OUT = BASE/"_wiktionary"/"debug_v2.txt"


def normalize(s):
    if not s:
        return ""
    s = s.strip().lower()
    s = s.replace("і", "Ӏ").replace("І", "Ӏ").replace("ӏ", "Ӏ")
    s = unicodedata.normalize("NFC", s)
    return s


lex = json.loads(LEX.read_text(encoding="utf-8"))
wik = json.loads(WIK.read_text(encoding="utf-8"))

lex_norm = {normalize(l.get("form", "")): l for l in lex if l.get("form")}
wik_norm = {normalize(t): t for t in wik.keys()}

sadece_lex = set(lex_norm.keys()) - set(wik_norm.keys())
sadece_wik = set(wik_norm.keys()) - set(lex_norm.keys())

with open(OUT, "w", encoding="utf-8") as f:
    f.write("=== SADECE LEXEME'DE (ilk 100) ===\n")
    for k in sorted(sadece_lex)[:100]:
        f.write(f"  {k!r}\n")
    
    f.write("\n=== SADECE WIKTIONARY'DE (ilk 100) ===\n")
    for k in sorted(sadece_wik)[:100]:
        f.write(f"  {k!r}\n")
    
    f.write("\n=== SADECE LEXEME'DEKI KARAKTERLER ===\n")
    chars = Counter()
    for k in sadece_lex:
        for c in k:
            chars[c] += 1
    for c, n in chars.most_common(30):
        f.write(f"  {c!r} (U+{ord(c):04X}): {n}\n")
    
    f.write("\n=== SADECE WIKTIONARY'DEKI KARAKTERLER ===\n")
    chars2 = Counter()
    for k in sadece_wik:
        for c in k:
            chars2[c] += 1
    for c, n in chars2.most_common(30):
        f.write(f"  {c!r} (U+{ord(c):04X}): {n}\n")
    
    f.write("\n=== ORNEK ESLESMEYEN LEXEME'LER (uzun) ===\n")
    uzun = sorted(sadece_lex, key=len, reverse=True)[:30]
    for k in uzun:
        f.write(f"  {k!r} (uzunluk={len(k)})\n")

print(f"Yazildi: {OUT}")