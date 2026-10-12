import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# гу- ile başlayan tüm kelimeler
gu = [l for l in lex if l.get("form", "").startswith("гу")]
gu.sort(key=lambda x: x.get("form", ""))

with open("_scripts/гу_kelimeler.txt", "w", encoding="utf-8") as f:
    f.write(f"гу- ILE BASLAYAN KELIMELER — {len(gu)} kayit\n")
    f.write("=" * 90 + "\n")
    f.write(f"{'FORM':<25} | {'ANLAM':<45} | {'KONCEPT':<15}\n")
    f.write("-" * 90 + "\n")
    for l in gu:
        form = l.get("form", "?")
        anlam = (l.get("literalMeaning") or "?")[:45]
        concept = l.get("conceptId") or "-"
        sub = l.get("subConceptId") or "-"
        f.write(f"{form:<25} | {anlam:<45} | {concept:<15}\n")
    
    # İstatistikler
    f.write("\n\n")
    f.write("=" * 90 + "\n")
    f.write("KONCEPT DAGILIMI\n")
    f.write("=" * 90 + "\n")
    from collections import Counter
    dagilim = Counter(l.get("conceptId") or "(bos)" for l in gu)
    for k, v in dagilim.most_common():
        f.write(f"  {str(k):<30} {v}\n")

print(f"OK - {len(gu)} kayit")
