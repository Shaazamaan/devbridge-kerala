# This script disables all auto-brightness and content-adaptive brightness features.
# MUST BE RUN AS ADMINISTRATOR.

Write-Host "Disabling Adaptive Brightness via Power Config..." -ForegroundColor Cyan
# Set Adaptive Brightness to Off (0) for all power schemes and both AC/DC
$schemes = powercfg /list | Select-String -Pattern '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | ForEach-Object { $_.Matches[0].Value }
foreach ($scheme in $schemes) {
    powercfg -setacvalueindex $scheme 7516b95f-f776-4464-8c53-06167f40cc99 fbd9aa66-9553-4097-ba44-ed6e9d65eab8 0
    powercfg -setdcvalueindex $scheme 7516b95f-f776-4464-8c53-06167f40cc99 fbd9aa66-9553-4097-ba44-ed6e9d65eab8 0
}
powercfg -s SCHEME_CURRENT

Write-Host "Disabling Content Adaptive Brightness Control (CABC) in Registry..." -ForegroundColor Cyan
$regPath = "HKLM:\SYSTEM\CurrentControlSet\Control\GraphicsDrivers"
if (-not (Test-Path $regPath)) {
    New-Item -Path $regPath -Force
}
New-ItemProperty -Path $regPath -Name "DisableCABC" -Value 1 -PropertyType DWORD -Force

Write-Host "Disabling Sensor Monitoring Service (SensrSvc)..." -ForegroundColor Cyan
Set-Service -Name "SensrSvc" -StartupType Disabled
Stop-Service -Name "SensrSvc" -Force -ErrorAction SilentlyContinue

Write-Host "Done! Please restart your computer for all changes to take effect." -ForegroundColor Green
