import sys
sys.stdout.reconfigure(encoding="utf-8")
from datasets import load_dataset

ds = load_dataset("adiga-ai/circassian-parallel-corpus", verification_mode="no_checks")
all_text = []
for split in ds:
    for row in ds[split]:
        for col in row:
            if isinstance(row[col], str):
                all_text.append(row[col])
corpus = " ".join(all_text)

def normalize(s):
    return (s.replace("Ӏ", "ӏ").replace("ӏ", "ӏ").lower())

corpus_norm = normalize(corpus)

formlar = ["къупщхьэ", "дзажэналъэ", "Ӏупэ", "нэ", "напӀэ", "Ӏэпкълъэпкъ",
           "пэ", "жьэ", "дзэ", "бзэгу", "тхьэкӀумэ", "пщэ", "тэмакъ",
           "натӀэ", "напэ", "нэкӀу", "набдзэ", "нэбжьыц",
           "дамэ", "ныбэ", "бгы", "тхы", "Ӏэблэ", "Ӏэпщэ", "Ӏэпэ",
           "ӀэфракӀэ", "лъакъуэ", "лъапэ", "лъэпхъуамбэ", "лъэдакъэ", "лъэгуажьэ",
           "жэм", "мэл", "кхъуэ", "шыд", "мыщэ", "бадзэ", "бжьэ",
           "дыгъужь", "плъыжь", "гъуэжь", "щхъу", "удзыфэ", "морэ",
           "гъуабжэ", "хужь", "фӀыцӀэ", "тхьэмадэ", "гуащэ", "пщыкъуэ",
           "пщыпхъу", "щыкъу адэ", "щыкъу анэ", "фызабэ", "лӀыгъуабэ",
           "зеиншэ", "жыг", "пхъэхъуей", "дешхуей", "жыгей", "дежьей",
           "псей", "кедр", "бжьыху", "цыху", "пхъэжабэ", "шезае",
           "кхэр", "балыджэ", "кӀэртӀоф", "дэгундэ", "кӀэбыстэ",
           "бжьын", "бжьыныху", "деш", "нащэ", "кӀэб", "гуэдз",
           "хугу", "хъэ", "зантхъэ"]

print("=== KORPUS TARAMASI ===")
sonuc = []
for form in formlar:
    count = corpus_norm.count(normalize(form))
    sonuc.append((form, count))
    if count > 0:
        print(f"{form:20s}: {count}")

sifir = [f for f, c in sonuc if c == 0]
print(f"\n=== SIFIR OLANLAR ({len(sifir)}) ===")
for f in sifir:
    print(f"  {f}")
