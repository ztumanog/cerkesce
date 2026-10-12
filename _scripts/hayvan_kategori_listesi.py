import json
from pathlib import Path
from collections import Counter

lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))

# Tüm conceptId'leri say
concept_counter = Counter(l.get("conceptId") for l in lex if l.get("conceptId"))

# Hayvan ile ilgili olanları bul
HAYVAN_KATEGORILERI = {
    "ANIMAL", "COW", "SHEEP", "GOAT", "DOG", "CAT", "CHICKEN", "HORSE",
    "OX", "DEER", "WOLF", "FOX", "BEAR", "HARE", "MOUSE", "SNAKE",
    "LION", "TIGER", "BIRD", "FISH", "EAGLE", "OWL", "PIGEON",
    "CROW", "DUCK", "GOOSE", "PIG", "DONKEY", "CAMEL", "RABBIT",
    "ELEPHANT", "MONKEY", "WHALE", "DOLPHIN", "SHARK", "BEE",
    "FLY", "MOSQUITO", "ANT", "SPIDER", "SCORPION", "BUTTERFLY",
    "WORM", "SNAIL", "CRAYFISH", "CROCODILE", "FROG", "TURTLE",
    "LIZARD", "RAT", "SQUIRREL", "HEDGEHOG", "MOLE", "OTTER",
    "BADGER", "MARTEN", "WEASEL", "LYNX", "LEOPARD", "JACKAL",
    "HYENA", "BISON", "BUFFALO", "ANTELOPE", "GAZELLE", "ZEBRA",
    "GIRAFFE", "RHINO", "HIPPO", "KANGAROO", "PENGUIN", "PARROT",
    "SWAN", "STORK", "HERON", "CRANE", "FALCON", "HAWK", "VULTURE",
    "PEACOCK", "PHEASANT", "QUAIL", "PARTRIDGE", "LARK", "NIGHTINGALE",
    "SWALLOW", "SPARROW", "TIT", "FINCH", "STARLING", "MAGPIE",
    "JAY", "WOODPECKER", "CUCKOO", "NIGHTJAR", "SWIFT", "KINGFISHER"
}

with open("_scripts/hayvan_kategorileri.txt", "w", encoding="utf-8") as f:
    f.write("MEVCUT HAYVAN KATEGORILERI\n")
    f.write("=" * 60 + "\n\n")
    f.write(f"{'KATEGORI':<25} {'SAYI':>8}\n")
    f.write("-" * 60 + "\n")
    
    hayvan_toplam = 0
    for kat, sayi in sorted(concept_counter.items()):
        if kat and kat in HAYVAN_KATEGORILERI:
            f.write(f"{kat:<25} {sayi:>8}\n")
            hayvan_toplam += sayi
    
    f.write("-" * 60 + "\n")
    f.write(f"{'TOPLAM':<25} {hayvan_toplam:>8}\n\n")
    
    # ANIMAL dışı hayvan kategorileri
    f.write("\n\nANIMAL DISINDAKI HAYVAN KATEGORILERI (tasinacaklar):\n")
    f.write("=" * 60 + "\n")
    for kat, sayi in sorted(concept_counter.items()):
        if kat and kat in HAYVAN_KATEGORILERI and kat != "ANIMAL":
            f.write(f"  {kat:<25} {sayi:>5} kayit\n")

print("OK")
