import {
  InterstitialAd,
  RewardedAd,
  AdEventType,
  RewardedAdEventType,
  BannerAdSize,
  AppOpenAd,
} from 'react-native-google-mobile-ads';
import { getAdUnit } from '../constants/adConfig';

// --- Interstitial Ad ---

let interstitialAd: InterstitialAd | null = null;
let interstitialLoaded = false;

export function preloadInterstitial(): void {
  const unitId = getAdUnit('INTERSTITIAL');
  interstitialAd = InterstitialAd.createForAdRequest(unitId, {
    keywords: ['finanças', 'dívida', 'crédito', 'empréstimo', 'banco'],
  });

  interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
    interstitialLoaded = true;
  });

  interstitialAd.addAdEventListener(AdEventType.ERROR, () => {
    interstitialLoaded = false;
  });

  interstitialAd.load();
}

export function showInterstitial(): Promise<void> {
  return new Promise((resolve) => {
    if (!interstitialAd || !interstitialLoaded) {
      resolve();
      return;
    }

    interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      interstitialLoaded = false;
      // Preload next one
      preloadInterstitial();
      resolve();
    });

    interstitialAd.show();
  });
}

// --- Rewarded Ad ---

let rewardedAd: RewardedAd | null = null;
let rewardedLoaded = false;

export function preloadRewarded(): void {
  const unitId = getAdUnit('REWARDED');
  rewardedAd = RewardedAd.createForAdRequest(unitId, {
    keywords: ['finanças', 'investimento', 'educação financeira'],
  });

  rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
    rewardedLoaded = true;
  });

  rewardedAd.addAdEventListener(AdEventType.ERROR, () => {
    rewardedLoaded = false;
  });

  rewardedAd.load();
}

export function showRewarded(): Promise<boolean> {
  return new Promise((resolve) => {
    if (!rewardedAd || !rewardedLoaded) {
      // If ad not loaded, grant access anyway (don't block user)
      resolve(true);
      return;
    }

    let earned = false;

    rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      earned = true;
    });

    rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      rewardedLoaded = false;
      preloadRewarded();
      resolve(earned);
    });

    rewardedAd.show();
  });
}

// --- App Open Ad ---

let appOpenAd: AppOpenAd | null = null;
let appOpenLoaded = false;

export function preloadAppOpen(): void {
  const unitId = getAdUnit('APP_OPEN');
  appOpenAd = AppOpenAd.createForAdRequest(unitId);

  appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
    appOpenLoaded = true;
  });

  appOpenAd.addAdEventListener(AdEventType.ERROR, () => {
    appOpenLoaded = false;
  });

  appOpenAd.load();
}

export function showAppOpen(): Promise<void> {
  return new Promise((resolve) => {
    if (!appOpenAd || !appOpenLoaded) {
      resolve();
      return;
    }

    appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
      appOpenLoaded = false;
      resolve();
    });

    appOpenAd.show();
  });
}

// --- Initialize all ads ---

export function initializeAds(): void {
  preloadInterstitial();
  preloadRewarded();
  preloadAppOpen();
}

// --- Banner config export ---

export const BANNER_AD_UNIT = getAdUnit('BANNER');
export const BANNER_SIZE = BannerAdSize.ANCHORED_ADAPTIVE_BANNER;
