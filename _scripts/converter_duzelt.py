import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

f = Path("src/domain/linguistic/DialectConverter.ts")
icerik = f.read_text(encoding="utf-8")

# 1) гъусэ kuralini duzelt (шъхьэгъусэ -> щхьэгъусэ)
icerik = icerik.replace(
    '    c = c.replace(/гъусэ/g, \'гусэ\');',
    '    // гъусэ kaldirildi - шъхьэгъусэ -> щхьэгъусэ dogru\n    // c = c.replace(/гъусэ/g, \'гусэ\');'
)

# 2) чъыгы -> жыг duzelt
icerik = icerik.replace(
    '    c = c.replace(/чъыгы/g, \'щыгы\');',
    '    c = c.replace(/чъыгы/g, \'жыг\');'
)

# 3) шъу -> ф ekle (шъу tek basina)
# PHASE 2'ye ekle
icerik = icerik.replace(
    '    c = c.replace(/шъуы/g, "___F___ы");',
    '    c = c.replace(/шъуы/g, "___F___ы");\n    c = c.replace(/^шъу$/g, "ф");\n    c = c.replace(/^шъу(?=[^ы])/g, "ф");'
)

f.write_text(icerik, encoding="utf-8")
print("DialectConverter.ts guncellendi")
