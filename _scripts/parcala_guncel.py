import json
import csv
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
shchy = [l for l in lex if l.get("form", "").startswith("щы")]
belirsiz = [l for l in shchy if not l.get("conceptId") or l.get("conceptId") in ("", "-")]

parca_boyut = 50
for i in range(0, len(belirsiz), parca_boyut):
    parca = belirsiz[i:i+parca_boyut]
    dosya = Path(f"_scripts/kalan_parca_{i//parca_boyut + 1:02d}.txt")
    with open(dosya, "w", encoding="utf-8") as f:
        for l in parca:
            f.write(f"{l.get('form', '')}\n")
    print(f"{dosya.name}: {len(parca)} kelime")

print(f"\nToplam: {len(belirsiz)} kelime")
print(f"Parca sayisi: {(len(belirsiz) + parca_boyut - 1) // parca_boyut}")

# Ilk parcayi goster
print(f"\n=== kalan_parca_01.txt icerigi ===")
for l in belirsiz[:50]:
    print(l.get("form", ""))
