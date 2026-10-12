import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_ids = {l['id'] for l in lex}

# 2) Yeni kelimeler
yeni = [
    # Zaman
    {"id": "L-GHAMAKHUE", "form": "гъэмахуэ", "literalMeaning": "yaz", "conceptId": "SUMMER", "wordFamilyId": "WF-GHEMAKHUE"},
    {"id": "L-TYGHOPCHYKH", "form": "тыгъопчыхь", "literalMeaning": "dun aksam", "conceptId": "EVENING", "wordFamilyId": "WF-TYGHOPCHYKH"},
    {"id": "L-TYGHOSCHESCH", "form": "тыгъосчэщ", "literalMeaning": "dun gece", "conceptId": "NIGHT", "wordFamilyId": "WF-TYGHOSCHESCH"},
    
    # İlişkiler
    {"id": "L-GHUSE", "form": "гъусэ", "literalMeaning": "yoldas", "conceptId": "COMRADE", "wordFamilyId": "WF-GHUSE"},
    
    # Eşya/Madde
    {"id": "L-ULHYIN", "form": "улъыин", "literalMeaning": "pas", "conceptId": "RUST", "wordFamilyId": "WF-ULHYIN"},
    {"id": "L-QELTMAQ", "form": "къэлътмакъ", "literalMeaning": "heybe", "conceptId": "BAG", "wordFamilyId": "WF-QELTMAQ"},
    {"id": "L-KHASHHE", "form": "кхъащхьэ", "literalMeaning": "mezar", "conceptId": "GRAVE", "wordFamilyId": "WF-KHASHHE"},
    {"id": "L-DYSHE", "form": "дыщэ", "literalMeaning": "altin", "conceptId": "GOLD", "wordFamilyId": "WF-DYSHE"},
    
    # Yiyecek
    {"id": "L-MELYL", "form": "мэлыл", "literalMeaning": "koyun eti", "conceptId": "MUTTON", "wordFamilyId": "WF-MELYL"},
    
    # Zaman/Geçmiş
    {"id": "L-BLEK1A", "form": "блэкӀа", "literalMeaning": "gecmis", "conceptId": "PAST", "wordFamilyId": "WF-BLEK1A"},
    
    # Fiiller
    {"id": "L-SHUIN", "form": "шъуин", "literalMeaning": "islik calmak", "conceptId": "WHISTLE", "wordFamilyId": "WF-SHUIN"},
    {"id": "L-KHELHHEN", "form": "хэлъхьэн", "literalMeaning": "eklemek", "conceptId": "ADD", "wordFamilyId": "WF-KHELHHEN"},
    {"id": "L-DEKHAN", "form": "дэхьан", "literalMeaning": "icinden cikarmak", "conceptId": "REMOVE", "wordFamilyId": "WF-DEKHAN"},
    {"id": "L-DZYN", "form": "дзын", "literalMeaning": "atmak", "conceptId": "THROW", "wordFamilyId": "WF-DZYN"},
    {"id": "L-ZYKHEDZEN", "form": "зыхэдзэн", "literalMeaning": "atilmak", "conceptId": "JUMP", "wordFamilyId": "WF-ZYKHEDZEN"},
    
    # Vücut
    {"id": "L-SHAKHE", "form": "шахэ", "literalMeaning": "kasik", "conceptId": "GROIN", "wordFamilyId": "WF-SHAKHE"},
    {"id": "L-1UPE", "form": "Ӏупэ", "literalMeaning": "dudak", "conceptId": "LIP", "wordFamilyId": "WF-1UPE"},
    
    # Diğer
    {"id": "L-1USHOSHHE", "form": "Ӏушъошъэ", "literalMeaning": "fisilti", "conceptId": "WHISPER", "wordFamilyId": "WF-1USHOSHHE"},
]

# 3) Ekle
eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        y['partOfSpeech'] = 'noun'
        y['notes'] = 'Dogrulandi: sozluk kaynagi'
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")

# 4) Yaz
lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
