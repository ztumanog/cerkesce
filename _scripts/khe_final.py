import json
from pathlib import Path

LEX = Path("public/data/linguistic/lexemes.json")
lex = json.loads(LEX.read_text(encoding="utf-8"))

def normalize(text):
    if not text:
        return ""
    for c in ['\u04cf', '\u04c0', '\u0406', '\u0456']:
        text = text.replace(c, '\u04e0')
    text = text.replace('I', '\u04e0').replace('l', '\u04e0').replace('1', '\u04e0')
    return text.strip()

# Mimar'ın 205 kaydı (CSV formatı)
CSV_VERI = """
хьэбзыпэ,QUANTITY,PART,Nicelik/Parça
хьэблэм,LOCATION,NEIGHBORHOOD,Yer/Yerleşim
хьэбэсабэу,CONDITION,DESTRUCTION,Durum/Bozulma
хьэгъуэлӏыгъуэм,SOCIAL,EVENT,Sosyal/Gelenek
хьэгъуэлӏыгъуэр,SOCIAL,EVENT,Sosyal/Gelenek
хьэгъуэхугъуэ,SOCIAL,COOPERATION,Sosyal/Yardımlaşma
хьэдагъэкӀэ,RITUAL,FUNERAL,Ölüm/Cenaze
хьэдрыхэегъу,RELIGION,AFTERLIFE,İnanç/Ahiret
хьэдэгъудахэ,MORTALITY,DEATH,Ölüm/Kader
хьэдэлъэмыж,RELIGION,AFTERLIFE,İnanç/Ahiret
хьэдэм,MORTALITY,CORPSE,Ölüm/Cenaze
хьэдэр,MORTALITY,CORPSE,Ölüm/Cenaze
хьэдэтемыхьэ,RITUAL,FUNERAL,Ölüm/Cenaze
хьэдэхэр,MORTALITY,CORPSE,Ölüm/Cenaze
хьэдэӀус,RITUAL,FUNERAL,Sosyal/Gelenek
хьэжмэстафэ,PERSON,NAME,Kişi/Özel İsim
хьэжрэт,RELIGION,MIGRATION,İnanç/Tarih
хьэжы-мурат,PERSON,NAME,Kişi/Özel İsim
хьэжы-муратрэ,PERSON,NAME,Kişi/Özel İsim
хьэжыгъэр,FOOD,FLOUR,Yiyecek/Tahıl
хьэжыныгъэ,ACTION,MILLING,Üretim/Değirmen
хьэжыцей,LOCATION,SETTLEMENT,Yer/Yerleşim
хьэжьажьэ,SUBSTANCE,ASH,Doğa/Madde
хьэжьвакъэжьышх,PERSON,CHARACTER,Kişilik/Durum
хьэжькурий,NATURE,WEATHER,Doğa/Hava
хьэжьпэжь,PERSON,CHARACTER,Kişilik/Durum
хьэжьэрэжьэн,ACTION,BURNING,Durum/Eylem
хьэжэбажафэ,CLOTHING,FUR,Giyim/Kürk
хьэжэбажащэ,PROFESSION,TRADER,Meslek/Ticaret
хьэжэпхъажагъ,MORALITY,TRAIT,Karakter/Ahlak
хьэжэпхъажэ,CHARACTER,TRAIT,Karakter/Kişilik
хьэжэпхъэжэн,ACTION,BEHAVIOR,Karakter/Eylem
хьэзабу,EMOTION,SUFFERING,Acı/Izdırap
хьэзабым,EMOTION,SUFFERING,Acı/Izdırap
хьэзабыр,EMOTION,SUFFERING,Acı/Izdırap
хьэзешэ,PROFESSION,HANDLERS,Meslek/Hayvan
хьэзырт,CONDITION,PREPARATION,Durum/Hazırlık
хьэзырщ,CONDITION,PREPARATION,Durum/Hazırlık
хьэзырыбгъэ,CLOTHING,ATTIRE,Giyim/Kıyafet
хьэзырын,ACTION,PREPARATION,Durum/Eylem
хьэзырыпс,ACCESSORY,JEWELRY,Aksesuar/Takı
хьэзырыпсу,ACCESSORY,JEWELRY,Aksesuar/Takı
хьэзырӀупэ,OBJECT,WEAPON_PART,Nesne/Silah
хьэиху-бжэхуэщӀ,CHARACTER,DILIGENT,Karakter/Beceri
хьэкугъэплъ,PROFESSION,WORKER,Meslek/Çalışma
хьэкумхэр,OBJECT,HEATER,Nesne/Ev
хьэкумым,OBJECT,HEATER,Nesne/Ev
хьэкумыр,OBJECT,HEATER,Nesne/Ev
хьэкумыщӀэ,PROFESSION,BUILDER,Meslek/Zanaat
хьэкущӀэ,LOCATION,PART,Yapı/Bölüm
хьэкътын,ACTION,JUSTICE,Hak/Ahlak
хьэкъущыкъур,OBJECT,UTENSIL,Nesne/Mutfak
хьэкъуэн,ACTION,SOUND,Doğa/Ses
хьэкъыр,ETHICS,JUSTICE,Hak/Ahlak
хьэкъыу,TRUTH,ADVERB,Durum/Gerçeklik
хьэкӀэлъыкӀэ,SOCIAL,HOSPITALITY,Sosyal/Gelenek
хьэкӀэпыч,BEHAVIOR,FLATTERY,Karakter/Tavır
хьэкӀэтеуэ,ACTION,ATTACK,Doğa/Eylem
хьэкӀэхукӀэ,OBJECT,TRASH,Nesne/Toplama
хьэкӏэ-къокӏэжъым,ANIMAL,WILD,Canlı/Hayvan
хьэкӏэ-къуакӏэхэм,ANIMAL,WILD,Canlı/Hayvan
хьэкӏэкхъуэкӏагъэ,CHARACTER,WILDNESS,Doğa/Karakter
хьэкӏэкхъуэкӏэм,ANIMAL,WILD,Canlı/Hayvan
хьэкӏэкхъуэкӏэмрэ,ANIMAL,WILD,Canlı/Hayvan
хьэкӏэкхъуэкӏэр,ANIMAL,WILD,Canlı/Hayvan
хьэкӏэкхъуэкӏэхэм,ANIMAL,WILD,Canlı/Hayvan
хьэл-щэн,CHARACTER,TEMPERAMENT,Karakter/Mizaç
хьэл-щэныр,CHARACTER,TEMPERAMENT,Karakter/Mizaç
хьэлокӏуэ,ACTION,MOVEMENT,Durum/Eylem
хьэлу,FOOD,BREAD,Yiyecek/Ekmek
хьэлъагъым,MEASURE,WEIGHT,Ağırlık/Ölçü
хьэлъагъэ,MEASURE,WEIGHT,Ağırlık/Ölçü
хьэлъкъ,PEOPLE,COMMUNITY,Toplum/Halk
хьэлъэ-хьэлъэу,MANNER,SPEED,Durum/Tarz
хьэлъэзехьэ,PROFESSION,CARRIER,Meslek/Taşıma
хьэлъэзешэ,TRANSPORT,VEHICLE,Taşıma/Lojistik
хьэлъэм,MEASURE,WEIGHT,Ağırlık/Ölçü
хьэлъэр,MEASURE,WEIGHT,Ağırlık/Ölçü
хьэлъэу,MANNER,WEIGHT,Durum/Ağırlık
хьэлъэхулъэ,OBJECT,LUGGAGE,Nesne/Eşya
хьэлъэхэр,MEASURE,WEIGHT,Ağırlık/Ölçü
хьэлъэщ,CONDITION,WEIGHT,Durum/Ağırlık
хьэлывэдэлъхьэ,FOOD,INGREDIENT,Yiyecek/Hamur
хьэлыгъу,FOOD,BREAD,Yiyecek/Ekmek
хьэлыгъуанэ,FOOD,BREAD,Yiyecek/Ekmek
хьэлым,CHARACTER,TRAIT,Karakter/Mizaç
хьэлыншэ,CHARACTER,BAD_TRAIT,Karakter/Mizaç
хьэлыншэн,ACTION,BEHAVIOR,Karakter/Eylem
хьэлыншэу,MANNER,BEHAVIOR,Karakter/Tavır
хьэлыр,CHARACTER,TEMPERAMENT,Karakter/Mizaç
хьэлэ-балыкъ,DISORDER,CHAOS,Felaket/Kargaşa
хьэлэбэлыкъыншагъэ,EMOTION,PEACE,Barış/Huzur
хьэлэбэлыкъыншэу,MANNER,PEACE,Barış/Huzur
хьэлэжьей,FOOD,SWEET,Yiyecek/Tatlı
хьэлэл,RELIGION,HALAL,İnanç/Ahlak
хьэлэлагъ,MORALITY,KINDNESS,Ahlak/Kişilik
хьэлэлу,MORALITY,KINDNESS,Ahlak/Kişilik
хьэлэлщ,RELIGION,HALAL,İnanç/Ahlak
хьэлэлыгъэ,MORALITY,KINDNESS,Ahlak/Kişilik
хьэлэлын,ACTION,RECONCILIATION,Ahlak/Eylem
хьэлэмэтлажьэ,ACTION,WORK,Durum/Çalışma
хьэлэмэту,MANNER,WONDER,Durum/Tarz
хьэлэмэтыщэ,CONDITION,INTEREST,İlgi/Merak
хьэлэчу,DEGREE,INTENSITY,Nicelik/Derece
хьэлӀамэцӀыртӀ,FOOD,DISH,Yiyecek/Yemek
хьэмаскӀэ,PLANT,HUSK,Tarım/Tahıl
хьэмбылу,BODY,SHAPE,Anatomi/Beden
хьэмид,PERSON,NAME,Kişi/Özel İsim
хьэмкӀутӀей,LOCATION,FARM,Çiftlik/Tarım
хьэмкӀэгу,LOCATION,FARM,Çiftlik/Tarım
хьэмкӀэу,ACTION,FARMING,Çiftlik/Eylem
хьэмкӀэшыгу,TRANSPORT,VEHICLE,Taşıma/Çiftlik
хьэмтетыгъуэ,TIME,SEASON,Zaman/Tarım
хьэмфӀанэ,TOOL,FARM_TOOL,Araç/Tarım
хьэмыгъашхэ,MORALITY,GREED,Karakter/Kişilik
хьэмэшыпхэ,LOCATION,BOUNDARY,Çiftlik/Tarım
хьэндрэфий,PLANT,HERB,Doğa/Bitki
хьэндырабгъуэ,ANIMAL,INSECT,Canlı/Böcek
хьэнтхъупс,FOOD,SOUP,Yiyecek/Çorba
хьэнцейгуащэ,RITUAL,TRADITION,Sosyal/Gelenek
хьэнэфий,RELIGION,DENOMINATION,İnanç/Din
хьэпарий,ANIMAL,DOG,Canlı/Hayvan
хьэплъыфэ,COLOR,SHADE,Doğa/Renk
хьэпс,OBJECT,STRAP,Nesne/Araç
хьэпсым,LOCATION,PRISON,Hukuk/Mekan
хьэпцӏий,ANIMAL,DOG,Canlı/Hayvan
хьэпшыпхэм,OBJECT,BELONGING,Nesne/Eşya
хьэпшыпхэр,OBJECT,BELONGING,Nesne/Eşya
хьэпшыпым,OBJECT,BELONGING,Nesne/Eşya
хьэпшыпыр,OBJECT,BELONGING,Nesne/Eşya
хьэпщӀэу,ECONOMY,PRICE,Ekonomi/Fiyat
хьэпэщыпхэ,OBJECT,BELONGING,Nesne/Eşya
хьэпӏацӏэ,ANIMAL,INSECT,Canlı/Böcek
хьэрамыгъэ,MORALITY,SIN,Ahlak/İnanç
хьэргъэшыргъэщӀ,CHARACTER,WORK,Karakter/İş
хьэрийкурий,DISORDER,TRASH,Felaket/Kargaşa
хьэрфкӏэ,LANGUAGE,LETTER,Dil/Gramer
хьэрфхэм,LANGUAGE,LETTER,Dil/Gramer
хьэрфхэр,LANGUAGE,LETTER,Dil/Gramer
хьэрфыр,LANGUAGE,LETTER,Dil/Gramer
хьэрфышхуэкӏэ,LANGUAGE,LETTER,Dil/Gramer
хьэршытӀатӀ,CONDITION,TEXTURE,Durum/Kıvam
хьэрычэтыншагъэ,ECONOMY,LOSS,Ekonomi/Ticaret
хьэрычэтыншэ,ECONOMY,LOSS,Ekonomi/Ticaret
хьэрэкъуакӀэ,TOOL,STICK,Araç/Alet
хьэрэкӀытӀэ,ACTION,MOVEMENT,Durum/Hareket
хьэрэм-хьэлэлкӀэ,MORALITY,ETHICS,Ahlak/İnanç
хьэрэмыгъэ,MORALITY,SIN,Ahlak/İnanç
хьэрэмыгъэншагъэ,MORALITY,HONESTY,Ahlak/Kişilik
хьэрэмыгъэншэ,CHARACTER,KINDNESS,Karakter/Ahlak
хьэрэмыгъэншэу,MANNER,KINDNESS,Karakter/Ahlak
хьэрэмэӀуащхьэ,LOCATION,MOUNTAIN,Yer/Coğrafya
хьэрэшотӀэ,CHARACTER,DECEITFUL,Karakter/Ahlak
хьэсапӀэжь,LOCATION,FIELD,Çiftlik/Tarım
хьэсэбэкъу,MEASURE,DISTANCE,Ölçü/Tarım
хьэсэгу,LOCATION,FIELD,Çiftlik/Tarım
хьэсэгъу,PERSON,NEIGHBOR,Sosyal/Tarım
хьэсэм,LOCATION,FIELD,Çiftlik/Tarım
хьэсэнрэ,PERSON,NAME,Kişi/Özel İsim
хьэсэр,LOCATION,FIELD,Çiftlik/Tarım
хьэсэхэм,LOCATION,FIELD,Çiftlik/Tarım
хьэтхауэ,PERSON,SURNAME,Kişi/Soyadı
хьэтыкъ,PERSON,NAME,Kişi/Özel İsim
хьэтыркӏэ,SOCIAL,RESPECT,Nezaket/Ahlak
хьэтырыфӀэ,CHARACTER,RESPECT,Nezaket/Ahlak
хьэуазэпӀэ,LOCATION,HOLE,Yapı/Bölüm
хьэуам,NATURE,AIR,Doğa/Hava
хьэуар,NATURE,AIR,Doğa/Hava
хьэудз-хьэгын,PLANT,GRASS,Doğa/Bitki
хьэулеигъэ,BEHAVIOR,IDLENESS,Gezme/Boşluk
хьэулеин,ACTION,WANDER,Gezme/Boşluk
хьэхун,ACTION,ATTRACTION,İlgi/Çekim
хьэхуншэ,CHARACTER,INDEPENDENCE,Karakter/Kişilik
хьэхуу,ECONOMY,LOAN,Ekonomi/Borç
хьэхуэгъу,PERSON,PARTNER,Sosyal/Yardımlaşma
хьэхьей,LANGUAGE,INTERJECTION,Dil/Nida
хьэхэм,ANIMAL,DOG,Canlı/Hayvan
хьэхэрэ-щӀыхэу,CONDITION,DISPERSION,Durum/Düzen
хьэхэщӀыхэу,CONDITION,DISPERSION,Durum/Düzen
хьэцыбанэ,PLANT,SPIKE,Doğa/Bitki
хьэцыпэ,PLANT,SPIKE,Doğa/Bitki
хьэцэпэцэ,PLANT,SPIKE,Doğa/Bitki
хьэшорэ,ANIMAL,DOG,Canlı/Hayvan
хьэщхьэвылъэ,BODY,HEAD,Anatomi/Baş
хьэщхьэрыӀуэ,MORALITY,DEVOTION,Ahlak/Kişilik
хьэщхьэрыӀуэдзэ,MILITARY,TROOP,Askeri/Birlik
хьэщхьэрыӀуэу,MANNER,DEVOTION,Ahlak/Tavır
хьэщхьэтеуэ,ACTION,STRIKE,Durum/Eylem
хьэщыкъ,EMOTION,LOVE,Aşk/Bağlılık
хьэщӀакӀуэ,PERSON,GUEST,Misafirperverlik/Gelenek
хьэщӀэкӀуапӀэ,LOCATION,VENUE,Misafirperverlik/Mekan
хьэщӀэмыгъашхэ,MORALITY,GREED,Karakter/Ahlak
хьэщӀэныш,SOCIAL,MEAL,Misafirperverlik/Ziyafet
хьэщӀэхуэфӀ,CHARACTER,HOSPITALITY,Misafirperverlik/Gelenek
хьэщӏэм,PERSON,GUEST,Misafirperverlik/Gelenek
хьэщӏэр,PERSON,GUEST,Misafirperverlik/Gelenek
хьэщӏэу,MANNER,GUEST,Misafirperverlik/Gelenek
хьэщӏэхэм,PERSON,GUEST,Misafirperverlik/Gelenek
хьэщӏэхэр,PERSON,GUEST,Misafirperverlik/Gelenek
хьэщӏэщ,LOCATION,ROOM,Misafirperverlik/Mekan
хьэщӏэщым,LOCATION,ROOM,Misafirperverlik/Mekan
хьэщӏэщымкӏэ,LOCATION,ROOM,Misafirperverlik/Mekan
хьэщӏэщыр,LOCATION,ROOM,Misafirperverlik/Mekan
хьэӀусыпэ,OBJECT,CONTAINER,Nesne/Hayvan
хьэӀуцэ,BODY,TOOTH,Anatomi/Ağız
хьэӏупс,FOOD,SOUP,Yiyecek/Çorba
"""

VERI = {}
for line in CSV_VERI.strip().split("\n"):
    if not line.strip():
        continue
    parts = line.split(",")
    if len(parts) < 4:
        continue
    form = parts[0].strip()
    concept = parts[1].strip()
    sub = parts[2].strip()
    aile = parts[3].strip()
    VERI[normalize(form)] = (concept, sub, aile)

print(f"Veri: {len(VERI)} kayit")

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("хьэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in VERI:
        concept, sub, aile = VERI[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = aile
        l["rootForm"] = "хьэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("хьэ") and not l.get("subConceptId")]
print(f"хьэ- Belirsiz kalan: {len(belirsiz)}")
if belirsiz:
    for f in belirsiz[:20]:
        print(f"  - {f}")
else:
    print("\n🎉 хьэ- KATEGORİSİ TAM BİTTİ!")
