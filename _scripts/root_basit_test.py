import sys
sys.stdout.reconfigure(encoding="utf-8")

def normalize(s):
    return s.replace("\u04c0", "\u04cf")

def ady_to_kbd(s):
    return (s.replace("шъ", "щ")
             .replace("жъ", "жь")
             .replace("чъ", "ч")
             .replace("ф", "ху")
             .replace("шӀ", "щӀ"))

# Test
testler = ["шъхьасын", "унащӏэ", "бысымгуащэ", "ятэш", "лъагъун"]
for t in testler:
    n = normalize(t)
    k = ady_to_kbd(n)
    print(f"{t} -> normalize: {repr(n)} -> kbd: {repr(k)}")

# Root formlari
rootlar = ["щхьэ", "унэ", "гуащэ", "лъэ"]
for r in rootlar:
    print(f"Root: {repr(normalize(r))}")
