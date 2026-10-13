# wiktionary_karsilastir_v3.py
import json
import unicodedata
from pathlib import Path

BASE = Path(r"E:\projeler\Cerkesce")
LEX = BASE/"public/data/linguistic/lexemes.json"
WIK = BASE/"_wiktionary"/"wiktionary_full.json"
OUT = BASE/"_wiktionary"/"karsilastirma_v3.txt"


def normalize(s):
    if not s:
        return ""
    s = s.strip()
    s = s.lower()
    s = s.replace("і", "Ӏ").replace("І", "Ӏ")
    s = s.replace("ӏ", "Ӏ")
    s = unicodedata.normalize("NFC", s)
    return s


lex = json.loads(LEX.read_text(encoding="utf-8"))
wik = json.loads(WIK.read_text(encoding="utf-8"))

# Normalize formlar
lex_norm = {}
for l in lex:
    f = normalize(l.get("form", ""))
    if f:
        lex_norm[f] = l

wik_norm = {}
for t in wik.keys():
    n = normalize(t)
    if n:
        wik_norm[n] = t

# Karsilastirma
ikisinde = set(lex_norm.keys()) & set(wik_norm.keys())
sadece_lex = set(lex_norm.keys()) - set(wik_norm.keys())
sadece_wik = set(wik_norm.keys()) - set(lex_norm.keys())

print(f"Lexeme formlar:  {len(lex_norm)}")
print(f"Wiktionary:      {len(wik_norm)}")
print(f"Ikisinde de:     {len(ikisinde)} (%{100*len(ikisinde)/len(lex_norm):.1f})")
print(f"Sadece Lexeme:   {len(sadece_lex)}")
print(f"Sadece Wikt:     {len(sadece_wik)}")

with open(OUT, "w", encoding="utf-8") as f:
    f.write(f"=== NORMALIZE KARSILASTIRMA ===\n\n")
    f.write(f"Lexeme:   {len(lex_norm)}\n")
    f.write(f"Wikt:     {len(wik_norm)}\n")
    f.write(f"Ikisinde: {len(ikisinde)} (%{100*len(ikisinde)/len(lex_norm):.1f})\n")
    f.write(f"Sadece Lex: {len(sadece_lex)}\n")
    f.write(f"Sadece Wik: {len(sadece_wik)}\n")

    # Ses kapsamasi
    ses = sum(1 for k in ikisinde if wik.get(wik_norm[k], {}).get("audio"))
    f.write(f"\nSes: {ses}\n")

    f.write(f"\n=== SADECE LEXEME (ilk 30) ===\n")
    for k in sorted(sadece_lex)[:30]:
        f.write(f"  {k}\n")

    f.write(f"\n=== SADECE WIKT (ilk 30) ===\n")
    for k in sorted(sadece_wik)[:30]:
        f.write(f"  {k}\n")

print(f"Yazildi: {OUT}")