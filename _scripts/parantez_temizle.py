import json
import re
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0
silinen = 0

temiz = []
for l in lex:
    form = l.get("form", "")
    if not form:
        silinen += 1
        continue
    
    # Parantezli ekleri temizle: "kelime(ek)" -> "kelime"
    # Ama form tamamen parantez içindeyse sil
    if form.startswith("(") and form.endswith(")"):
        silinen += 1
        continue
    
    # "kelime(ek)" formatını temizle
    temiz_form = re.sub(r'\([^)]*\)', '', form).strip()
    
    # Eğer temiz_form farklıysa güncelle
    if temiz_form and temiz_form != form:
        # Eski formu notes'a ekle
        eski = form
        l["form"] = temiz_form
        if "notes" in l and l["notes"]:
            l["notes"] = f"{l['notes']} | Orijinal: {eski}"
        else:
            l["notes"] = f"Orijinal form: {eski}"
        guncellenen += 1
        form = temiz_form
    
    # Geçersiz formları sil
    if form in ["eі", "e", "i", ""]:
        silinen += 1
        continue
    
    temiz.append(l)

print(f"Parantez temizlenen: {guncellenen}")
print(f"Silinen: {silinen}")
print(f"Kalan: {len(temiz)}")

# Kaydet
Path("public/data/linguistic/lexemes.json").write_text(
    json.dumps(temiz, ensure_ascii=False, indent=2), encoding="utf-8"
)
print("OK Kaydedildi")
