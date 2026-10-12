import re
from pathlib import Path

# DialectConverter.ts dosyasını oku
f = Path('src/domain/linguistic/DialectConverter.ts')
content = f.read_text(encoding='utf-8')

# Marker'ı bul
marker = '// PHASE 6: LEXICAL SOUND LAWS'

if marker not in content:
    print('HATA: Marker bulunamadi!')
    exit(1)

# Yeni kurallar (PHASE 5.5)
yeni_kurallar = '''    // PHASE 5.5: C-9.2 YENI KURALLAR (Adyghe -> Kabardian)
    c = c.replace(/шIо/g, 'фIо');   // шIо -> фIо (гушIо -> гуфIэ)
    c = c.replace(/щIэ/g, 'кIэ');   // щIэ -> кIэ (гущIэгъу -> гукIэгъу)
    c = c.replace(/пс/g, 'пш');     // пс -> пш (гупсысэ -> гупшысэ)
    c = c.replace(/щхь/g, 'шъхь');  // щхь -> шъхь (щхьэщэ -> шъхьащэ)

'''

# Marker'dan önce ekle
content = content.replace(marker, yeni_kurallar + marker)

# Geri yaz
f.write_text(content, encoding='utf-8')
print('✅ Kurallar eklendi!')
print(f'   - шIо -> фIо')
print(f'   - щIэ -> кIэ')
print(f'   - пс -> пш')
print(f'   - щхь -> шъхь')