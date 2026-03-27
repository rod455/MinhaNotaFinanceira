import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { BANNER_AD_UNIT } from '../utils/ads';

export default function AdBanner() {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={BANNER_AD_UNIT}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          keywords: ['finanças', 'dívida', 'crédito', 'empréstimo'],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
});
