import json
from pathlib import Path
from collections import Counter

LEX = Path("public/data/linguistic/lexemes.json")
if not LEX.exists():
    print("❌ lexemes.json bulunamadı!")
    exit()

lex = json.loads(LEX.read_text(encoding="utf-8"))
lexemes = lex if isinstance(lex, list) else lex.get("lexemes", [])

print(f"📊 TOPLAM KAYIT: {len(lexemes)}\n")

# Status dağılımı
status_counter = Counter(e.get("status", "status_yok") for e in lexemes)
print("=== DURUM (STATUS) DAĞILIMI ===")
for st, count in status_counter.most_common():
    print(f"  {st:30s}: {count:6d}")

# Son eklenen doğrulanmış kelimeler
print("\n=== SON EKLENEN DOĞRULANMIŞ KELİMELER (İlk 10) ===")
verified = [e for e in lexemes if e.get("status") == "VERIFIED"]
for e in verified[:10]:
    print(f"  ✅ {e.get('form','?'):20s} | root={e.get('root','?'):15s} | concept={e.get('conceptId','?')}")

# Karantinadakiler
print("\n=== KARANTİNADAKİ KELİMELER (İlk 10) ===")
karantina = [e for e in lexemes if e.get("status") == "UNVERIFIED_OR_SYNTHETIC"]
for e in karantina[:10]:
    print(f"  🚫 {e.get('form','?'):20s} | Sebep: {e.get('quarantine_reason','?')}")
