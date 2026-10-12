import json
import re
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# HTML temizleme fonksiyonu
def clean_html(text):
    if not text:
        return ""
    # Önce encoded HTML entity'lerini sil
    text = re.sub(r'&lt;.*?&gt;', ' ', text)
    # Normal HTML tag'lerini sil
    text = re.sub(r'<[^>]+>', ' ', text)
    # Entity'leri çöz
    text = text.replace("&nbsp;", " ").replace("&amp;", "&")
    text = text.replace("&lt;", "<").replace("&gt;", ">")
    text = text.replace("&quot;", '"').replace("&#39;", "'")
    # Fazla boşlukları temizle
    text = re.sub(r'\s+', ' ', text).strip()
    return text

guncellenen = 0
for l in lex:
    lm = l.get("literalMeaning", "")
    if not lm:
        continue
    # HTML içeriyorsa temizle
    if "<" in lm or "&lt;" in lm or "&gt;" in lm:
        temiz = clean_html(lm)
        if temiz != lm:
            l["literalMeaning"] = temiz[:200]  # 200 karakterle sınırla
            guncellenen += 1

print(f"HTML temizlenen: {guncellenen}")

# Örnek: хьэ
hae = next((l for l in lex if l.get("form") == "хьэ"), None)
if hae:
    print(f"\nхьэ literalMeaning: {hae.get('literalMeaning', '')[:200]}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
