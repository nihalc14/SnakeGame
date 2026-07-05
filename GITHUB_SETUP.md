# GitHub Actions APK Builder Setup

This guide shows how to use GitHub Actions to automatically build your Snake game APK in the cloud.

## Prerequisites

- GitHub account (free at https://github.com)
- Git installed on your local machine

## Setup Instructions

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `snake-game`)
3. Choose "Public" or "Private" (your choice)
4. Do NOT initialize with README, .gitignore, or license (we have our own)
5. Click "Create repository"

### Step 2: Push Your Code to GitHub

Open a terminal in the `D:\Claude\SnakeGame` directory and run:

```bash
git init
git add .
git commit -m "Initial commit: Snake game with GitHub Actions build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

### Step 3: Trigger the Build

The APK will build automatically when you:

1. **Push code** to `main`, `master`, or `develop` branch
2. **Open a pull request**
3. **Manually trigger** via Actions tab

### Step 4: Download Your APK

#### Option A: From Artifacts (Recommended)

1. Go to your GitHub repository
2. Click the **"Actions"** tab at the top
3. Click the latest workflow run (e.g., "Build APK")
4. Scroll down to **"Artifacts"** section
5. Download **`snake-game-apk`** (contains `app-release.apk`)

#### Option B: From Releases (For Tagged Versions)

To create a release with the APK:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Then download from the **"Releases"** tab on GitHub.

## Workflow Details

The GitHub Actions workflow (`.github/workflows/build-apk.yml`) automatically:

- ✅ Sets up Java 17 (required for Android build)
- ✅ Sets up Android SDK (required for compilation)
- ✅ Installs Node.js dependencies
- ✅ Builds the release APK
- ✅ Uploads APK as an artifact (30-day retention)
- ✅ Creates a release if you push a git tag

## Installing the APK on Your Phone

Once you download the APK:

### Option 1: Using ADB
```bash
adb install app-release.apk
```

### Option 2: Manual Install
1. Copy `app-release.apk` to your Android phone
2. Open the file in your phone's file manager
3. Tap to install
4. Allow installation from unknown sources if prompted

### Option 3: Share with Others
Since the APK is already built, you can share the `app-release.apk` file with anyone and they can install it directly on their Android phone without needing to build it themselves.

## Troubleshooting

### Build Failed
Click on the failed workflow in the Actions tab and check the logs. Common issues:

- **"Gradle build failed"** — Check if `package.json` dependencies are correct
- **"Out of memory"** — GitHub's build environment ran out of RAM (rare, usually resolves on retry)
- **"npm install failed"** — Network issue, retry the workflow

To retry: Go to Actions → Failed workflow → **Rerun all jobs**

### Where's My APK?
1. Check the **Actions** tab
2. Click the workflow run that shows ✅ (green checkmark)
3. Scroll to **Artifacts** section
4. Download `snake-game-apk`

If no artifacts appear, the build failed. Check the logs.

### APK Size is Large
Release APKs are typically 30-40 MB. This is normal for React Native apps. It will shrink when installed on your phone due to APK splitting.

## Making Updates

To rebuild with changes:

```bash
# Make changes to App.tsx or other files
git add .
git commit -m "Updated game speed"
git push
```

The workflow will automatically run and build a new APK.

## Environment Variables & Signing (Advanced)

For production/Play Store releases, you can add signing keys as GitHub secrets. See `.github/workflows/build-apk.yml` for where to add them.

For now, the APK uses a debug signature (fine for testing).

## Useful GitHub Actions Commands

**Manual trigger (without pushing code):**
- Go to **Actions** → **Build APK** → **Run workflow** → **Run workflow** button

**View build logs:**
- Actions → Workflow run → Click any step to expand

**Clean up old artifacts:**
- Go to Settings → Actions → Artifacts and logs → Set retention period

## Next Steps

1. Create GitHub repository
2. Push this code
3. Go to Actions tab and watch the build
4. Download the APK once complete
5. Install on your Android phone

Questions? See https://docs.github.com/en/actions
