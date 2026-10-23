import json
from pathlib import Path

# Tüm dosyaları yükle
roots = json.loads(Path("public/data/linguistic/roots.json").read_text(encoding="utf-8"))
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

print("=" * 70)
print("ЗЭКУЭФЭУЭН — TAM DURUM")
print("=" * 70)

# Lexeme kayıtları
print("\n### LEXEME KAYITLARI ###")
for e in lex:
    if e.get("id") in ("L-KBD-01670", "L-KBD-01670-T"):
        print(f"\nID: {e.get('id')}")
        print(f"  form: {e.get('form')}")
        print(f"  ipa: {e.get('ipa')}")
        print(f"  POS: {e.get('partOfSpeech')}")
        print(f"  literalMeaning: {(e.get('literalMeaning') or '')[:80]}")
        print(f"  rootIds: {e.get('rootIds')}")
        print(f"  wordFamilyId: {e.get('wordFamilyId')}")
        print(f"  translations.tr: {e.get('translations', {}).get('tr', '')[:60]}")
        print(f"  dialect: {e.get('dialect')}")

# Kökler
print("\n\n### KÖKLER ###")
for r in roots:
    if r.get("id") in ("R-KUE", "R-WA", "R-FE", "R-FA", "R-UE-HAIL", "R-UE-PRON"):
        wf = r.get("wordFamily", {})
        uye_sayisi = len(wf.get("lexemeIds", []))
        print(f"\n{r.get('id')}:")
        print(f"  form: {r.get('form')}")
        print(f"  primaryMeaning: {(r.get('primaryMeaning') or '')[:80]}")
        print(f"  üye sayısı: {uye_sayisi}")
        # зэкуэфэуэн bu kökte mi?
        if any(l.startswith("L-KBD-01670") for l in wf.get("lexemeIds", [])):
            print(f"  ✅ зэкуэфэуэн bu kökte")

# L-UE (dolu/sen) durumu
print("\n\n### L-UE (уэ = dolu) ###")
for e in lex:
    if e.get("id") in ("L-UE", "L-UE-PRON"):
        print(f"\nID: {e.get('id')}")
        print(f"  form: {e.get('form')}")
        print(f"  POS: {e.get('partOfSpeech')}")
        print(f"  literalMeaning: {(e.get('literalMeaning') or '')[:80]}")
        print(f"  rootIds: {e.get('rootIds')}")
        print(f"  translations.tr: {e.get('translations', {}).get('tr', '')}")

# Genel istatistik
print("\n\n### GENEL İSTATİSTİK ###")
print(f"Toplam kök: {len(roots)}")
print(f"Toplam lexeme: {len(lex)}")

# Boş aile var mı?
bos = sum(1 for r in roots if not r.get("wordFamily", {}).get("lexemeIds"))
print(f"Boş aile: {bos}")

# Hayalet ID var mı?
lex_ids = {e.get("id") for e in lex}
hayalet = sum(1 for r in roots for lid in r.get("wordFamily", {}).get("lexemeIds", []) if lid not in lex_ids)
print(f"Hayalet ID: {hayalet}")
