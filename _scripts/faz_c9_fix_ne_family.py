
"""
C-9.5 — WF-NE (göz) aile düzeltme ve genişletme
================================================
Diyalekt karışıklıklarını düzeltir ve yeni lexeme'ler ekler.

Sorunlar:
- L-NEKHUE (нэху) = Kabardey formu, Adyghe değil
- L-NEF (нэф) = Adyghe formu ama Kabardey anlamı
- L-NEF1 (нэфӀ) = Kabardey formu, Adyghe değil

Çözüm:
- Diyalekt varyantlarını düzelt
- Yeni lexeme'ler ekle
- Frekansları ayır (ady/kbd)
"""
import json
from pathlib import Path

LING = Path("public/data/linguistic")
FREQ = Path("data/corpus/frequency")

# Corpus frekansları
freq_ady = json.loads((FREQ / "lexeme_freq_ady.json").read_text(encoding="utf-8"))
freq_kbd = json.loads((FREQ / "lexeme_freq_kbd.json").read_text(encoding="utf-8"))

def get_freq(word, lang):
    freq = freq_ady if lang == "ady" else freq_kbd
    return freq.get(word, 0)

# Lexeme'leri yükle
lx_path = LING / "lexemes.json"
lexemes = json.loads(lx_path.read_text(encoding="utf-8"))

print("=" * 60)
print("C-9.5 — WF-NE Düzeltme ve Genişletme")
print("=" * 60)

# 1) Düzeltmeler
FIXES = {
    "L-NEKHUE": {
        "id": "L-NE-LIGHT",
        "form": "нэф",
        "literalMeaning": "ışık",
        "adyghe": "нэф",
        "kabardian": "нэху",
    },
    "L-NEF": {
        "id": "L-NE-BLIND",
        "form": "нэшъу",
        "literalMeaning": "kör",
        "adyghe": "нэшъу",
        "kabardian": "нэф",
    },
    "L-NEF1": {
        "id": "L-NE-FAVOR",
        "form": "нэшӀу",
        "literalMeaning": "iyilik, lütuf",
        "adyghe": "нэшӀу",
        "kabardian": "нэфӀ",
    },
}

fixed = 0
for lx in lexemes:
    if lx["id"] in FIXES:
        fix = FIXES[lx["id"]]
        old_id = lx["id"]
        lx["id"] = fix["id"]
        lx["form"] = fix["form"]
        lx["literalMeaning"] = fix["literalMeaning"]
        lx["dialectVariants"] = {
            "adyghe": fix["adyghe"],
            "kabardian": fix["kabardian"]
        }
        # Frekansları ayır
        ady_freq = get_freq(fix["adyghe"], "ady")
        kbd_freq = get_freq(fix["kabardian"], "kbd")
        lx["corpusFrequency"] = ady_freq + kbd_freq
        lx["corpusFrequencyAdy"] = ady_freq
        lx["corpusFrequencyKbd"] = kbd_freq
        print(f"  [FIX] {old_id} -> {fix['id']} ({fix['form']})")
        fixed += 1

# 2) Yeni lexeme'ler
NEW_LEXEMES = [
    {
        "id": "L-NE-BRIGHTNESS",
        "form": "нэфынэ",
        "literalMeaning": "aydınlık, ışık kaynağı",
        "adyghe": "нэфынэ",
        "kabardian": "",
    },
    {
        "id": "L-NE-DAWN",
        "form": "нэхущ",
        "literalMeaning": "şafak, tan",
        "adyghe": "",
        "kabardian": "нэхущ",
    },
    {
        "id": "L-NE-KINDNESS",
        "form": "нэшӀущыфэныгъэ",
        "literalMeaning": "iyilikseverlik",
        "adyghe": "нэшӀущыфэныгъэ",
        "kabardian": "нэфӀщыхуэныгъэ",
    },
    {
        "id": "L-NE-JOY",
        "form": "нэфӀэгуфӀэ",
        "literalMeaning": "neşeli, güler yüzlü",
        "adyghe": "",
        "kabardian": "нэфӀэгуфӀэ",
    },
]

added = 0
for spec in NEW_LEXEMES:
    # Duplicate kontrol
    if any(lx["id"] == spec["id"] for lx in lexemes):
        print(f"  [!] {spec['id']} zaten var, atlanıyor")
        continue

    ady_freq = get_freq(spec["adyghe"], "ady") if spec["adyghe"] else 0
    kbd_freq = get_freq(spec["kabardian"], "kbd") if spec["kabardian"] else 0

    new_lx = {
        "id": spec["id"],
        "form": spec["form"],
        "literalMeaning": spec["literalMeaning"],
        "wordFamilyId": "WF-NE",
        "dialectVariants": {
            "adyghe": spec["adyghe"] or spec["form"],
            "kabardian": spec["kabardian"] or spec["form"]
        },
        "corpusFrequency": ady_freq + kbd_freq,
        "corpusFrequencyAdy": ady_freq,
        "corpusFrequencyKbd": kbd_freq,
        "notes": f"C-9.5 yeni lexeme. ADY={ady_freq}, KBD={kbd_freq}"
    }
    lexemes.append(new_lx)
    added += 1
    print(f"  [+] {spec['id']} ({spec['form']}) ADY={ady_freq} KBD={kbd_freq}")

# Kaydet
lx_path.write_text(
    json.dumps(lexemes, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

print()
print("=" * 60)
print(f"Düzeltilen: {fixed}")
print(f"Yeni eklenen: {added}")
print(f"Toplam lexeme: {len(lexemes)}")
print("=" * 60)