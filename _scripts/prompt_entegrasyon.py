import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))

# Mevcut formları al
mevcut_formlar = {l.get("form") for l in lex}
print(f"Mevcut lexemes: {len(lex)}")

# Yeni kelimeler
yeni_kelimeler = [
  # PROMPT 23
  {"form": "гъатхэ", "ipa": "/ʁaːtxa/", "literalMeaning": "ilkbahar", "conceptId": "SPRING", "category": "season"},
  {"form": "гъэмахуэ", "ipa": "/ʁamaːxʷa/", "literalMeaning": "yaz", "conceptId": "SUMMER", "category": "season"},
  {"form": "бжьыхьэ", "ipa": "/bʒəħa/", "literalMeaning": "sonbahar", "conceptId": "AUTUMN", "category": "season"},
  {"form": "щIымахуэ", "ipa": "/ɕ'əmaːxʷa/", "literalMeaning": "kış", "conceptId": "WINTER", "category": "season"},
  {"form": "щIышылэ", "ipa": "/ɕ'əʃəla/", "literalMeaning": "ocak", "conceptId": "JANUARY", "category": "month"},
  {"form": "мазае", "ipa": "/maːzaːje/", "literalMeaning": "şubat", "conceptId": "FEBRUARY", "category": "month"},
  {"form": "гъатхэпэ", "ipa": "/ʁaːtxapa/", "literalMeaning": "mart", "conceptId": "MARCH", "category": "month"},
  {"form": "мэлыжьыхь", "ipa": "/maləʑəħ/", "literalMeaning": "nisan", "conceptId": "APRIL", "category": "month"},
  {"form": "накъыгъэ", "ipa": "/naːq'əʁa/", "literalMeaning": "mayıs", "conceptId": "MAY", "category": "month"},
  {"form": "мэкъуауэгъуэ", "ipa": "/maq'waːwaʁʷa/", "literalMeaning": "haziran", "conceptId": "JUNE", "category": "month"},
  {"form": "бадзэуэгъуэ", "ipa": "/baːdzaːwaʁʷa/", "literalMeaning": "temmuz", "conceptId": "JULY", "category": "month"},
  {"form": "шыщхьэIу", "ipa": "/ʃəɕħaʔw/", "literalMeaning": "ağustos", "conceptId": "AUGUST", "category": "month"},
  {"form": "фокIадэ", "ipa": "/fawk'aːda/", "literalMeaning": "eylül", "conceptId": "SEPTEMBER", "category": "month"},
  {"form": "жэпуэгъуэ", "ipa": "/ʒapwaʁʷa/", "literalMeaning": "ekim", "conceptId": "OCTOBER", "category": "month"},
  {"form": "щэкIуэгъуэ", "ipa": "/ɕak'waʁʷa/", "literalMeaning": "kasım", "conceptId": "NOVEMBER", "category": "month"},
  {"form": "дыгъэгъазэ", "ipa": "/dəʁaʁaːza/", "literalMeaning": "aralık", "conceptId": "DECEMBER", "category": "month"},
  {"form": "блыщхьэ", "ipa": "/bləɕħa/", "literalMeaning": "pazartesi", "conceptId": "MONDAY", "category": "day"},
  {"form": "гъубж", "ipa": "/ʁʷəbʒ/", "literalMeaning": "salı", "conceptId": "TUESDAY", "category": "day"},
  {"form": "бэрэжьей", "ipa": "/baraʑej/", "literalMeaning": "çarşamba", "conceptId": "WEDNESDAY", "category": "day"},
  {"form": "махуэку", "ipa": "/maːxʷakʷ/", "literalMeaning": "perşembe", "conceptId": "THURSDAY", "category": "day"},
  {"form": "мэрем", "ipa": "/marem/", "literalMeaning": "cuma", "conceptId": "FRIDAY", "category": "day"},
  {"form": "щэбэт", "ipa": "/ɕabat/", "literalMeaning": "cumartesi", "conceptId": "SATURDAY", "category": "day"},
  {"form": "тхьэмахуэ", "ipa": "/tħamaːxʷa/", "literalMeaning": "pazar", "conceptId": "SUNDAY", "category": "day"},
  # PROMPT 24
  {"form": "гуфIэ", "ipa": "/ɡʷəf'a/", "literalMeaning": "sevinç", "conceptId": "JOY"},
  {"form": "гуауэ", "ipa": "/ɡʷaːwa/", "literalMeaning": "keder", "conceptId": "GRIEF"},
  {"form": "губжь", "ipa": "/ɡʷəbʒ/", "literalMeaning": "öfke", "conceptId": "ANGER"},
  {"form": "бампIэ", "ipa": "/baːmp'a/", "literalMeaning": "kasvet", "conceptId": "GLOOM"},
  {"form": "гуажэ", "ipa": "/ɡʷaːʒa/", "literalMeaning": "gücenme", "conceptId": "OFFENSE"},
  {"form": "гузэвэн", "ipa": "/ɡʷazavan/", "literalMeaning": "endişe", "conceptId": "ANXIETY"},
  {"form": "гужьей", "ipa": "/ɡʷəʑej/", "literalMeaning": "panik", "conceptId": "PANIC"},
  {"form": "шынэ", "ipa": "/ʃəna/", "literalMeaning": "korku", "conceptId": "FEAR"},
  {"form": "укIытэ", "ipa": "/wək'ətə/", "literalMeaning": "utanç", "conceptId": "SHAME"},
  {"form": "гущIэгъу", "ipa": "/ɡʷəɕ'aʁʷ/", "literalMeaning": "acıma", "conceptId": "PITY"},
  {"form": "егуэкIуэн", "ipa": "/jeɡʷak'wan/", "literalMeaning": "aşk", "conceptId": "LOVE"},
  {"form": "нэщхъей", "ipa": "/naɕx'ej/", "literalMeaning": "hüzün", "conceptId": "SADNESS"},
  {"form": "нэжэгужагъэ", "ipa": "/naʒaɡʷəʒaːʁa/", "literalMeaning": "neşelilik", "conceptId": "CHEERFULNESS"},
  {"form": "гугъэ", "ipa": "/ɡʷəʁa/", "literalMeaning": "umut", "conceptId": "HOPE"},
  {"form": "гухэщI", "ipa": "/ɡʷexaɕ'/", "literalMeaning": "kalp acısı", "conceptId": "HEARTACHE"},
  {"form": "хьэзаб", "ipa": "/ħazaːb/", "literalMeaning": "eziyet", "conceptId": "TORMENT"},
  {"form": "насып", "ipa": "/naːsəp/", "literalMeaning": "saadet", "conceptId": "HAPPINESS"},
  {"form": "жагъуэ", "ipa": "/ʒaːʁʷa/", "literalMeaning": "kırgınlık", "conceptId": "DISPLEASURE"},
  {"form": "дыджагъ", "ipa": "/dədʒaːʁ/", "literalMeaning": "nefret", "conceptId": "HATRED"},
  {"form": "псэху", "ipa": "/psaxʷ/", "literalMeaning": "huzur", "conceptId": "TRANQUILITY"},
  {"form": "ехъуэпсэн", "ipa": "/jexʷapsan/", "literalMeaning": "gıpta", "conceptId": "ADMIRATION"},
  {"form": "гухэщт", "ipa": "/ɡʷexaɕt/", "literalMeaning": "heyecan", "conceptId": "THRILL"},
  {"form": "къэрабгъагъэ", "ipa": "/q'araːbʁaːʁa/", "literalMeaning": "korkaklık", "conceptId": "COWARDICE"},
  {"form": "шынагъэншагъэ", "ipa": "/ʃənaːʁənʃaːʁa/", "literalMeaning": "cesaret", "conceptId": "FEARLESSNESS"},
  {"form": "лыуз", "ipa": "/ɬəwəz/", "literalMeaning": "iç sızlaması", "conceptId": "EMPATHY"},
  {"form": "гулъытэ", "ipa": "/ɡʷəɬəta/", "literalMeaning": "ilgi", "conceptId": "ATTENTION"},
  {"form": "гуапэ", "ipa": "/ɡʷaːpa/", "literalMeaning": "sevecenlik", "conceptId": "PLEASANTNESS"},
  {"form": "зэш", "ipa": "/zaʃ/", "literalMeaning": "can sıkıntısı", "conceptId": "BOREDOM"},
  {"form": "гукъеуэ", "ipa": "/ɡʷəq'ewa/", "literalMeaning": "derin iç acısı", "conceptId": "SORROW"},
  {"form": "гушхуэ", "ipa": "/ɡʷəʃxʷa/", "literalMeaning": "gurur", "conceptId": "PRIDE"},
  {"form": "гущIыхьэ", "ipa": "/ɡʷəɕ'əħa/", "literalMeaning": "derin incinme", "conceptId": "GRIEVANCE"},
  {"form": "хъуэпсагъуэ", "ipa": "/xʷapsaːʁʷa/", "literalMeaning": "özlem", "conceptId": "YEARNING"},
  # PROMPT 25
  {"form": "тхакIуэ", "ipa": "/txaːk'wa/", "literalMeaning": "yazar", "conceptId": "WRITER"},
  {"form": "егъэджакIуэ", "ipa": "/jeʁaːdʒaːk'wa/", "literalMeaning": "öğretmen", "conceptId": "TEACHER"},
  {"form": "еджакIуэ", "ipa": "/jedʒaːk'wa/", "literalMeaning": "öğrenci", "conceptId": "STUDENT"},
  {"form": "усакIуэ", "ipa": "/wəsaːk'wa/", "literalMeaning": "şair", "conceptId": "POET"},
  {"form": "щакIуэ", "ipa": "/ɕaːk'wa/", "literalMeaning": "avcı", "conceptId": "HUNTER"},
  {"form": "лажьакIуэ", "ipa": "/laːʑaːk'wa/", "literalMeaning": "işçi", "conceptId": "WORKER"},
  {"form": "къафакIуэ", "ipa": "/q'aːfaːk'wa/", "literalMeaning": "dansçı", "conceptId": "DANCER"},
  {"form": "пшынауэ", "ipa": "/pʃənaːwa/", "literalMeaning": "müzisyen", "conceptId": "ACCORDIONIST"},
  {"form": "уэрэдохъуэ", "ipa": "/waraːdawxʷa/", "literalMeaning": "şarkıcı", "conceptId": "SINGER"},
  {"form": "Iэзэ", "ipa": "/ʔaza/", "literalMeaning": "hekim", "conceptId": "DOCTOR"},
  {"form": "сымаджащIэ", "ipa": "/səmaːdʒaɕ'a/", "literalMeaning": "hemşire", "conceptId": "NURSE"},
  {"form": "гъущIIэщIэ", "ipa": "/ʁʷəɕ'ʔaɕ'a/", "literalMeaning": "demirci", "conceptId": "BLACKSMITH"},
  {"form": "пхъэщIэ", "ipa": "/pχaɕ'a/", "literalMeaning": "marangoz", "conceptId": "CARPENTER"},
  {"form": "кхъухьлъатэзехуэ", "ipa": "/qχʷəħɬaːtazejxʷa/", "literalMeaning": "pilot", "conceptId": "PILOT"},
  {"form": "шыгузехуэ", "ipa": "/ʃəɡʷəzejxʷa/", "literalMeaning": "sürücü", "conceptId": "DRIVER"},
  {"form": "хъушэсыж", "ipa": "/xʷəʃasəʒ/", "literalMeaning": "çoban", "conceptId": "SHEPHERD"},
  {"form": "плъыр", "ipa": "/pɬər/", "literalMeaning": "bekçi", "conceptId": "GUARD"},
  {"form": "пщылI", "ipa": "/pɕəɬ'/", "literalMeaning": "çiftçi", "conceptId": "FARMER"},
  {"form": "зауэлI", "ipa": "/zaːwaɬ'/", "literalMeaning": "asker", "conceptId": "SOLDIER"},
  {"form": "унэIут", "ipa": "/wənaʔwt/", "literalMeaning": "kahya", "conceptId": "HOUSEKEEPER"},
  {"form": "гъуэгурыкIуэ", "ipa": "/ʁʷaɡʷrək'wa/", "literalMeaning": "yolcu", "conceptId": "TRAVELER"},
  {"form": "джэгуакIуэ", "ipa": "/dʒaɡʷaːk'wa/", "literalMeaning": "ozan", "conceptId": "MINSTREL"},
  {"form": "дыщэщIэ", "ipa": "/dəɕaɕ'a/", "literalMeaning": "kuyumcu", "conceptId": "GOLDSMITH"},
  {"form": "пхъэIэщэжъ", "ipa": "/pχaʔaɕaʒ/", "literalMeaning": "pullukçu", "conceptId": "PLOWMAN"},
  {"form": "бжэнышэ", "ipa": "/bʒənəʃa/", "literalMeaning": "keçi çobanı", "conceptId": "GOATHERD"},
  {"form": "шэхущэ", "ipa": "/ʃaxʷəɕa/", "literalMeaning": "tüccar", "conceptId": "MERCHANT"},
  {"form": "джанэдэдI", "ipa": "/dʒaːnadaːd'/", "literalMeaning": "terzi", "conceptId": "TAILOR"},
  {"form": "вакъэдэдI", "ipa": "/vaːqaːdaːd'/", "literalMeaning": "ayakkabıcı", "conceptId": "SHOEMAKER"},
  {"form": "псыхьэ", "ipa": "/psəħa/", "literalMeaning": "su taşıyıcısı", "conceptId": "WATER_CARRIER"},
  {"form": "тхылъзехьэ", "ipa": "/txəɬzejħa/", "literalMeaning": "kütüphaneci", "conceptId": "LIBRARIAN"},
  {"form": "чылэпащхьэ", "ipa": "/tʃəlapaːɕħa/", "literalMeaning": "muhtar", "conceptId": "VILLAGE_HEAD"},
  # PROMPT 26
  {"form": "щIакхъуэ", "ipa": "/ɕ'aːqχʷa/", "literalMeaning": "ekmek", "conceptId": "BREAD"},
  {"form": "пастэ", "ipa": "/paːsta/", "literalMeaning": "pasta", "conceptId": "PASTA_PORRIDGE"},
  {"form": "кхъуей", "ipa": "/qχʷej/", "literalMeaning": "peynir", "conceptId": "CHEESE"},
  {"form": "лы", "ipa": "/ɬə/", "literalMeaning": "et", "conceptId": "MEAT"},
  {"form": "лыгъэва", "ipa": "/ɬəʁaːva/", "literalMeaning": "haşlanmış et", "conceptId": "BOILED_MEAT"},
  {"form": "лыгъэжьа", "ipa": "/ɬəʁaːʒa/", "literalMeaning": "kızartılmış et", "conceptId": "ROASTED_MEAT"},
  {"form": "шыпс", "ipa": "/ʃəps/", "literalMeaning": "Çerkes sosu", "conceptId": "CIRCASSIAN_SAUCE"},
  {"form": "псыжае", "ipa": "/psəʒaːje/", "literalMeaning": "et suyu çorbası", "conceptId": "BROTH"},
  {"form": "хьэлывэ", "ipa": "/ħaləva/", "literalMeaning": "börek", "conceptId": "FRIED_PASTRY"},
  {"form": "лэкъум", "ipa": "/laq'ʷəm/", "literalMeaning": "lokum", "conceptId": "LOKUM_DOUGH"},
  {"form": "дэлэн", "ipa": "/dalan/", "literalMeaning": "gözleme", "conceptId": "STUFFED_FLATBREAD"},
  {"form": "жэмыкуэ", "ipa": "/ʒaməkʷa/", "literalMeaning": "kaymak helvası", "conceptId": "CHEESE_CREAM_PORRIDGE"},
  {"form": "мэрмысэ", "ipa": "/marməsa/", "literalMeaning": "mısır çorbası", "conceptId": "CORN_SOUP"},
  {"form": "хьэнтхъупс", "ipa": "/ħantqχʷəps/", "literalMeaning": "buğday çorbası", "conceptId": "GRAIN_SOUP"},
  {"form": "махъсымэ", "ipa": "/maːqχsəma/", "literalMeaning": "boza", "conceptId": "MAXIMA_BEVERAGE"},
  {"form": "бжэмышх", "ipa": "/bʒaməʃx/", "literalMeaning": "kaymak", "conceptId": "CLOTTED_CREAM"},
  {"form": "щэтэ", "ipa": "/ɕata/", "literalMeaning": "ekşi krema", "conceptId": "SOUR_CREAM"},
  {"form": "шэ", "ipa": "/ʃa/", "literalMeaning": "süt", "conceptId": "MILK"},
  {"form": "псы", "ipa": "/psə/", "literalMeaning": "su", "conceptId": "WATER"},
  {"form": "шей", "ipa": "/ʃej/", "literalMeaning": "çay", "conceptId": "TEA"},
  {"form": "фо", "ipa": "/fo/", "literalMeaning": "bal", "conceptId": "HONEY"},
  {"form": "фошыгъу", "ipa": "/foʃəʁʷ/", "literalMeaning": "şeker", "conceptId": "SUGAR"},
  {"form": "шыгъу", "ipa": "/ʃəʁʷə/", "literalMeaning": "tuz", "conceptId": "SALT"},
  {"form": "бжьынэ", "ipa": "/bʒəna/", "literalMeaning": "soğan", "conceptId": "ONION"},
  {"form": "бжьыныщхьэ", "ipa": "/bʒənəɕħa/", "literalMeaning": "sarımsak", "conceptId": "GARLIC"},
  {"form": "кIэртIоф", "ipa": "/k'art'of/", "literalMeaning": "patates", "conceptId": "POTATO"},
  {"form": "къэб", "ipa": "/q'ab/", "literalMeaning": "kabak", "conceptId": "PUMPKIN"},
  {"form": "нащэ", "ipa": "/naːɕa/", "literalMeaning": "salatalık", "conceptId": "CUCUMBER"},
  {"form": "тэмэтус", "ipa": "/tamaːtwəs/", "literalMeaning": "domates", "conceptId": "TOMATO"},
  {"form": "мыIэрысэ", "ipa": "/məʔarəsa/", "literalMeaning": "elma", "conceptId": "APPLE"},
  {"form": "кхъужь", "ipa": "/qχʷaʑ/", "literalMeaning": "armut", "conceptId": "PEAR"},
  {"form": "балий", "ipa": "/baːlij/", "literalMeaning": "vişne", "conceptId": "CHERRY"},
  {"form": "дэ", "ipa": "/da/", "literalMeaning": "ceviz", "conceptId": "WALNUT"},
  {"form": "хъэуан", "ipa": "/xʷaːwaːn/", "literalMeaning": "kavun", "conceptId": "MELON"},
  {"form": "хъарбуз", "ipa": "/xaːrbwəz/", "literalMeaning": "karpuz", "conceptId": "WATERMELON"},
  {"form": "гуэдз", "ipa": "/ɡʷadz/", "literalMeaning": "buğday", "conceptId": "WHEAT"},
  {"form": "нартыху", "ipa": "/naːrtəxʷ/", "literalMeaning": "mısır", "conceptId": "MAIZE"},
  {"form": "ху", "ipa": "/xʷə/", "literalMeaning": "akdarı", "conceptId": "MILLET"},
  {"form": "джэш", "ipa": "/dʒaʃ/", "literalMeaning": "fasulye", "conceptId": "BEANS"},
  {"form": "хьэлыгъу", "ipa": "/ħaləʁʷ/", "literalMeaning": "çörek", "conceptId": "SWEET_BREAD"},
  {"form": "хьэлыуэ", "ipa": "/ħaləwa/", "literalMeaning": "helva", "conceptId": "HALVA"},
  {"form": "чэфэр", "ipa": "/tʃafar/", "literalMeaning": "kefir", "conceptId": "KEFIR"},
  {"form": "фадэ", "ipa": "/faːda/", "literalMeaning": "içecek", "conceptId": "BEVERAGE"}
]

sayac = 0
for yeni in yeni_kelimeler:
    form = yeni["form"]
    if form in mevcut_formlar:
        continue

    # Yeni kayıt
    kayit = {
        "id": f"L-PROMPT-{sayac:05d}",
        "form": form,
        "ipa": yeni["ipa"],
        "literalMeaning": yeni["literalMeaning"],
        "conceptId": yeni["conceptId"],
        "partOfSpeech": "noun",
        "dialectVariants": {"adyghe": form, "kabardian": form},
        "notes": f"PROMPT entegrasyonu ({yeni.get('category', 'genel')})",
        "corpusFrequency": 0,
        "rootIds": [],
        "wordFamilyId": None,
        "derivation": None,
        "dictionaryEvidence": {
            "sourceCount": 0,
            "sources": [],
            "meanings": {"tr": yeni["literalMeaning"], "en": "", "ru": ""}
        }
    }
    lex.append(kayit)
    sayac += 1

print(f"Eklenen yeni kelime: {sayac}")
print(f"Toplam lexemes: {len(lex)}")

# Kaydet
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print("✅ Kaydedildi")
