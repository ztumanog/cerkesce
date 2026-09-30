"""
C-9.5 — Lexeme aday dogrulama
===============================
Her aday icin:
- Corpus frekansi (ADY + KBD)
- Slovar kaynak sayisi (manuel girilir)
- Anlam kontrolu
"""
import json
from pathlib import Path

FREQ = Path("data/corpus/frequency")
freq_ady = json.loads((FREQ / "lexeme_freq_ady.json").read_text(encoding="utf-8"))
freq_kbd = json.loads((FREQ / "lexeme_freq_kbd.json").read_text(encoding="utf-8"))

# Adaylar: form, beklenen_anlam, sozluk_kaynak_sayisi
CANDIDATES = [
    # WF-GU
    ("гукӏэгъу", "merhamet", 11),
    ("гущӏэгъу", "merhamet", 11),
    ("гухэлъ", "niyet, amaç", 11),
    ("гулъытэ", "saygı", 0),
    ("гушӏуагъо", "sevinç", 0),
    ("гузэжъогъу", "endişe", 0),
    ("гугъапӏэ", "umut", 0),
    ("гугъэ", "düşünce", 4),
    ("гугъу", "düşünce", 0),
    ("гугъуехь", "endişe", 0),
    # Dogrulanmamis
    ("гупсэф", "?", 0),
    ("гухэкӏ", "?", 0),
]

print("=" * 70)
print("C-9.5 — Lexeme Aday Dogrulama")
print("=" * 70)
print()
print(f"{'Form':<18} {'Beklenen':<20} {'ADY':>6} {'KBD':>6} {'Sozluk':>6} {'Durum'}")
print("-" * 70)

for form, expected, sozluk in CANDIDATES:
    ady = freq_ady.get(form, 0)
    kbd = freq_kbd.get(form, 0)
    total = ady + kbd

    # Karar
    if total < 20:
        durum = "ZAYIF"
    elif sozluk == 0:
        durum = "SOZLUK?"
    elif sozluk < 3:
        durum = "RISKLI"
    else:
        durum = "OK"

    print(f"{form:<18} {expected:<20} {ady:>6} {kbd:>6} {sozluk:>6} {durum}")

print()
print("OK — Kontrol tamamlandi.")