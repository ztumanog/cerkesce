from pathlib import Path
import re
f = Path('src/domain/linguistic/DialectConverter.ts')
c = f.read_text(encoding='utf-8')
c = re.sub(r'\s*// PHASE 5\.5.*?\n\n', '\n', c, flags=re.DOTALL)
yeni = '''
    // PHASE 5.5: C-9.2 YENI KURALLAR (Adyghe -> Kabardian)
    c = c.replace(/гуфIэ/g, 'гушIо');
    c = c.replace(/гукIэгъу/g, 'гущIэгъу');
    c = c.replace(/гупшысэ/g, 'гупсысэ');
    c = c.replace(/шъхьащэ/g, 'щхьэщэ');
    c = c.replace(/фI/g, 'шIу');
    c = c.replace(/кI/g, 'щI');
    c = c.replace(/пш/g, 'пс');

'''
marker = '// PHASE 6: LEXICAL SOUND LAWS'
c = c.replace(marker, yeni + marker)
f.write_text(c, encoding='utf-8')
print('OK: PHASE 5.5 duzeltildi')
