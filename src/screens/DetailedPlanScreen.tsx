import React from 'react';
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
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { generateDetailedPlan, estimateDebtFreeMonths } from '../utils/detailedPlan';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DetailedPlan'>;
  route: RouteProp<RootStackParamList, 'DetailedPlan'>;
};

export default function DetailedPlanScreen({ navigation, route }: Props) {
  const { answers, score } = route.params;
  const plan = generateDetailedPlan(answers, score);
  const debtFreeMonths = estimateDebtFreeMonths(answers);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>📋</Text>
          <Text style={styles.headerTitle}>Plano detalhado</Text>
          <Text style={styles.headerSubtitle}>
            Seu cronograma personalizado mês a mês
          </Text>
        </View>

        {/* Debt-free estimation */}
        {debtFreeMonths !== null && debtFreeMonths > 0 && (
          <View style={styles.debtFreeCard}>
            <Text style={styles.debtFreeEmoji}>🏁</Text>
            <Text style={styles.debtFreeTitle}>
              Simulação de quitação de dívida
            </Text>
            <Text style={styles.debtFreeValue}>
              ~{debtFreeMonths} meses
            </Text>
            <Text style={styles.debtFreeSubtitle}>
              para ficar livre das dívidas, mantendo o ritmo atual de pagamento
            </Text>
          </View>
        )}

        {debtFreeMonths === null && answers.divida !== 'nenhuma' && (
          <View style={[styles.debtFreeCard, { borderColor: COLORS.red + '40' }]}>
            <Text style={styles.debtFreeEmoji}>⚠️</Text>
            <Text style={styles.debtFreeTitle}>Atenção</Text>
            <Text style={[styles.debtFreeSubtitle, { color: COLORS.red }]}>
              Sem sobra mensal, não é possível quitar as dívidas no ritmo
              atual. O plano abaixo vai te ajudar a mudar essa situação.
            </Text>
          </View>
        )}

        {/* Timeline */}
        <View style={styles.timeline}>
          {plan.map((step, index) => (
            <View key={index} style={styles.timelineItem}>
              {/* Connector line */}
              {index < plan.length - 1 && <View style={styles.timelineLine} />}

              {/* Dot */}
              <View style={styles.timelineDot}>
                <View style={styles.timelineDotInner} />
              </View>

              {/* Content */}
              <View style={styles.timelineContent}>
                <Text style={styles.timelineMonth}>{step.month}</Text>
                <Text style={styles.timelineGoal}>{step.goal}</Text>
                <Text style={styles.timelineAction}>{step.action}</Text>
                <View style={styles.targetBadge}>
                  <Text style={styles.targetText}>🎯 Meta: {step.target}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Score breakdown categories */}
        <View style={styles.breakdownSection}>
          <Text style={styles.breakdownTitle}>
            Quanto cada área impacta sua nota
          </Text>
          <CategoryImpact
            label="Sobra mensal"
            current={score.breakdown.sobraMensal}
            potential={20}
          />
          <CategoryImpact
            label="Nível de dívida"
            current={score.breakdown.nivelDivida}
            potential={20}
          />
          <CategoryImpact
            label="Adimplência"
            current={score.breakdown.adimplencia}
            potential={20}
          />
          <CategoryImpact
            label="Reserva de emergência"
            current={score.breakdown.reservaEmergencia}
            potential={20}
          />
          <CategoryImpact
            label="Comprometimento de renda"
            current={score.breakdown.comprometimentoRenda}
            potential={20}
          />
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Simulation', { answers, score })}
        >
          <Text style={styles.primaryButtonText}>
            🔄 Simular outra situação
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Share', { score })}
        >
          <Text style={styles.secondaryButtonText}>📤 Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CategoryImpact({
  label,
  current,
  potential,
}: {
  label: string;
  current: number;
  potential: number;
}) {
  const gap = potential - current;
  const percentage = (current / potential) * 100;

  return (
    <View style={styles.impactRow}>
      <View style={styles.impactInfo}>
        <Text style={styles.impactLabel}>{label}</Text>
        <Text style={styles.impactValues}>
          <Text style={{ color: COLORS.gold }}>{current}</Text>
          <Text style={{ color: COLORS.gray500 }}>/{potential}</Text>
          {gap > 5 && (
            <Text style={{ color: COLORS.red }}> (+{gap} possível)</Text>
          )}
        </Text>
      </View>
      <View style={styles.impactBar}>
        <View
          style={[
            styles.impactBarFill,
            { width: `${percentage}%` },
          ]}
        />
        <View
          style={[
            styles.impactBarGap,
            { width: `${100 - percentage}%` },
          ]}
        />
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
  debtFreeCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.green + '40',
  },
  debtFreeEmoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  debtFreeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  debtFreeValue: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.green,
    marginBottom: SPACING.xs,
  },
  debtFreeSubtitle: {
    fontSize: 13,
    color: COLORS.gray400,
    textAlign: 'center',
    lineHeight: 18,
  },
  timeline: {
    marginBottom: SPACING.xl,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 11,
    top: 24,
    bottom: -SPACING.lg,
    width: 2,
    backgroundColor: COLORS.gold + '40',
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.gold + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginTop: 2,
  },
  timelineDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.gold,
  },
  timelineContent: {
    flex: 1,
  },
  timelineMonth: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  timelineGoal: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  timelineAction: {
    fontSize: 13,
    color: COLORS.gray300,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  targetBadge: {
    backgroundColor: COLORS.green + '15',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  targetText: {
    fontSize: 12,
    color: COLORS.green,
    fontWeight: '600',
  },
  breakdownSection: {
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
  },
  impactRow: {
    marginBottom: SPACING.sm,
  },
  impactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 13,
    color: COLORS.gray400,
  },
  impactValues: {
    fontSize: 13,
    fontWeight: '600',
  },
  impactBar: {
    height: 6,
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  impactBarFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
  },
  impactBarGap: {
    height: '100%',
    backgroundColor: COLORS.navyDark,
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.sm,
    gap: SPACING.sm,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.gold,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.navy,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    backgroundColor: COLORS.green,
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
});
