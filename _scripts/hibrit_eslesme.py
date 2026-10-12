import json
from pathlib import Path
import shutil
from collections import Counter

# 1. Temiz yedeği yükle
lex_path = Path("public/data/linguistic/lexemes.json")
bak_path = Path("public/data/linguistic/lexemes.json.bak-root")

lex = json.loads(bak_path.read_text(encoding="utf-8"))
print(f"Temiz lexemes: {len(lex)}")

# 2. Kökleri yükle
roots = json.loads(Path("_scripts/roots_birlesik.json").read_text(encoding="utf-8"))
root_map = {r["form"]: r for r in roots if r.get("form")}
sorted_root_forms = sorted(root_map.keys(), key=len, reverse=True)
print(f"Kök sayısı: {len(root_map)}")

# 3. Filtre kuralları
def bul_kokler(form):
    """Bir kelime için tüm olası kökleri bul, filtre uygula."""
    adaylar = []
    for root_form in sorted_root_forms:
        r = root_map[root_form]
        if not r.get("rootIds"):
            continue
        rid = r["rootIds"][0]

        # Kural 1: тхьэ kökü varsa, R-HAE (хьэ) kökünü engelle
        if "тхьэ" in form and rid == "R-HAE":
            continue

        # Kural 2: 2 harfli kökler (да, нэ, гу vb.) sadece kelime başında veya tam eşleşmede geçerli
        if len(root_form) <= 2:
            if form != root_form and not form.startswith(root_form):
                continue

        # Eşleşme kontrolü
        if form == root_form:
            adaylar.append((root_form, r))
        elif root_form in form:
            adaylar.append((root_form, r))

    # Tekrarları rootId bazında temizle
    benzersiz = {}
    for root_form, r in adaylar:
        rid = r["rootIds"][0]
        if rid not in benzersiz:
            benzersiz[rid] = (root_form, r)
    return list(benzersiz.values())

# 4. Güncelleme
sayac = Counter()
for l in lex:
    form = l.get("form", "")
    if not form:
        continue

    bulunanlar = bul_kokler(form)
    if not bulunanlar:
        continue

    # rootIds: hepsini al
    root_id_listesi = [r["rootIds"][0] for _, r in bulunanlar]
    l["rootIds"] = root_id_listesi

    # wordFamilyId: ilk kökün ailesi (veya ilk birkaçı)
    l["wordFamilyId"] = bulunanlar[0][1].get("wordFamilyId")

    # derivation: bileşenleri yaz
    l["derivation"] = {
        "rule": "compound" if len(bulunanlar) > 1 else "root",
        "components": [rf for rf, _ in bulunanlar]
    }

    sayac["rootIds"] += 1

print(f"\nrootIds atanan: {sayac['rootIds']}")

# 5. Kontrol: R-HAE dağılımı
hae = sum(1 for l in lex if "R-HAE" in (l.get("rootIds") or []))
print(f"R-HAE (köpek) kökü atanan: {hae}")

# 6. Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Kaydedildi: {lex_path}")
