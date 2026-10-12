import subprocess
import json

# Git log'u çalıştır
result = subprocess.run([
    'git', 'log', '-p', '--all', '-S', 'L-CORPUS-3462',
    '--', 'public/data/linguistic/lexemes.json'
], capture_output=True, text=True)

print("=== GIT LOG ===")
print(result.stdout[:2000])  # İlk 2000 karakter
if result.stderr:
    print("HATA:", result.stderr)
