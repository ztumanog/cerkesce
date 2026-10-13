# karsilastir_debug.py
import json
from pathlib import Path
from collections import Counter

BASE = Path(r"E:\projeler\Cerkesce")
LEX = BASE/"public/data/linguistic/lexemes.json"
WIK = BASE/"_wiktionary"/"wiktionary_full.json"
OUT = BASE/"_wiktionary"/"debug.txt"

lex = json.loads(LEX.read_text(encoding="utf-8"))
wik = json.loads(WIK.read_text(encoding="utf-8"))

lex_forms = [l.get("form", "") for l in lex if l.get("form")]
wik_titles = list(wik.keys())

with open(OUT, "w", encoding="utf-8") as f:
    f.write("=== ILK 50 LEXEME FORMU ===\n")
    for form in lex_forms[:50]:
        in_wik = form in wik
        f.write(f"  {form!r:35} in_wik={in_wik}\n")
    
    f.write(f"\n=== ILK 50 WIKTIONARY BASLIGI ===\n")
    for t in wik_titles[:50]:
        f.write(f"  {t!r}\n")
    
    # Basit kesisim testi
    lex_set = set(lex_forms)
    wik_set = set(wik_titles)
    f.write(f"\n=== KESISIM ===\n")
    f.write(f"Lexeme unique: {len(lex_set)}\n")
    f.write(f"Wiktionary unique: {len(wik_set)}\n")
    f.write(f"Kesisim: {len(lex_set & wik_set)}\n")
    
    # Ornek: lexeme'de olan ve wiktionary'de OLMASI GEREKEN bir kac kelime
    f.write(f"\n=== ORNEK KELIMELER ===\n")
    test_kelime = ["гуфӀэ", "псы", "нэ", "лъэ", "гу", "Ӏэ", "адэ", "анэ", "мэз", "бзэ"]
    for k in test_kelime:
        f.write(f"  {k!r}: lexeme={k in lex_set}, wik={k in wik_set}\n")
    
    # Uzunluk dagilimi
    f.write(f"\n=== WIKTIONARY BASLIK UZUNLUKLARI ===\n")
    uz = Counter(len(t) for t in wik_titles)
    for u, n in sorted(uz.items())[:20]:
        f.write(f"  {u} harf: {n}\n")
    
    f.write(f"\n=== LEXEME FORM UZUNLUKLARI ===\n")
    lex_uz = Counter(len(f) for f in lex_forms)
    for u, n in sorted(lex_uz.items())[:20]:
        f.write(f"  {u} harf: {n}\n")

print(f"Yazildi: {OUT}")