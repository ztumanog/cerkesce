import json
from pathlib import Path

# 1. Frekans dosyalarını yükle
freq_kbd = json.loads(Path("data/corpus/frequency/lexeme_freq_kbd.json").read_text(encoding="utf-8"))
freq_ady = json.loads(Path("data/corpus/frequency/lexeme_freq_ady.json").read_text(encoding="utf-8"))

print(f"KBD frekans: {len(freq_kbd)}")
print(f"ADY frekans: {len(freq_ady)}")

# 2. Birleştir (max freq)
freq_map = {}
for form, freq in freq_kbd.items():
    freq_map[form] = max(freq_map.get(form, 0), freq)
for form, freq in freq_ady.items():
    freq_map[form] = max(freq_map.get(form, 0), freq)

print(f"Toplam frekans map: {len(freq_map)}")

# 3. lexemes yükle
lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# 4. Mevcut kayıtları güncelle
guncellenen = 0
for l in lex:
    form = l.get("form", "")
    if form in freq_map:
        if not l.get("corpusFrequency") or l["corpusFrequency"] == 0:
            l["corpusFrequency"] = freq_map[form]
            guncellenen += 1

print(f"Güncellenen: {guncellenen}")

# 5. Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Toplam: {len(lex)}")
