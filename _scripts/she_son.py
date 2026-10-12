import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# L-SHE zaten var mi kontrol et
if "L-SHE" in mevcut:
    for l in lex:
        if l["id"] == "L-SHE":
            l["form"] = "шэ"
            l["ipa"] = "/ʂɐ/"
            l["literalMeaning"] = "sut, lateks"
            l["partOfSpeech"] = "noun"
            l["wordFamilyId"] = "WF-SHE"
            l["conceptId"] = "MILK"
            l["senses"] = [
                {"senseId": 1, "gloss": "milk", "tr": "süt", "ru": "молоко"},
                {"senseId": 2, "gloss": "latex", "tr": "lateks", "ru": "латекс"}
            ]
            l["notes"] = "C-11.3: sut/lateks. Homonim: L-SHE2 (mermi). Korpus: 16748."
            print("L-SHE guncellendi: sut/lateks")
else:
    lex.append({
        "id": "L-SHE", "form": "шэ", "ipa": "/ʂɐ/",
        "literalMeaning": "sut, lateks", "partOfSpeech": "noun",
        "wordFamilyId": "WF-SHE", "conceptId": "MILK",
        "senses": [
            {"senseId": 1, "gloss": "milk", "tr": "süt", "ru": "молоко"},
            {"senseId": 2, "gloss": "latex", "tr": "lateks", "ru": "латекс"}
        ],
        "notes": "C-11.3: sut/lateks. Homonim: L-SHE2 (mermi). Korpus: 16748.",
        "corpusFrequency": 16748
    })
    print("Eklendi: L-SHE - шэ (sut/lateks)")

# L-SHE2 (mermi) ekle
if "L-SHE2" not in mevcut:
    lex.append({
        "id": "L-SHE2", "form": "шэ", "ipa": "/ʂɐ/",
        "literalMeaning": "mermi, kursun", "partOfSpeech": "noun",
        "wordFamilyId": "WF-SHE2", "conceptId": "BULLET",
        "senses": [
            {"senseId": 1, "gloss": "cartridge", "tr": "fişek", "ru": "патрон"},
            {"senseId": 2, "gloss": "bullet, projectile", "tr": "kurşun, mermi", "ru": "пуля, снаряд"}
        ],
        "notes": "C-11.3: mermi. Homonim: L-SHE (sut). Korpus: 16748 (karisik).",
        "corpusFrequency": 16748
    })
    print("Eklendi: L-SHE2 - шэ (mermi)")

# L-SHHE (щэ) = yag
if "L-SHHE" not in mevcut:
    lex.append({
        "id": "L-SHHE", "form": "щэ", "ipa": "/ɕɐ/",
        "literalMeaning": "yag, ic yagi", "partOfSpeech": "noun",
        "wordFamilyId": "WF-SHHE", "conceptId": "FAT",
        "senses": [{"senseId": 1, "gloss": "fat, grease", "tr": "yağ", "ru": "жир, сало"}],
        "notes": "C-11.3: yag. Korpus: 19752.",
        "corpusFrequency": 19752
    })
    print("Eklendi: L-SHHE - щэ (yag)")

# L-SHHE2 (щэ) = uc kez
if "L-SHHE2" not in mevcut:
    lex.append({
        "id": "L-SHHE2", "form": "щэ", "ipa": "/ɕɐ/",
        "literalMeaning": "uc kez", "partOfSpeech": "numeral",
        "wordFamilyId": "WF-SHHE", "conceptId": "THREE_TIMES",
        "senses": [{"senseId": 1, "gloss": "three times", "tr": "üç kez", "ru": "три раза"}],
        "notes": "C-11.3: uc kez. Korpus: 19752.",
        "corpusFrequency": 19752
    })
    print("Eklendi: L-SHHE2 - щэ (uc kez)")

# L-SHHE3 (щэ) = yuz
if "L-SHHE3" not in mevcut:
    lex.append({
        "id": "L-SHHE3", "form": "щэ", "ipa": "/ɕɐ/",
        "literalMeaning": "yuz (100)", "partOfSpeech": "numeral",
        "wordFamilyId": "WF-SHHE", "conceptId": "HUNDRED",
        "senses": [{"senseId": 1, "gloss": "hundred", "tr": "yüz", "ru": "сто"}],
        "notes": "C-11.3: yuz. Korpus: 19752.",
        "corpusFrequency": 19752
    })
    print("Eklendi: L-SHHE3 - щэ (yuz)")

# L-SHHE4 (щэ) = soru eki
if "L-SHHE4" not in mevcut:
    lex.append({
        "id": "L-SHHE4", "form": "щэ", "ipa": "/ɕɐ/",
        "literalMeaning": "soru eki", "partOfSpeech": "particle",
        "wordFamilyId": "WF-SHHE", "conceptId": "QUESTION",
        "senses": [{"senseId": 1, "gloss": "question particle", "tr": "soru eki", "ru": "вопросительная частица"}],
        "notes": "C-11.3: soru eki. Мыр-щэ? = Bu mu? Korpus: 19752.",
        "corpusFrequency": 19752
    })
    print("Eklendi: L-SHHE4 - щэ (soru eki)")

# L-SHCHEN (щэн) = satmak
if "L-SHCHEN" not in mevcut:
    lex.append({
        "id": "L-SHCHEN", "form": "щэн",
        "literalMeaning": "satmak", "partOfSpeech": "verb",
        "wordFamilyId": "WF-SHCHEN", "conceptId": "SELL",
        "senses": [{"senseId": 1, "gloss": "to sell", "tr": "satmak", "ru": "продавать"}],
        "notes": "C-11.3: satmak. Emir: щэ = sat! Korpus: 0.",
        "corpusFrequency": 0
    })
    print("Eklendi: L-SHCHEN - щэн (satmak)")

# L-SHCHEN-IMP (щэ) = sat! (emir)
if "L-SHCHEN-IMP" not in mevcut:
    lex.append({
        "id": "L-SHCHEN-IMP", "form": "щэ",
        "literalMeaning": "sat! (emir)", "partOfSpeech": "verb (imperative)",
        "wordFamilyId": "WF-SHCHEN", "conceptId": "SELL",
        "senses": [{"senseId": 1, "gloss": "sell! (imperative)", "tr": "sat!", "ru": "продай!"}],
        "notes": "C-11.3: sat! emir kipi. щэн fiilinden. Korpus: 19752 (karisik).",
        "corpusFrequency": 19752
    })
    print("Eklendi: L-SHCHEN-IMP - щэ (sat! emir)")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nToplam lexeme: {len(lex)}")
