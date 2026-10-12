import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path
from collections import Counter

# 1) Gercek sozlukleri bul
data_dir = Path("public/data")
sozluk_files = [f for f in sorted(data_dir.glob("*.json")) if f.name[0].isdigit()]
print(f"=== SOZLUKLER ({len(sozluk_files)}) ===\n")

# 2) Lexeme'leri yukle
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
print(f"Lexeme: {len(lex)}\n")

# 3) Her sozlugu tara
sozluk_kelimeleri = {}
for f in sozluk_files:
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        words = data.get("words", {})
        title = data.get("title", f.name)
        from_lang = data.get("fromLang", "?")
        to_lang = data.get("toLang", "?")
        sozluk_kelimeleri[f.name] = {
            "title": title,
            "words": words,
            "from": from_lang,
            "to": to_lang,
            "count": len(words)
        }
        print(f"  {f.name}: {len(words)} kelime ({from_lang}->{to_lang})")
    except Exception as e:
        print(f"  {f.name}: HATA - {e}")

# 4) Lexeme'leri ara
print(f"\n=== LEXEME ARAMA ({len(lex)}) ===")
toplam_bulunan = Counter()
for fname, s in sozluk_kelimeleri.items():
    words = s["words"]
    bulunan = 0
    for l in lex:
        form = l.get("form", "")
        if not form:
            continue
        # Sozlukte ara (spelling ile)
        for w, wdata in words.items():
            spelling = wdata.get("spelling", w)
            if form.lower() == spelling.lower():
                bulunan += 1
                toplam_bulunan[fname] += 1
                break
    if bulunan > 0:
        print(f"  {fname}: {bulunan}/{len(lex)}")

print(f"\n=== TOPLAM BULUNAN ===")
for fname, n in toplam_bulunan.most_common(10):
    print(f"  {fname}: {n}")
