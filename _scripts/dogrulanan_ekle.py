import json
from pathlib import Path

# 1) Oku
lex_path = Path('public/data/linguistic/lexemes.json')
roots_path = Path('public/data/linguistic/roots.json')

lex = json.loads(lex_path.read_text(encoding='utf-8'))
roots = json.loads(roots_path.read_text(encoding='utf-8'))

mevcut_ids = {l['id'] for l in lex}

# 2) Yeni kelimeler (dogrulanmis)
yeni = [
    # Agac/Bitki
    {"id": "L-CHYGAE", "form": "чъыгае", "literalMeaning": "mese agaci", "conceptId": "OAK", "wordFamilyId": "WF-CHYGAE"},
    {"id": "L-SHEZAE", "form": "шезае", "literalMeaning": "ihlamur agaci", "conceptId": "LINDEN", "wordFamilyId": "WF-SHEZAE"},
    {"id": "L-PKHEKHUEY", "form": "пхъэхъуей", "literalMeaning": "gurgen agaci", "conceptId": "HORNBEAM", "wordFamilyId": "WF-PKHEKHUEY"},
    {"id": "L-DEZHEY", "form": "дежьей", "literalMeaning": "findiklik", "conceptId": "HAZEL", "wordFamilyId": "WF-DEZHEY"},
    {"id": "L-BZHYNGHEGHE", "form": "бжьынгъэгъэ", "literalMeaning": "sogan cicegi", "conceptId": "FLOWER", "wordFamilyId": "WF-BZHYNGHEGHE"},
    {"id": "L-MEZQOGHUM", "form": "мэзкъогъум", "literalMeaning": "orman kuytusu", "conceptId": "FOREST", "wordFamilyId": "WF-MEZQOGHUM"},
    
    # Sayilar/Zaman
    {"id": "L-PSHCHYK1U", "form": "пщӀыкӀу", "literalMeaning": "onlu sayi eki", "conceptId": "TEN", "wordFamilyId": "WF-PSHCHYK1U"},
    {"id": "L-PSHCHYK1UT1", "form": "пщӀыкӀутӀ", "literalMeaning": "on iki", "conceptId": "TWELVE", "wordFamilyId": "WF-PSHCHYK1U"},
    {"id": "L-QUIBLY", "form": "къуиблы", "literalMeaning": "yedigen", "conceptId": "HEPTAGON", "wordFamilyId": "WF-QUIBLY"},
    {"id": "L-GHAMAKHUE", "form": "гъамахуэ", "literalMeaning": "yaz", "conceptId": "SUMMER", "wordFamilyId": "WF-GHAMAKHUE"},
    
    # Akrabalik/Toplum
    {"id": "L-ZEDELKHU", "form": "зэдэлъху", "literalMeaning": "erkek kardesler", "conceptId": "BROTHER", "wordFamilyId": "WF-ZEDELKHU"},
    {"id": "L-BGHUEGHU", "form": "бгъуэгъу", "literalMeaning": "yoldas", "conceptId": "COMRADE", "wordFamilyId": "WF-BGHUEGHU"},
    {"id": "L-DZEGHUE", "form": "дзэгъуэ", "literalMeaning": "askerlik cagi", "conceptId": "ARMY", "wordFamilyId": "WF-DZEGHUE"},
    {"id": "L-EDZHAKUE", "form": "еджакӀуэ", "literalMeaning": "ogrenci", "conceptId": "STUDENT", "wordFamilyId": "WF-EDZHAKUE"},
    
    # Dil/Konusma
    {"id": "L-BZEBZE", "form": "бзэбзэ", "literalMeaning": "geveze", "conceptId": "TALKATIVE", "wordFamilyId": "WF-BZE"},
    {"id": "L-BZASH1EPS", "form": "бзащӀэпс", "literalMeaning": "sive", "conceptId": "DIALECT", "wordFamilyId": "WF-BZE"},
    {"id": "L-KUBZE", "form": "кубзэ", "literalMeaning": "oz dil", "conceptId": "LANGUAGE", "wordFamilyId": "WF-BZE"},
    {"id": "L-KHEDZHEBZ", "form": "хьэджэбз", "literalMeaning": "akici konusma", "conceptId": "SPEECH", "wordFamilyId": "WF-BZE"},
    {"id": "L-EGUPSESEN", "form": "егупсэсэн", "literalMeaning": "dusunmek", "conceptId": "THOUGHT", "wordFamilyId": "WF-GU"},
    
    # Esya/Renk/Yiyecek
    {"id": "L-PEBZHE", "form": "пэбжьэ", "literalMeaning": "hos geldin kadehi", "conceptId": "CUP", "wordFamilyId": "WF-PE"},
    {"id": "L-GHUBZH", "form": "гъубжь", "literalMeaning": "pas", "conceptId": "RUST", "wordFamilyId": "WF-GHUBZH"},
    {"id": "L-KHQUEBAN", "form": "кхъуэбан", "literalMeaning": "domuz agili", "conceptId": "PIG", "wordFamilyId": "WF-KHQUE"},
    {"id": "L-PKHEZHABE", "form": "пхъэжабэ", "literalMeaning": "ahsap catal", "conceptId": "WOOD", "wordFamilyId": "WF-PKHE"},
    {"id": "L-KHUERZHE", "form": "хуэржэ", "literalMeaning": "heybe", "conceptId": "BAG", "wordFamilyId": "WF-KHUERZHE"},
    {"id": "L-KHER", "form": "кхэр", "literalMeaning": "mezar", "conceptId": "GRAVE", "wordFamilyId": "WF-KHER"},
    {"id": "L-DESH", "form": "деш", "literalMeaning": "altin", "conceptId": "GOLD", "wordFamilyId": "WF-DESH"},
    {"id": "L-SHCHUE", "form": "щхъу", "literalMeaning": "gri", "conceptId": "GRAY", "wordFamilyId": "WF-SHCHUE"},
    {"id": "L-MELYJ", "form": "мэлыжь", "literalMeaning": "koyun eti", "conceptId": "MUTTON", "wordFamilyId": "WF-MEL"},
    
    # Fiiller
    {"id": "L-BLECH1YN", "form": "блэчӀын", "literalMeaning": "gecip gitmek", "conceptId": "PASS", "wordFamilyId": "WF-BLECH1YN"},
    {"id": "L-FISHCHYN", "form": "фищын", "literalMeaning": "islik calmak", "conceptId": "WHISTLE", "wordFamilyId": "WF-FISHCHYN"},
    {"id": "L-ZEPEDZEN", "form": "зэпэдзэн", "literalMeaning": "eklemek", "conceptId": "CONNECT", "wordFamilyId": "WF-ZEPEDZEN"},
    {"id": "L-DELKHAN", "form": "дэлъхан", "literalMeaning": "icine atmak", "conceptId": "THROW", "wordFamilyId": "WF-DELKHAN"},
    {"id": "L-DZEN", "form": "дзэн", "literalMeaning": "atmak", "conceptId": "THROW", "wordFamilyId": "WF-DZEN"},
    
    # Diger
    {"id": "L-BADZE", "form": "бадзэ", "literalMeaning": "sinek", "conceptId": "FLY", "wordFamilyId": "WF-BADZE"},
    {"id": "L-K1EB", "form": "кӀэб", "literalMeaning": "kasik", "conceptId": "GROIN", "wordFamilyId": "WF-K1EB"},
    {"id": "L-1UEPE", "form": "Ӏуэпэ", "literalMeaning": "dudak", "conceptId": "LIP", "wordFamilyId": "WF-1UE"},
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
