import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { calculateScore } from '../utils/scoring';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Loading'>;
  route: RouteProp<RootStackParamList, 'Loading'>;
};

const LOADING_STEPS = [
  'Analisando sua renda...',
  'Calculando comprometimento...',
  'Verificando nível de endividamento...',
  'Avaliando reserva de emergência...',
  'Gerando sua nota financeira...',
];

export default function LoadingScreen({ navigation, route }: Props) {
  const { answers } = route.params;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate progress bar over 3 seconds
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: false,
    }).start();

    // Cycle through loading steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 700);

    // Navigate to result after animation
    const timer = setTimeout(() => {
      const score = calculateScore(answers);
      navigation.replace('Result', { answers, score });
    }, 3800);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.content}>
        {/* Animated dots */}
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((i) => (
            <PulsingDot key={i} delay={i * 300} />
          ))}
        </View>

        <Text style={styles.title}>Calculando sua nota...</Text>

        {/* Current step text */}
        <Text style={styles.stepText}>{LOADING_STEPS[currentStep]}</Text>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth }]}
            />
          </View>
        </View>

        <Text style={styles.disclaimer}>
          Sua nota é calculada com base nas suas respostas{'\n'}e dados
          estatísticos do mercado brasileiro.
        </Text>
      </View>

      {/* Ad placeholder area */}
      <View style={styles.adPlaceholder}>
        <Text style={styles.adPlaceholderText}>
          📢 Espaço para anúncio (Interstitial Ad)
        </Text>
      </View>
    </View>
  );
}

function PulsingDot({ delay }: { delay: number }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 500,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.dot,
        { transform: [{ scale: scaleAnim }] },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
    gap: 12,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.gold,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  stepText: {
    fontSize: 14,
    color: COLORS.cyan,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: SPACING.xl,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.navyLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
    borderRadius: 4,
  },
  disclaimer: {
    fontSize: 11,
    color: COLORS.gray600,
    textAlign: 'center',
    marginTop: SPACING.xl,
    lineHeight: 16,
  },
  adPlaceholder: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: SPACING.lg,
    right: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray700,
    borderStyle: 'dashed',
  },
  adPlaceholderText: {
    fontSize: 12,
    color: COLORS.gray500,
  },
});
