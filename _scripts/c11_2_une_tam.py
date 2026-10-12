import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

lex_path = Path("public/data/linguistic/lexemes.json")
lex = json.loads(lex_path.read_text(encoding="utf-8"))
mevcut = {l["id"] for l in lex}

# TUM UNE AILE SI KELIMELERI
yeni = [
    # === TEMEL ===
    {"id": "L-UNEBZHE", "form": "унэбжэ", "literalMeaning": "ev kapisi", "wordFamilyId": "WF-UNE", "conceptId": "DOOR", "dialectVariants": {"adyghe": "унэбжэ", "kabardian": "унэбжэ"}, "notes": "C-11.2.1: ev kapisi.", "corpusFrequency": 0},
    {"id": "L-UNEGUASHE", "form": "унэгуащэ", "literalMeaning": "ev hanimi", "wordFamilyId": "WF-UNE", "conceptId": "HOUSEWIFE", "dialectVariants": {"adyghe": "унэгуащэ", "kabardian": "унэгуащэ"}, "notes": "C-11.2.1: ev hanimi.", "corpusFrequency": 0},
    {"id": "L-UNEK1UESHCH", "form": "унэкъуэщ", "literalMeaning": "ayni soyadli akraba", "wordFamilyId": "WF-UNE", "conceptId": "RELATIVE", "dialectVariants": {"adyghe": "унэкъуэщ", "kabardian": "унэкъуэщ"}, "notes": "C-11.2.1: ayni soyadli akraba.", "corpusFrequency": 0},
    {"id": "L-UNEK1UETS1", "form": "унэкӏуэцӏ", "literalMeaning": "mobilya", "wordFamilyId": "WF-UNE", "conceptId": "FURNITURE", "dialectVariants": {"adyghe": "унэкӏуэцӏ", "kabardian": "унэщӏэлъ"}, "notes": "C-11.2.1: mobilya.", "corpusFrequency": 0},
    {"id": "L-UNELHASH1E", "form": "унэлъащӏэ", "literalMeaning": "mobilya", "wordFamilyId": "WF-UNE", "conceptId": "FURNITURE", "dialectVariants": {"adyghe": "унэлъащӏэ", "kabardian": "унэлъащӏэ"}, "notes": "C-11.2.1: mobilya.", "corpusFrequency": 0},
    {"id": "L-UNEPYSH1E", "form": "унэпыщӏэ", "literalMeaning": "ek bina", "wordFamilyId": "WF-UNE", "conceptId": "EXTENSION", "dialectVariants": {"adyghe": "унэпыщӏэ", "kabardian": "унэпыщӏэ"}, "notes": "C-11.2.1: ek bina.", "corpusFrequency": 0},
    {"id": "L-UNETS1E", "form": "унэцӏэ", "literalMeaning": "soyadi", "wordFamilyId": "WF-UNE", "conceptId": "SURNAME", "dialectVariants": {"adyghe": "унэцӏэ", "kabardian": "унэцӏэ"}, "notes": "C-11.2.1: soyadi.", "corpusFrequency": 0},
    {"id": "L-UNETS1EDZHEGHU", "form": "унэцӏэджэгъу", "literalMeaning": "ayni soyadli", "wordFamilyId": "WF-UNE", "conceptId": "NAMESAKE", "dialectVariants": {"adyghe": "унэцӏэджэгъу", "kabardian": "унэцӏэджэгъу"}, "notes": "C-11.2.1: ayni soyadli.", "corpusFrequency": 0},

    # === MESLEK/RITUEL ===
    {"id": "L-UNEZEKHE", "form": "унэзехьэ", "literalMeaning": "temizlikci kadin", "wordFamilyId": "WF-UNE", "conceptId": "MAID", "dialectVariants": {"adyghe": "унэзехьэ", "kabardian": "унэзехьэ"}, "notes": "C-11.2.1: temizlikci kadin.", "corpusFrequency": 0},
    {"id": "L-UNEZETELHXHE", "form": "унэзэтелъхьэ", "literalMeaning": "duvarci", "wordFamilyId": "WF-UNE", "conceptId": "MASON", "dialectVariants": {"adyghe": "унэзэтелъхьэ", "kabardian": "унэзэтелъхьэ"}, "notes": "C-11.2.1: duvarci.", "corpusFrequency": 0},
    {"id": "L-UNEISHE", "form": "унэишэ", "literalMeaning": "gelin getirme ritueli", "wordFamilyId": "WF-UNE", "conceptId": "WEDDING_RITUAL", "dialectVariants": {"adyghe": "унэишэ", "kabardian": "унэишэ"}, "notes": "C-11.2.1: gelin getirme ritueli.", "corpusFrequency": 0},
    {"id": "L-UNEIDZYKHE", "form": "унэидзыхьэ", "literalMeaning": "gelin kacirma ritueli", "wordFamilyId": "WF-UNE", "conceptId": "BRIDE_ABDUCTION", "dialectVariants": {"adyghe": "унэидзыхьэ", "kabardian": "унэидзыхьэ"}, "notes": "C-11.2.1: gelin kacirma ritueli.", "corpusFrequency": 0},
    {"id": "L-UNERYUE", "form": "унэрыуэ", "literalMeaning": "gelin kacirma", "wordFamilyId": "WF-UNE", "conceptId": "BRIDE_ABDUCTION", "dialectVariants": {"adyghe": "унэрыуэ", "kabardian": "унэрыуэ"}, "notes": "C-11.2.1: gelin kacirma.", "corpusFrequency": 0},
    {"id": "L-UNASH1E", "form": "унащӏэ", "literalMeaning": "insaatci", "wordFamilyId": "WF-UNE", "conceptId": "BUILDER", "dialectVariants": {"adyghe": "унащӏэ", "kabardian": "унащӏэ"}, "notes": "C-11.2.1: insaatci.", "corpusFrequency": 0},
    {"id": "L-UNE1UT", "form": "унэӏут", "literalMeaning": "usak, serf", "wordFamilyId": "WF-UNE", "conceptId": "SERVANT", "dialectVariants": {"adyghe": "унэӏут", "kabardian": "унэӏут"}, "notes": "C-11.2.1: usak, serf.", "corpusFrequency": 0},
    {"id": "L-UNEGHASH1E", "form": "унэгъащӏэ", "literalMeaning": "yeni evli", "wordFamilyId": "WF-UNE", "conceptId": "NEWLYWED", "dialectVariants": {"adyghe": "унэгъащӏэ", "kabardian": "унэгъащӏэ"}, "notes": "C-11.2.1: yeni evli.", "corpusFrequency": 0},

    # === EYLEMLER ===
    {"id": "L-UNEGHUEDZHIN", "form": "унэгъуэджын", "literalMeaning": "saklamak", "wordFamilyId": "WF-UNE", "conceptId": "HIDE", "dialectVariants": {"adyghe": "унэгъуэджын", "kabardian": "унэгъуэджын"}, "notes": "C-11.2.1: saklamak.", "corpusFrequency": 0},
    {"id": "L-UNEKHUN", "form": "унэхъун", "literalMeaning": "felakete ugramak", "wordFamilyId": "WF-UNE", "conceptId": "DISASTER", "dialectVariants": {"adyghe": "унэхъун", "kabardian": "унэхъун"}, "notes": "C-11.2.1: felakete ugramak.", "corpusFrequency": 0},
    {"id": "L-UNERYXHE", "form": "унэрыхьэ", "literalMeaning": "ziyaret", "wordFamilyId": "WF-UNE", "conceptId": "VISIT", "dialectVariants": {"adyghe": "унэрыхьэ", "kabardian": "унэрыхьэ"}, "notes": "C-11.2.1: ziyaret.", "corpusFrequency": 0},
    {"id": "L-UNET1YN", "form": "унэтӏын", "literalMeaning": "yonlendirmek", "wordFamilyId": "WF-UNE", "conceptId": "DIRECT", "dialectVariants": {"adyghe": "унэтӏын", "kabardian": "унэтӏын"}, "notes": "C-11.2.1: yonlendirmek.", "corpusFrequency": 0},
    {"id": "L-UNESH1YN", "form": "унэщӏын", "literalMeaning": "bosaltmak", "wordFamilyId": "WF-UNE", "conceptId": "EMPTY", "dialectVariants": {"adyghe": "унэщӏын", "kabardian": "унэщӏын"}, "notes": "C-11.2.1: bosaltmak.", "corpusFrequency": 0},
    {"id": "L-UNEN", "form": "унэн", "literalMeaning": "evlenmek", "wordFamilyId": "WF-UNE", "conceptId": "MARRY", "dialectVariants": {"adyghe": "унэн", "kabardian": "унэн"}, "notes": "C-11.2.1: evlenmek.", "corpusFrequency": 0},
    {"id": "L-UNEDZHEN", "form": "унэджын", "literalMeaning": "sakatlamak", "wordFamilyId": "WF-UNE", "conceptId": "DEFORM", "dialectVariants": {"adyghe": "унэджын", "kabardian": "унэджын"}, "notes": "C-11.2.1: sakatlamak.", "corpusFrequency": 0},
    {"id": "L-UNEGHUEDZHIN2", "form": "унэгъуэджын", "literalMeaning": "gizlemek", "wordFamilyId": "WF-UNE", "conceptId": "CONCEAL", "dialectVariants": {"adyghe": "унэгъуэджын", "kabardian": "унэгъуэджын"}, "notes": "C-11.2.1: gizlemek.", "corpusFrequency": 0},

    # === DİĞER ===
    {"id": "L-UNEK1AF1E", "form": "унэкӏафӏэ", "literalMeaning": "sansli ev", "wordFamilyId": "WF-UNE", "conceptId": "LUCKY_HOUSE", "dialectVariants": {"adyghe": "унэкӏафӏэ", "kabardian": "унэкӏафӏэ"}, "notes": "C-11.2.1: sansli ev.", "corpusFrequency": 0},
    {"id": "L-UNEKHEH1E", "form": "унэхэщӏэ", "literalMeaning": "yeni evliye esya hediyesi", "wordFamilyId": "WF-UNE", "conceptId": "WEDDING_GIFT", "dialectVariants": {"adyghe": "унэхэщӏэ", "kabardian": "унэхэщӏэ"}, "notes": "C-11.2.1: yeni evliye esya hediyesi.", "corpusFrequency": 0},
    {"id": "L-UNEGUNESHCH", "form": "унэгунэщ", "literalMeaning": "bolgeyi bilen kisi", "wordFamilyId": "WF-UNE", "conceptId": "LOCAL", "dialectVariants": {"adyghe": "унэгунэщ", "kabardian": "унэгунэщ"}, "notes": "C-11.2.1: bolgeyi bilen kisi.", "corpusFrequency": 0},
    {"id": "L-UNERYXHE-UNERYK1YU", "form": "унэрыхьэ-унэрыкӏыу", "literalMeaning": "ev ev dolasarak", "wordFamilyId": "WF-UNE", "conceptId": "HOUSE_TO_HOUSE", "dialectVariants": {"adyghe": "унэрыхьэ-унэрыкӏыу", "kabardian": "унэрыхьэ-унэрыкӏыу"}, "notes": "C-11.2.1: ev ev dolasarak.", "corpusFrequency": 0},
    {"id": "L-BYSYMGUASHE", "form": "бысымгуащэ", "literalMeaning": "misafirperver ev hanimi", "wordFamilyId": "WF-UNE", "conceptId": "HOSTESS", "dialectVariants": {"adyghe": "бысымгуащэ", "kabardian": "бысымгуащэ"}, "notes": "C-11.2.1: misafirperver ev hanimi.", "corpusFrequency": 0},
    {"id": "L-UNEBZHE1UP1E", "form": "унэбжэӏупэ", "literalMeaning": "ev kapisi onu", "wordFamilyId": "WF-UNE", "conceptId": "DOORWAY", "dialectVariants": {"adyghe": "унэбжэӏупэ", "kabardian": "унэбжэӏупэ"}, "notes": "C-11.2.1: ev kapisi onu.", "corpusFrequency": 0},
    {"id": "L-UNEPKHASHE", "form": "унэ пхашэ", "literalMeaning": "egri ev", "wordFamilyId": "WF-UNE", "conceptId": "RICKETY_HOUSE", "dialectVariants": {"adyghe": "унэ пхашэ", "kabardian": "унэ пхашэ"}, "notes": "C-11.2.1: egri ev.", "corpusFrequency": 0},
    {"id": "L-UNEZH", "form": "унэжъ", "literalMeaning": "eski ev", "wordFamilyId": "WF-UNE", "conceptId": "OLD_HOUSE", "dialectVariants": {"adyghe": "унэжъ", "kabardian": "унэжь"}, "notes": "C-11.2.1: eski ev.", "corpusFrequency": 0},
    {"id": "L-UNESHHUE", "form": "унэшхуэ", "literalMeaning": "buyuk ev", "wordFamilyId": "WF-UNE", "conceptId": "BIG_HOUSE", "dialectVariants": {"adyghe": "унэшхуэ", "kabardian": "унэшхуэ"}, "notes": "C-11.2.1: buyuk ev.", "corpusFrequency": 0},

    # === BILESIKLER ===
    {"id": "L-UNEBLYN", "form": "унэ блын", "literalMeaning": "ev duvari", "wordFamilyId": "WF-UNE", "conceptId": "WALL", "dialectVariants": {"adyghe": "унэ блын", "kabardian": "унэ блын"}, "notes": "C-11.2.1: ev duvari.", "corpusFrequency": 0},
    {"id": "L-UNELHABZHE", "form": "унэ лъабжьэ", "literalMeaning": "ev temeli", "wordFamilyId": "WF-UNE", "conceptId": "FOUNDATION", "dialectVariants": {"adyghe": "унэ лъабжьэ", "kabardian": "унэ лъабжьэ"}, "notes": "C-11.2.1: ev temeli.", "corpusFrequency": 0},
    {"id": "L-UNELHEGU", "form": "унэ лъэгу", "literalMeaning": "ev tabani", "wordFamilyId": "WF-UNE", "conceptId": "FLOOR", "dialectVariants": {"adyghe": "унэ лъэгу", "kabardian": "унэ лъэгу"}, "notes": "C-11.2.1: ev tabani.", "corpusFrequency": 0},
    {"id": "L-UNESHHAP1E", "form": "унэ шхапӏэ", "literalMeaning": "ev yemek odasi", "wordFamilyId": "WF-UNE", "conceptId": "DINING_ROOM", "dialectVariants": {"adyghe": "унэ шхапӏэ", "kabardian": "унэ шхапӏэ"}, "notes": "C-11.2.1: ev yemek odasi.", "corpusFrequency": 0},
    {"id": "L-UNEPL1ANAPE", "form": "унэ плӏанэпэ", "literalMeaning": "ev kosesi", "wordFamilyId": "WF-UNE", "conceptId": "CORNER", "dialectVariants": {"adyghe": "унэ плӏанэпэ", "kabardian": "унэ плӏанэпэ"}, "notes": "C-11.2.1: ev kosesi.", "corpusFrequency": 0},
    {"id": "L-UNEKHU", "form": "унэку", "literalMeaning": "ev merkezi", "wordFamilyId": "WF-UNE", "conceptId": "CENTER", "dialectVariants": {"adyghe": "унэку", "kabardian": "унэку"}, "notes": "C-11.2.1: ev merkezi.", "corpusFrequency": 0},
    {"id": "L-UNESHXHE", "form": "унэщхьэ", "literalMeaning": "ev catisi", "wordFamilyId": "WF-UNE", "conceptId": "ROOF", "dialectVariants": {"adyghe": "унэщхьэ", "kabardian": "унэщхьэ"}, "notes": "C-11.2.1: ev catisi.", "corpusFrequency": 0},
    {"id": "L-UNEDZABZHE", "form": "унэ джабэ", "literalMeaning": "ev yani", "wordFamilyId": "WF-UNE", "conceptId": "SIDE", "dialectVariants": {"adyghe": "унэ джабэ", "kabardian": "унэ джабэ"}, "notes": "C-11.2.1: ev yani.", "corpusFrequency": 0},
    {"id": "L-UNEGUPE", "form": "унэ гупэ", "literalMeaning": "ev onu", "wordFamilyId": "WF-UNE", "conceptId": "FRONT", "dialectVariants": {"adyghe": "унэ гупэ", "kabardian": "унэ гупэ"}, "notes": "C-11.2.1: ev onu.", "corpusFrequency": 0},
    {"id": "L-UNESHHYB", "form": "унэ щӏыб", "literalMeaning": "ev arkasi", "wordFamilyId": "WF-UNE", "conceptId": "BACK", "dialectVariants": {"adyghe": "унэ щӏыб", "kabardian": "унэ щӏыб"}, "notes": "C-11.2.1: ev arkasi.", "corpusFrequency": 0},
]

eklenen = 0
for y in yeni:
    if y["id"] not in mevcut:
        lex.append(y)
        eklenen += 1
        print(f"Eklendi: {y['id']} - {y['form']}")
    else:
        print(f"Mevcut: {y['id']}")

lex_path.write_text(json.dumps(lex, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nEklenen: {eklenen}")
print(f"Toplam: {len(lex)}")
