import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

# Frekanssiz lexeme'leri bul
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
sifir = [l for l in lex if not l.get("corpusFrequency") or l["corpusFrequency"] == 0]

print(f"Frekanssiz: {len(sifir)}\n")

# Aile bazinda grupla
from collections import Counter
aile_sayisi = Counter(l.get("wordFamilyId", "?") for l in sifir)
print("=== AILE BAZINDA FREKANSSIZ ===")
for aile, n in aile_sayisi.most_common():
    print(f"  {aile:15} {n}")

# Ornek kelimeler
print("\n=== ORNEK FREKANSSIZ LEXEME ===")
for l in sifir[:15]:
    form = l.get("form", "")
    meaning = l.get("literalMeaning", "")[:30]
    print(f"  {l['id']:25} {form:20} {meaning}")

# Kaydet
Path("data/corpus/frequency/c11_frekanssiz.json").write_text(
    json.dumps({"toplam": len(sifir), "aile_dagilimi": dict(aile_sayisi),
                "liste": [{"id": l["id"], "form": l.get("form",""), "family": l.get("wordFamilyId",""), "meaning": l.get("literalMeaning","")} for l in sifir]},
               ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nKaydedildi: c11_frekanssiz.json")
