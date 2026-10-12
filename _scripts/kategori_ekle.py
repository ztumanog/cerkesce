import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# Kategorilere gore kelimeler
yeni = [
    # ANATOMI
    {"id": "L-KUPXHE", "form": "къупщхьэ", "literalMeaning": "kemik", "cat": "Anatomy"},
    {"id": "L-DZAZHENALHE", "form": "дзажэналъэ", "literalMeaning": "kaburga", "cat": "Anatomy"},
    {"id": "L-1UPE", "form": "Ӏупэ", "literalMeaning": "dudak", "cat": "Anatomy"},
    {"id": "L-NE", "form": "нэ", "literalMeaning": "goz", "cat": "Anatomy"},
    {"id": "L-NAP1E", "form": "напӀэ", "literalMeaning": "goz kapagi", "cat": "Anatomy"},
    {"id": "L-1EPKYLEPK", "form": "Ӏэпкълъэпкъ", "literalMeaning": "vucut", "cat": "Anatomy"},
    {"id": "L-PE2", "form": "пэ", "literalMeaning": "burun", "cat": "Anatomy"},
    {"id": "L-ZHE", "form": "жьэ", "literalMeaning": "agiz", "cat": "Anatomy"},
    {"id": "L-DZE", "form": "дзэ", "literalMeaning": "dis", "cat": "Anatomy"},
    {"id": "L-BZEGU2", "form": "бзэгу", "literalMeaning": "dil (organ)", "cat": "Anatomy"},
    {"id": "L-TKHEK1UME", "form": "тхьэкӀумэ", "literalMeaning": "kulak", "cat": "Anatomy"},
    {"id": "L-PSHCHE", "form": "пщэ", "literalMeaning": "boyun", "cat": "Anatomy"},
    {"id": "L-TEMAK", "form": "тэмакъ", "literalMeaning": "bogaz", "cat": "Anatomy"},
    {"id": "L-NAT1E", "form": "натӀэ", "literalMeaning": "alın", "cat": "Anatomy"},
    {"id": "L-NAPE", "form": "напэ", "literalMeaning": "yuz", "cat": "Anatomy"},
    {"id": "L-NEK1U2", "form": "нэкӀу", "literalMeaning": "yanak", "cat": "Anatomy"},
    {"id": "L-NABDZE", "form": "набдзэ", "literalMeaning": "kas", "cat": "Anatomy"},
    {"id": "L-NEBZHYTS", "form": "нэбжьыц", "literalMeaning": "kirpik", "cat": "Anatomy"},
    {"id": "L-DAME2", "form": "дамэ", "literalMeaning": "omuz", "cat": "Anatomy"},
    {"id": "L-NYBE", "form": "ныбэ", "literalMeaning": "karin", "cat": "Anatomy"},
    {"id": "L-BGY", "form": "бгы", "literalMeaning": "bel", "cat": "Anatomy"},
    {"id": "L-TKHY", "form": "тхы", "literalMeaning": "omurga", "cat": "Anatomy"},
    {"id": "L-1EBLE", "form": "Ӏэблэ", "literalMeaning": "el", "cat": "Anatomy"},
    {"id": "L-1EPSHHE", "form": "Ӏэпщэ", "literalMeaning": "el bilegi", "cat": "Anatomy"},
    {"id": "L-1EPE", "form": "Ӏэпэ", "literalMeaning": "parmak", "cat": "Anatomy"},
    {"id": "L-1EFRAK1E", "form": "ӀэфракӀэ", "literalMeaning": "dirsek", "cat": "Anatomy"},
    {"id": "L-LHAKUE2", "form": "лъакъуэ", "literalMeaning": "bacak", "cat": "Anatomy"},
    {"id": "L-LHAP1E", "form": "лъапэ", "literalMeaning": "ayak", "cat": "Anatomy"},
    {"id": "L-LHEPXHUAMBE", "form": "лъэпхъуамбэ", "literalMeaning": "ayak parmaklari", "cat": "Anatomy"},
    {"id": "L-LHEDAKHE", "form": "лъэдакъэ", "literalMeaning": "topuk", "cat": "Anatomy"},
    {"id": "L-LHEGUAZHE", "form": "лъэгуажьэ", "literalMeaning": "diz", "cat": "Anatomy"},
    # HAYVANLAR
    {"id": "L-ZHEM", "form": "жэм", "literalMeaning": "inek", "cat": "Animal"},
    {"id": "L-MEL", "form": "мэл", "literalMeaning": "koyun", "cat": "Animal"},
    {"id": "L-KHUE", "form": "кхъуэ", "literalMeaning": "domuz", "cat": "Animal"},
    {"id": "L-SHYD", "form": "шыд", "literalMeaning": "esek", "cat": "Animal"},
    {"id": "L-MYSHE", "form": "мыщэ", "literalMeaning": "ayi", "cat": "Animal"},
    {"id": "L-BADZE", "form": "бадзэ", "literalMeaning": "sinek", "cat": "Animal"},
    {"id": "L-BZHE", "form": "бжьэ", "literalMeaning": "ari", "cat": "Animal"},
    {"id": "L-KHUEBAN", "form": "кхъуэбан", "literalMeaning": "yaban domuzu", "cat": "Animal"},
    {"id": "L-DYGHUZHY", "form": "дыгъужь", "literalMeaning": "kurt", "cat": "Animal"},
    {"id": "L-BADZ", "form": "бадз", "literalMeaning": "sinek", "cat": "Animal"},
    {"id": "L-KHUE2", "form": "кхъуэ", "literalMeaning": "domuz", "cat": "Animal"},
    # RENKLER
    {"id": "L-PLHYZH2", "form": "плъыжь", "literalMeaning": "kirmizi", "cat": "Color"},
    {"id": "L-GHUEZHY2", "form": "гъуэжь", "literalMeaning": "sari", "cat": "Color"},
    {"id": "L-SHHXHU2", "form": "щхъу", "literalMeaning": "mavi", "cat": "Color"},
    {"id": "L-UDZYFE2", "form": "удзыфэ", "literalMeaning": "yesil", "cat": "Color"},
    {"id": "L-MORE", "form": "морэ", "literalMeaning": "kahverengi", "cat": "Color"},
    {"id": "L-GHUABZHE2", "form": "гъуабжэ", "literalMeaning": "gri", "cat": "Color"},
    {"id": "L-KHUZH2", "form": "хужь", "literalMeaning": "beyaz", "cat": "Color"},
    {"id": "L-F1YC1E2", "form": "фӀыцӀэ", "literalMeaning": "siyah", "cat": "Color"},
    # AILE (Husband/Wife family)
    {"id": "L-TKHEMADE", "form": "тхьэмадэ", "literalMeaning": "kocanin babasi", "cat": "Family"},
    {"id": "L-GUASHE2", "form": "гуащэ", "literalMeaning": "kocanin annesi", "cat": "Family"},
    {"id": "L-PSHCHYQHUE", "form": "пщыкъуэ", "literalMeaning": "kocanin kardesi", "cat": "Family"},
    {"id": "L-PSHCHYPHU", "form": "пщыпхъу", "literalMeaning": "kocanin kiz kardesi", "cat": "Family"},
    {"id": "L-SHYQHUADE", "form": "щыкъу адэ", "literalMeaning": "karinin babasi", "cat": "Family"},
    {"id": "L-SHYQHUANE", "form": "щыкъу анэ", "literalMeaning": "karinin annesi", "cat": "Family"},
    {"id": "L-FYZABE", "form": "фызабэ", "literalMeaning": "dul kadin", "cat": "Family"},
    {"id": "L-L1YGHUABE", "form": "лӀыгъуабэ", "literalMeaning": "dul erkek", "cat": "Family"},
    {"id": "L-ZEYNSHE", "form": "зеиншэ", "literalMeaning": "yetim", "cat": "Family"},
    # BITKILER
    {"id": "L-ZHYG", "form": "жыг", "literalMeaning": "agac", "cat": "Flora"},
    {"id": "L-PKHEKHUEY", "form": "пхъэхъуей", "literalMeaning": "kayin agaci", "cat": "Flora"},
    {"id": "L-DESHXUEY", "form": "дешхуей", "literalMeaning": "ceviz agaci", "cat": "Flora"},
    {"id": "L-ZHYGEY", "form": "жыгей", "literalMeaning": "mese agaci", "cat": "Flora"},
    {"id": "L-DEZHYGEY", "form": "дежьей", "literalMeaning": "findik agaci", "cat": "Flora"},
    {"id": "L-PSEY", "form": "псей", "literalMeaning": "cam agaci", "cat": "Flora"},
    {"id": "L-KEDR", "form": "кедр", "literalMeaning": "sedir", "cat": "Flora"},
    {"id": "L-BZHYXHU", "form": "бжьыху", "literalMeaning": "ihlamur", "cat": "Flora"},
    {"id": "L-TSYXHU", "form": "цыху", "literalMeaning": "kavak", "cat": "Flora"},
    {"id": "L-PKHEZHABE", "form": "пхъэжабэ", "literalMeaning": "titrek kavak", "cat": "Flora"},
    {"id": "L-SHEZAYE", "form": "шезае", "literalMeaning": "akcaagac", "cat": "Flora"},
    {"id": "L-KHER", "form": "кхэр", "literalMeaning": "havuc", "cat": "Flora"},
    {"id": "L-BALYDZHE", "form": "балыджэ", "literalMeaning": "salgam", "cat": "Flora"},
    {"id": "L-K1ERT1OF", "form": "кӀэртӀоф", "literalMeaning": "patates", "cat": "Flora"},
    {"id": "L-DEGHUNDE", "form": "дэгундэ", "literalMeaning": "pancar", "cat": "Flora"},
    {"id": "L-K1EBYSTE", "form": "кӀэбыстэ", "literalMeaning": "lahana", "cat": "Flora"},
    {"id": "L-BZHYN", "form": "бжьын", "literalMeaning": "sogan", "cat": "Flora"},
    {"id": "L-BZHYNYXHU", "form": "бжьыныху", "literalMeaning": "sarmsak", "cat": "Flora"},
    {"id": "L-DESH", "form": "деш", "literalMeaning": "bezelye", "cat": "Flora"},
    {"id": "L-NAKHE", "form": "нащэ", "literalMeaning": "salatalik", "cat": "Flora"},
    {"id": "L-K1EB", "form": "кӀэб", "literalMeaning": "kabak", "cat": "Flora"},
    {"id": "L-GUEDZ", "form": "гуэдз", "literalMeaning": "bugday", "cat": "Flora"},
    {"id": "L-KHUGU", "form": "хугу", "literalMeaning": "dari", "cat": "Flora"},
    {"id": "L-KHE", "form": "хъэ", "literalMeaning": "arpa", "cat": "Flora"},
    {"id": "L-ZANTKHE", "form": "зантхъэ", "literalMeaning": "yulaf", "cat": "Flora"},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        y["partOfSpeech"] = "noun"
        y["wordFamilyId"] = f"WF-{y.pop('cat').upper()}"
        y["corpusFrequency"] = 0
        y["notes"] = "C-11.3: kategori tasnifi."
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']} ({y['literalMeaning']})")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
