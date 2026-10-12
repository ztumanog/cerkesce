from pathlib import Path
f = Path('src/tests/domain/linguistic/DialectConverter.cert.test.ts')
c = f.read_text(encoding='utf-8')
c = c.replace('\u04c0', 'I')
f.write_text(c, encoding='utf-8')
print('OK: Kiril -> Latin')
