import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u04e0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04c0')
    return text.strip()

# щы- kayıtlarını kontrol et
print("=== щы- KONTROL ===\n")

# 1. Tekrarlanan notes var mı?
tekrar_notes = []
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("щы"):
        continue
    notes = l.get("notes") or ""
    # Aynı metin 2+ kez geçiyor mu?
    if "[Düzeltme:" in notes:
        sayi = notes.count("[Düzeltme:")
        if sayi > 1:
            tekrar_notes.append((form, sayi, notes[:150]))
    if "[Çift anlam:" in notes:
        sayi = notes.count("[Çift anlam:")
        if sayi > 1:
            tekrar_notes.append((form, sayi, notes[:150]))

if tekrar_notes:
    print(f"⚠️  TEKRARLANAN NOTES: {len(tekrar_notes)}")
    for form, sayi, notes in tekrar_notes[:10]:
        print(f"\n  FORM: {form}")
        print(f"  TEKRAR: {sayi} kez")
        print(f"  NOTES: {notes}")
else:
    print("✅ Tekrarlanan notes YOK")

# 2. conceptIds array'inde tekrar var mı?
print("\n=== conceptIds KONTROLÜ ===")
tekrar_ids = []
for l in lex:
    form = l.get("form", "")
    if not normalize(form).startswith("щы"):
        continue
    ids = l.get("conceptIds")
    if isinstance(ids, list) and len(ids) != len(set(ids)):
        tekrar_ids.append((form, ids))

if tekrar_ids:
    print(f"⚠️  TEKRARLANAN conceptIds: {len(tekrar_ids)}")
    for form, ids in tekrar_ids[:10]:
        print(f"  {form}: {ids}")
else:
    print("✅ conceptIds temiz")
