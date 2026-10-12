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

# Varyantlarla birlikte tara
formlar = {
    "гущӏуагъо": ["гущӏуагъо", "гущыӏуагъо", "гуфӏэгъу"],
    "нэбжьыцылэ": ["нэбжьыцылэ", "нэбжьыц", "цылэ"],
    "Ӏэбзыгъэ": ["Ӏэбзыгъэ", "Ӏэбзэ"],
    "къуапэтхуимэ": ["къуапэтхуимэ", "къуапэтху"],
    "къуапэхимэ": ["къуапэхимэ", "къуапэх"],
    "къуапэзадэ": ["къуапэзадэ", "къуапэзад"],
    "къуапэпапцӀэ": ["къуапэпапцӀэ", "къуапэпапцӏ"],
    "къуапэпагуэ": ["къуапэпагуэ", "къуапэпаг"],
    "анэ къуэш": ["анэ къуэш", "анэкъуэш"],
    "унэрыхьэ-унэрыкӏыу": ["унэрыхьэ-унэрыкӏыу", "унэрыхьэ", "унэрыкӏыу"],
    "тышыпхъу": ["тышыпхъу", "тышыпхъу"],
    "нышыпхъу": ["нышыпхъу", "нышыпхъу"],
    "мэзкъогъум": ["мэзкъогъум", "мэзкъогъу", "къогъум"],
    "мэзлъапэ": ["мэзлъапэ", "мэз лъапэ"],
    "лэжьак1уэ": ["лэжьак1уэ", "лэжьакӏуэ", "лэжьапӏэ"],
    "бзащӀэпс": ["бзащӀэпс", "бзащӏэпс", "щабзэпс"],
    "псыудз": ["псыудз", "псы удз"],
    "мэкъуогъу": ["мэкъуогъу", "мэкъуауэгъуэ", "мэкъу"],
}

print("=== VARYANT TARAMASI ===")
for ana, varyantlar in formlar.items():
    print(f"\n{ana}:")
    for v in varyantlar:
        count = corpus_norm.count(normalize(v))
        if count > 0:
            print(f"  {v:25s}: {count}")
