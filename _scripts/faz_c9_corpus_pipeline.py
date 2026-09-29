"""
Faz C-9.1.1 — Corpus pipeline: tokenize + frekans + dogrulama
=============================================================
Girdi : data/corpus/raw/*.jsonl (4 split, 331,468 cift)
        public/data/linguistic/{lexemes,roots,word_families}.json
Cikti : data/corpus/frequency/*.json
Rapor : docs/CORPUS_VERIFICATION_REPORT.md
"""
import json
import re
from pathlib import Path
from collections import Counter
from datetime import datetime, timezone

# ---- Yapilandirma ----
BASE = Path(".")
RAW = BASE / "data" / "corpus" / "raw"
FREQ = BASE / "data" / "corpus" / "frequency"
DOCS = BASE / "docs"
FREQ.mkdir(parents=True, exist_ok=True)

# Palochka normalize
PALOCHKA_CHARS = "1lIІӏ"      # Latin 1/l/I + Cyrillic І + palochka ӏ
PALOCHKA = "Ӏ"                 # U+04C0 (Cyrillic palochka)

# Tokenize regex: Cyrillic + palochka + tire
TOKEN_RE = re.compile(r"[а-яёӀ" + re.escape(PALOCHKA_CHARS) + r"-]+", re.IGNORECASE)

def normalize_palochka(text: str) -> str:
    """Tum palochka benzeri karakterleri Ӏ'ye cevir."""
    for c in PALOCHKA_CHARS:
        text = text.replace(c, PALOCHKA)
    return text

def tokenize(text: str) -> list:
    """Cyrillic + palochka aware tokenizer. Kucuk harfe indirger."""
    if not text:
        return []
    text = normalize_palochka(text).lower()
    return TOKEN_RE.findall(text)

# ---- Adim 1: Corpus oku ve frekans cikar ----
print("=" * 60)
print("Faz C-9.1.1 — Corpus Pipeline")
print("=" * 60)
print()

print("[1/5] Corpus okunuyor...")
ady_freq = Counter()
kbd_freq = Counter()
ady_pairs = 0
kbd_pairs = 0

split_files = [
    ("circassian_ady_ru.jsonl", "ady"),
    ("circassian_ru_ady.jsonl", "ady"),
    ("circassian_kbd_ru.jsonl", "kbd"),
    ("circassian_ru_kbd.jsonl", "kbd"),
]

for fname, lang in split_files:
    path = RAW / fname
    if not path.exists():
        print(f"  [!] Yok: {path}")
        continue
    count = 0
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            row = json.loads(line)
            trans = row.get("translation", {})
            text = trans.get(lang, "")
            tokens = tokenize(text)
            if lang == "ady":
                ady_freq.update(tokens)
                ady_pairs += 1
            else:
                kbd_freq.update(tokens)
                kbd_pairs += 1
            count += 1
    print(f"  {fname}: {count:,} cift")

print(f"  Adyghe: {ady_pairs:,} cift | {sum(ady_freq.values()):,} token | {len(ady_freq):,} unique")
print(f"  Kabardian: {kbd_pairs:,} cift | {sum(kbd_freq.values()):,} token | {len(kbd_freq):,} unique")
print()

# ---- Adim 2: Lexeme dogrulama ----
print("[2/5] Lexeme dogrulama (200 lexeme)...")
lexemes_path = BASE / "public" / "data" / "linguistic" / "lexemes.json"
lexemes = json.loads(lexemes_path.read_text(encoding="utf-8"))
print(f"  Yuklendi: {len(lexemes)} lexeme")

lexeme_results = []
not_found = []

for lx in lexemes:
    lx_id = lx["id"]
    form = normalize_palochka(lx.get("form", "")).lower()
    dialect = lx.get("dialectVariants", {})
    ady_form = normalize_palochka(dialect.get("adyghe", form)).lower()
    kbd_form = normalize_palochka(dialect.get("kabardian", form)).lower()

    # Adyghe ve Kabardian'da ara
    ady_count = ady_freq.get(ady_form, 0)
    kbd_count = kbd_freq.get(kbd_form, 0)
    # Ana formda da ara (dialectVariants yoksa)
    if not ady_count:
        ady_count = ady_freq.get(form, 0)
    if not kbd_count:
        kbd_count = kbd_freq.get(form, 0)

    old_freq = lx.get("corpusFrequency", 0)
    total = ady_count + kbd_count

    result = {
        "lexemeId": lx_id,
        "form": lx.get("form"),
        "adygheForm": dialect.get("adyghe", form),
        "kabardianForm": dialect.get("kabardian", form),
        "adyFreq": ady_count,
        "kbdFreq": kbd_count,
        "totalFreq": total,
        "oldFrequency": old_freq,
        "found": total > 0,
    }
    lexeme_results.append(result)

    if total == 0:
        not_found.append(lx_id)

