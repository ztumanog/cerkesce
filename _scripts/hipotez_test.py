import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
animal = [l for l in lex if l.get("conceptId") == "ANIMAL"]

c113 = [l for l in animal if "C-11.3" in (l.get("notes") or "")]
fauna = [l for l in animal if "Fauna" in (l.get("notes") or "")]
diger = [l for l in animal if "C-11.3" not in (l.get("notes") or "") and "Fauna" not in (l.get("notes") or "")]

print("=" * 60)
print(f"ANIMAL toplam: {len(animal)}")
print(f"  C-11.3 notlu (şüpheli):  {len(c113)}")
print(f"  Fauna notlu (doğru):     {len(fauna)}")
print(f"  Diğer:                   {len(diger)}")
print("=" * 60)

print()
print("--- C-11.3 ÖRNEKLERİ (ilk 15) ---")
for l in c113[:15]:
    form = l.get("form", "?")
    anlam = l.get("literalMeaning", "?")
    print(f"  {form:25} | {anlam}")

print()
print("--- Fauna ÖRNEKLERİ (ilk 15) ---")
for l in fauna[:15]:
    form = l.get("form", "?")
    anlam = l.get("literalMeaning", "?")
    print(f"  {form:25} | {anlam}")

print()
print("--- DİĞER ÖRNEKLERİ (ilk 15) ---")
for l in diger[:15]:
    form = l.get("form", "?")
    anlam = l.get("literalMeaning", "?")
    notes = (l.get("notes") or "")[:40]
    print(f"  {form:25} | {anlam:30} | {notes}")
