import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import AnimatedSplashScreen from './AnimatedSplashScreen';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({ navigation }: Props) {
  const [showSplash, setShowSplash] = useState(true);
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const handleSplashFinish = () => {
    setShowSplash(false);
    Animated.parallel([
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (showSplash) {
    return <AnimatedSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoCircle}>
          <View style={styles.barsContainer}>
            <View style={[styles.bar, styles.bar1]} />
            <View style={[styles.bar, styles.bar2]} />
            <View style={[styles.bar, styles.bar3]} />
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Minha Nota</Text>
          <Text style={styles.titleGold}>Financeira</Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Descubra sua nota financeira em 60 segundos.{'\n'}Sem cadastro.
        </Text>

        {/* Stats badge */}
        <Animated.View
          style={[
            styles.statsBadge,
            {
              opacity: buttonAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.statsText}>
            80% das famílias brasileiras estão endividadas.
          </Text>
          <Text style={styles.statsHighlight}>Qual é a sua situação?</Text>
        </Animated.View>
      </View>

      {/* CTA Button */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.replace('Questionnaire')}
        >
          <Text style={styles.buttonText}>Começar agora</Text>
        </TouchableOpacity>

        <View style={styles.trustBadges}>
          <View style={styles.trustBadge}>
            <Text style={styles.trustBadgeText}>🔒 Sem cadastro</Text>
          </View>
          <View style={styles.trustBadge}>
            <Text style={styles.trustBadgeText}>⚡ 60 segundos</Text>
          </View>
          <View style={styles.trustBadge}>
            <Text style={styles.trustBadgeText}>💰 Gratuito</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
    justifyContent: 'space-between',
    paddingVertical: SPACING.xxl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.navyLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.gold,
    marginBottom: SPACING.lg,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    height: 50,
  },
  bar: {
    borderRadius: 3,
  },
  bar1: {
    width: 14,
    height: 22,
    backgroundColor: COLORS.cyan,
  },
  bar2: {
    width: 14,
    height: 34,
    backgroundColor: COLORS.gold,
  },
  bar3: {
    width: 14,
    height: 44,
    backgroundColor: COLORS.green,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  titleGold: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.gold,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray400,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: SPACING.sm,
  },
  statsBadge: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.navyLight,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
  },
  statsText: {
    fontSize: 13,
    color: COLORS.gray400,
    lineHeight: 18,
  },
  statsHighlight: {
    fontSize: 14,
    color: COLORS.gold,
    fontWeight: '700',
    marginTop: 4,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.gold,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    borderRadius: BORDER_RADIUS.xl,
    width: width - SPACING.lg * 2,
    alignItems: 'center',
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.navy,
  },
  trustBadges: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  trustBadge: {
    backgroundColor: COLORS.navyLight,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
  },
  trustBadgeText: {
    fontSize: 11,
    color: COLORS.gray400,
    fontWeight: '500',
  },
});
