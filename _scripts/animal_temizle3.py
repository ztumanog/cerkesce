import json
from pathlib import Path
from datetime import datetime

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-animal-temizle3-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# Yanlis ANIMAL (cografya)
YANLIS = ["ELBRUS", "THE_HILL", "HILL_LIKE", "NARROW_PASS",
          "HILL_TOP", "MANY_HILLS", "GORGE", "BALD_HILL"]

temizlenen = 0
for l in lex:
    cid = l.get("conceptId") or ""
    if cid in YANLIS:
        l["conceptId"] = ""
        l["subConceptId"] = ""
        l["taxonomyFamily"] = ""
        l["notes"] = (l.get("notes", "") + f" [{cid} yanlis etiket temizlendi]").strip()
        temizlenen += 1
        print(f"  Temizlendi: {l.get('form')} ({cid})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nTemizlenen: {temizlenen}")

# Kontrol
from collections import Counter
animal = [l for l in lex if "ANIMAL" in (l.get("conceptId") or "") or
          l.get("taxonomyFamily") == "Doğa & Hayvan"]
print(f"\nKalan ANIMAL ilgili: {len(animal)}")
cid = Counter(l.get("conceptId") for l in animal)
for c, s in cid.most_common(30):
    print(f"  {c}: {s}")

# ANIMAL genel kalanlar
print("\nANIMAL genel kalanlar (ilk 30):")
animal_genel = [l for l in animal if l.get("conceptId") == "ANIMAL"]
for l in animal_genel[:30]:
    print(f"  {l.get('form'):20s} | {l.get('literalMeaning', '?')[:40]}")
