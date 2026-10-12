import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

yeni = [
    # FLORA - Agaclar
    {"id": "L-PKHEKHUEY2", "form": "пхъэхъуей", "literalMeaning": "kayin agaci", "cat": "Flora"},
    {"id": "L-DESHXUEY2", "form": "дае", "literalMeaning": "ceviz agaci", "cat": "Flora"},
    {"id": "L-DEZHYGEY2", "form": "дежьей", "literalMeaning": "findik agaci", "cat": "Flora"},
    {"id": "L-BZHYXHU2", "form": "бзииху", "literalMeaning": "ihlamur", "cat": "Flora"},
    {"id": "L-PKHEZHABE2", "form": "пхъэжабэ", "literalMeaning": "titrek kavak", "cat": "Flora"},
    {"id": "L-SHEZAYE2", "form": "шезае", "literalMeaning": "akcaagac", "cat": "Flora"},
    # FLORA - Sebzeler
    {"id": "L-KHER2", "form": "кхэр", "literalMeaning": "havuc", "cat": "Flora"},
    {"id": "L-BALYDZHE2", "form": "балыджэ", "literalMeaning": "salgam", "cat": "Flora"},
    {"id": "L-K1ERT1OF2", "form": "кӀэртӀоф", "literalMeaning": "patates", "cat": "Flora"},
    {"id": "L-DEGHUNDE2", "form": "жэгундэ", "literalMeaning": "pancar", "cat": "Flora"},
    {"id": "L-K1EBYSTE2", "form": "къэбыстэ", "literalMeaning": "lahana", "cat": "Flora"},
    {"id": "L-BZHYN2", "form": "бжьын", "literalMeaning": "sogan", "cat": "Flora"},
    {"id": "L-BZHYNYXHU2", "form": "бжьыныху", "literalMeaning": "sarimsak", "cat": "Flora"},
    {"id": "L-DESH2", "form": "деш", "literalMeaning": "bezelye", "cat": "Flora"},
    {"id": "L-NAKHE2", "form": "нащэ", "literalMeaning": "salatalik", "cat": "Flora"},
    {"id": "L-K1EB2", "form": "кӀэб", "literalMeaning": "kabak", "cat": "Flora"},
    # FLORA - Cicekler
    {"id": "L-UDZ GHEGHE", "form": "удз гъэгъа", "literalMeaning": "cicek", "cat": "Flora"},
    {"id": "L-DYGHEGHEZ", "form": "дыгъэгъазэ", "literalMeaning": "aycicegi", "cat": "Flora"},
    {"id": "L-GUASHENABDZE", "form": "гуащэнабдзэ", "literalMeaning": "gul", "cat": "Flora"},
    {"id": "L-BZHYNGHEGHE", "form": "бжьынгъэгъэ", "literalMeaning": "lale", "cat": "Flora"},
    # FLORA - Meyveler
    {"id": "L-MERAK1UE", "form": "мэракӀуэ", "literalMeaning": "cilek", "cat": "Flora"},
    {"id": "L-MAMKUT", "form": "мамкъут", "literalMeaning": "ahududu", "cat": "Flora"},
    {"id": "L-PYRAMYZH", "form": "пырамыжь", "literalMeaning": "yaban mersini", "cat": "Flora"},
    # FLORA - Tahillar
    {"id": "L-GUEDZ2", "form": "гуэдз", "literalMeaning": "bugday", "cat": "Flora"},
    {"id": "L-KHUGU2", "form": "хугу", "literalMeaning": "dari", "cat": "Flora"},
    {"id": "L-KHE2", "form": "хъэ", "literalMeaning": "arpa", "cat": "Flora"},
    {"id": "L-ZANTKHE2", "form": "зэнтхъ", "literalMeaning": "yulaf", "cat": "Flora"},
    # NATURE - Hava
    {"id": "L-WAFE", "form": "уафэ", "literalMeaning": "gokyuzu", "cat": "Nature"},
    {"id": "L-WAFEGHUAGHUE", "form": "уафэгъуагъуэ", "literalMeaning": "gok gurultusu", "cat": "Nature"},
    {"id": "L-WAFEKHUEPSK1", "form": "уафэхъуэпскӀ", "literalMeaning": "simsek", "cat": "Nature"},
    {"id": "L-SHYBLE", "form": "щыблэ", "literalMeaning": "simsek", "cat": "Nature"},
    {"id": "L-WASHX", "form": "уэшх", "literalMeaning": "yagmur", "cat": "Nature"},
    {"id": "L-WAS", "form": "уэс", "literalMeaning": "kar", "cat": "Nature"},
    {"id": "L-WA", "form": "уэ", "literalMeaning": "dolu", "cat": "Nature"},
    {"id": "L-GUALE", "form": "гуэл", "literalMeaning": "gol", "cat": "Nature"},
    # NUMBER - Ek sayilar
    {"id": "L-MIN", "form": "мин", "literalMeaning": "bin", "cat": "Number"},
    {"id": "L-MELUAN", "form": "мелуан", "literalMeaning": "on bin", "cat": "Number"},
    {"id": "L-PSHCH1YK1U", "form": "пщӀыкӀу", "literalMeaning": "on bir", "cat": "Number"},
    {"id": "L-PSHCH1YK1UT1", "form": "пщӀыкӀутӀ", "literalMeaning": "on iki", "cat": "Number"},
    # TIME - Gunler
    {"id": "L-NOBE", "form": "нобэ", "literalMeaning": "bugun", "cat": "Time"},
    {"id": "L-DYGHUASE", "form": "дыгъуасэ", "literalMeaning": "dun", "cat": "Time"},
    {"id": "L-PSHCHEDEY", "form": "пщэдей", "literalMeaning": "yarin", "cat": "Time"},
    {"id": "L-VESEMAKHUE", "form": "вэсэмахуэ", "literalMeaning": "evvelsi gun", "cat": "Time"},
    {"id": "L-NEGHABE", "form": "нэгъабэ", "literalMeaning": "gecen yil", "cat": "Time"},
    # TIME - Mevsimler
    {"id": "L-GHATKHE", "form": "гъатхэ", "literalMeaning": "ilkbahar", "cat": "Time"},
    {"id": "L-GHAMAKHUE", "form": "гъамахуэ", "literalMeaning": "yaz", "cat": "Time"},
    {"id": "L-BZHYH'E2", "form": "бжьыхьэ", "literalMeaning": "sonbahar", "cat": "Time"},
    {"id": "L-SHCHYMAKHUE2", "form": "щӀымахуэ", "literalMeaning": "kis", "cat": "Time"},
    # TIME - Aylar
    {"id": "L-SHCHYSHYLE", "form": "щӀышылэ", "literalMeaning": "ocak", "cat": "Time"},
    {"id": "L-MAZAE", "form": "мазае", "literalMeaning": "subat", "cat": "Time"},
    {"id": "L-GHATKHEPE", "form": "гъатхэпэ", "literalMeaning": "mart", "cat": "Time"},
    {"id": "L-MELYJ", "form": "мэлыжь", "literalMeaning": "nisan", "cat": "Time"},
    {"id": "L-NAKYGHE", "form": "накъыгъэ", "literalMeaning": "mayis", "cat": "Time"},
    {"id": "L-MEKHUAUE2", "form": "мэкъуауэгъуэ", "literalMeaning": "haziran", "cat": "Time"},
    {"id": "L-BADZEUEGHUE", "form": "бадзэуэгъуэ", "literalMeaning": "temmuz", "cat": "Time"},
    {"id": "L-SHYSHCHE1U", "form": "шыщхьэӀу", "literalMeaning": "agustos", "cat": "Time"},
    {"id": "L-FOK1ADE", "form": "фокӀадэ", "literalMeaning": "eylul", "cat": "Time"},
    {"id": "L-1UEGHUE", "form": "Ӏуэгъуэ", "literalMeaning": "ekim", "cat": "Time"},
    {"id": "L-SHCHAK1UEGHUE", "form": "щэкӀуэгъуэ", "literalMeaning": "kasim", "cat": "Time"},
    {"id": "L-DYGHEGHAZE", "form": "дыгъэгъазэ", "literalMeaning": "aralik", "cat": "Time"},
    # TIME - Diger
    {"id": "L-SEKYND", "form": "секунд", "literalMeaning": "saniye", "cat": "Time"},
    {"id": "L-DAKYQE", "form": "дакъикъэ", "literalMeaning": "dakika", "cat": "Time"},
    {"id": "L-SYKHET", "form": "сыхьэт", "literalMeaning": "saat", "cat": "Time"},
    # OCCUPATION
    {"id": "L-BDZEZHEYASHE", "form": "бдзэжьеящэ", "literalMeaning": "balikci", "cat": "Occupation"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = f"WF-{y.pop('cat')}"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: kategori tasnifi."
        lex.append(y)
        eklenen += 1

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Eklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
