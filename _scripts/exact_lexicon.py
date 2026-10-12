from pathlib import Path
f = Path('src/domain/linguistic/DialectConverter.ts')
c = f.read_text(encoding='utf-8')
c = c.replace('"хьандзу": "хьэвэ",', '"хьандзу": "хьэвэ",\n    "нэшъу": "нэф",')
f.write_text(c, encoding='utf-8')
print('OK')
