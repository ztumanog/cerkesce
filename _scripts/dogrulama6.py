import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

runtime_dirs = ["src", "public/src", "app"]
found = []

for d in runtime_dirs:
    p = Path(d)
    if p.exists():
        for f in p.rglob("*.ts"):
            icerik = f.read_text(encoding="utf-8")
            if "semantic_relation" in icerik.lower() or "semanticRelation" in icerik:
                found.append(str(f))
            if "wordFamily" in icerik.lower():
                found.append(str(f))
            if "corpusEvidence" in icerik:
                found.append(str(f))

print("=== RUNTIME IZOLASYON KONTROLU ===")
if found:
    print("UYARI: Runtime'da dataset referansi bulundu:")
    for f in found:
        print(f"  - {f}")
else:
    print("TEMIZ: Runtime'da semantic_relation/wordFamily/corpus referansi yok.")
