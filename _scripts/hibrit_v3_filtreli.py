import json
from pathlib import Path
from collections import Counter

# 1. Temiz yedeği kullan (neredeyse temiz)
lex_path = Path("public/data/linguistic/lexemes.json")
bak_path = Path("public/data/linguistic/lexemes.json.bak-root")

lex = json.loads(bak_path.read_text(encoding="utf-8"))
print(f"Temiz lexemes: {len(lex)}")

# rootIds alanlarını tamamen temizle (151 tane vardı)
for l in lex:
    l.pop("rootIds", None)
    l.pop("wordFamilyId", None)
    l.pop("derivation", None)
print("Eski rootIds temizlendi.")

# 2. Kökleri yükle
roots = json.loads(Path("_scripts/roots_birlesik.json").read_text(encoding="utf-8"))
root_map = {r["form"]: r for r in roots if r.get("form")}
sorted_root_forms = sorted(root_map.keys(), key=len, reverse=True)
print(f"Kök sayısı: {len(root_map)}")

# 3. R-HAE için özel filtre
def is_valid_hae(form: str) -> bool:
    if "щхьэ" in form:
        return False
    blacklist = ["хьэзыр", "сыхьэт", "хьэщӀэ", "хьэлъэ", "бжьыхьэ", "щхьэл"]
    if any(b in form for b in blacklist):
        return False
    if form.endswith("хьэн") or "рыхьэ" in form or "зехьэ" in form:
        return False
    return True

# 4. Kök bulma fonksiyonu
def bul_kokler(form):
    adaylar = []
    for root_form in sorted_root_forms:
        r = root_map[root_form]
        if not r.get("rootIds"):
            continue
        rid = r["rootIds"][0]

        # тхьэ filtresi
        if "тхьэ" in form and rid == "R-HAE":
            continue

        # R-HAE özel filtresi
        if rid == "R-HAE" and not is_valid_hae(form):
            continue

        # R-HAE sadece kelime başında veya tam eşleşmede
        if rid == "R-HAE":
            if form != root_form and not form.startswith(root_form):
                continue

        # 2 harfli kökler sadece kelime başında veya tam eşleşmede
        if len(root_form) <= 2:
            if form != root_form and not form.startswith(root_form):
                continue

        if form == root_form:
            adaylar.append((root_form, r))
        elif root_form in form:
            adaylar.append((root_form, r))

    benzersiz = {}
    for root_form, r in adaylar:
        rid = r["rootIds"][0]
        if rid not in benzersiz:
            benzersiz[rid] = (root_form, r)
    return list(benzersiz.values())

# 5. Güncelle
sayac = Counter()
for l in lex:
    form = l.get("form", "")
    if not form:
        continue

    bulunanlar = bul_kokler(form)
    if not bulunanlar:
        continue

    l["rootIds"] = [r["rootIds"][0] for _, r in bulunanlar]
    l["wordFamilyId"] = bulunanlar[0][1].get("wordFamilyId")
    l["derivation"] = {
        "rule": "compound" if len(bulunanlar) > 1 else "root",
        "components": [rf for rf, _ in bulunanlar]
    }
    sayac["rootIds"] += 1

print(f"\nrootIds atanan: {sayac['rootIds']}")

# 6. R-HAE sayısı
hae = [l for l in lex if "R-HAE" in (l.get("rootIds") or [])]
print(f"R-HAE (köpek) kökü atanan: {len(hae)}")

# 7. Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"✅ Kaydedildi: {lex_path}")
