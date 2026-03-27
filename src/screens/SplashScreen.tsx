import React, { useEffect, useRef } from 'react';
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

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <View style={styles.content}>
        {/* Logo / Icon */}
        <Animated.View
          style={[
            styles.logoContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>📊</Text>
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.title}>Minha Nota</Text>
          <Text style={styles.titleGold}>Financeira</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View
          style={{
            opacity: buttonAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={styles.subtitle}>
            Descubra sua nota financeira em 60 segundos.{'\n'}Sem cadastro.
          </Text>
        </Animated.View>
      </View>

      {/* CTA Button */}
      <Animated.View
        style={[styles.buttonContainer, { opacity: buttonAnim }]}
      >
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.replace('Questionnaire')}
        >
          <Text style={styles.buttonText}>Começar agora</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          100% gratuito • Sem cadastro • Resultado imediato
        </Text>
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
  logoContainer: {
    marginBottom: SPACING.lg,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.navyLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.gold,
  },
  logoIcon: {
    fontSize: 48,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  titleGold: {
    fontSize: 36,
    fontWeight: '700',
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
  disclaimer: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
});
