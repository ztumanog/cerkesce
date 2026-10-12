import json
from pathlib import Path

veri = json.loads(Path("_scripts/wiktionary_veri.json").read_text(encoding="utf-8"))

# Template ve özel sayfaları filtrele
temiz = [v for v in veri if not v["form"].startswith(("Шаблон:", "НапэкӀуэцӀ", "Уикипедиэ", "MediaWiki", "Category", "Template", "Модул"))]
print(f"Toplam: {len(veri)}")
print(f"Temiz: {len(temiz)}")

# гуфӀэ ara (farklı kodlamalar)
print("\n=== 'гуф' içeren formlar ===")
for v in temiz:
    if "гуф" in v["form"]:
        print(f"  {v['form']!r} -> pos={v['partOfSpeech']}, ipa={v['ipa']}, examples={len(v['examples'])}")

# İlk 10 anlamlı kayıt
print("\n=== İlk 10 anlamlı kayıt ===")
for v in temiz[:10]:
    print(f"  {v['form']}: pos={v['partOfSpeech']}, ipa={v['ipa']}, examples={len(v['examples'])}")

# Örnek cümle bulunan ilk 10
print("\n=== Örnek cümle bulunan ilk 10 ===")
sayac = 0
for v in temiz:
    if v["examples"]:
        print(f"\n{v['form']}:")
        for c in v["examples"][:2]:
            print(f"  - {c[:100]}")
        sayac += 1
        if sayac >= 10:
            break

# İstatistikler
print(f"\n=== İstatistikler (temiz) ===")
pos_dolu = sum(1 for v in temiz if v["partOfSpeech"])
ipa_dolu = sum(1 for v in temiz if v["ipa"])
ex_dolu = sum(1 for v in temiz if v["examples"])
print(f"  partOfSpeech: {pos_dolu}")
print(f"  ipa:          {ipa_dolu}")
print(f"  examples:     {ex_dolu}")
