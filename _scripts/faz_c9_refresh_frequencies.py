"""
C-9.5 — Frekansları yeniden hesapla (Palochka-aware)
======================================================
Tüm lexeme'ler için ADY + KBD frekanslarını ayrı ayrı hesapla.
Palochka (Ӏ U+04C0) ve küçük palochka (ӏ U+04CF) farkını tolere et.
"""
import json
from pathlib import Path

LING = Path("public/data/linguistic")
FREQ = Path("data/corpus/frequency")

freq_ady = json.loads((FREQ / "lexeme_freq_ady.json").read_text(encoding="utf-8"))
freq_kbd = json.loads((FREQ / "lexeme_freq_kbd.json").read_text(encoding="utf-8"))


def get_freq(word, freq_dict):
    """Palochka varyantlarını tolere ederek frekans al."""
    if not word:
        return 0
    # Direkt ara
    if word in freq_dict:
        return freq_dict[word]
    # Palochka varyantları
    variants = [
        word.replace("Ӏ", "ӏ"),
        word.replace("ӏ", "Ӏ"),
        word.replace("I", "Ӏ"),  # Latin I
    ]
    for v in variants:
        if v in freq_dict:
            return freq_dict[v]
    return 0


lx_path = LING / "lexemes.json"
lexemes = json.loads(lx_path.read_text(encoding="utf-8"))

print("=" * 70)
print("C-9.5 — Frekans Yenileme")
print("=" * 70)
print()

updated = 0
for lx in lexemes:
    variants = lx.get("dialectVariants", {})
    ady = variants.get("adyghe", "")
    kbd = variants.get("kabardian", "")

    ady_f = get_freq(ady, freq_ady)
    kbd_f = get_freq(kbd, freq_kbd)

    old_total = lx.get("corpusFrequency", 0)
    new_total = ady_f + kbd_f

    lx["corpusFrequencyAdy"] = ady_f
    lx["corpusFrequencyKbd"] = kbd_f
    lx["corpusFrequency"] = new_total

    if old_total != new_total:
        updated += 1

lx_path.write_text(
    json.dumps(lexemes, ensure_ascii=False, indent=2),
    encoding="utf-8",
)

print(f"Güncellenen: {updated}/{len(lexemes)}")
print()

# WF-NE özet
print("WF-NE ailesi:")
print("-" * 70)
print(f"{'ID':<18} {'ADY':>6} {'KBD':>6} {'TOP':>8}")
print("-" * 70)

for lx in lexemes:
    if lx.get("wordFamilyId") == "WF-NE":
        print(
            f"{lx['id']:<18} "
            f"{lx.get('corpusFrequencyAdy', 0):>6} "
            f"{lx.get('corpusFrequencyKbd', 0):>6} "
            f"{lx.get('corpusFrequency', 0):>8}"
        )

print()
print("OK — Frekanslar güncellendi.")