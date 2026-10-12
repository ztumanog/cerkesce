import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
import re
from pathlib import Path
from collections import Counter
try:
    import pyarrow.parquet as pq
except ImportError:
    print("pyarrow YOK"); sys.exit(1)

def normalize(text: str) -> str:
    if not text:
        return ""
    text = text.lower()
    # Tum Palochka ve benzeri varyasyonlari standart U+04C0 karakterine cevir
    for ch in ["1", "i", "I", "l", "ӏ", "'", "’", "`"]:
        text = text.replace(ch, "Ӏ")
    return re.sub(r'[^\w\sӀ]', '', text)

def topla(p):
    df = pq.read_table(p).to_pandas()
    c = Counter()
    for col in df.columns:
        for val in df[col].dropna():
            texts = []
            if isinstance(val, dict):
                texts = [str(v) for v in val.values() if isinstance(v, str)]
            elif isinstance(val, str):
                texts = [val]
            for t in texts:
                norm_text = normalize(t)
                for w in norm_text.split():
                    if w:
                        c[w] += 1
    return c

print("Yukleniyor...")
hf_dir = Path("data/corpus/.hf_cache")
ady_file = next((f for f in hf_dir.rglob("*.parquet") if "ady_ru" in f.name), None)
kbd_file = next((f for f in hf_dir.rglob("*.parquet") if "kbd_ru" in f.name), None)

ady_f = topla(ady_file) if ady_file else Counter()
kbd_f = topla(kbd_file) if kbd_file else Counter()
print(f"ADY: {len(ady_f)}, KBD: {len(kbd_f)}")

bulunmayan = json.loads(Path("data/corpus/frequency/c10_1_bulunmayanlar.json").read_text(encoding="utf-8"))
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
lex_map = {l["id"]: l for l in lex}

# === TAM ESLEME ===
bulunan_tam = 0
# === PREFIX ESLEME ===
bulunan_prefix = 0

print("\n=== TAM ESLEME ===")
for s in bulunmayan.get("liste", []):
    l = lex_map.get(s["id"], {})
    form = l.get("form", "")
    ady = normalize(l.get("dialectVariants", {}).get("adyghe", form))
    kbd = normalize(l.get("dialectVariants", {}).get("kabardian", form))
    
    a = ady_f.get(ady, 0)
    k = kbd_f.get(kbd, 0)
    
    if a > 0 or k > 0:
        bulunan_tam += 1
        print(f"  BULUNDU: {s['id']:25} {form:20} ADY={a} KBD={k}")

print(f"\nTam esleme: {bulunan_tam}/40")

print("\n=== PREFIX ESLEME ===")
for s in bulunmayan.get("liste", []):
    l = lex_map.get(s["id"], {})
    form = l.get("form", "")
    ady = normalize(l.get("dialectVariants", {}).get("adyghe", form))
    kbd = normalize(l.get("dialectVariants", {}).get("kabardian", form))
    
    if not ady and not kbd:
        continue
    
    # Prefix arama
    a_prefix = sum(v for k, v in ady_f.items() if k.startswith(ady))
    k_prefix = sum(v for k, v in kbd_f.items() if k.startswith(kbd))
    
    if a_prefix > 0 or k_prefix > 0:
        bulunan_prefix += 1
        print(f"  PREFIX: {s['id']:25} {form:20} ADY={a_prefix} KBD={k_prefix}")

print(f"\nPrefix esleme: {bulunan_prefix}/40")
print(f"\nTOPLAM: {bulunan_tam + bulunan_prefix}/40")
