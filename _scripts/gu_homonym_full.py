import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# R-GU'dan çıkarılacak TÜM homonym kelimeler (5 rapordan derlendi)
CIKAR = {
    # Rapor 1 (30 kelime)
    "гущэ", "гуащэ", "гугъу", "гугъуехь",
    "гуэдз", "гуэл", "гуащ", "гуащӀэ",
    "гуэщ", "гуу", "гуахъуэ", "гуэр",
    "губгъэ", "губгъо", "гуэрхэр", "гуэшын",
    "гуэшыныгъэ", "гуащэнэ", "гупэ", "гурыт",
    # Rapor 2 (31-60)
    "гугъугъэ", "гуэр", "гуэныхь", "гуп",
    "гупышхуэ", "гуэшын", "гуэшыныгъэ", "гуащэнэ",
    "гупэ", "гурыт", "губгъо", "губгъуэ",
    # Rapor 3 (61-90)
    "гунахь", "гуэныхьлы", "гуадз", "гувауэ",
    "гуэша", "гуп-гупу", "гухьэн", "гуэн",
    "гуартэ", "гугъусыгъу", "гуэгъу", "гуарцэ",
    "гузэгу",
    # Rapor 4 (91-120)
    "гуп-гупурэ", "гупым", "гупыр", "гуэрым",
    "гуэрхэм", "гуэныхьхэр", "гуэныхьым", "гуэныхьыр",
    "гуэныхьхэм", "гуэныхьыщӀэ", "гугъущ", "гуащэм",
    "гуащэр",
    # Rapor 5 (121-150)
    "гуащӀэм", "гуэдзыр", "гуэлым", "гуэри",
    "гуэркӀэ", "гуэныхьу", "гупышхуэм", "гугъуехьым",
    "гугъуехьхэм", "губгъом",
    # Ek: mekânsal/geometrik
    "гупэ", "гурыт", "губгъо", "губгъуэ",
    "гузэгу", "губгъом",
    # Ek: diğer
    "гуэщ", "гуу", "гуахъуэ", "гуэр",
    "губгъэ", "губгъо", "гуэрхэр",
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
for l in r_gu[:30]:
    print(f"  {l.get('form', '?'):25s}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\n✅ Kaydedildi")
