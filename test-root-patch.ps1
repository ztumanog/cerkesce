$ErrorActionPreference = "Stop"

$BaseUrl  = "http://localhost:3000"
$Endpoint = "$BaseUrl/api/curation/lexemes"

Write-Host "=== 0) PATCH endpoint kontrolu ===" -ForegroundColor Cyan
$probe = 0
try {
    $r = Invoke-WebRequest -Uri $Endpoint -Method PATCH -ContentType "application/json" -Body '{"id":"__probe__","expected":{},"patch":{}}' -UseBasicParsing -ErrorAction Stop
    $probe = [int]$r.StatusCode
} catch {
    if ($_.Exception.Response) { $probe = [int]$_.Exception.Response.StatusCode.value__ } else { $probe = -1 }
}
Write-Host "PATCH -> HTTP $probe"

if ($probe -eq 405) {
    Write-Host "SONUC: Endpoint PATCH kabul etmiyor (405)." -ForegroundColor Red
    Write-Host "Cozum: app/api/curation/lexemes/route.ts icinde 'export async function PATCH' olmali." -ForegroundColor Yellow
    exit 20
}
if ($probe -eq -1) {
    Write-Host "SONUC: Sunucuya ulasilamadi. 'npm run dev' calisiyor mu?" -ForegroundColor Red
    exit 21
}

Write-Host ""
Write-Host "=== 1) lexemes.json okunuyor ===" -ForegroundColor Cyan
$paths = @(".\public\data\linguistic\lexemes.json", ".\data\linguistic\lexemes.json", "..\public\data\linguistic\lexemes.json")
$lexemesPath = $null
foreach ($p in $paths) { if (Test-Path $p) { $lexemesPath = $p; break } }
if (-not $lexemesPath) {
    Write-Host "SONUC: lexemes.json bulunamadi. Proje kokunde misin?" -ForegroundColor Red
    exit 1
}
Write-Host "Kaynak: $lexemesPath"

$raw = Get-Content $lexemesPath -Raw -Encoding UTF8 | ConvertFrom-Json
if ($raw -is [array]) { $list = $raw } elseif ($raw.lexemes) { $list = $raw.lexemes } else { $list = $null }
if (-not $list -or $list.Count -eq 0) {
    Write-Host "SONUC: lexemes.json bos." -ForegroundColor Red
    exit 1
}
Write-Host "Toplam kayit: $($list.Count)"

$target = $list | Where-Object { $_.id } | Select-Object -First 1
if (-not $target) {
    Write-Host "SONUC: id alani olan kayit yok." -ForegroundColor Red
    exit 1
}

$currentRoots = @()
if ($target.rootIds) {
    if ($target.rootIds -is [array]) { $currentRoots = @($target.rootIds) } else { $currentRoots = @($target.rootIds) }
}

Write-Host ""
Write-Host "=== 2) Test kaydi ===" -ForegroundColor Cyan
Write-Host "id       : $($target.id)"
Write-Host "rootIds  : $($currentRoots -join ', ')"

$testRoot = "TEST-ROOT-" + (Get-Random -Maximum 9999)
$newRoots = @($currentRoots) + $testRoot

$bodyObj = @{
    id       = $target.id
    expected = $target
    patch    = @{ rootIds = $newRoots }
}
$bodyJson = $bodyObj | ConvertTo-Json -Depth 20

Write-Host ""
Write-Host "=== 3) PATCH gonderiliyor ===" -ForegroundColor Cyan
Write-Host ("Patch rootIds: " + ($newRoots -join ", "))

$result = $null
$status = 0
try {
    $resp = Invoke-WebRequest -Uri $Endpoint -Method PATCH -ContentType "application/json" -Body $bodyJson -UseBasicParsing -ErrorAction Stop
    $status = [int]$resp.StatusCode
    $result = $resp.Content | ConvertFrom-Json
} catch {
    if ($_.Exception.Response) {
        $status = [int]$_.Exception.Response.StatusCode.value__
        try {
            $sr = New-Object IO.StreamReader($_.Exception.Response.GetResponseStream())
            $errTxt = $sr.ReadToEnd()
            Write-Host "Sunucu yaniti:" -ForegroundColor Yellow
            Write-Host $errTxt
        } catch {}
    } else {
        $status = -1
    }
}

Write-Host "HTTP $status"
if ($status -ge 400 -or $status -eq -1) {
    Write-Host "SONUC: PATCH basarisiz." -ForegroundColor Red
    exit 2
}

Write-Host ""
Write-Host "=== 4) Dogrulama ===" -ForegroundColor Cyan
if (-not $result -or -not $result.ok) {
    Write-Host "SONUC: yanit ok:false" -ForegroundColor Red
    if ($result) { $result | ConvertTo-Json -Depth 5 | Write-Host }
    exit 3
}

$savedRoots = @()
if ($result.record -and $result.record.rootIds) {
    if ($result.record.rootIds -is [array]) { $savedRoots = @($result.record.rootIds) } else { $savedRoots = @($result.record.rootIds) }
}

Write-Host "Kaydedilen : $($savedRoots -join ', ')"
Write-Host "Beklenen   : $($newRoots -join ', ')"

$a = ($newRoots   | ForEach-Object { [string]$_ } | Sort-Object) -join "|"
$b = ($savedRoots | ForEach-Object { [string]$_ } | Sort-Object) -join "|"

$ok = $false
if ($a -eq $b) {
    Write-Host "rootIds DEGISTI (sorun yok)" -ForegroundColor Green
    $ok = $true
} else {
    Write-Host "rootIds DEGISMEDI (API yazmiyor)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== 5) Rollback ===" -ForegroundColor Cyan
$rbBody = @{
    id       = $target.id
    expected = $result.record
    patch    = @{ rootIds = $currentRoots }
} | ConvertTo-Json -Depth 20

try {
    $rb = Invoke-WebRequest -Uri $Endpoint -Method PATCH -ContentType "application/json" -Body $rbBody -UseBasicParsing -ErrorAction Stop
    $rbRes = $rb.Content | ConvertFrom-Json
    if ($rbRes.ok) {
        Write-Host "Rollback tamam." -ForegroundColor Green
    } else {
        Write-Host "Rollback ok:false" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Rollback istegi basarisiz. $($target.id) kaydini elle kontrol et." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== SONUC ===" -ForegroundColor Cyan
if ($ok) {
    Write-Host "API rootIds yaziyor. Sorun frontend'de." -ForegroundColor Green
    exit 0
} else {
    Write-Host "API rootIds YAZMIYOR. Kontrol:" -ForegroundColor Red
    Write-Host "  1) route.ts icinde ALLOWED_PATCH_KEYS listesinde 'rootIds' var mi?" -ForegroundColor Yellow
    Write-Host "  2) Zod/prisma semasinda rootIds alani var mi?" -ForegroundColor Yellow
    Write-Host "  3) PATCH handler patch'i record'a yansitiyor mu?" -ForegroundColor Yellow
    exit 10
}