import json
import re
from pathlib import Path
from datetime import datetime
from collections import Counter

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-emotion-split-v2-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# EMOTION alt kavramlari (fix2'de atananlar)
EMOTION_CONCEPTS = {
    "ANGER","COMPASSION","GRIEF","HOPE","JOY","LOVE","FEAR",
    "DOUBT","SUSPICION","BOREDOM","ANXIETY","PEACE","INDIFFERENCE",
    "DISGUST","DISLIKE","LOYALTY","SHAME","RESENTMENT","PRIDE",
    "LAUGH","FEARLESS","CALM","RESPECT","DISGUSTING"
}

# --- Cekim tespit kurallari ---
CEKIM_SUB = {"Gramer & Çekim", "Gramer & Nitelik"}

# Zarf/cekim sonlari
CEKIM_SONLARI = (
    "уэ",   # zarf
    "щ",    # gecmis/bildirme
    "м",    # oblik
    "р",    # nominatif
    "ми",   # -mi
    "ти",   # -ti
    "къым", # olumsuz
)

# Istisnalar: bu sonlarla bitse de LEMMA olan kelimeler
LEMMA_ISTISNA = {
    "напэ",      # yuz (SHAME) - -э ile bitiyor ama lemma
    "гущӀэ",     # sine (LOVE)
    "гупсэ",     # sevgili (LOVE)
    "гуапэ",     # sicak (JOY)
    "гугъэ",     # kalpte tutulan (HOPE)
    "гущтэ",     # FEAR
    "лъытэ",     # RESPECT
    "укӀытэ",    # SHAME
    "гуажэ",     # gucenme (RESENTMENT)
    "гущӀыхьэ",  # derin incinme (GRIEF)
    "гукъанэ",   # RESENTMENT
    "гуращэ",    # HOPE
    "бампӀэ",    # BOREDOM
    "зэш",       # BOREDOM
    "гущӀэгъу",  # COMPASSION
    "гухэлъ",    # HOPE
}

def cekim_mi(form, sub):
    if form in LEMMA_ISTISNA:
        return False
    if sub in CEKIM_SUB:
        return True
    for son in CEKIM_SONLARI:
        if form.endswith(son) and len(form) > len(son) + 1:
            return True
    return False

# --- HTML/Rus temizleme ---
HTML_RE = re.compile(r"<[^>]+>|</div|<font[^>]*")
RUS_RE = re.compile(r"[а-яА-ЯёЁ]")

def temizle_anlam(s):
    if not s:
        return s
    s = HTML_RE.sub("", s)
    s = s.strip()
    return s

# --- Ayirma ---
lemma_list = []
cekim_list = []
mukerrer_list = []
rus_list = []

seen_forms = {}

for l in lex:
    cid = l.get("conceptId", "")
    if cid not in EMOTION_CONCEPTS:
        continue

    form = l.get("form", "")
    sub = l.get("taxonomyFamily", "") or l.get("sub", "")

    # HTML temizle
    lm = l.get("literalMeaning", "")
    lm_temiz = temizle_anlam(lm)
    if lm_temiz != lm:
        l["literalMeaning"] = lm_temiz

    # Rusca mi?
    if RUS_RE.search(lm_temiz or ""):
        rus_list.append(form)
        l["_needs_translation"] = True

    # Mukerrer?
    if form in seen_forms:
        mukerrer_list.append(form)
        l["_status"] = "DUPLICATE"
        continue
    seen_forms[form] = True

    # Cekim mi?
    if cekim_mi(form, sub):
        cekim_list.append(form)
        l["_status"] = "INFLECTED"
    else:
        lemma_list.append(form)
        l["_status"] = "LEMMA"

# --- Istatistik ---
print(f"\n=== EMOTION SPLIT V2 SONUCU ===")
print(f"Toplam EMOTION       : {len(lemma_list) + len(cekim_list) + len(mukerrer_list)}")
print(f"Lemma                : {len(lemma_list)}")
print(f"Cekimli              : {len(cekim_list)}")
print(f"Mukerrer             : {len(mukerrer_list)}")
print(f"Rusca literalMeaning : {len(rus_list)}")

print(f"\n=== CEKIM LISTESI ===")
for f in cekim_list:
    print(f"  {f}")

print(f"\n=== MUKERRER LISTESI ===")
for f in mukerrer_list:
    print(f"  {f}")

print(f"\n=== RUSCA CEVIRI GEREKENLER ===")
for f in rus_list:
    print(f"  {f}")

print(f"\n=== LEMMA CONCEPT DAGILIMI ===")
concepts = Counter()
for l in lex:
    if l.get("_status") == "LEMMA":
        concepts[l.get("conceptId", "?")] += 1
for c, n in concepts.most_common():
    print(f"  {c:20s} {n}")

# --- Inflected dosyasi ---
inflected_dir = Path("public/data/linguistic/_inflected")
inflected_dir.mkdir(parents=True, exist_ok=True)

inflected_data = []
for l in lex:
    if l.get("_status") == "INFLECTED":
        inflected_data.append({
            "surface": l.get("form"),
            "lemma_id": l.get("id") or l.get("conceptId"),
            "conceptId": l.get("conceptId"),
            "note": "EMOTION cekimli form"
        })

inf_path = inflected_dir / "emotion_surface.json"
inf_path.write_text(json.dumps(inflected_data, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nYazildi: {inf_path} ({len(inflected_data)} kayit)")

# --- Status alanlarini temizle ve kaydet ---
for l in lex:
    l.pop("_status", None)

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Guncellendi: {lex_path.name}")
print(f"\nOK - {len(lemma_list)} lemma, {len(cekim_list)} cekim, {len(mukerrer_list)} mukerrer")
