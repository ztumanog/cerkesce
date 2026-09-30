
"""
C-9.5 — WF-1E (el) aile genisletme
====================================
Mevcut: 5 lexeme
Hedef : 10 lexeme (+5)

5 yeni lexeme (corpus + Slovar dogrulanmis):
- ӀэпыӀэгъу (yardım)          Slovar: 3
- Ӏэмал (çare, yol)           Slovar: 11
- Ӏэзэгъу (ilaç)              Slovar: 5
- ӀэфӀ (tatlı, lezzetli)      Slovar: 11
- Ӏэщ (hayvan, ahır)          Slovar: 17
"""
import json
from pathlib import Path

LING = Path("public/data/linguistic")
FREQ = Path("data/corpus/frequency")

freq_ady = json.loads((FREQ / "lexeme_freq_ady.json").read_text(encoding="utf-8"))
freq_kbd = json.loads((FREQ / "lexeme_freq_kbd.json").read_text(encoding="utf-8"))


def get_freq(word, freq):
    if not word:
        return 0
    if word in freq:
        return freq[word]
    for v in [word.replace("\u04c0", "\u04cf"), word.replace("\u04cf", "\u04c0")]:
        if v in freq:
            return freq[v]
    return 0


NEW_LEXEMES = [
    {
        "id": "L-1EPY1EGHU",
        "adyghe": "\u04cf\u044d\u043f\u044b\u04cf\u044d\u0433\u044a\u0443",
        "kabardian": "\u0434\u044d\u04cf\u044d\u043f\u044b\u043a\u044a\u0443\u043d\u044b\u0433\u044a\u044d",
        "literalMeaning": "yardim",
        "slovar": 3,
    },
    {
        "id": "L-1EMAL",
        "adyghe": "\u04cf\u044d\u043c\u0430\u043b",
        "kabardian": "\u04cf\u044d\u043c\u0430\u043b",
        "literalMeaning": "care, yol",
        "slovar": 11,
    },
    {
        "id": "L-1EZEGHU",
        "adyghe": "\u04cf\u044d\u0437\u044d\u0433\u044a\u0443",
        "kabardian": "\u0445\u0443\u0449\u0445\u044a\u0443\u044d",
        "literalMeaning": "ilac, tedavi",
        "slovar": 5,
    },
    {
        "id": "L-1EF1",
        "adyghe": "\u04cf\u044d\u0444\u04cf",
        "kabardian": "\u04cf\u044d\u0444\u04cf",
        "literalMeaning": "tatli, lezzetli",
        "slovar": 11,
    },
    {
        "id": "L-1ESHCH",
        "adyghe": "\u04cf\u044d\u0449",
        "kabardian": "\u04cf\u044d\u0449",
        "literalMeaning": "hayvan, ahir",
        "slovar": 17,
    },
]


def main():
    lx_path = LING / "lexemes.json"
    lexemes = json.loads(lx_path.read_text(encoding="utf-8"))

    print("=" * 60)
    print("C-9.5 — WF-1E Aile Genisletme")
    print("=" * 60)
    print()

    added = 0
    for spec in NEW_LEXEMES:
        if any(lx["id"] == spec["id"] for lx in lexemes):
            print(f"[!] {spec['id']} zaten var")
            continue

        ady_f = get_freq(spec["adyghe"], freq_ady)
        kbd_f = get_freq(spec["kabardian"], freq_kbd)

        new_lx = {
            "id": spec["id"],
            "form": spec["adyghe"],
            "literalMeaning": spec["literalMeaning"],
            "wordFamilyId": "WF-1E",
            "dialectVariants": {
                "adyghe": spec["adyghe"],
                "kabardian": spec["kabardian"],
            },
            "corpusFrequency": ady_f + kbd_f,
            "corpusFrequencyAdy": ady_f,
            "corpusFrequencyKbd": kbd_f,
            "notes": f"C-9.5. Slovar: {spec['slovar']} kaynak.",
        }
        lexemes.append(new_lx)
        added += 1
        print(f"[+] {spec['id']} ({spec['adyghe']}) ADY={ady_f} KBD={kbd_f} Slovar={spec['slovar']}")

    lx_path.write_text(
        json.dumps(lexemes, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print()
    print("=" * 60)
    print(f"Yeni eklenen: {added}")
    print(f"Toplam lexeme: {len(lexemes)}")
    print("=" * 60)


if __name__ == "__main__":
    main()