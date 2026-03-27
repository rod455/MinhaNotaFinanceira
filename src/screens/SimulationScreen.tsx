import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS, SCORE_ZONES } from '../constants/theme';
import { generateSimulations } from '../utils/actionPlan';
import { SimulationScenario } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Simulation'>;
  route: RouteProp<RootStackParamList, 'Simulation'>;
};

function getZoneForScore(s: number) {
  if (s <= 25) return SCORE_ZONES.critical;
  if (s <= 50) return SCORE_ZONES.alert;
  if (s <= 70) return SCORE_ZONES.attention;
  if (s <= 85) return SCORE_ZONES.good;
  return SCORE_ZONES.excellent;
}

export default function SimulationScreen({ navigation, route }: Props) {
  const { answers, score } = route.params;
  const simulations = generateSimulations(answers);
  const [selectedSim, setSelectedSim] = useState<SimulationScenario | null>(null);

  const currentZone = SCORE_ZONES[score.zone];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🔄</Text>
          <Text style={styles.headerTitle}>Compare cenários</Text>
          <Text style={styles.headerSubtitle}>
            Veja como sua nota mudaria em diferentes situações
          </Text>
        </View>

        {/* Current score reference */}
        <View style={styles.currentScoreCard}>
          <Text style={styles.currentScoreLabel}>Sua nota atual</Text>
          <View style={styles.currentScoreRow}>
            <Text style={[styles.currentScoreValue, { color: currentZone.color }]}>
              {score.total}
            </Text>
            <Text style={styles.currentScoreMax}>/100</Text>
            <View style={[styles.currentZoneBadge, { backgroundColor: currentZone.color + '20' }]}>
              <Text style={[styles.currentZoneText, { color: currentZone.color }]}>
                {currentZone.emoji} {currentZone.label}
              </Text>
            </View>
          </View>
        </View>

        {/* Ad placeholder */}
        <View style={styles.adPlaceholder}>
          <Text style={styles.adPlaceholderText}>
            📢 Espaço para anúncio (Interstitial entre simulações)
          </Text>
        </View>

        {/* Simulations */}
        {simulations.length > 0 ? (
          simulations.map((sim, index) => {
            const simZone = getZoneForScore(sim.newScore);
            const isSelected = selectedSim === sim;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.simCard,
                  isSelected && styles.simCardSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedSim(isSelected ? null : sim)}
              >
                <Text style={styles.simLabel}>{sim.label}</Text>

                <View style={styles.simScoreRow}>
                  {/* Current */}
                  <View style={styles.simScoreBlock}>
                    <Text style={styles.simScoreBlockLabel}>Atual</Text>
                    <Text style={[styles.simScoreBlockValue, { color: currentZone.color }]}>
                      {score.total}
                    </Text>
                  </View>

                  {/* Arrow */}
                  <Text style={styles.simArrow}>→</Text>

                  {/* New */}
                  <View style={styles.simScoreBlock}>
                    <Text style={styles.simScoreBlockLabel}>Nova nota</Text>
                    <Text style={[styles.simScoreBlockValue, { color: simZone.color }]}>
                      {sim.newScore}
                    </Text>
                  </View>

                  {/* Delta */}
                  <View style={[styles.deltaBadge, { backgroundColor: COLORS.green + '20' }]}>
                    <Text style={[styles.deltaText, { color: COLORS.green }]}>
                      +{sim.delta}
                    </Text>
                  </View>
                </View>

                {/* Comparison bar */}
                <View style={styles.simBarContainer}>
                  <View style={styles.simBar}>
                    <View
                      style={[
                        styles.simBarCurrent,
                        { width: `${score.total}%`, backgroundColor: currentZone.color + '60' },
                      ]}
                    />
                  </View>
                  <View style={[styles.simBar, { marginTop: 4 }]}>
                    <View
                      style={[
                        styles.simBarNew,
                        { width: `${sim.newScore}%`, backgroundColor: simZone.color },
                      ]}
                    />
                  </View>
                </View>

                {isSelected && (
                  <Text style={styles.simDescription}>{sim.description}</Text>
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noSimCard}>
            <Text style={styles.noSimEmoji}>🎉</Text>
            <Text style={styles.noSimText}>
              Sua situação financeira está ótima! Não há simulações de
              melhoria relevantes.
            </Text>
          </View>
        )}

        {/* Restart CTA */}
        <View style={styles.restartCard}>
          <Text style={styles.restartTitle}>
            Quer testar com outros valores?
          </Text>
          <Text style={styles.restartSubtitle}>
            Refaça o questionário e compare os resultados
          </Text>
          <TouchableOpacity
            style={styles.restartButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Questionnaire')}
          >
            <Text style={styles.restartButtonText}>
              Refazer o teste
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.shareButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Share', { score })}
        >
          <Text style={styles.shareButtonText}>📤 Compartilhar resultado</Text>
        </TouchableOpacity>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  headerEmoji: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.gray400,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  currentScoreCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  currentScoreLabel: {
    fontSize: 12,
    color: COLORS.gray500,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  currentScoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentScoreValue: {
    fontSize: 36,
    fontWeight: '800',
  },
  currentScoreMax: {
    fontSize: 16,
    color: COLORS.gray500,
    fontWeight: '600',
    marginRight: SPACING.sm,
  },
  currentZoneBadge: {
    paddingVertical: 2,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
  },
  currentZoneText: {
    fontSize: 12,
    fontWeight: '700',
  },
  adPlaceholder: {
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray700,
    borderStyle: 'dashed',
    marginBottom: SPACING.md,
  },
  adPlaceholderText: {
    fontSize: 11,
    color: COLORS.gray600,
  },
  simCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  simCardSelected: {
    borderColor: COLORS.gold + '60',
  },
  simLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  simScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  simScoreBlock: {
    alignItems: 'center',
  },
  simScoreBlockLabel: {
    fontSize: 10,
    color: COLORS.gray500,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  simScoreBlockValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  simArrow: {
    fontSize: 20,
    color: COLORS.gray500,
    marginHorizontal: SPACING.md,
  },
  deltaBadge: {
    marginLeft: 'auto',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
  },
  deltaText: {
    fontSize: 16,
    fontWeight: '800',
  },
  simBarContainer: {
    marginBottom: SPACING.xs,
  },
  simBar: {
    height: 6,
    backgroundColor: COLORS.navyDark,
    borderRadius: 3,
    overflow: 'hidden',
  },
  simBarCurrent: {
    height: '100%',
    borderRadius: 3,
  },
  simBarNew: {
    height: '100%',
    borderRadius: 3,
  },
  simDescription: {
    fontSize: 13,
    color: COLORS.gray300,
    lineHeight: 20,
    marginTop: SPACING.sm,
  },
  noSimCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  noSimEmoji: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  noSimText: {
    fontSize: 14,
    color: COLORS.gray300,
    textAlign: 'center',
    lineHeight: 22,
  },
  restartCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cyan + '30',
  },
  restartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  restartSubtitle: {
    fontSize: 13,
    color: COLORS.gray400,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  restartButton: {
    backgroundColor: COLORS.cyan,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
  },
  restartButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  bottomContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.sm,
  },
  shareButton: {
    backgroundColor: COLORS.green,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
