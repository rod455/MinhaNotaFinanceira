// AdMob Configuration — Minha Nota Financeira
// Publisher ID: ca-app-pub-9316035916536420

import { Platform } from 'react-native';

// Ad Unit IDs
export const AD_UNITS = {
  // Interstitial — shown during loading screen (calculando nota)
  INTERSTITIAL: 'ca-app-pub-9316035916536420/4777986519',

  // Rewarded Video — shown to unlock detailed plan
  REWARDED: 'ca-app-pub-9316035916536420/2520588918',

  // App Open — shown on app launch
  APP_OPEN: 'ca-app-pub-9316035916536420/8948198215',

  // Banner — persistent footer throughout the app
  BANNER: 'ca-app-pub-9316035916536420/7635116545',
} as const;

// Test Ad Unit IDs (use during development)
export const TEST_AD_UNITS = {
  INTERSTITIAL: Platform.select({
    android: 'ca-app-pub-3940256099942544/1033173712',
    ios: 'ca-app-pub-3940256099942544/4411468910',
  }) as string,
  REWARDED: Platform.select({
    android: 'ca-app-pub-3940256099942544/5224354917',
    ios: 'ca-app-pub-3940256099942544/1712485313',
  }) as string,
  APP_OPEN: Platform.select({
    android: 'ca-app-pub-3940256099942544/9257395921',
    ios: 'ca-app-pub-3940256099942544/5575463023',
  }) as string,
  BANNER: Platform.select({
    android: 'ca-app-pub-3940256099942544/6300978111',
    ios: 'ca-app-pub-3940256099942544/2934735716',
  }) as string,
};

// Toggle this to false for production builds
const USE_TEST_ADS = __DEV__;

export function getAdUnit(type: keyof typeof AD_UNITS): string {
  return USE_TEST_ADS ? TEST_AD_UNITS[type] : AD_UNITS[type];
}
