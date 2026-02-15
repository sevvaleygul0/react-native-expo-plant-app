# PlantApp - React Native Expo

A cross-platform React Native case project built with TypeScript, Redux Toolkit, and React Navigation.  
The implementation follows the provided onboarding/home flows and API integration requirements.

## Demo: `assets/videos`

| Android | iPhone 17 Pro Max | iPhone 16e |
| --- | --- | --- |
| <a href="./assets/videos/android.mp4"><img src="./assets/videos/android.gif" alt="Android Demo" height="360" /></a> | <a href="./assets/videos/iPhone17ProMax.mov"><img src="./assets/videos/iPhone17ProMax.gif" alt="iPhone 17 Pro Max Demo" height="360" /></a> | <a href="./assets/videos/iPhone16e.mov"><img src="./assets/videos/iPhone16e.gif" alt="iPhone 16e Demo" height="360" /></a> |

Click any GIF to open the full video.

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

## Requirements

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
