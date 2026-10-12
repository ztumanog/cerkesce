import json
import glob
from pathlib import Path

yedekler = sorted(glob.glob("public/data/linguistic/lexemes.json.bak-*"), reverse=True)

print(f"=== YEDEKLERDEKİ CONCEPTID DURUMU ===\n")

for yedek in yedekler:
    try:
        lex = json.loads(Path(yedek).read_text(encoding="utf-8"))
        concept_sayisi = sum(1 for l in lex if l.get("conceptId"))
        lemma_sayisi = sum(1 for l in lex if l.get("isLemma"))
        isim = Path(yedek).name
        print(f"  {isim:45s}")
        print(f"    Toplam: {len(lex):6d} | ConceptId: {concept_sayisi:6d} | Lemma: {lemma_sayisi:6d}")
    except Exception as e:
        print(f"  {yedek} → HATA: {e}")
