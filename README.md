# PlantApp - React Native Developer Case

A cross-platform React Native case project built with TypeScript, Redux Toolkit, and React Navigation.  
The implementation follows the provided onboarding/home flows and API integration requirements.

## Demo: `assets/videos`

<div align="center" style="display:flex; gap:12px; justify-content:center; flex-wrap:nowrap;">
  <div style="position:relative; border:1px solid #d0d7de; border-radius:10px; padding:8px; width:31%;">
    <div style="position:absolute; top:14px; left:14px; background:rgba(0,0,0,0.7); color:#fff; font-size:12px; padding:3px 8px; border-radius:999px;">
      Android
    </div>
    <video src="./assets/videos/android.mp4" controls muted playsinline width="100%"></video>
  </div>
  <div style="position:relative; border:1px solid #d0d7de; border-radius:10px; padding:8px; width:31%;">
    <div style="position:absolute; top:14px; left:14px; background:rgba(0,0,0,0.7); color:#fff; font-size:12px; padding:3px 8px; border-radius:999px;">
      iPhone 17 Pro Max
    </div>
    <video src="./assets/videos/iPhone17ProMax.mov" controls muted playsinline width="100%"></video>
  </div>
  <div style="position:relative; border:1px solid #d0d7de; border-radius:10px; padding:8px; width:31%;">
    <div style="position:absolute; top:14px; left:14px; background:rgba(0,0,0,0.7); color:#fff; font-size:12px; padding:3px 8px; border-radius:999px;">
      iPhone 16e
    </div>
    <video src="./assets/videos/iPhone16e.mov" controls muted playsinline width="100%"></video>
  </div>
</div>

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm start
```

3. Run app:

```bash
npm run android
npm run ios
```

## Tech Stack

- Expo / React Native
- TypeScript
- Navigation: React Navigation (`native-stack` + `bottom-tabs`)
- State management: Redux Toolkit + React Redux
- Data fetching: native `fetch` wrapper with timeout/error handling
- UI: React Native `StyleSheet` + reusable custom components
- Lint/format: ESLint + Prettier (no Husky/lint-staged configured)

## App Flows

### Onboarding Flow

```text
[App Start]
    |
    v
[Check onboardingCompleted]
    | Yes -------------------------------> [Home Tabs]
    |
    No
    v
[Welcome Screen] --> [Onboarding Carousel] --> [Paywall (source: onboarding)]
                                                       |
                                                       v
                                            [Close or Purchase]
                                                       |
                                                       v
                                                   [Home Tabs]
```

### Home Flow

```text
[Home Screen]
    |-------------------------------> [Fetch /getQuestions] --> [Carousel Render]
    |                                           |
    |                                           v
    |                              [loading / error / empty / success]
    |
    |-------------------------------> [Fetch /getCategories] --> [Grid Render]
                                                |
                                                v
                                   [loading / error / empty / success]
```

## State Management

- Store keeps global user status: `onboardingCompleted`, `isSubscriber`.
- `RootNavigator` consumes `onboardingCompleted` to select initial route.
- `HomeScreen` consumes `isSubscriber` to conditionally show premium upsell card.
- Paywall actions dispatch state updates (`setOnboardingCompleted`, `setIsSubscriber`).
- Service/data requests stay in a service layer, while UI uses predictable global flags from Redux.
- Redux is preferred over local state here because onboarding/subscription flags are shared across multiple screens and app start logic.

## Persistence: Onboarding Should Not Repeat

- Persistence uses MMKV (`react-native-mmkv`).
- User status is loaded on startup and injected as preloaded Redux state.
- Store subscription persists user status after state changes.
- On paywall close from onboarding (or purchase from onboarding), `onboardingCompleted` is set to `true`.
- On next launch, navigator starts directly from home flow instead of onboarding.

## Case Requirements Coverage

- [x] React Native cross-platform app structure (Expo + React Native).
- [x] TypeScript used across the project.
- [x] Redux added for global user status (`onboardingCompleted`, `isSubscriber`).
- [x] API integration from case endpoints:
  - `/getCategories`
  - `/getQuestions`
- [x] Two core flows implemented: onboarding and home.
- [x] Onboarding completion rule implemented:
  - Closing paywall from onboarding navigates to home.
  - Completed users do not re-enter onboarding on next app launch.
- [x] Pixel-focused UI implementation for core onboarding, paywall, and home screens.
