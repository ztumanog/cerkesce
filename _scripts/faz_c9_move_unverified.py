"""
Faz C-9.1.2b — Bulunamayan lexeme'leri ayir
============================================
Corpus'ta dogrulanamayan 41 lexeme'i ana dosyadan cikarip
lexemes_pending_review.json'a tasir.

Girdi  : public/data/linguistic/lexemes.json
         data/corpus/frequency/coverage_report.json
Cikti  : public/data/linguistic/lexemes.json          (159 lexeme)
         public/data/linguistic/lexemes_pending_review.json (41 lexeme)
"""
import json
from pathlib import Path
from datetime import datetime, timezone

BASE = Path(".")
LING = BASE / "public" / "data" / "linguistic"
FREQ = BASE / "data" / "corpus" / "frequency"

print("=" * 60)
print("Faz C-9.1.2b — Bulunamayan Lexeme Ayirma")
print("=" * 60)
print()

# ---- Coverage raporundan notFound listesi ----
report = json.loads((FREQ / "coverage_report.json").read_text(encoding="utf-8"))
not_found_ids = set(report["lexemeCoverage"]["notFound"])

print(f"[1/4] Coverage raporu yuklendi")
print(f"      Bulunamayan: {len(not_found_ids)} lexeme")
print()

# ---- Lexeme dosyasini yukle ----
lexemes_path = LING / "lexemes.json"
lexemes = json.loads(lexemes_path.read_text(encoding="utf-8"))
print(f"[2/4] Lexeme dosyasi yuklendi: {len(lexemes)} lexeme")

# ---- Ayir ----
verified = []
pending = []

# Her bulunamayan lexeme icin sebep ekle
for lx in lexemes:
    if lx["id"] in not_found_ids:
        # Sebep analizi
        form = lx.get("form", "").lower()
        reasons = ["not_in_corpus"]

        # PSY-, NE-, BZE- gibi prefix'ler -> muhtemel mekanik turetim
        if form.startswith("псы") and len(form) > 4:
            reasons.append("possible_mechanical_derivation")
        if form.startswith("нэ") and len(form) > 4:
            reasons.append("possible_mechanical_derivation")
        if form.startswith("бзэ") and len(form) > 4:
            reasons.append("possible_mechanical_derivation")
        # Cok heceli -> muhtemel yapay
        if len(form) > 10:
            reasons.append("overlong_compound")

        lx_copy = dict(lx)
        lx_copy["_pendingReasons"] = reasons
        lx_copy["_movedAt"] = datetime.now(timezone.utc).isoformat()
        pending.append(lx_copy)
    else:
        verified.append(lx)

print(f"      Dogrulanmis: {len(verified)}")
print(f"      Beklemede  : {len(pending)}")
print()

# ---- Yaz ----
print("[3/4] Dosyalar yaziliyor...")

# Ana dosya: sadece dogrulanmis
lexemes_path.write_text(
    json.dumps(verified, ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print(f"      {lexemes_path.name}: {len(verified)} lexeme")

# Pending dosyasi
pending_path = LING / "lexemes_pending_review.json"
pending_doc = {
    "createdAt": datetime.now(timezone.utc).isoformat(),
    "reason": "Corpus dogrulamasi basarisiz (adiga-ai/circassian-parallel-corpus)",
    "corpusReference": "https://huggingface.co/datasets/adiga-ai/circassian-parallel-corpus",
    "totalPending": len(pending),
    "note": "Bu lexeme'ler C-8'de uretilmis ancak corpus'ta dogrulanamadi. Manuel inceleme gerekli.",
    "lexemes": pending,
}
pending_path.write_text(
    json.dumps(pending_doc, ensure_ascii=False, indent=2),
    encoding="utf-8"
)
print(f"      {pending_path.name}: {len(pending)} lexeme")
print()

# ---- Ozet ----
print("[4/4] Ozet")
print()
print("=" * 60)
print("AYIRMA OZETI")
print("=" * 60)
print(f"Once : 200 lexeme")
print(f"Sonra: {len(verified)} lexeme (dogrulanmis)")
print(f"Bekle: {len(pending)} lexeme (pending review)")
print()

# Sebep dagilimi
reason_counts = {}
for lx in pending:
    for r in lx.get("_pendingReasons", []):
        reason_counts[r] = reason_counts.get(r, 0) + 1

print("Sebep dagilimi:")
for reason, count in sorted(reason_counts.items(), key=lambda x: -x[1]):
    print(f"  {reason:40s} {count}")

print()
print("OK — 41 lexeme pending review'a tasindi.")
print(f"Dosya: {pending_path}")