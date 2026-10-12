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
    # Kucuk harfe cevir ve Palochka varyasyonlarini standartlastir (1, I -> Ӏ)
    text = text.lower().replace("1", "Ӏ").replace("i", "Ӏ")
    # Noktalama isaretlerini temizle (Cerkesce Ӏ karakterini koru)
    return re.sub(r'[^\w\sӀ]', '', text)

def topla(p):
    df = pq.read_table(p).to_pandas()
    c = Counter()
    for col in df.columns:
        for val in df[col].dropna():
            texts = []
            # HF translation sutunu dict veya str olabilir
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
print(f"ADY kelime sayisi: {len(ady_f)}, KBD kelime sayisi: {len(kbd_f)}")

bulunmayan = json.loads(Path("data/corpus/frequency/c10_1_bulunmayanlar.json").read_text(encoding="utf-8"))
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
lex_map = {l["id"]: l for l in lex}

bulunan = 0
for s in bulunmayan.get("liste", []):
    l = lex_map.get(s["id"], {})
    form = l.get("form", "")
    ady = normalize(l.get("dialectVariants", {}).get("adyghe", form))
    kbd = normalize(l.get("dialectVariants", {}).get("kabardian", form))
    
    a = ady_f.get(ady, 0)
    k = kbd_f.get(kbd, 0)
    
    if a > 0 or k > 0:
        bulunan += 1
        print(f"  BULUNDU: {s['id']:25} {form:20} ADY={a} KBD={k}")

print(f"\nBulunan: {bulunan}/{len(bulunmayan.get('liste', []))}")
