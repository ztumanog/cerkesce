import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize_palochka(text):
    if not text:
        return ""
    return text.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")

# ============================================================
# OTOMATİK SINIFLANDIRMA KURALLARI
# (Grup 1-2-3'ten öğrenilen pattern)
# ============================================================
def siniflandir(form, anlam):
    form_l = normalize_palochka(form)
    anlam_l = (anlam or "").lower()
    
    # === YÜZ & SİMA ===
    if any(form_l.startswith(p) for p in ["нэгу", "нэкӀу", "нэку", "нэжэгуж", "нэгуф"]):
        return ("FACE", "FACE", "Yüz & Sima")
    if any(k in anlam_l for k in ["yüz", "sima", "yanak", "çehre", "surat", "güler yüz"]):
        return ("FACE", "FACE", "Yüz & Sima")
    
    # === GÖZ & GÖRME ===
    if any(form_l.startswith(p) for p in ["нэбжь", "нэпс", "нэбдзы", "нэбзый", "нэкулъ", "нэджы"]):
        return ("EYE", "EYE", "Göz & Görme")
    if any(k in anlam_l for k in ["göz", "kirpik", "bakış", "nazar", "çapak", "görme", "bakma"]):
        return ("EYE", "EYE", "Göz & Görme")
    
    # === SINIR & MESAFE ===
    if any(form_l.startswith(p) for p in ["нэс", "нэз", "нэблэгъ", "нэгъаб", "нэгъун"]):
        return ("LIMIT", "LIMIT", "Sınır & Mesafe")
    if any(k in anlam_l for k in ["sınır", "kenar", "uç", "mesafe", "kadar", "yaklaş",
                                    "geçen yıl", "ulaşmak", "varmak", "erişmek"]):
        return ("LIMIT", "LIMIT", "Sınır & Mesafe")
    
    # === AHLAK & SOYUT ===
    if any(form_l.startswith(p) for p in ["нэмыс", "нэпцӀ", "нэкъокъ", "нэгъуей", "нэгъуэщ"]):
        return ("ETHICS", "ETHICS", "Ahlak & Soyut")
    if any(k in anlam_l for k in ["saygı", "edep", "ahlak", "yalan", "sahte", "hile",
                                    "rakip", "yarış", "erdem", "namus", "şeref",
                                    "başka", "diğer", "farklı"]):
        return ("ETHICS", "ETHICS", "Ahlak & Soyut")
    
    # Belirsiz
    return ("BELIRSIZ", "-", "-")

# ============================================================
# KALAN GRUPLARI (04-14) İŞLE
# ============================================================
uygulanan = 0
belirsiz = []

for l in lex:
    form = l.get("form", "")
    if not form.startswith("нэ"):
        continue
    # Zaten sınıflandırılmışsa atla
    if l.get("subConceptId"):
        continue
    
    anlam = l.get("literalMeaning") or ""
    concept, sub, family = siniflandir(form, anlam)
    
    if concept == "BELIRSIZ":
        belirsiz.append((form, anlam))
        continue
    
    l["conceptId"] = concept
    l["subConceptId"] = sub
    l["taxonomyFamily"] = family
    l["rootForm"] = "нэ-"
    uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

# Rapor
with open("_scripts/ne_otomatik_rapor.txt", "w", encoding="utf-8") as f:
    f.write(f"нэ- OTOMATİK SINIFLANDIRMA RAPORU\n")
    f.write(f"Toplam uygulanan: {uygulanan}\n")
    f.write(f"Belirsiz kalan: {len(belirsiz)}\n\n")
    f.write("BELİRSİZ KAYITLAR:\n")
    f.write("=" * 80 + "\n")
    for form, anlam in belirsiz:
        f.write(f"  {form:<25} | {anlam[:50]}\n")

print(f"OK - {uygulanan} kayit otomatik siniflandirildi")
print(f"Belirsiz: {len(belirsiz)}")
