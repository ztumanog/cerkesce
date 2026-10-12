import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

guncellenen = 0

# ============================================================
# 1. R-ANA (anne) → sıra sayıları ve bağımsız kökler
# ============================================================
ANA_CIKAR = {
    "етӀуанэ", "ещӀанэ", "еплӀанэ", "етхуанэ", "ебгъуанэ",
    "ищӀанэ", "ибгъуанэ", "ипщӀанэ", "ирэтӀуанэ",
    "итӀанэ", "бланэ", "плӀанэ", "плӀанэпэ", "унэ плӀанэпэ"
}
for l in lex:
    if l.get("form") in ANA_CIKAR and "R-ANA" in (l.get("rootIds") or []):
        l["rootIds"].remove("R-ANA")
        guncellenen += 1

# ============================================================
# 2. R-LHA (ayak) → -лъэ kap eki, fiiller, илъэс
# ============================================================
LHA_CIKAR_KELIME = {
    "хьэзырылъэ", "дзажэналъэ", "илъэс",
    "лъэгъун", "плъэн", "елъэтахэн", "лъэтэн",
    "пэплъэн", "теплъэ", "плъыжь", "гъуаплъэ"
}
for l in lex:
    form = l.get("form", "")
    if "R-LHA" not in (l.get("rootIds") or []):
        continue
    if form in LHA_CIKAR_KELIME:
        l["rootIds"].remove("R-LHA")
        guncellenen += 1
    elif form.endswith("лъэ") and form not in ["лъэ", "лъэгу", "лъэпс", "лъэужь", "лъэмыдж", "лъэбакъуэ", "лъэгуажьэ", "лъэдакъэ", "лъакъуэ"]:
        # -лъэ kap eki (container suffix)
        if "хьэзырылъэ" in form or "дзажэналъэ" in form:
            l["rootIds"].remove("R-LHA")
            guncellenen += 1

# ============================================================
# 3. R-QA → alıntılar, -къа- çakışması
# ============================================================
QA_CIKAR = {
    "къалэ", "къалэм", "къалэн", "къалъху",
    "шъыпкъагъэ", "щыпкъагъэ", "къалмыкъ", "къарал"
}
for l in lex:
    if l.get("form") in QA_CIKAR and "R-QA" in (l.get("rootIds") or []):
        l["rootIds"].remove("R-QA")
        guncellenen += 1

# ============================================================
# 4. R-QWA → закъуэ (yalnız)
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "закъуэ" in form and "R-QWA" in (l.get("rootIds") or []):
        l["rootIds"].remove("R-QWA")
        guncellenen += 1
    if form in ["щэныкъуэ", "къуэлэн"] and "R-QWA" in (l.get("rootIds") or []):
        l["rootIds"].remove("R-QWA")
        guncellenen += 1

# ============================================================
# 5. R-NA (göz) → нэ- preverb, нэхъ (daha)
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-NA" not in (l.get("rootIds") or []):
        continue
    if form.startswith("нэхъ") or form.startswith("нахь"):
        l["rootIds"].remove("R-NA")
        guncellenen += 1
    if form in ["нэсын", "нэсыным", "нэсыныр"]:
        l["rootIds"].remove("R-NA")
        guncellenen += 1

# ============================================================
# 6. R-ZHY → дыжьын (gümüş), жьынду (baykuş)
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-ZHY" not in (l.get("rootIds") or []):
        continue
    if form in ["дыжьын", "дыжьыныр", "дыжьыным"]:
        l["rootIds"].remove("R-ZHY")
        guncellenen += 1
    if "жьынду" in form:
        l["rootIds"].remove("R-ZHY")
        guncellenen += 1

# ============================================================
# 7. R-ZHAM (inek) → -жэм çekim eki
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-ZHAM" not in (l.get("rootIds") or []):
        continue
    if form.endswith("жэм") and form not in ["жэм", "жэмыр", "жэмым"]:
        l["rootIds"].remove("R-ZHAM")
        guncellenen += 1
    if form in ["щхьэгъубжэмкӀэ", "бжэмкӀэ"]:
        l["rootIds"].remove("R-ZHAM")
        guncellenen += 1

# ============================================================
# 8. R-TET (dede) → Tatar, къытэт
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-TET" not in (l.get("rootIds") or []):
        continue
    if form in ["тэтэр", "тэтэрхэм", "къытэт", "тэтэрхэр"]:
        l["rootIds"].remove("R-TET")
        guncellenen += 1

# ============================================================
# 9. R-LHY (adam) → sayılar плӀы
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-LHY" not in (l.get("rootIds") or []):
        continue
    if form in ["плӀы", "плӀыщӀ", "плӀыжь"]:
        l["rootIds"].remove("R-LHY")
        guncellenen += 1

