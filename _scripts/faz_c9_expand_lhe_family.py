3
"""
C-9.5 — WF-LHE (ayak) aile genisletme
=======================================
Mevcut: 4 lexeme
Hedef : 9 lexeme (+5)

5 yeni lexeme (corpus + Slovar + Wiktionary dogrulanmis):
- лъэужь (iz)         Slovar: 10, Wiktionary: ✅
- лъэгуажьэ (diz)      Slovar: 10, Wiktionary: ✅
- лъэмыдж (köprü)      Slovar: 8, Wiktionary: ✅
- лъэщ (güçlü)         Slovar: 10, Wiktionary: ✅
- лъэныкъо (yan, taraf) Slovar: 1 + Wiktionary etimoloji: ✅
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
        "id": "L-LHEUZHY",
        "adyghe": "\u043b\u044a\u044d\u0443\u0436\u044c",
        "kabardian": "\u043b\u044a\u044d\u0443\u0436\u044c",
        "literalMeaning": "iz, ayak izi",
        "slovar": 10,
    },
    {
        "id": "L-LHEGUA",
        "adyghe": "\u043b\u044a\u044d\u0433\u0443\u0430\u0436\u044c\u044d",
        "kabardian": "\u043b\u044a\u044d\u0433\u0443\u0430\u0436\u044c\u044d",
        "literalMeaning": "diz",
        "slovar": 10,
    },
    {
        "id": "L-LHEMYDJ",
        "adyghe": "\u043b\u044a\u044d\u043c\u044b\u0434\u0436",
        "kabardian": "\u043b\u044a\u044d\u043c\u044b\u0436",
        "literalMeaning": "kopru",
        "slovar": 8,
    },
    {
        "id": "L-LHESHCH",
        "adyghe": "\u043b\u044a\u044d\u0449",
        "kabardian": "\u043b\u044a\u044d\u0449",
        "literalMeaning": "guclu, kudretli",
        "slovar": 10,
    },
    {
        "id": "L-LHENYQO",
        "adyghe": "\u043b\u044a\u044d\u043d\u044b\u043a\u044a\u043e",
        "kabardian": "\u043b\u044a\u044d\u043d\u044b\u043a\u044a\u0443\u044d",
        "literalMeaning": "yan, taraf",
        "slovar": 1,
        "note_extra": "Wiktionary etimoloji: лъ + ныкъу + э (ayak yarimi).",
    },
]


def main():
    lx_path = LING / "lexemes.json"
    lexemes = json.loads(lx_path.read_text(encoding="utf-8"))

    print("=" * 60)
    print("C-9.5 — WF-LHE Aile Genisletme")
    print("=" * 60)
    print()

    added = 0
    for spec in NEW_LEXEMES:
        if any(lx["id"] == spec["id"] for lx in lexemes):
            print(f"[!] {spec['id']} zaten var")
            continue

        ady_f = get_freq(spec["adyghe"], freq_ady)
        kbd_f = get_freq(spec["kabardian"], freq_kbd)

        notes = f"C-9.5. Slovar: {spec['slovar']} kaynak."
        if "note_extra" in spec:
            notes += f" {spec['note_extra']}"

        new_lx = {
            "id": spec["id"],
            "form": spec["adyghe"],
            "literalMeaning": spec["literalMeaning"],
            "wordFamilyId": "WF-LHE",
            "dialectVariants": {
                "adyghe": spec["adyghe"],
                "kabardian": spec["kabardian"],
            },
            "corpusFrequency": ady_f + kbd_f,
            "corpusFrequencyAdy": ady_f,
            "corpusFrequencyKbd": kbd_f,
            "notes": notes,
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