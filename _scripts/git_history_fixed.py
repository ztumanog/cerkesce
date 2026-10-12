import subprocess
import json

# Git Bash yolunu belirt
git_path = r"C:\Program Files\Git\bin\git.exe"

try:
    result = subprocess.run([
        git_path, 'log', '-p', '--all', '-S', 'L-CORPUS-3462',
        '--', 'public/data/linguistic/lexemes.json'
    ], capture_output=True, text=True, timeout=10)
    
    print("=== GIT LOG ===")
    if result.stdout:
        print(result.stdout[:3000])  # İlk 3000 karakter
    else:
        print("❌ Çıktı yok")
        
    if result.stderr:
        print("\nHATA:", result.stderr[:1000])
        
except FileNotFoundError:
    print("❌ Git bulunamadı: C:\\Program Files\\Git\\bin\\git.exe")
except Exception as e:
    print(f"❌ Hata: {e}")