# ============================================================
# 10. R-SHYGHW (tuz) → -гъуэ soyut eki
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-SHYGHW" not in (l.get("rootIds") or []):
        continue
    if form.endswith("гъуэ") and "шыгъу" not in form:
        l["rootIds"].remove("R-SHYGHW")
        guncellenen += 1

# ============================================================
# 11. R-KHY (deniz) → sayı/preverb/bağımsız
# ============================================================
KHY_CIKAR = {
    "хыщӀ", "хыхьэн", "хыхьэ", "хыхьэжын",
    "хымэ", "хын", "хыв"
}
for l in lex:
    if l.get("form") in KHY_CIKAR and "R-KHY" in (l.get("rootIds") or []):
        l["rootIds"].remove("R-KHY")
        guncellenen += 1

# ============================================================
# 12. R-TSY (tüy) → цыхьэ, Ӏэнэщхьэ
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-TSY" not in (l.get("rootIds") or []):
        continue
    if form in ["цыхьэ", "Ӏэнэщхьэ", "Ӏэнэ"]:
        l["rootIds"].remove("R-TSY")
        guncellenen += 1

# ============================================================
# 13. R-LY (et) → лые/лыягъэ
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-LY" not in (l.get("rootIds") or []):
        continue
    if form in ["лые", "лыягъэ"]:
        l["rootIds"].remove("R-LY")
        guncellenen += 1

# ============================================================
# 14. R-FO (bal) → tüfek, alıntı
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-FO" not in (l.get("rootIds") or []):
        continue
    if form in ["фоч", "фочауэ", "фочыр", "фочышэ", "fond", "фолькенинг"]:
        l["rootIds"].remove("R-FO")
        guncellenen += 1

# ============================================================
# 15. R-WAS (kar) → çam, alıntı
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-WAS" not in (l.get("rootIds") or []):
        continue
    if form in ["остыгъай", "остыгъэ", "остыгъ", "осыет", "осетин"]:
        l["rootIds"].remove("R-WAS")
        guncellenen += 1

# ============================================================
# 16. R-FA (deri) → фэдэ, фэ- preverb
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-FA" not in (l.get("rootIds") or []):
        continue
    if form.startswith("фэд") or form.startswith("фэгъэ") or form.startswith("фэхъу") or form.startswith("фэра"):
        l["rootIds"].remove("R-FA")
        guncellenen += 1

# ============================================================
# 17. R-DZA (ordu/diş) → дзэн (atmak)
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-DZA" not in (l.get("rootIds") or []):
        continue
    if form in ["зэпэдзэн", "падзэжэн", "зыхэдзэн", "тедзэн", "дзэн"]:
        l["rootIds"].remove("R-DZA")
        guncellenen += 1

# ============================================================
# 18. R-CHA (gece) → alıntılar
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-CHA" not in (l.get("rootIds") or []):
        continue
    if form in ["чэрэз", "чэтэн", "чэнджэщ", "чэф"]:
        l["rootIds"].remove("R-CHA")
        guncellenen += 1

# ============================================================
# 19. R-YN (büyük) → alıntılar
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-YN" not in (l.get("rootIds") or []):
        continue
    if form in ["инжир", "инджыл", "инженер", "институт", "индыл"]:
        l["rootIds"].remove("R-YN")
        guncellenen += 1

# ============================================================
# 20. R-ADA (baba) → son temizlik
# ============================================================
for l in lex:
    form = l.get("form", "")
    if "R-ADA" not in (l.get("rootIds") or []):
        continue
    if form in ["дэшхуэ", "адэт"]:
        l["rootIds"].remove("R-ADA")
        guncellenen += 1

# ============================================================
# 21. R-HAE (köpek) → zaten beyaz liste
# ============================================================
# Ek kontrol: beyaz liste dışındaki R-HAE'leri çıkar
BEYAZ_HAE = {
    "хьэ", "хьэпшыр", "хьэбзы", "хьэш",
    "хьэпӀащэ", "хьэпӀащэжь", "хьэгъуэлъыжь",
    "хьэпӀащӀэ", "хьэпщӀащэ",
    "ныбгъуэхьэш", "хьэбз", "хьэбзэ",
    "хьэщ", "хьэжь", "хьэхъу", "хьэшорэ",
    "хьэбзыпэ", "мэлыхъуэхьэ", "хьэхэм",
    "хьэкӀэ", "хьэпӀацӀэ",
    "хьэзешэ", "хьэр", "хьэхэр", "хьэлокӏуэ"
}
for l in lex:
    form = l.get("form", "")
    if "R-HAE" in (l.get("rootIds") or []) and form not in BEYAZ_HAE:
        l["rootIds"].remove("R-HAE")
        guncellenen += 1

print(f"Toplam güncellenen kelime: {guncellenen}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
