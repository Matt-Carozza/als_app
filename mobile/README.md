# Adaptive Lighting System Android Application

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
## Prerequisites

### Android Studio Setup
1. [**Install Android Studio**](https://developer.android.com/studio)
2. **Add Environment variables**
   1. Hit Win > Search "Edit the system environment variables" 
   2. Below the "User variables for (User)" window, press the "New..." button
      1. Variable name: ANDROID_HOME
      2. Variable value: (Unlessed specified otherwise: C:\Users\(User)\AppData\Local\Android\Sdk)
   3. Within the "User variables for (User)" window, click on Path varable and then press the "Edit..." button under the window
      1. On the "Edit environment variable" popup, press "New"
      2. Add link to Android Studio's platform tools (Unless specified otherwise: C:\Users\mcar7\AppData\Local\Android\Sdk\platform-tools)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   **Start the app**

   *Note*: The run commands automatically priorizes the .env.development over .env.production

   ```bash
   adb reverse tcp:3000 tcp:3000
   npx expo run:android
   ```

   **Using hotspot**

   You don't need to forward the data to the laptop when using a hotspot, so the `adb reverse` command is unnecesarry. Due to the Expo documenation advising against using NODE_ENV to switch between .env files, temporarily removing the development file may be necessary.
   ```bash
   npx expo run:android
   ```
