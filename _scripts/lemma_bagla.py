import json
from pathlib import Path
import sys

DRY_RUN = "--apply" not in sys.argv  # varsayılan: kuru çalıştırma

LEX = Path(Path("_scripts/.lexpath").read_text(encoding="utf-8").strip())
lex = json.loads(LEX.read_text(encoding="utf-8"))

print(f"{'🔍 KURU ÇALIŞTIRMA' if DRY_RUN else '✏️  GERÇEK ÇALIŞTIRMA'}")
print(f"Toplam kayıt: {len(lex)}\n")

# 1. Lemma haritası — SADECE isLemma=true olanlar
lemmas = {}
for l in lex:
    if l.get("isLemma") is True and l.get("form") and l.get("id"):
        lemmas[l["form"]] = l["id"]

print(f"Lemma haritası: {len(lemmas)} kayıt\n")

# 2. Çekim ekleri — SADECE güvenli olanlar (2+ harf)
SUFFIXES = ["ми", "ри", "кӀэ", "хэм", "хэр", "мэ", "щ"]  # tek harflileri çıkardık

# 3. İstatistik
stats = {
    "isLemma_true": 0,
    "isLemma_false": 0,
    "root_linked": 0,
    "root_skipped_has_one": 0,
    "concept_cleared": 0,
    "no_change": 0,
}

# 4. Örnek değişiklikler (ilk 20)
ornekler = []

for l in lex:
    has_meaning = bool(l.get("literalMeaning"))

    if has_meaning:
        # Zaten isLemma=True ise DOKUNMA
        if l.get("isLemma") is True:
            stats["isLemma_true"] += 1
        else:
            stats["isLemma_true"] += 1  # sayılıyor ama değişmiyor

        # ANIMAL + literalMeaning VAR ise yanlış etiket olabilir → dokunma, raporla
        continue

    # === Buradan sonrası: literalMeaning YOK ===
    stats["isLemma_false"] += 1
    form = l.get("form") or ""

    # 4a. conceptId temizliği
    if l.get("conceptId") == "ANIMAL":
        stats["concept_cleared"] += 1
        if not DRY_RUN:
            l["conceptId"] = None
        if len(ornekler) < 20:
            ornekler.append(f"  🧹 conceptId silindi: {form}")

    # 4b. rootIds zaten doluysa DOKUNMA
    if l.get("rootIds"):
        stats["root_skipped_has_one"] += 1
        continue

    # 4c. Sonek kırpma
    linked = False
    for suf in SUFFIXES:
        if form.endswith(suf) and len(form) > len(suf) + 1:
            stem = form[:-len(suf)]
            if stem in lemmas:
                stats["root_linked"] += 1
                if not DRY_RUN:
                    l["rootIds"] = [lemmas[stem]]
                if len(ornekler) < 20:
                    ornekler.append(f"  🔗 {form} → {stem} ({lemmas[stem]})")
                linked = True
                break
    if not linked:
        stats["no_change"] += 1

# 5. Rapor
print("=== SONUÇ ===")
for k, v in stats.items():
    print(f"  {k:30} {v}")

print("\n=== İLK 20 ÖRNEK DEĞİŞİKLİK ===")
for o in ornekler:
    print(o)

# 6. Kaydet
if not DRY_RUN:
    LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n✅ Yazıldı: {LEX}")
else:
    print(f"\nℹ️  Kuru çalıştırma. Gerçek için: py _scripts/lemma_bagla.py --apply")
