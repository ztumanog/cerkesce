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

formlar = ["пхъэхъуей", "дае", "дежьей", "бзииху", "пхъэжабэ", "шезае",
           "кхэр", "балыджэ", "кӀэртӀоф", "жэгундэ", "къэбыстэ", "бжьын",
           "бжьыныху", "деш", "нащэ", "кӀэб", "удз гъэгъа", "дыгъэгъазэ",
           "гуащэнабдзэ", "бжьынгъэгъэ", "мэракӀуэ", "мамкъут", "пырамыжь",
           "гуэдз", "хугу", "хъэ", "зэнтхъ",
           "уафэ", "уафэгъуагъуэ", "уафэхъуэпскӀ", "щыблэ", "уэшх", "уэс", "уэ", "гуэл",
           "мин", "мелуан", "пщӀыкӀу", "пщӀыкӀутӀ",
           "нобэ", "дыгъуасэ", "пщэдей", "вэсэмахуэ", "нэгъабэ",
           "гъатхэ", "гъамахуэ", "бжьыхьэ", "щӀымахуэ",
           "щӀышылэ", "мазае", "гъатхэпэ", "мэлыжь", "накъыгъэ", "мэкъуауэгъуэ",
           "бадзэуэгъуэ", "шыщхьэӀу", "фокӀадэ", "Ӏуэгъуэ", "щэкӀуэгъуэ", "дыгъэгъазэ",
           "секунд", "дакъикъэ", "сыхьэт", "бдзэжьеящэ"]

print("=== KORPUS TARAMASI ===")
for form in formlar:
    count = corpus_norm.count(normalize(form))
    if count > 0:
        print(f"{form:25s}: {count}")
