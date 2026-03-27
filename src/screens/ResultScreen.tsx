import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS, SCORE_ZONES, NATIONAL_AVERAGE } from '../constants/theme';
import { getContextualPhrase } from '../utils/scoring';
import AdBanner from '../components/AdBanner';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Result'>;
  route: RouteProp<RootStackParamList, 'Result'>;
};

export default function ResultScreen({ navigation, route }: Props) {
  const { answers, score } = route.params;
  const countAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

  const zone = SCORE_ZONES[score.zone];

  useEffect(() => {
    // Animate score counting up
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(countAnim, {
          toValue: score.total,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(barAnim, {
          toValue: score.total / 100,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  }, []);

  const displayScore = countAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const barWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const comparedToAverage = score.total - NATIONAL_AVERAGE;
  const comparisonText =
    comparedToAverage > 0
      ? `acima da média nacional (${NATIONAL_AVERAGE})`
      : comparedToAverage === 0
        ? `na média nacional (${NATIONAL_AVERAGE})`
        : `abaixo da média nacional (${NATIONAL_AVERAGE})`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Header */}
          <Text style={styles.headerLabel}>Sua Nota Financeira</Text>

          {/* Score Circle */}
          <View style={[styles.scoreCircle, { borderColor: zone.color }]}>
            <AnimatedScoreText countAnim={countAnim} color={zone.color} />
            <Text style={styles.scoreMax}>/100</Text>
          </View>

          {/* Zone label */}
          <View style={[styles.zoneBadge, { backgroundColor: zone.color + '25' }]}>
            <Text style={[styles.zoneText, { color: zone.color }]}>
              {zone.emoji} {zone.label}
            </Text>
          </View>

          {/* Thermometer */}
          <View style={styles.thermometerContainer}>
            <View style={styles.thermometer}>
              <Animated.View
                style={[
                  styles.thermometerFill,
                  {
                    width: barWidth,
                    backgroundColor: zone.color,
                  },
                ]}
              />
            </View>
            <View style={styles.thermometerLabels}>
              <Text style={[styles.thermLabel, { color: COLORS.red }]}>0</Text>
              <Text style={[styles.thermLabel, { color: COLORS.orange }]}>25</Text>
              <Text style={[styles.thermLabel, { color: COLORS.yellow }]}>50</Text>
              <Text style={[styles.thermLabel, { color: COLORS.greenLight }]}>75</Text>
              <Text style={[styles.thermLabel, { color: COLORS.green }]}>100</Text>
            </View>
          </View>

          {/* Comparison */}
          <View style={styles.comparisonCard}>
            <Text style={styles.comparisonIcon}>
              {comparedToAverage >= 0 ? '📈' : '📉'}
            </Text>
            <Text style={styles.comparisonText}>
              Sua nota está{' '}
              <Text style={{ color: comparedToAverage >= 0 ? COLORS.green : COLORS.red, fontWeight: '700' }}>
                {Math.abs(comparedToAverage)} pontos {comparisonText}
              </Text>
            </Text>
          </View>

          {/* Contextual phrase */}
          <Text style={styles.contextPhrase}>
            {getContextualPhrase(score.total)}
          </Text>

          {/* Breakdown */}
          <View style={styles.breakdownContainer}>
            <Text style={styles.breakdownTitle}>Detalhamento da nota</Text>
            <BreakdownRow label="Sobra mensal" value={score.breakdown.sobraMensal} />
            <BreakdownRow label="Nível de dívida" value={score.breakdown.nivelDivida} />
            <BreakdownRow label="Adimplência" value={score.breakdown.adimplencia} />
            <BreakdownRow label="Reserva de emergência" value={score.breakdown.reservaEmergencia} />
            <BreakdownRow label="Comprometimento de renda" value={score.breakdown.comprometimentoRenda} />
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ActionPlan', { answers, score })}
        >
          <Text style={styles.primaryButtonText}>Ver meu plano de ação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Share', { score })}
        >
          <Text style={styles.secondaryButtonText}>📤 Compartilhar resultado</Text>
        </TouchableOpacity>
      </View>

      {/* Banner Ad */}
      <AdBanner />
    </View>
  );
}

function AnimatedScoreText({ countAnim, color }: { countAnim: Animated.Value; color: string }) {
  const [display, setDisplay] = React.useState(0);

  useEffect(() => {
    const id = countAnim.addListener(({ value }) => {
      setDisplay(Math.round(value));
    });
    return () => countAnim.removeListener(id);
  }, []);

  return <Text style={[styles.scoreNumber, { color }]}>{display}</Text>;
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  const percentage = (value / 20) * 100;
  const color =
    percentage >= 80 ? COLORS.green :
    percentage >= 60 ? COLORS.greenLight :
    percentage >= 40 ? COLORS.yellow :
    percentage >= 20 ? COLORS.orange :
    COLORS.red;

  return (
    <View style={styles.breakdownRow}>
      <View style={styles.breakdownInfo}>
        <Text style={styles.breakdownLabel}>{label}</Text>
        <Text style={[styles.breakdownValue, { color }]}>{value}/20</Text>
      </View>
      <View style={styles.breakdownBar}>
        <View style={[styles.breakdownBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl + SPACING.lg,
    paddingBottom: SPACING.md,
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: 16,
    color: COLORS.gray400,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: SPACING.lg,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 6,
    backgroundColor: COLORS.navyLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  scoreNumber: {
    fontSize: 56,
    fontWeight: '800',
  },
  scoreMax: {
    fontSize: 18,
    color: COLORS.gray500,
    fontWeight: '600',
    marginTop: -8,
  },
  zoneBadge: {
    paddingVertical: SPACING.xs + 2,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.round,
    marginBottom: SPACING.lg,
  },
  zoneText: {
    fontSize: 16,
    fontWeight: '700',
  },
  thermometerContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  thermometer: {
    height: 12,
    backgroundColor: COLORS.navyLight,
    borderRadius: 6,
    overflow: 'hidden',
  },
  thermometerFill: {
    height: '100%',
    borderRadius: 6,
  },
  thermometerLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  thermLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  comparisonCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.navyLight,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    width: '100%',
    marginBottom: SPACING.md,
  },
  comparisonIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  comparisonText: {
    fontSize: 14,
    color: COLORS.gray300,
    flex: 1,
    lineHeight: 20,
  },
  contextPhrase: {
    fontSize: 14,
    color: COLORS.gray400,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.sm,
  },
  breakdownContainer: {
    width: '100%',
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.gray300,
    marginBottom: SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  breakdownRow: {
    marginBottom: SPACING.sm,
  },
  breakdownInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  breakdownLabel: {
    fontSize: 13,
    color: COLORS.gray400,
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  breakdownBar: {
    height: 6,
    backgroundColor: COLORS.navyDark,
    borderRadius: 3,
    overflow: 'hidden',
  },
  breakdownBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  bottomContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.sm,
    gap: SPACING.sm,
  },
  primaryButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.navy,
  },
  secondaryButton: {
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gray600,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray300,
  },
});
