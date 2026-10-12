import json
from pathlib import Path

# 1) Sozlukleri yukle
sozlukler = {}
sozluk_dir = Path('data/dictionaries')

if not sozluk_dir.exists():
    sozluk_dir = Path('data')

for f in sozluk_dir.glob('*.json'):
    try:
        data = json.loads(f.read_text(encoding='utf-8'))
        sozlukler[f.name] = data
    except:
        pass

print(f"Sozluk: {len(sozlukler)}")

# 2) Aranacak kelimeler
kelimeler = [
    'бзэбзэ','пэбжьэ','дзэгъуэ','къуиблы','мэзкъогъум','бзащӀэпс','кубзэ','гъубжь',
    'бгъуэгъу','блэчӀа','блэчӀын','кхъуэбан','бадз','щхъу','пхъэхъуей','дежьей',
    'пхъэжабэ','шезае','кхэр','деш','кӀэб','чъыгае','хуэржэ','фищын','бжьынгъэгъэ',
    'пщӀыкӀу','пщӀыкӀутӀ','гъамахуэ','мэлыжь','зэдэлъхуэзэшыпхъу','зэпэдзэн',
    'зэпэупщӀэн','Ӏуэпэ','хьэджэбз','зэдэлъху','дэлъхан','дэхан','дэгъуаса',
    'дэгъуапщэхь','дзэн','джадэу','файцай','фӀэцӀа','гупсэсан','еджакуэ',
    'егупсэсауэ','егупсэсэн','елъан'
]

# 3) Ara
bulunan = []
bulunmayan = []

for k in kelimeler:
    found = False
    for name, data in sozlukler.items():
        # JSON yapisi farkli olabilir
        if isinstance(data, dict):
            if k in data:
                found = True
                break
        elif isinstance(data, list):
            for item in data:
                if isinstance(item, dict) and item.get('form') == k:
                    found = True
                    break
        if found:
            break
    
    if found:
        bulunan.append(k)
    else:
        bulunmayan.append(k)

print(f"\n=== BULUNANLAR ({len(bulunan)}) ===")
for b in bulunan:
    print(f"  ✅ {b}")

print(f"\n=== BULUNMAYANLAR ({len(bulunmayan)}) ===")
for b in bulunmayan:
    print(f"  ❌ {b}")

# 4) Virgullu cikti
print(f"\n=== VIRGULLU ===")
print(", ".join(bulunmayan))
