# S2-005 Validation Tests (ADR-LEX-001 + ADR-LEX-002)
$root  = "E:\projeler\Cerkesce"
$api   = "http://localhost:3000/api/admin/curation/lexeme"
$audit = "$root\public\data\linguistic\audit_log.jsonl"
$adr   = "$root\docs\architecture\adr\ADR-LEX-002-CONCEPT_REGISTRY_FREEZE.md"
$adrIdx = "$root\docs\architecture\adr\ADR_INDEX.md"
$pass = 0; $fail = 0

function Invoke-Update($id, $changes, $reason, $editor) {
    $b = @{ id = $id; reason = $reason; editor = $editor }
    foreach ($k in $changes.Keys) { $b[$k] = $changes[$k] }
    try {
        return Invoke-RestMethod -Method Patch -Uri $script:api -ContentType "application/json" -Body ($b | ConvertTo-Json -Depth 5)
    } catch {
        if ($_.ErrorDetails.Message) { return ($_.ErrorDetails.Message | ConvertFrom-Json) }
        return @{ error = $_.Exception.Message }
    }
}

function Test-Result($name, $resp, $expectReject) {
    $err = $resp.error
    if ($expectReject -and $err) {
        Write-Host "  PASS [$name] Red: $err" -ForegroundColor Green; $script:pass++
    } elseif (-not $expectReject -and -not $err) {
        Write-Host "  PASS [$name] Basarili" -ForegroundColor Green; $script:pass++
    } else {
        Write-Host "  FAIL [$name] Beklenmedik: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Red; $script:fail++
    }
}

Write-Host "=== S2-005 VALIDATION SUITE ===" -ForegroundColor Cyan

Write-Host "--- TEST A: Gecersiz Root ---" -ForegroundColor Cyan
Test-Result "A" (Invoke-Update "L-GUBZHYGE" @{ rootIds = @("R-SAHTE-999") } "invalid root" "s2-test") $true

Write-Host "--- TEST B: Gecersiz Family ---" -ForegroundColor Cyan
Test-Result "B" (Invoke-Update "L-GUBZHYGE" @{ wordFamilyId = "WF-SAHTE-999" } "invalid family" "s2-test") $true

Write-Host "--- TEST C: Reason bos ---" -ForegroundColor Cyan
Test-Result "C" (Invoke-Update "L-GUBZHYGE" @{ notes = "reason test" } "" "s2-test") $true

Write-Host "--- TEST D: Editor bos ---" -ForegroundColor Cyan
Test-Result "D" (Invoke-Update "L-GUBZHYGE" @{ notes = "editor test" } "editor test" "") $true

Write-Host "--- TEST E: Gecerli yazma + backup ---" -ForegroundColor Cyan
$before = (Get-ChildItem "$root\public\data\linguistic" -Filter "lexemes.json.bak*").Count
Test-Result "E" (Invoke-Update "L-GUBZHYGE" @{ notes = "S2-005 final validation" } "S2-005 final" "ztuman") $false
$after = (Get-ChildItem "$root\public\data\linguistic" -Filter "lexemes.json.bak*").Count
if ($after -gt $before) {
    Write-Host "  PASS [E2] Backup olustu: once $before sonra $after" -ForegroundColor Green; $pass++
    Get-ChildItem "$root\public\data\linguistic" -Filter "lexemes.json.bak*" |
        Sort-Object LastWriteTime -Descending | Select-Object -First 1 Name, LastWriteTime | Format-Table -AutoSize
} else {
    Write-Host "  FAIL [E2] Backup olusmadi" -ForegroundColor Red; $fail++
}

Write-Host "--- TEST F: Audit log sertlestirme ---" -ForegroundColor Cyan
$last = Get-Content $audit -Tail 1 | ConvertFrom-Json
Write-Host "  editor: $($null -ne $last.editor) | reason: $($null -ne $last.reason) | action: $($null -ne $last.action)" -ForegroundColor Yellow
if ($null -ne $last.editor -and $null -ne $last.reason) {
    Write-Host "  PASS [F] Audit sertlestirme dogrulandi" -ForegroundColor Green; $pass++
} else {
    Write-Host "  FAIL [F] editor veya reason audit kaydinda eksik" -ForegroundColor Red; $fail++
}

Write-Host "=== ADR-LEX-002 DOGRULAMA ===" -ForegroundColor Cyan
if (Test-Path $adr) { Write-Host "  PASS ADR dosyasi mevcut" -ForegroundColor Green; $pass++ }
else { Write-Host "  FAIL ADR dosyasi yok" -ForegroundColor Red; $fail++ }

if ((Test-Path $adrIdx) -and (Select-String -Path $adrIdx -Pattern "ADR-LEX-002" -Quiet)) {
    Write-Host "  PASS ADR_INDEX kaydi var" -ForegroundColor Green; $pass++
} else { Write-Host "  FAIL ADR_INDEX icinde ADR-LEX-002 yok" -ForegroundColor Red; $fail++ }

if (Select-String -Path $audit -Pattern "ADR-LEX-002-APPLY" -Quiet) {
    Write-Host "  PASS Audit kaydinda ADR-LEX-002-APPLY var" -ForegroundColor Green; $pass++
} else { Write-Host "  FAIL Audit kaydinda ADR-LEX-002-APPLY yok" -ForegroundColor Red; $fail++ }

$regAudit = "$root\public\data\linguistic\concept_registry_audit.json"
if (Test-Path $regAudit) {
    $ra = Get-Content $regAudit -Raw | ConvertFrom-Json
    $ulid = $ra.formatDistribution.ULID
    Write-Host "  ULID: $ulid | Ortak: $($ra.inBoth.Count) | Lexeme: $($ra.onlyInLexemes.Count) | Registry: $($ra.onlyInRegistry.Count)" -ForegroundColor Yellow
    if ($ulid -eq 0) { Write-Host "  PASS ULID = 0" -ForegroundColor Green; $pass++ }
    else { Write-Host "  FAIL ULID sifir degil: $ulid" -ForegroundColor Red; $fail++ }
} else { Write-Host "  UYARI concept_registry_audit.json bulunamadi" -ForegroundColor Yellow }

Write-Host "=== OZET: $pass PASS / $fail FAIL ===" -ForegroundColor $(if ($fail -eq 0) { "Green" } else { "Red" })
if ($fail -eq 0) { Write-Host "  S2-005 KAPANMAYA HAZIR, Sprint 2C acilabilir" -ForegroundColor Green }
