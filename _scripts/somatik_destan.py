import json
from pathlib import Path

lex_path = Path('public/data/linguistic/lexemes.json')
lex = json.loads(lex_path.read_text(encoding='utf-8'))
mevcut_ids = {l['id'] for l in lex}

yeni = [
    # Somatik
    {"id": "L-BZEGU", "form": "бзэгу", "literalMeaning": "dil (organ)", "conceptId": "TONGUE", "wordFamilyId": "WF-BZE", "partOfSpeech": "noun"},
    {"id": "L-MAF1EGU", "form": "мафIэгу", "literalMeaning": "tren", "conceptId": "TRAIN", "wordFamilyId": "WF-MAF1E", "partOfSpeech": "noun"},
    {"id": "L-GUZHEY", "form": "гужьей", "literalMeaning": "panik", "conceptId": "ANXIETY", "wordFamilyId": "WF-GU", "partOfSpeech": "noun"},
    {"id": "L-GUMYGHUE", "form": "гумыгъуэ", "literalMeaning": "sefkatli", "conceptId": "COMPASSION", "wordFamilyId": "WF-GU", "partOfSpeech": "adjective"},
    {"id": "L-GUETYNEGHE", "form": "гуэтыныгъэ", "literalMeaning": "sadakat", "conceptId": "LOYALTY", "wordFamilyId": "WF-GU", "partOfSpeech": "noun"},
    {"id": "L-NAF", "form": "наф", "literalMeaning": "kor", "conceptId": "BLINDNESS", "wordFamilyId": "WF-NE", "partOfSpeech": "adjective"},
    {"id": "L-NAPS", "form": "напс", "literalMeaning": "gozyasi", "conceptId": "TEAR", "wordFamilyId": "WF-NE", "partOfSpeech": "noun"},
    {"id": "L-NAF1", "form": "нафI", "literalMeaning": "iyilik", "conceptId": "GOODNESS", "wordFamilyId": "WF-NE", "partOfSpeech": "noun"},
    {"id": "L-NEGU", "form": "нэгу", "literalMeaning": "yuz, cehre", "conceptId": "FACE", "wordFamilyId": "WF-NE", "partOfSpeech": "noun"},
    {"id": "L-NASHE", "form": "нашэ", "literalMeaning": "sasi", "conceptId": "SQUINT", "wordFamilyId": "WF-NE", "partOfSpeech": "adjective"},
    {"id": "L-1EPE", "form": "Iэпэ", "literalMeaning": "parmak", "conceptId": "FINGER", "wordFamilyId": "WF-1E", "partOfSpeech": "noun"},
    {"id": "L-1EGU", "form": "Iэгу", "literalMeaning": "avuc ici", "conceptId": "PALM", "wordFamilyId": "WF-1E", "partOfSpeech": "noun"},
    {"id": "L-1ERYTX", "form": "Iэрытх", "literalMeaning": "el yazmasi", "conceptId": "MANUSCRIPT", "wordFamilyId": "WF-1E", "partOfSpeech": "noun"},
    {"id": "L-LHEGU", "form": "лъэгу", "literalMeaning": "ayak tabani", "conceptId": "SOLE", "wordFamilyId": "WF-LHE", "partOfSpeech": "noun"},
    {"id": "L-LHEPS", "form": "лъэпс", "literalMeaning": "ayakkabi bagi", "conceptId": "SHOE", "wordFamilyId": "WF-LHE", "partOfSpeech": "noun"},
    {"id": "L-LHEBAKUE", "form": "лъэбакъуэ", "literalMeaning": "adim", "conceptId": "STEP", "wordFamilyId": "WF-LHE", "partOfSpeech": "noun"},
    {"id": "L-SHHYEGU", "form": "щхьэгу", "literalMeaning": "tepe, zirve", "conceptId": "TOP", "wordFamilyId": "WF-SHHYE", "partOfSpeech": "noun"},
    {"id": "L-SHHYEPS", "form": "щхьэпс", "literalMeaning": "kalin ip", "conceptId": "BINDING", "wordFamilyId": "WF-SHHYE", "partOfSpeech": "noun"},
    {"id": "L-SHHYEUSYGHE", "form": "щхьэусыгъуэ", "literalMeaning": "gerekce, sebep", "conceptId": "REASON", "wordFamilyId": "WF-SHHYE", "partOfSpeech": "noun"},
    {"id": "L-TKHEK1UMECH1YH", "form": "тхьэкIумэчIыхь", "literalMeaning": "tavsan", "conceptId": "RABBIT", "wordFamilyId": "WF-TKHEK1UME", "partOfSpeech": "noun"},
    {"id": "L-DYGHUZH", "form": "дыгъужь", "literalMeaning": "kurt", "conceptId": "WOLF", "wordFamilyId": "WF-DYGHU", "partOfSpeech": "noun"},
    {"id": "L-SH1YDAGHE", "form": "щIыдагъэ", "literalMeaning": "petrol", "conceptId": "PETROLEUM", "wordFamilyId": "WF-SH1Y", "partOfSpeech": "noun"},
    {"id": "L-KHYQ", "form": "хыкъа", "literalMeaning": "yunus", "conceptId": "DOLPHIN", "wordFamilyId": "WF-KHY", "partOfSpeech": "noun"},
    {"id": "L-FOSHYGHU", "form": "фошыгъу", "literalMeaning": "seker", "conceptId": "SUGAR", "wordFamilyId": "WF-FO", "partOfSpeech": "noun"},
    {"id": "L-MEZCHET", "form": "мэзчэт", "literalMeaning": "sulun", "conceptId": "PHEASANT", "wordFamilyId": "WF-MEZ", "partOfSpeech": "noun"},
    
    # Genel
    {"id": "L-QEGHELAK1UE", "form": "къегъэлакIуэ", "literalMeaning": "kurtarici", "conceptId": "SAVIOR", "wordFamilyId": "WF-QEGHE", "partOfSpeech": "noun"},
    {"id": "L-U1EGHESHCH", "form": "уIэгъэщ", "literalMeaning": "hastane", "conceptId": "HOSPITAL", "wordFamilyId": "WF-U1E", "partOfSpeech": "noun"},
    {"id": "L-GHUEGUGHELHAGHU", "form": "гъуэгугъэлъагъуэ", "literalMeaning": "rehber", "conceptId": "GUIDE", "wordFamilyId": "WF-GHUEGU", "partOfSpeech": "noun"},
    {"id": "L-ADAGHE", "form": "адагъэ", "literalMeaning": "babalik", "conceptId": "FATHERHOOD", "wordFamilyId": "WF-ADE", "partOfSpeech": "noun"},
    {"id": "L-ANAGHE", "form": "анагъэ", "literalMeaning": "annelik", "conceptId": "MOTHERHOOD", "wordFamilyId": "WF-ANE", "partOfSpeech": "noun"},
    
    # Destan
    {"id": "L-BLANE", "form": "бланэ", "literalMeaning": "disi geyik", "conceptId": "DEER", "wordFamilyId": "WF-BLANE", "partOfSpeech": "noun"},
    {"id": "L-DZHATE", "form": "джатэ", "literalMeaning": "kilic", "conceptId": "SWORD", "wordFamilyId": "WF-DZHATE", "partOfSpeech": "noun"},
    {"id": "L-DE2", "form": "дэ", "literalMeaning": "ceviz", "conceptId": "WALNUT", "wordFamilyId": "WF-DE", "partOfSpeech": "noun"},
    {"id": "L-FARA", "form": "фара", "literalMeaning": "soylu at", "conceptId": "HORSE", "wordFamilyId": "WF-FARA", "partOfSpeech": "noun"},
    {"id": "L-GHUNE", "form": "гьунэ", "literalMeaning": "sinir, hudut", "conceptId": "BORDER", "wordFamilyId": "WF-GHUNE", "partOfSpeech": "noun"},
    {"id": "L-KHASE", "form": "хъасэ", "literalMeaning": "simsir", "conceptId": "LINDEN", "wordFamilyId": "WF-KHASE", "partOfSpeech": "noun"},
    {"id": "L-DAKHE", "form": "дахэ", "literalMeaning": "guzel", "conceptId": "BEAUTY", "wordFamilyId": "WF-DAKHE", "partOfSpeech": "adjective"},
    {"id": "L-SHKO", "form": "шъо", "literalMeaning": "deri, cilt", "conceptId": "SKIN", "wordFamilyId": "WF-SHKO", "partOfSpeech": "noun"},
    {"id": "L-SHKAM", "form": "шкам", "literalMeaning": "bank, sira", "conceptId": "BANK", "wordFamilyId": "WF-SHKAM", "partOfSpeech": "noun"},
]

eklenen = 0
for y in yeni:
    if y['id'] not in mevcut_ids:
        y['notes'] = 'Somatik/destan kaynagi'
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")
    else:
        print(f"Zaten var: {y['id']} - {y['form']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"\nEklenen: {eklenen}")
print(f"Toplam lexeme: {len(lex)}")
