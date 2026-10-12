import json
import re
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

# Mimarın CSV verisi (yapıştırılan mesajdan)
CSV_VERI = """
хьэ,köpek,DOG,DOG_ANIMAL,Hayvanlar & Doğa
хьэІу,arpa,GRAIN,GRAIN_BARLEY,Tarım & Yiyecek
хьэбз,dişi köpek,DOG,DOG_FEMALE,Hayvanlar & Doğa
хьэблэ,mahalle,NEIGHBORHOOD,NEIGHBORHOOD_COMMUNITY,Toplum & Yaşam
хьэблэн,komşuluk etmek,NEIGHBORHOOD,NEIGHBORHOOD_COMMUNITY,Toplum & Yaşam
хьэбыршыбыр,ıvır zıvır,CONFUSION,CONFUSION_CHAOS,Durum & Nitellik
хьэбэсабэ,darmadağın,FRAGMENTS,FRAGMENTS_SMASH,Durum & Nitellik
хьэвшыр,hamur tahtası,DOUGH,DOUGH_TOOL,Yiyecek & Mutfak
хьэгуагуэ,bodur köpek,DOG,DOG_TYPE,Hayvanlar & Doğa
хьэгулывэ,arpa çorbası,SOUP,SOUP_BARLEY,Yiyecek & Mutfak
хьэгъапхъэ,düğün hediyesi,WEDDING,WEDDING_GIFT,Toplum & Gelenek
хьэгъуэлӏыгъуэ,düğün,WEDDING,WEDDING_FEAST,Toplum & Gelenek
хьэгъэбанэ,köpek dövüşü,DOG,DOG_FIGHT,Hayvanlar & Doğa
хьэгъэщагъэ,köpek bakımı,DOG,DOG_CARE,Hayvanlar & Doğa
хьэдагъэ,cenaze,FUNERAL,FUNERAL_RITE,Toplum & Gelenek
хьэдафэ,ceset gibi solgun,PALENESS,PALENESS_DEAD,Sağlık & Görünüm
хьэдащхьэ,ceset başı,DEAD,DEAD_BODY,Sağlık & Vücut
хьэджафэ,akıcı konuşan,SPEECH,SPEECH_FLUENT,Dil & İletişim
хьэджэбз,akıcı konuşan kız,SPEECH,SPEECH_FLUENT,Dil & İletişim
хьэджэладжэ,curcuna,NOISE,NOISE_CHAOS,Durum & Nitellik
хьэджэр,hacı,PILGRIM,PILGRIM_RELIGION,Din & İnanç
хьэджэсэ,hacı kafileleri,PILGRIM,PILGRIM_RELIGION,Din & İnanç
хьэджэш,hac ziyareti,PILGRIMAGE,PILGRIM_RELIGION,Din & İnanç
хьэдзыгъуанэ,tahıl deliği,GRAIN,GRAIN_HOLE,Tarım & Yiyecek
хьэдзэ,tahıl tanesi,GRAIN,GRAIN_SEED,Tarım & Yiyecek
хьэдзэгъей,harman yeri,GRAIN,GRAIN_FIELD,Tarım & Yiyecek
хьэдзэпкъей,tahıl sapı,GRAIN,GRAIN_STEM,Tarım & Yiyecek
хьэдрыхэ,ahiret,AFTERLIFE,AFTERLIFE_RELIGION,Din & İnanç
хьэдэ,ceset,DEAD,DEAD_BODY,Sağlık & Vücut
хьэдэтепхъуэ,kefen,SHROUD,SHROUD_CLOTH,Toplum & Gelenek
хьэжа,öğütülmüş,GROUND,GROUND_FLOUR,Yiyecek & Mutfak
хьэжы,hacı,PILGRIM,PILGRIM_RELIGION,Din & İnanç
хьэжыгъэ,un,FLOUR,FLOUR_GRAIN,Yiyecek & Mutfak
хьэжын,öğütmek,GRIND,GRIND_ACTION,Eylem & Hareket
хьэжь,yaşlı köpek,DOG,DOG_OLD,Hayvanlar & Doğa
хьэжьэражьэ,darmadağınık,DISORDER,DISORDER_CHAOS,Durum & Nitellik
хьэжэбажэ,kargaşa,CHAOS,CHAOS_STATE,Durum & Nitellik
хьэзаб,eziyet,TORMENT,TORMENT_PAIN,Duygu & Durum
хьэзыр,barutluk,CARTRIDGE,CARTRIDGE_BOX,Askeri & Silah
хьэзыру,hazır olarak,READY,READY_STATE,Durum & Nitellik
хьэзырылъэ,fişeklik cebi,CARTRIDGE,CARTRIDGE_POCKET,Giyim & Eşya
хьэиуэ,hayır sevap,GOOD_DEED,GOOD_DEED_RELIGION,Din & İnanç
хьэку,fırın,OVEN,OVEN_HEARTH,Ev & Mutfak
хьэкум,mahkeme,COURT,COURT_LEGAL,Toplum & Hukuk
хьэкур,fırın,OVEN,OVEN_HEARTH,Ev & Mutfak
хьэкхъуафэ,yemlik,TROUGH,TROUGH_DOG,Hayvanlar & Doğa
хьэкъ,hak,TRUTH,TRUTH_RIGHT,Toplum & Hukuk
хьэкъугъ,köpek uluması,DOG,DOG_SOUND,Hayvanlar & Doğa
хьэкъуей,haksızlık,INJUSTICE,RIGHT_VIOLATION,Toplum & Hukuk
хьэкъурт,boğaz,THROAT,THROAT_BODY,Organ & Vücut
хьэкъущыкъу,kap kacak,DISHES,DISHES_UTENSIL,Ev & Mutfak
хьэкӀуэн,ziyaret etmek,VISIT,VISIT_GO,Eylem & Hareket
хьэкӀэ,misafir,GUEST,GUEST_PERSON,Toplum & Gelenek
хьэкӏэкхъуэкӏэ,yaban hayvanları,WILD_ANIMAL,WILD_BEAST,Hayvanlar & Doğa
хьэл,karakter,CHARACTER,CHARACTER_HABIT,Kişilik & Ahlak
хьэлщэн,huy karakter,CHARACTER,CHARACTER_HABIT,Kişilik & Ahlak
хьэлъагъ,ağırlık,WEIGHT,WEIGHT_HEAVINESS,Ölçü & Durum
хьэлъэ,ağır,HEAVY,HEAVY_WEIGHT,Ölçü & Durum
хьэлъэн,ağır olmak,HEAVY,HEAVY_WEIGHT,Ölçü & Durum
хьэлывэ,haluj,DUMPLING,DUMPLING_FOOD,Yiyecek & Mutfak
хьэлыуэ,helva,HALVA,SWEET_HALVA,Yiyecek & Mutfak
хьэлэ,helal,HALAL,HALAL_PERMITTED,Din & Hukuk
хьэлэбэлыкъ,kargaşa,CHAOS,CHAOS_NOISE,Durum & Nitellik
хьэлэмэт,ilginç,INTERESTING,INTERESTING_AMAZING,Duygu & Durum
хьэлэч,helak,DESTRUCTION,DESTRUCTION_RUIN,Durum & Nitellik
хьэм,köpeğin,DOG,DOG_ANIMAL,Hayvanlar & Doğa
хьэмбылэ,harman,HARVEST,HARVEST_GRAIN,Tarım & Yiyecek
хьэмзэт,Hamzat (isim),NAME,NAME_PERSON,Kişi & İsim
хьэмкӀэн,harman dövmek,HARVEST,HARVEST_ACTION,Tarım & Yiyecek
хьэмлашкӀуэ,yabani köpek,DOG,DOG_WILD,Hayvanlar & Doğa
хьэмэ,veya,CONJUNCTION,OR_OPTION,Dil & Gramer
хьэмэм,hamam,BATH,BATH_HOUSE,Yapı & Mekan
хьэмэрэ,yahut,CONJUNCTION,OR_OPTION,Dil & Gramer
хьэн,taşımak,CARRY,CARRY_MOVE,Eylem & Hareket
хьэнапэ,teras,ARCHITECTURE,PORCH_COURT,Yapı & Mekan
хьэндрабгъуэ,örümcek,SPIDER,SPIDER_INSECT,Hayvanlar & Doğa
хьэндыркъуакъуэ,kurbağa,FROG,FROG_ANIMAL,Hayvanlar & Doğa
хьэнтӀрабыщ,karınca,ANT,ANT_INSECT,Hayvanlar & Doğa
хьэнцэ,harman küreği,SHOVEL,SHOVEL_TOOL,Araç & Gereç
хьэп,hap,MEDICINE,MEDICINE_PILL,Sağlık & İlaç
хьэпс,köpek tasması,DOG,DOG_LEASH,Hayvanlar & Doğa
хьэпшып,eşya,THING,THING_OBJECT,Eşya & Araçlar
хьэпшыр,enik,DOG,DOG_PUPPY,Hayvanlar & Doğa
хьэпщхупщ,böcekler,WORM,INSECT_WORM,Hayvanlar & Doğa
хьэр,köpek,DOG,DOG_ANIMAL,Hayvanlar & Doğa
хьэрам,harami,FORBIDDEN,FORBIDDEN_RELIGION,Din & Ahlak
хьэргъэшыргъэ,ıvır zıvır,TRINKET,TRINKET_SMALL,Eşya & Araçlar
хьэрпхъэр,harman eleği,HARVEST,HARVEST_SIEVE,Tarım & Yiyecek
хьэрф,harf,LETTER,LETTER_ALPHABET,Dil & İletişim
хьэрхуэрэгъу,rakip,RIVAL,RIVAL_ENEMY,Toplum & İlişkiler
хьэрхьуп,kargaşa,CHAOS,CHAOS_NOISE,Durum & Nitellik
хьэрш,harç,EXPENSE,EXPENSE_MONEY,Ekonomi & Ticaret
хьэрып,Arap,ARAB,ARAB_PEOPLE,Toplum & Halklar
хьэрычэт,hareket,ACTION,ACTION_INITIATIVE,Eylem & Hareket
хьэрэ,çamurda yatan manda,BULL,BULL_MUD,Hayvanlar & Doğa
хьэрэм,haram,FORBIDDEN,FORBIDDEN_RELIGION,Din & Ahlak
хьэрэмэ,harami,OUTLAW,OUTLAW_BANDIT,Toplum & Hukuk
хьэсэ,bostan karığı,GARDEN_BED,GARDEN_CROP,Tarım & Yiyecek
хьэсэн,ekmek,PLANTING,PLANT_ACTION,Tarım & Yiyecek
хьэту,Hatu (dans),DANCE,DANCE_FOLK,Sanat & Kültür
хьэтуей,Hatukay,TRIBE,TRIBE_CIRCASSIAN,Toplum & Halklar
хьэтыр,hatır,RESPECT,RESPECT_FAVOR,Kişilik & Ahlak
хьэуа,hava,AIR,AIR_ATMOSPHERE,Doğa & Hava
хьэуазэ,heves,DESIRE,DESIRE_WISH,Duygu & Durum
хьэулей,başıboş,IDLENESS,IDLENESS_FREE,Durum & Nitellik
хьэуэ,hayır,NEGATION,NEGATION_NO,Dil & Gramer
хьэфиз,hafız,MEMORIZER,RECITER_RELIGION,Din & İnanç
хьэфотэ,köpek havlaması,DOG,DOG_BARK,Hayvanlar & Doğa
хьэфэ,köpek derisi,DOG,DOG_SKIN,Hayvanlar & Doğa
хьэху,ödünç,LOAN,LOAN_BORROW,Ekonomi & Ticaret
хьэхъу,erkek köpek,DOG,DOG_MALE,Hayvanlar & Doğa
хьэхэбасэ,dedikodu,CHAT,CHAT_RUMOR,Dil & İletişim
хьэхэр,köpekler,DOG,DOG_ANIMAL,Hayvanlar & Doğa
хьэщ,konukevi,GUESTHOUSE,GUEST_HOUSE,Yapı & Mekan
хьэщӀэ,misafir,GUEST,GUEST_PERSON,Toplum & Gelenek
хьэщӀэн,misafir kabul etmek,GUEST,GUEST_HOST,Toplum & Gelenek
хьэщӏагъэ,misafirperverlik,GUEST,GUEST_HOSPITALITY,Toplum & Gelenek
хьэщӏапӏэ,misafirgah,GUEST,GUEST_PLACE,Toplum & Gelenek
"""

# CSV'yi işle
THLE_VERI = {}
for line in CSV_VERI.strip().split("\n"):
    if not line.strip():
        continue
    parts = line.split(",")
    if len(parts) < 5:
        continue
    form = parts[0].strip()
    concept = parts[2].strip()
    sub = parts[3].strip()
    aile = parts[4].strip()
    THLE_VERI[normalize(form)] = (concept, sub, aile)

print(f"Mimar verisi: {len(THLE_VERI)} kayit")

uygulanan = 0
for l in lex:
    form = l.get("form", "")
    if not form.startswith("хьэ"):
        continue
    if l.get("subConceptId"):
        continue
    
    norm = normalize(form)
    if norm in THLE_VERI:
        concept, sub, aile = THLE_VERI[norm]
        l["conceptId"] = concept
        l["subConceptId"] = sub
        l["taxonomyFamily"] = aile
        l["rootForm"] = "хьэ-"
        uygulanan += 1

LEX.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"OK - {uygulanan} kayit guncellendi")

belirsiz = [l.get("form") for l in lex if l.get("form","").startswith("хьэ") and not l.get("subConceptId")]
print(f"хьэ- Belirsiz kalan: {len(belirsiz)}")
