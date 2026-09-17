# File: scripts/phase2-verify.ps1
# Generated: 17.09.2026
# Layer: Automation

$ErrorActionPreference = "Stop"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " FAZ 2 BASELINE & ADR-0009 DOĞRULAMA BETİĞİ" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. ADR-0009 Lehçe Kontrolü (Büyük/küçük harf ve kelime sınırı duyarlı)
Write-Host "`n[1/4] ADR-0009 Lehçe Kod Kontrolü (KBD/ADY)..." -ForegroundColor Yellow
$forbiddenMatches = Get-ChildItem -Path "src" -Recurse -Include *.ts,*.tsx | Select-String -Pattern "\b(DOGU|BATI)\b" -CaseSensitive

if ($forbiddenMatches) {
    Write-Host "`n[HATA] ADR-0009 İhlali! 'DOGU' veya 'BATI' kullanımı tespit edildi:" -ForegroundColor Red
    $forbiddenMatches | ForEach-Object {
        Write-Host "  -> $($_.Filename):$($_.LineNumber) - $($_.Line.Trim())" -ForegroundColor Red
    }
    Write-Host "`nLütfen bu ifadeleri KBD veya ADY ile güncelleyin." -ForegroundColor Red
    exit 1
} else {
    Write-Host " -> OK: KBD/ADY standardına uygun, DOGU/BATI bulunamadı." -ForegroundColor Green
}

# 2. TypeScript Tip Kontrolü
Write-Host "`n[2/4] TypeScript Tip Derleme Kontrolü (tsc --noEmit)..." -ForegroundColor Yellow
npx tsc --noEmit
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[HATA] TypeScript derleme hatası tespit edildi!" -ForegroundColor Red
    exit 1
}
Write-Host " -> OK: Derleme hatasız tamamlandı." -ForegroundColor Green

# 3. Faz 2 Test Paketi
Write-Host "`n[3/4] Faz 2 Kabul Test Paketi Çalıştırılıyor..." -ForegroundColor Yellow
npx vitest run src/tests/Phase2ExitCriteria.test.ts src/tests/RealDataIntegration.test.ts src/tests/LanguageFilter.test.ts src/tests/DebugRepository.test.ts src/tests/ReverseTranslationSearch.test.ts

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[HATA] Faz 2 kabul testlerinde başarısızlık var!" -ForegroundColor Red
    exit 1
}
Write-Host " -> OK: Tüm Faz 2 testleri %100 yeşil." -ForegroundColor Green

# 4. Git Sahneleme Kontrolü
Write-Host "`n[4/4] Değişiklikler Git Sahnesine Alınıyor..." -ForegroundColor Yellow
git add src/ archive/document/PHASES.md PROJECT_STATUS.md 2>$null

Write-Host "`n==================================================" -ForegroundColor Green
Write-Host " FAZ 2 STABLE BASELINE DOĞRULANDI!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
git status --short