found_count = sum(1 for r in lexeme_results if r["found"])
print(f"  Bulundu: {found_count}/{len(lexemes)}")
print(f"  Bulunamadi: {len(not_found)}")
if not_found[:5]:
    print(f"  Ornek bulunamayan: {not_found[:5]}")
print()

# ---- Adim 3: Root dogrulama ----
print("[3/5] Root dogrulama (58 root)...")
roots_path = BASE / "public" / "data" / "linguistic" / "roots.json"
roots = json.loads(roots_path.read_text(encoding="utf-8"))
print(f"  Yuklendi: {len(roots)} root")

root_results = []
for rt in roots:
    rt_id = rt["id"]
    form = normalize_palochka(rt.get("form", "")).lower()
    dialect = rt.get("dialectVariants", {})
    ady_form = normalize_palochka(dialect.get("adyghe", form)).lower()
    kbd_form = normalize_palochka(dialect.get("kabardian", form)).lower()

    # Prefix match: form ile baslayan tum kelimelerin toplam frekansi
    ady_total = sum(f for w, f in ady_freq.items() if w.startswith(ady_form))
    kbd_total = sum(f for w, f in kbd_freq.items() if w.startswith(kbd_form))

    old_freq = rt.get("productivity", {}).get("corpusFrequency", 0)
    total = ady_total + kbd_total

    root_results.append({
        "rootId": rt_id,
        "form": rt.get("form"),
        "adygheForm": dialect.get("adyghe", form),
        "kabardianForm": dialect.get("kabardian", form),
        "adyFreq": ady_total,
        "kbdFreq": kbd_total,
        "totalFreq": total,
        "oldFrequency": old_freq,
        "found": total > 0,
    })

root_found = sum(1 for r in root_results if r["found"])
print(f"  Bulundu: {root_found}/{len(roots)}")
print()

# ---- Adim 4: Aile dogrulama ----
print("[4/5] Word family dogrulama (30 aile)...")
wf_path = BASE / "public" / "data" / "linguistic" / "word_families.json"
families = json.loads(wf_path.read_text(encoding="utf-8"))
print(f"  Yuklendi: {len(families)} aile")

family_results = []
for wf in families:
    wf_id = wf["id"]
    root_id = wf.get("rootId")
    # Root bilgisini bul
    root_data = next((r for r in root_results if r["rootId"] == root_id), None)
    if root_data:
        total_freq = root_data["totalFreq"]
        old_freq = wf.get("productivity", {}).get("corpusFrequency", 0)
    else:
        total_freq = 0
        old_freq = 0

    family_results.append({
        "familyId": wf_id,
        "rootId": root_id,
        "totalFreq": total_freq,
        "oldFrequency": old_freq,
        "found": total_freq > 0,
    })

fam_found = sum(1 for r in family_results if r["found"])
print(f"  Bulundu: {fam_found}/{len(families)}")
print()

# ---- Adim 5: Kaydet ----
print("[5/5] Cikti yaziliyor...")

# Lexeme freq
(FREQ / "lexeme_freq_ady.json").write_text(
    json.dumps(dict(ady_freq.most_common()), ensure_ascii=False, indent=2),
    encoding="utf-8"
)
(FREQ / "lexeme_freq_kbd.json").write_text(
    json.dumps(dict(kbd_freq.most_common()), ensure_ascii=False, indent=2),
    encoding="utf-8"
)

# Coverage
coverage = {
    "generatedAt": datetime.now(timezone.utc).isoformat(),
    "corpusSummary": {
        "totalPairs": ady_pairs + kbd_pairs,
        "adyPairs": ady_pairs,
        "kbdPairs": kbd_pairs,
        "adyTokens": sum(ady_freq.values()),
        "kbdTokens": sum(kbd_freq.values()),
        "adyUnique": len(ady_freq),
        "kbdUnique": len(kbd_freq),
    },
    "lexemeCoverage": {
        "total": len(lexemes),
        "found": found_count,
        "notFound": not_found,
        "results": lexeme_results,
    },
    "rootCoverage": {
        "total": len(roots),
        "found": root_found,
        "results": root_results,
    },
    "familyCoverage": {
        "total": len(families),
        "found": fam_found,
        "results": family_results,
    },
}

(FREQ / "coverage_report.json").write_text(
    json.dumps(coverage, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

print(f"  lexeme_freq_ady.json: {len(ady_freq):,} kelime")
print(f"  lexeme_freq_kbd.json: {len(kbd_freq):,} kelime")
print(f"  coverage_report.json: ozet")
print()
print("=" * 60)
print("OZET")
print("=" * 60)
print(f"Corpus      : {ady_pairs + kbd_pairs:,} cift")
print(f"Lexeme      : {found_count}/{len(lexemes)} dogrulandi")
print(f"Root        : {root_found}/{len(roots)} dogrulandi")
print(f"Aile        : {fam_found}/{len(families)} dogrulandi")
print()
print("OK — Pipeline tamamlandi.")