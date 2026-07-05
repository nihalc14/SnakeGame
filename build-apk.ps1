# Snake Game APK Build Script for Windows
# Run this with: powershell -ExecutionPolicy Bypass -File build-apk.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Snake Game APK Build Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check prerequisites
Write-Host "`nChecking prerequisites..." -ForegroundColor Yellow

$hasJava = $null -ne (Get-Command java -ErrorAction SilentlyContinue)
$hasNode = $null -ne (Get-Command npm -ErrorAction SilentlyContinue)
$hasAndroidSDK = Test-Path $env:ANDROID_HOME

if (-not $hasJava) {
    Write-Host "✗ Java not found. Install JDK 17+: https://www.oracle.com/java/technologies/downloads/" -ForegroundColor Red
    exit 1
}

if (-not $hasNode) {
    Write-Host "✗ Node.js/npm not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

if (-not $hasAndroidSDK) {
    Write-Host "✗ ANDROID_HOME not set. Install Android SDK and set the environment variable." -ForegroundColor Red
    Write-Host "  Instructions: https://reactnative.dev/docs/android-build-setup" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Java is installed" -ForegroundColor Green
Write-Host "✓ Node.js is installed" -ForegroundColor Green
Write-Host "✓ Android SDK found at: $env:ANDROID_HOME" -ForegroundColor Green

# Install dependencies
Write-Host "`nInstalling npm dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ npm install failed" -ForegroundColor Red
    exit 1
}

# Build APK
Write-Host "`nBuilding release APK..." -ForegroundColor Yellow
Write-Host "(This may take 2-5 minutes...)" -ForegroundColor Gray

cd android
gradlew.bat assembleRelease

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Build failed" -ForegroundColor Red
    cd ..
    exit 1
}

cd ..

# Verify APK was created
$apkPath = "android\app\build\outputs\apk\release\app-release.apk"
if (Test-Path $apkPath) {
    $size = (Get-Item $apkPath).Length / 1MB
    Write-Host "`n================================" -ForegroundColor Green
    Write-Host "✓ APK Build Successful!" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host "`nAPK Location: $apkPath" -ForegroundColor Cyan
    Write-Host "APK Size: $([math]::Round($size, 2)) MB" -ForegroundColor Cyan
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Connect your Android phone via USB" -ForegroundColor White
    Write-Host "2. Enable Developer Mode (tap Build Number 7 times in Settings)" -ForegroundColor White
    Write-Host "3. Enable USB Debugging" -ForegroundColor White
    Write-Host "4. Run: adb install $apkPath" -ForegroundColor White
    Write-Host "`nOr copy the APK file to your phone and open it to install." -ForegroundColor Yellow
} else {
    Write-Host "✗ APK file not found at expected location" -ForegroundColor Red
    exit 1
}
