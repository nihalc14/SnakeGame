# Snake Game - React Native

A simple, playable Snake game for Android built with React Native.

## Features

- Classic snake mechanics: move, eat food, grow
- Touch controls with directional buttons (↑ ← ↓ →)
- Score tracking
- Game over detection
- Reset/Play Again button

## Setup & Installation

### Prerequisites

- Node.js 18+
- Android SDK (API 28+)
- Android Studio (recommended)
- React Native CLI: `npm install -g react-native-cli`

### Steps

1. **Navigate to project directory:**
   ```bash
   cd SnakeGame
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Metro bundler:**
   ```bash
   npm start
   ```

4. **Build and run on Android (in another terminal):**
   ```bash
   npm run android
   ```

   Or if you have an Android device connected via USB:
   ```bash
   react-native run-android
   ```

## How to Play

1. Press the **directional buttons** (↑ ← ↓ →) to move the snake
2. **Eat the red food** to grow and gain points
3. **Avoid hitting yourself** or the game ends
4. **Press Reset** to restart

## Game Rules

- Snake starts with 1 segment in the middle
- Each food eaten adds 1 point and 1 body segment
- Game ends if snake collides with itself
- Snake wraps around at board edges (continuous movement)
- Game speed: 200ms per move

## Building an APK

### ⭐ Option 1: Cloud Build (GitHub Actions) - Easiest!

Build the APK automatically in the cloud without installing anything locally.

See `GITHUB_SETUP.md` for complete instructions.

### Option 2: Local Build (Windows)
```bash
powershell -ExecutionPolicy Bypass -File build-apk.ps1
```

### Option 3: Local Build (Mac/Linux)
```bash
chmod +x build-apk.sh
./build-apk.sh
```

For detailed instructions see `BUILD_APK.md`.

## File Structure

```
SnakeGame/
├── App.tsx           # Main game logic
├── android/          # Native Android project
├── babel.config.js   # Babel config
├── metro.config.js   # Metro bundler config
├── package.json      # Dependencies
├── index.js          # Entry point
├── app.json          # React Native config
├── tsconfig.json     # TypeScript config
├── BUILD_APK.md      # APK building guide
├── build-apk.ps1     # Windows build script
├── build-apk.sh      # Mac/Linux build script
└── README.md         # This file
```

## Troubleshooting

**Android SDK not found:**
- Ensure ANDROID_HOME is set to your SDK location
- Use Android Studio to install/update SDK tools

**Metro bundler issues:**
- Clear cache: `npm start -- --reset-cache`
- Kill any existing Metro processes and restart

**Device not detected:**
- Enable USB debugging on Android device
- Run `adb devices` to verify connection

## Performance

- Optimized for 60 FPS gameplay
- Minimal re-renders using React hooks
- Grid-based collision detection
- Smooth touch responsiveness

Enjoy! 🐍
