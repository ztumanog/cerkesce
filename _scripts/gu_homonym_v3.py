import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# R-GU'dan çıkarılacak TÜM homonym kelimeler
# 8 rapordan derlendi (151-240 arası dahil)
CIKAR = {
    # ===== Rapor 1-5 (önceki) =====
    "гущэ", "гуащэ", "гугъу", "гугъуехь",
    "гуэдз", "гуэл", "гуащ", "гуащӀэ",
    "гуэщ", "гуу", "гуахъуэ", "гуэр",
    "губгъэ", "губгъо", "гуэрхэр", "гуэшын",
    "гуэшыныгъэ", "гуащэнэ", "гупэ", "гурыт",
    "гугъугъэ", "гуэныхь", "гуп", "гупышхуэ",
    "губгъуэ", "гунахь", "гуэныхьлы", "гуадз",
    "гувауэ", "гуэша", "гуп-гупу", "гухьэн",
    "гуэн", "гуартэ", "гугъусыгъу", "гуэгъу",
    "гуарцэ", "гузэгу", "гуп-гупурэ", "гупым",
    "гупыр", "гуэрым", "гуэрхэм", "гуэныхьхэр",
    "гуэныхьым", "гуэныхьыр", "гуэныхьхэм",
    "гуэныхьыщӀэ", "гугъущ", "гуащэм", "гуащэр",
    "гуащӀэм", "гуэдзыр", "гуэлым", "гуэри",
    "гуэркӀэ", "гуэныхьу", "гупышхуэм",
    "гугъуехьым", "гугъуехьхэм", "губгъом",

    # ===== Rapor 6 (151-180) =====
    "гугъуехьхэр", "гугъуехьыр",
    "гуащӀэдэкӀ", "гуащӀэу", "гуащӀэр",
    "гуэщым", "гузэгум",

    # ===== Rapor 7 (181-210) =====
    "гуэрми", "гуэрщ", "гуэру", "гуэрхэри",
    "гугъуехьу", "гугъум",
    "гуащэу", "гува-щӀэхами", "гущэри",
    "гуемыӀу", "гуэныхьыщӀэр", "гуэныхьыщӀэм",

    # ===== Rapor 8 (211-240) =====
    "гуащӀэкӀэ", "гуащӀэмащӀэ",
    "гуэныхьхэри", "гунахьыбэ", "гуэныхьхэмкӀэ",
    "гугъукъым", "гугъуехьышхуэ",
    "гупэмкӀэ",
}

guncellenen = 0
for l in lex:
    form = l.get("form", "")
    root_ids = l.get("rootIds", [])
    if form in CIKAR and "R-GU" in root_ids:
        root_ids.remove("R-GU")
        guncellenen += 1
        l["rootIds"] = root_ids

print(f"R-GU'dan çıkarılan: {guncellenen}")

# Son durum
r_gu = [l for l in lex if "R-GU" in (l.get("rootIds") or [])]
print(f"\nR-GU kalan: {len(r_gu)}")

# Kalan kelimelerden ilk 20
for l in r_gu[:20]:
    print(f"  {l.get('form', '?'):25s}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Kaydedildi")
