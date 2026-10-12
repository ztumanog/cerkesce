import json
from pathlib import Path

# 1. Yeni eklenen 10.000
lex = json.loads(Path("public/data/linguistic/lexemes.json").read_text(encoding="utf-8"))
yeni = [l for l in lex if l.get("id", "").startswith("L-CORPUS2-")]
print(f"Yeni kayıt: {len(yeni)}")

# 2. İlk 5
print("\n=== İlk 5 yeni ===")
for y in yeni[:5]:
    print(f"  {y['id']} | {y['form']} | freq={y['corpusFrequency']} | meaning='{y['literalMeaning'][:50]}'")

# 3. Anlamı boş olanlar
bos = sum(1 for y in yeni if not y.get("literalMeaning"))
print(f"\nAnlamı boş: {bos}/{len(yeni)}")

# 4. тхьэм kontrol
thxem = [y for y in yeni if y["form"] == "тхьэм"]
print(f"\nтхьэм: {len(thxem)} kayıt")
if thxem:
    print(f"  {thxem[0]}")

# 5. тхьэм sözlükte var mı?
dict_map = {}
for dict_file in Path("public/data").glob("[0-9]*.json"):
    try:
        data = json.loads(dict_file.read_text(encoding="utf-8"))
        words = data.get("words", {})
        if "тхьэм" in words:
            print(f"\n✅ тхьэм {dict_file.name}'de var:")
            print(f"  {words['тхьэм'].get('full_definition_in_html', '')[:100]}")
            break
    except:
        pass
