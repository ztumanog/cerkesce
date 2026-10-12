import json
from pathlib import Path

renkler = [
  {"form": "плъыжь", "ipa": "/pɬ'əʑ/", "literalMeaning": "kırmızı", "conceptId": "RED"},
  {"form": "хужь", "ipa": "/xʷəʑ/", "literalMeaning": "beyaz", "conceptId": "WHITE"},
  {"form": "фIыцIэ", "ipa": "/f'əts'a/", "literalMeaning": "siyah / koyu", "conceptId": "BLACK"},
  {"form": "гъуэжь", "ipa": "/ʁʷaʑ/", "literalMeaning": "sarı", "conceptId": "YELLOW"},
  {"form": "щхъуантIэ", "ipa": "/ɕxʷaːnt'a/", "literalMeaning": "mavi / gök mavisi", "conceptId": "BLUE"},
  {"form": "удзыфэ", "ipa": "/wədzyfa/", "literalMeaning": "yeşil (çimen rengi)", "conceptId": "GREEN"},
  {"form": "щхъуэ", "ipa": "/ɕxʷa/", "literalMeaning": "gri / çelik rengi", "conceptId": "GREY"},
  {"form": "гъуабэ", "ipa": "/ʁʷaːba/", "literalMeaning": "kahverengi", "conceptId": "BROWN"},
  {"form": "морэ", "ipa": "/mawra/", "literalMeaning": "mor / leylak", "conceptId": "PURPLE"},
  {"form": "тхьэмбылыфэ", "ipa": "/tħambələfa/", "literalMeaning": "pembe", "conceptId": "PINK"},
  {"form": "гъуэжь-плъыжьыфэ", "ipa": "/ʁʷaʑ-pɬ'əʑəfa/", "literalMeaning": "turuncu", "conceptId": "ORANGE"},
  {"form": "щIыху", "ipa": "/ɕ'əxʷ/", "literalMeaning": "lacivert", "conceptId": "NAVY_BLUE"},
  {"form": "дыщафэ", "ipa": "/dəɕaːfa/", "literalMeaning": "altın sarısı", "conceptId": "GOLDEN"},
  {"form": "дыжьыныфэ", "ipa": "/dəʑənəfa/", "literalMeaning": "gümüş rengi", "conceptId": "SILVER"},
  {"form": "къуэлэн", "ipa": "/q'walaːn/", "literalMeaning": "alaca / benekli", "conceptId": "MULTICOLOR"},
  {"form": "нэху", "ipa": "/naxʷ/", "literalMeaning": "açık / aydınlık renk", "conceptId": "LIGHT_COLOR"},
  {"form": "кIынфI", "ipa": "/k'ənf'/", "literalMeaning": "koyu / mat", "conceptId": "DARK_COLOR"}
]

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
lex_forms = {l.get("form", ""): l for l in lex if l.get("form")}

guncellenen = 0
yeni_eklenen = 0

for r in renkler:
    form = r["form"]
    if form in lex_forms:
        l = lex_forms[form]
        if not l.get("conceptId"):
            l["conceptId"] = r["conceptId"]
            guncellenen += 1
        if not l.get("ipa") and r.get("ipa"):
            l["ipa"] = r["ipa"]
    else:
        lex.append({
            "id": f"L-COLOR-{r['conceptId']}",
            "form": form,
            "ipa": r.get("ipa"),
            "literalMeaning": r["literalMeaning"],
            "conceptId": r["conceptId"],
            "partOfSpeech": "adjective",
            "rootIds": [],
            "wordFamilyId": None,
            "notes": f"Renk (Color)"
        })
        yeni_eklenen += 1

print(f"Güncellenen conceptId: {guncellenen}")
print(f"Yeni eklenen: {yeni_eklenen}")
print(f"✅ Toplam: {len(lex)}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
