import json
from pathlib import Path

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Anlamı boş olan kayıtları bul
bos = []
for l in lex:
    anlam = l.get("literalMeaning") or ""
    anlam_ady = l.get("literalMeaningAdy") or ""
    if not anlam and not anlam_ady:
        bos.append(l)

print(f"=== ANLAMI BOŞ KAYITLAR: {len(bos)} ===\n")

# İlk 20 boş kaydı göster
for l in bos[:20]:
    form = l.get("form") or "?"
    pos = l.get("partOfSpeech") or "—"
    cid = l.get("conceptId") or "—"
    notes = (l.get("notes") or "—")[:60]
    print(f"  {form:20s} [{pos:10s}] concept={cid:15s} notes={notes}")

# Boş kayıtların POS dağılımı
from collections import Counter
pos_dagilim = Counter(l.get("partOfSpeech") or "—" for l in bos)
print(f"\n=== BOŞ KAYITLARIN POS DAĞILIMI ===")
for pos, sayi in pos_dagilim.most_common():
    print(f"  {pos:20s} {sayi:5d}")
