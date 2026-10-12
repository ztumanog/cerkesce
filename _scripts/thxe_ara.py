import json
from pathlib import Path

# тхьэ (kök) tüm sözlüklerde ara
print("=== тхьэ arama ===")
bulunan = {}
for dict_file in Path("public/data").glob("[0-9]*.json"):
    try:
        data = json.loads(dict_file.read_text(encoding="utf-8"))
        words = data.get("words", {})
        if "тхьэ" in words:
            bulunan[dict_file.name] = words["тхьэ"]["full_definition_in_html"][:100]
    except:
        pass

print(f"тхьэ {len(bulunan)} sözlükte:")
for k, v in bulunan.items():
    print(f"  {k}: {v}")

# тхьэм
print("\n=== тхьэм arama ===")
bulunan2 = {}
for dict_file in Path("public/data").glob("[0-9]*.json"):
    try:
        data = json.loads(dict_file.read_text(encoding="utf-8"))
        words = data.get("words", {})
        if "тхьэм" in words:
            bulunan2[dict_file.name] = words["тхьэм"]["full_definition_in_html"][:100]
    except:
        pass

print(f"тхьэм {len(bulunan2)} sözlükte:")
for k, v in bulunan2.items():
    print(f"  {k}: {v}")
