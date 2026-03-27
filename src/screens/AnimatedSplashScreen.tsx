import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
} from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

const { width, height } = Dimensions.get('window');

type Props = {
  onFinish: () => void;
};

export default function AnimatedSplashScreen({ onFinish }: Props) {
  // Animation values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const ringRotation = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.5)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const bar1Height = useRef(new Animated.Value(0)).current;
  const bar2Height = useRef(new Animated.Value(0)).current;
  const bar3Height = useRef(new Animated.Value(0)).current;
  const barsOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;
  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Phase 1: Ring appears and rotates (0–600ms)
    const phase1 = Animated.parallel([
      Animated.timing(ringOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(ringScale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(ringRotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    // Phase 2: Bars grow up (400–1000ms)
    const phase2 = Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(barsOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bar1Height, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(100),
          Animated.timing(bar2Height, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(200),
          Animated.timing(bar3Height, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]);

    // Phase 3: Trend dots appear (800–1200ms)
    const phase3 = Animated.sequence([
      Animated.delay(600),
      Animated.stagger(150, [
        Animated.spring(dot1Opacity, { toValue: 1, friction: 5, tension: 100, useNativeDriver: true }),
        Animated.spring(dot2Opacity, { toValue: 1, friction: 5, tension: 100, useNativeDriver: true }),
        Animated.spring(dot3Opacity, { toValue: 1, friction: 5, tension: 100, useNativeDriver: true }),
      ]),
    ]);

    // Phase 4: Title slides in (1000–1400ms)
    const phase4 = Animated.sequence([
      Animated.delay(800),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]);

    // Phase 5: Gold underline draws (1300–1600ms)
    const phase5 = Animated.sequence([
      Animated.delay(1100),
      Animated.timing(lineWidth, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    // Phase 6: Subtitle + tagline (1500–2000ms)
    const phase6 = Animated.sequence([
      Animated.delay(1300),
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(300),
          Animated.timing(taglineOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]);

    // Phase 7: Pulse the ring (loop until fade out)
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Run all phases
    Animated.parallel([phase1, phase2, phase3, phase4, phase5, phase6]).start(() => {
      pulseLoop.start();
    });

    // Fade out and navigate after full animation
    const exitTimer = setTimeout(() => {
      pulseLoop.stop();
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 3200);

    return () => clearTimeout(exitTimer);
  }, []);

  const ringRotate = ringRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      {/* Background decorative circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <View style={styles.content}>
        {/* Score Ring */}
        <Animated.View
          style={[
            styles.ringContainer,
            {
              opacity: ringOpacity,
              transform: [
                { scale: Animated.multiply(ringScale, pulseAnim) },
                { rotate: ringRotate },
              ],
            },
          ]}
        >
          {/* Outer ring (partial arc simulated with border) */}
          <View style={styles.outerRing}>
            <View style={styles.ringCutout} />
          </View>
        </Animated.View>

        {/* Inner circle with bars */}
        <Animated.View style={[styles.innerCircle, { opacity: ringOpacity }]}>
          {/* Chart bars */}
          <Animated.View style={[styles.barsContainer, { opacity: barsOpacity }]}>
            <Animated.View
              style={[
                styles.bar,
                styles.bar1,
                { transform: [{ scaleY: bar1Height }] },
              ]}
            />
            <Animated.View
              style={[
                styles.bar,
                styles.bar2,
                { transform: [{ scaleY: bar2Height }] },
              ]}
            />
            <Animated.View
              style={[
                styles.bar,
                styles.bar3,
                { transform: [{ scaleY: bar3Height }] },
              ]}
            />
          </Animated.View>

          {/* Trend dots */}
          <Animated.View style={[styles.dot, styles.dot1, { opacity: dot1Opacity }]} />
          <Animated.View style={[styles.dot, styles.dot2, { opacity: dot2Opacity }]} />
          <Animated.View style={[styles.dot, styles.dot3, { opacity: dot3Opacity }]} />
        </Animated.View>

        {/* Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleSlide }],
            },
          ]}
        >
          <Text style={styles.titleWhite}>Minha Nota</Text>
          <Text style={styles.titleGold}>Financeira</Text>
        </Animated.View>

        {/* Gold underline */}
        <Animated.View
          style={[
            styles.goldLine,
            {
              transform: [{ scaleX: lineWidth }],
              opacity: lineWidth,
            },
          ]}
        />

        {/* Subtitle */}
        <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
          Diagnóstico financeiro em 60 segundos
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Sem cadastro. 100% gratuito.
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const RING_SIZE = 180;
const INNER_SIZE = 140;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.gold,
    opacity: 0.02,
  },
  bgCircle2: {
    position: 'absolute',
    bottom: -50,
    left: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.cyan,
    opacity: 0.02,
  },
  content: {
    alignItems: 'center',
  },
  ringContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  outerRing: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 8,
    borderColor: COLORS.gold,
    position: 'absolute',
    overflow: 'hidden',
  },
  ringCutout: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: RING_SIZE * 0.45,
    height: RING_SIZE * 0.45,
    backgroundColor: COLORS.navy,
  },
  innerCircle: {
    position: 'absolute',
    top: (RING_SIZE - INNER_SIZE) / 2 + 0,
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: INNER_SIZE / 2,
    backgroundColor: COLORS.navyLight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 70,
  },
  bar: {
    borderRadius: 4,
    transformOrigin: 'bottom',
  },
  bar1: {
    width: 18,
    height: 35,
    backgroundColor: COLORS.cyan,
  },
  bar2: {
    width: 18,
    height: 52,
    backgroundColor: COLORS.gold,
  },
  bar3: {
    width: 18,
    height: 65,
    backgroundColor: COLORS.green,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  dot1: {
    bottom: 53,
    left: 34,
  },
  dot2: {
    bottom: 66,
    left: 58,
  },
  dot3: {
    bottom: 78,
    left: 82,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: RING_SIZE / 2 + SPACING.xl,
  },
  titleWhite: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  titleGold: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.gold,
    letterSpacing: -0.5,
    marginTop: -4,
  },
  goldLine: {
    width: 200,
    height: 4,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray400,
    fontWeight: '500',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 13,
    color: COLORS.gray500,
    fontWeight: '500',
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
});
