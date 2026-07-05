#!/bin/bash
# Snake Game APK Build Script for Mac/Linux
# Run this with: chmod +x build-apk.sh && ./build-apk.sh

echo "================================"
echo "  Snake Game APK Build Script"
echo "================================"

# Check prerequisites
echo ""
echo "Checking prerequisites..."

if ! command -v java &> /dev/null; then
    echo "✗ Java not found. Install JDK 17+: https://www.oracle.com/java/technologies/downloads/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "✗ Node.js/npm not found. Install from https://nodejs.org"
    exit 1
fi

if [ -z "$ANDROID_HOME" ]; then
    echo "✗ ANDROID_HOME not set. Install Android SDK and set the environment variable."
    echo "  Instructions: https://reactnative.dev/docs/android-build-setup"
    exit 1
fi

echo "✓ Java is installed"
echo "✓ Node.js is installed"
echo "✓ Android SDK found at: $ANDROID_HOME"

# Install dependencies
echo ""
echo "Installing npm dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "✗ npm install failed"
    exit 1
fi

# Build APK
echo ""
echo "Building release APK..."
echo "(This may take 2-5 minutes...)"

cd android
./gradlew assembleRelease

if [ $? -ne 0 ]; then
    echo "✗ Build failed"
    cd ..
    exit 1
fi

cd ..

# Verify APK was created
APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
    SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo ""
    echo "================================"
    echo "✓ APK Build Successful!"
    echo "================================"
    echo ""
    echo "APK Location: $APK_PATH"
    echo "APK Size: $SIZE"
    echo ""
    echo "Next steps:"
    echo "1. Connect your Android phone via USB"
    echo "2. Enable Developer Mode (tap Build Number 7 times in Settings)"
    echo "3. Enable USB Debugging"
    echo "4. Run: adb install $APK_PATH"
    echo ""
    echo "Or copy the APK file to your phone and open it to install."
else
    echo "✗ APK file not found at expected location"
    exit 1
fi
