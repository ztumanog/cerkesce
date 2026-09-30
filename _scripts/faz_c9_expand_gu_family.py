"""
C-9.5 — WF-GU (kalp) aile genisletme
======================================
Mevcut: 10 lexeme
Hedef : 21 lexeme (+11)

- 8 anlam duzeltmesi (literal -> gercek)
- 11 yeni lexeme (corpus + sozluk dogrulanmis)
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


# === 1) ANLAM DUZELTMELERI ===
MEANING_FIXES = {
    "L-GUF1E": "sevgi, mutluluk",
    "L-GUGHE": "umut, beklenti",
    "L-GUBZHYGE": "akilli",
    "L-GURYYUEN": "anlamak",
    "L-GUBZH": "ofke",
    "L-GUPSYSE": "dusunce",
    "L-GUSHCHYE": "soz, kelime",
    "L-GURYYUEZHYN": "anlamak (tekrar)",
}

# === 2) YENI LEXEMELER (11 adet) ===
NEW_LEXEMES = [
    {
        "id": "L-GUK1EGHU",
        "adyghe": "\u0433\u0443\u043a\u04cf\u044d\u0433\u044a\u0443",
        "kabardian": "\u0433\u0443\u0449\u04cf\u044d\u0433\u044a\u0443",
        "literalMeaning": "merhamet, acima",
        "slovar": 11,
    },
    {
        "id": "L-GUKHELHE",
        "adyghe": "\u0433\u0443\u0445\u044d\u043b\u044a",
        "kabardian": "\u0433\u0443\u0445\u044d\u043b\u044a",
        "literalMeaning": "niyet, amac",
        "slovar": 11,
    },
    {
        "id": "L-GUPSAF",
        "adyghe": "\u0433\u0443\u043f\u0441\u044d\u0444",
        "kabardian": "\u0433\u0443\u043f\u0441\u044d\u0444",
        "literalMeaning": "rahat, huzurlu",
        "slovar": 5,
    },
    {
        "id": "L-GUGHU",
        "adyghe": "\u0433\u0443\u0433\u044a\u0443",
        "kabardian": "\u0433\u0443\u0433\u044a\u0443",
        "literalMeaning": "zorluk, sikinti",
        "slovar": 17,
    },
    {
        "id": "L-GUGHE2",
        "adyghe": "\u0433\u0443\u0433\u044a\u044d",
        "kabardian": "\u0433\u0443\u0433\u044a\u044d",
        "literalMeaning": "umut, beklenti",
        "slovar": 4,
    },
    {
        "id": "L-GUGHUEGHE",
        "adyghe": "\u0433\u0443\u0433\u044a\u0443\u0435\u0445\u044c",
        "kabardian": "\u0433\u0443\u0433\u044a\u0443\u0435\u0445\u044c",
        "literalMeaning": "zorluklar, cile",
        "slovar": 12,
    },
    {
        "id": "L-GULHYTE",
        "adyghe": "\u0433\u0443\u043b\u044a\u044b\u0442\u044d",
        "kabardian": "\u0433\u0443\u043b\u044a\u044b\u0442\u044d",
        "literalMeaning": "dikkat, ilgi",
        "slovar": 12,
    },
    {
        "id": "L-GUKHEK1",
        "adyghe": "\u0433\u0443\u0445\u044d\u043a\u04cf",
        "kabardian": "\u0433\u0443\u0445\u044d\u043a\u04cf",
        "literalMeaning": "keder, uzuntu",
        "slovar": 7,
    },
    {
        "id": "L-GUGHAП1E",
        "adyghe": "\u0433\u0443\u0433\u044a\u0430\u043f\u04cf\u044d",
        "kabardian": "\u0433\u0443\u0433\u044a\u0430\u043f\u04cf\u044d",
        "literalMeaning": "umut, sans",
        "slovar": 9,
    },
    {
        "id": "L-GUZEZHO",
        "adyghe": "\u0433\u0443\u0437\u044d\u0436\u044a\u043e\u0433\u044a\u0443",
        "kabardian": "\u0433\u0443\u0437\u044d\u0432\u044d\u0433\u044a\u0443\u044d",
        "literalMeaning": "endise, telas",
        "slovar": 6,
    },
    {
        "id": "L-GUSH1UAGHO",
        "adyghe": "\u0433\u0443\u0449\u04cf\u0443\u0430\u0433\u044a\u043e",
        "kabardian": "\u0433\u0443\u0444\u04cf\u044d\u0433\u044a\u0443\u044d",
        "literalMeaning": "sevinç, nese",
        "slovar": 5,
    },
]


def main():
    lx_path = LING / "lexemes.json"
    lexemes = json.loads(lx_path.read_text(encoding="utf-8"))

    print("=" * 60)
    print("C-9.5 — WF-GU Aile Genisletme")
    print("=" * 60)

    # 1) Anlam duzeltmeleri
    print()
    print("[1/2] Anlam duzeltmeleri...")
    fixed = 0
    for lx in lexemes:
        if lx["id"] in MEANING_FIXES:
            old = lx.get("literalMeaning", "")
            new = MEANING_FIXES[lx["id"]]
            if old != new:
                lx["literalMeaning"] = new
                fixed += 1
                print(f"  [FIX] {lx['id']}: '{old}' -> '{new}'")
    print(f"  Toplam: {fixed} duzeltme")

    # 2) Yeni lexeme'ler
    print()
    print("[2/2] Yeni lexeme'ler ekleniyor...")
    added = 0
    for spec in NEW_LEXEMES:
        if any(lx["id"] == spec["id"] for lx in lexemes):
            print(f"  [!] {spec['id']} zaten var, atlaniyor")
            continue

        ady_f = get_freq(spec["adyghe"], freq_ady)
        kbd_f = get_freq(spec["kabardian"], freq_kbd)

        new_lx = {
            "id": spec["id"],
            "form": spec["adyghe"],
            "literalMeaning": spec["literalMeaning"],
            "wordFamilyId": "WF-GU",
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
        print(f"  [+] {spec['id']} ({spec['adyghe']}) ADY={ady_f} KBD={kbd_f} Slovar={spec['slovar']}")

    # Kaydet
    lx_path.write_text(
        json.dumps(lexemes, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


    print()
    print("=" * 60)
    print(f"Duzeltilen: {fixed}")
    print(f"Yeni eklenen: {added}")
    print(f"Toplam lexeme: {len(lexemes)}")
    print("=" * 60)


if __name__ == "__main__":
    main()