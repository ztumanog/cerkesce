import json
from pathlib import Path
from datetime import datetime
from collections import Counter

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

tarih = datetime.now().strftime("%Y%m%d-%H%M%S")
yedek = lex_path.with_suffix(f".json.bak-emotion-split-{tarih}")
yedek.write_text(lex_path.read_text(encoding="utf-8"), encoding="utf-8")
print(f"Yedek: {yedek.name}")

# --- Çekim tespit kuralları ---
CEKIM_EKLERI = ("р", "м", "щ", "уэ", "э", "ми", "ти", "т", "къым")
CEKIM_SUB = {"Gramer & Çekim", "Gramer & Nitelik"}

# Bazı özel çekimli formlar (elle)
OZEL_CEKIM = {
    "губжьыр", "губжьым", "губжыгъэ", "губжьыныгъэ",
    "гугъэр", "гугъэщ", "гугъэу",
    "гуфӏэгъуэр", "гуфӏэгъуэм",
    "гуапэщ", "гуапэт", "гуапэу",
    "гуауэм", "гуауэр",
    "гузэвэгъуэм",
    "гущӏэгъум", "гущӏэгъур",
    "гукӏэ",
    "гурэ",
    "гупсэхуу", "гупсэфэу",
    "гузавэу", "гужьеяуэ",
    "губжьа",
    "хьэзабыр", "хьэзабым", "хьэзабу",
}

def cekim_mi(form, sub):
    if form in OZEL_CEKIM:
        return True
    if sub in CEKIM_SUB:
        return True
    return False

# --- Ayırma ---
duzeltilen = []
cekimler = []
atlanan = []

for l in lex:
    form = l.get("form", "")
    if l.get("subConceptId") != "EMOTION":
        continue

    sub = l.get("taxonomyFamily", "") or l.get("sub", "")

    if cekim_mi(form, sub):
        cekimler.append(form)
        l["_status"] = "INFLECTED"
        l["_target"] = "_inflected/emotion_surface.json"
    else:
        duzeltilen.append(form)
        l["_status"] = "LEMMA"
        l["_target"] = "lexicon"

# --- İstatistik ---
print(f"\n=== EMOTION SPLIT SONUCU ===")
print(f"Toplam EMOTION       : {len(duzeltilen) + len(cekimler)}")
print(f"Lemma adayi          : {len(duzeltilen)}")
print(f"Cekimli form         : {len(cekimler)}")
print(f"Atlanan              : {len(atlanan)}")

print(f"\n=== CONCEPT DAGILIMI (LEMMA) ===")
concepts = Counter()
for l in lex:
    if l.get("_status") == "LEMMA":
        concepts[l.get("conceptId", "?")] += 1
for c, n in concepts.most_common():
    print(f"  {c:20s} {n}")

print(f"\n=== LEMMA LISTESI ===")
for l in lex:
    if l.get("_status") == "LEMMA":
        print(f"  {l.get('form'):25s} | {l.get('conceptId', '?'):15s} | {l.get('literalMeaning', '?')[:40]}")

print(f"\n=== CEKIM LISTESI ===")
for l in lex:
    if l.get("_status") == "INFLECTED":
        print(f"  {l.get('form'):25s} | {l.get('conceptId', '?'):15s}")

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

# --- Ana lexicon'u kaydet (status alanlari temizlenmis) ---
for l in lex:
    l.pop("_status", None)
    l.pop("_target", None)

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Guncellendi: {lex_path.name}")
print(f"\nOK - {len(duzeltilen)} lemma, {len(cekimler)} cekim")
