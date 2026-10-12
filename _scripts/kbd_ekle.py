import json
from pathlib import Path

diamond = json.loads(Path("_scripts/diamond_ornekler_kbd.json").read_text(encoding="utf-8"))
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

def normalize(s):
    s = s.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")
    return s.strip().lower()

mevcut = {normalize(l.get("form", "")) for l in lex}

sayac = 0
for word, data in diamond.items():
    norm = normalize(word)
    if norm in mevcut:
        continue

    kayit = {
        "id": f"L-KBD-{sayac:05d}",
        "form": word,
        "literalMeaning": "",
        "partOfSpeech": "",
        "conceptId": "",
        "examples": data.get("examples", [])[:3],
        "notes": f"KBD sozluk: {', '.join(data.get('sources', []))}",
        "corpusFrequency": 0,
        "rootIds": [],
        "wordFamilyId": None,
        "derivation": None,
        "dialectVariants": {"adyghe": "", "kabardian": word}
    }
    lex.append(kayit)
    sayac += 1

print(f"Eklenen: {sayac}")
print(f"Toplam: {len(lex)}")

ex_dolu = sum(1 for l in lex if l.get("examples"))
print(f"examples dolu: {ex_dolu}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("OK Kaydedildi")
