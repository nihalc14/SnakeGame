# Building an APK for Android

This guide shows how to build a release APK you can install directly on your Android phone.

## Prerequisites

You need to install these tools **on your local machine** (not in this sandbox):

### 1. **Java Development Kit (JDK) 17+**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Or use: `choco install openjdk` (Windows) or `brew install openjdk` (Mac)
   - Verify: `java -version`

### 2. **Android SDK**
   - Download Android Studio: https://developer.android.com/studio
   - Or install via: `choco install android-sdk` (Windows)
   - Set `ANDROID_HOME` environment variable to your SDK location
   - Verify: `echo %ANDROID_HOME%` (Windows) or `echo $ANDROID_HOME` (Mac/Linux)

### 3. **Node.js & npm**
   - Download from: https://nodejs.org (LTS recommended)
   - Verify: `npm --version`

## Building the APK

### Step 1: Install Dependencies

```bash
cd D:\Claude\SnakeGame
npm install
```

### Step 2: Build Release APK

```bash
npx react-native build-android --mode=release
```

Or use the Gradle wrapper directly:

```bash
cd android
./gradlew assembleRelease
```

**On Windows**, use `gradlew.bat`:
```bash
cd android
gradlew.bat assembleRelease
```

### Step 3: Locate Your APK

After a successful build, find your APK at:

```
SnakeGame/android/app/build/outputs/apk/release/app-release.apk
```

### Step 4: Install on Your Phone

**Option A: Using ADB (Android Debug Bridge)**

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

**Option B: Manual Install**

1. Connect your Android phone via USB
2. Enable "Developer Mode" on your phone (tap Build Number 7 times in Settings)
3. Enable "USB Debugging"
4. Copy the APK file to your phone
5. Open the APK file on your phone to install

## Troubleshooting

### "ANDROID_HOME is not set"
Set the environment variable:

**Windows:**
```powershell
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\<YourUser>\AppData\Local\Android\Sdk", "User")
```

**Mac/Linux:**
```bash
export ANDROID_HOME=$HOME/Library/Android/Sdk
echo 'export ANDROID_HOME=$HOME/Library/Android/Sdk' >> ~/.zshrc
```

### "Java not found"
Ensure JDK 17+ is installed and in your PATH:

```bash
java -version
```

### Build fails with "Gradle build failed"
Try cleaning and rebuilding:

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

### APK file is too large
The debug APK will be larger (~50-100MB). The release APK is optimized but still ~30-40MB.

## Signing (Optional for Release)

The APK is automatically signed with a debug key by default. For Google Play Store or to create a custom key:

1. Generate a keystore:
```bash
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

2. Update `android/app/build.gradle` to use your keystore (see Android docs for details)

## Installing on Multiple Devices

Once you have the APK, you can share `app-release.apk` with anyone to install on their Android phone without needing to rebuild.

## Support

- React Native Docs: https://reactnative.dev/docs/android-build-setup
- Gradle Troubleshooting: https://gradle.org/install/
- ADB Guide: https://developer.android.com/studio/command-line/adb
