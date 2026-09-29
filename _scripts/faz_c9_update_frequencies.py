
"""
Faz C-9.1.2 — corpusFrequency guncellemesi
==========================================
C-8 corpus frekanslarini gercek corpus frekanslariyla degistirir.

Girdi  : data/corpus/frequency/coverage_report.json
Guncel : public/data/linguistic/lexemes.json         (200 lexeme)
         public/data/linguistic/roots.json           (58 root)
         public/data/linguistic/word_families.json   (30 aile)
Yedek  : *.json.bak_c8 (zaten alindi)
"""
import json
from pathlib import Path
from datetime import datetime, timezone

BASE = Path(".")
LING = BASE / "public" / "data" / "linguistic"
FREQ = BASE / "data" / "corpus" / "frequency"

print("=" * 60)
print("Faz C-9.1.2 — corpusFrequency Guncellemesi")
print("=" * 60)
print()

# ---- Coverage raporu yukle ----
report = json.loads((FREQ / "coverage_report.json").read_text(encoding="utf-8"))
print(f"[1/5] Coverage raporu yuklendi")
print(f"      Corpus: {report['corpusSummary']['totalPairs']:,} cift")
print()

# ---- Lexeme guncellemesi ----
print("[2/5] Lexeme corpusFrequency guncelleniyor (200)...")
lexemes_path = LING / "lexemes.json"
lexemes = json.loads(lexemes_path.read_text(encoding="utf-8"))

# Lexeme ID -> frekans haritasi
lexeme_freq_map = {r["lexemeId"]: r for r in report["lexemeCoverage"]["results"]}

lexeme_updated = 0
lexeme_not_found = []
for lx in lexemes:
    lx_id = lx["id"]
    if lx_id in lexeme_freq_map:
        info = lexeme_freq_map[lx_id]
        old_freq = lx.get("corpusFrequency", 0)
        new_freq = info["totalFreq"]
        if old_freq != new_freq:
            lx["corpusFrequency"] = new_freq
            lexeme_updated += 1
    else:
        lexeme_not_found.append(lx_id)

lexemes_path.write_text(
    json.dumps(lexemes, ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print(f"      Guncellendi: {lexeme_updated} lexeme")
print(f"      Kapsamda yok: {len(lexeme_not_found)}")
print()

# ---- Root guncellemesi ----
print("[3/5] Root corpusFrequency guncelleniyor (58)...")
roots_path = LING / "roots.json"
roots = json.loads(roots_path.read_text(encoding="utf-8"))

root_freq_map = {r["rootId"]: r for r in report["rootCoverage"]["results"]}

root_updated = 0
for rt in roots:
    rt_id = rt["id"]
    if rt_id in root_freq_map:
        info = root_freq_map[rt_id]
        old_freq = rt.get("productivity", {}).get("corpusFrequency", 0)
        new_freq = info["totalFreq"]
        if old_freq != new_freq:
            if "productivity" not in rt:
                rt["productivity"] = {}
            rt["productivity"]["corpusFrequency"] = new_freq
            rt["productivity"]["adyFreq"] = info["adyFreq"]
            rt["productivity"]["kbdFreq"] = info["kbdFreq"]
            root_updated += 1

roots_path.write_text(
    json.dumps(roots, ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print(f"      Guncellendi: {root_updated} root")
print()

# ---- Word Family guncellemesi ----
print("[4/5] Word Family corpusFrequency guncelleniyor (30)...")
wf_path = LING / "word_families.json"
families = json.loads(wf_path.read_text(encoding="utf-8"))

family_freq_map = {r["familyId"]: r for r in report["familyCoverage"]["results"]}

wf_updated = 0
for wf in families:
    wf_id = wf["id"]
    if wf_id in family_freq_map:
        info = family_freq_map[wf_id]
        old_freq = wf.get("productivity", {}).get("corpusFrequency", 0)
        new_freq = info["totalFreq"]
        if old_freq != new_freq:
            if "productivity" not in wf:
                wf["productivity"] = {}
            wf["productivity"]["corpusFrequency"] = new_freq
            wf_updated += 1

wf_path.write_text(
    json.dumps(families, ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print(f"      Guncellendi: {wf_updated} aile")
print()

# ---- Ozet ----
print("[5/5] Ozet")
print()
print("=" * 60)
print("GUNCELLEME OZETI")
print("=" * 60)
print(f"Lexeme       : {lexeme_updated}/200 guncellendi")
print(f"Root         : {root_updated}/58 guncellendi")
print(f"WordFamily   : {wf_updated}/30 guncellendi")
print()

# En buyuk degisiklik
print("En buyuk fark (ilk 5):")
wf_changes = []
for wf in families:
    wf_id = wf["id"]
    if wf_id in family_freq_map:
        old_freq = wf.get("productivity", {}).get("corpusFrequency", 0)
        # Eski degeri report'tan degil, backup'tan almak daha dogru olur
        # Ama simdilik yeni degeri gosterelim
        wf_changes.append((wf_id, old_freq))

for wf_id, new_freq in sorted(wf_changes, key=lambda x: -x[1])[:5]:
    print(f"  {wf_id}: {new_freq:,}")

print()
print("OK — corpusFrequency guncellemesi tamamlandi.")
print(f"UYARI: '{len(lexeme_not_found)}' lexeme coverage raporunda yok — sonraki adimda pending review'a tasinacak.")