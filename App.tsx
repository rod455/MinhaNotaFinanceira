import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeAds } from './src/utils/ads';

export default function App() {
  useEffect(() => {
    // Initialize Mobile Ads SDK
    mobileAds()
      .initialize()
      .then(() => {
        // Preload all ad formats
        initializeAds();
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0B1838" />
      <AppNavigator />
    </>
  );
}
