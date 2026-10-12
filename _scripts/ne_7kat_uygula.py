import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize_palochka(text):
    if not text:
        return ""
    return text.replace("ӏ", "Ӏ").replace("I", "Ӏ").replace("l", "Ӏ")

# ============================================================
# 7 YENİ KATEGORİ — Mimar onaylı
# ============================================================
def siniflandir(form):
    f = normalize_palochka(form)
    
    # 1. Işık & Aydınlık
    if any(f.startswith(p) for p in ["нэфын", "нэхущ", "нэхулъ", "нэхуап", "нэхукӀ", "нэфылъ", "нэфыным", "нэфыныр", "нэфу", "нэфыр", "нэфым", "нэфшъагъ", "нэхугъэ", "нэхунэ", "нэхуу", "нэхум", "нэхур", "нэхущхь", "нэхумыщ", "нэхъу-нэхъ"]):
        return ("LIGHT", "LIGHT", "Işık & Aydınlık")
    if f == "нэф" or f == "нэфын":
        return ("LIGHT", "LIGHT", "Işık & Aydınlık")
    
    # 2. Üzüntü & Keder
    if any(f.startswith(p) for p in ["нэщхъей", "нэщхъеягъ", "нэщхъеягъу", "нэщхъеигъ", "нэщхъеял", "нэщхъыдж", "нэщхъыц", "нэщхъыфӀ", "нэщхъпэ", "нэщхъыр", "нэщхъ", "нэшхъэй", "нэшхъэин", "нэшхъэигъ", "нэшх-пэшх"]):
        return ("SADNESS", "SADNESS", "Üzüntü & Keder")
    
    # 3. Yaş & Karşılaştırma
    if any(f.startswith(p) for p in ["нэхъыжь", "нэхъщӀ", "нэхъыщӀ"]):
        return ("AGE", "AGE", "Yaş & Karşılaştırma")
    
    # 4. Din & İnanç
    if any(f.startswith(p) for p in ["нэмэз", "нэмаз", "нэчыхь", "нэлат"]):
        return ("RELIGION", "RELIGION", "Din & İnanç")
    
    # 5. Görünürlük
    if any(f.startswith(p) for p in ["нэрылъагъу", "нэрымылъагъу", "нэрылъэгъу", "нэрымылъэ", "нэрлъэгъу", "нэрыплъэ", "нэплъ"]):
        return ("VISIBILITY", "VISIBILITY", "Görünürlük")
    
    # 6. Karşılaştırma
    if any(f.startswith(p) for p in ["нэхъыб", "нэхъри", "нэхъыщхь", "нэхъыфӀ", "нэхъыкӀ", "нэхъыр", "нэхъеи", "нэхъап", "нэхъ", "нэхь", "нэуж"]):
        return ("COMPARISON", "COMPARISON", "Karşılaştırma")
    
    # 7. Utanç & Ahlak
    if any(f.startswith(p) for p in ["нэпэнчъ", "нэукӀытэ", "нэпэтех", "нэпэпкъ", "нэмыс", "нэпч"]):
        return ("SHAME", "SHAME", "Utanç & Ahlak")
    
    # Belirsiz
    return ("BELIRSIZ", "-", "-")

# ============================================================
# UYGULA
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
    
    concept, sub, family = siniflandir(form)
    
    if concept == "BELIRSIZ":
        belirsiz.append(form)
        continue
    
    l["conceptId"] = concept
    l["subConceptId"] = sub
    l["taxonomyFamily"] = family
    l["rootForm"] = "нэ-"
    uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"OK - {uygulanan} kayit guncellendi")
print(f"Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    print("İlk 20 belirsiz:")
    for f in belirsiz[:20]:
        print(f"  - {f}")
