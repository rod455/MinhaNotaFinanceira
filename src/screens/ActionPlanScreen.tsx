import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { generateActionPlan } from '../utils/actionPlan';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ActionPlan'>;
  route: RouteProp<RootStackParamList, 'ActionPlan'>;
};

// Placeholder affiliate links (to be updated via Remote Config)
const AFFILIATE_LINKS: Record<string, string> = {
  serasa: 'https://www.serasa.com.br/limpa-nome-online',
  creditas: 'https://www.creditas.com/emprestimo-pessoal',
  banco_digital: 'https://nubank.com.br',
  mobills: 'https://www.mobills.com.br',
  hotmart: 'https://hotmart.com/pt-br/category/financas-e-negocios',
};

export default function ActionPlanScreen({ navigation, route }: Props) {
  const { answers, score } = route.params;
  const tips = generateActionPlan(answers, score);

  const handleAffiliateClick = (partner?: string) => {
    if (partner && AFFILIATE_LINKS[partner]) {
      Linking.openURL(AFFILIATE_LINKS[partner]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🎯</Text>
          <Text style={styles.headerTitle}>Seu plano de ação</Text>
          <Text style={styles.headerSubtitle}>
            3 passos personalizados para melhorar sua nota financeira
          </Text>
        </View>

        {/* Tips */}
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
            </View>

            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>

            {tip.affiliatePartner && (
              <TouchableOpacity
                style={styles.affiliateButton}
                activeOpacity={0.7}
                onPress={() => handleAffiliateClick(tip.affiliatePartner)}
              >
                <Text style={styles.affiliateButtonText}>
                  Saiba mais →
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Unlock detailed plan */}
        <View style={styles.unlockCard}>
          <Text style={styles.unlockEmoji}>🔓</Text>
          <Text style={styles.unlockTitle}>
            Quer ver seu plano detalhado mês a mês?
          </Text>
          <Text style={styles.unlockSubtitle}>
            Desbloqueie a simulação completa de quitação de dívida e um
            cronograma personalizado.
          </Text>

          {/* In production, this would trigger a rewarded video ad */}
          <TouchableOpacity
            style={styles.unlockButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailedPlan', { answers, score })}
          >
            <Text style={styles.unlockButtonText}>
              ▶️ Desbloquear plano detalhado
            </Text>
          </TouchableOpacity>

          <Text style={styles.unlockDisclaimer}>
            (Espaço para Rewarded Video Ad)
          </Text>
        </View>
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.simulationButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Simulation', { answers, score })}
        >
          <Text style={styles.simulationButtonText}>
            🔄 Simular outra situação
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shareButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Share', { score })}
        >
          <Text style={styles.shareButtonText}>📤 Compartilhar</Text>
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
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.gray400,
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  tipNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.navy,
  },
  tipIcon: {
    fontSize: 24,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  tipDescription: {
    fontSize: 14,
    color: COLORS.gray300,
    lineHeight: 22,
  },
  affiliateButton: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.cyan + '20',
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  affiliateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.cyan,
  },
  unlockCard: {
    backgroundColor: COLORS.navyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gold + '40',
    alignItems: 'center',
  },
  unlockEmoji: {
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  unlockTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  unlockSubtitle: {
    fontSize: 13,
    color: COLORS.gray400,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  unlockButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.sm,
  },
  unlockButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.navy,
  },
  unlockDisclaimer: {
    fontSize: 10,
    color: COLORS.gray600,
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.sm,
    gap: SPACING.sm,
  },
  simulationButton: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    backgroundColor: COLORS.navyLight,
    borderWidth: 1,
    borderColor: COLORS.gray600,
  },
  simulationButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray300,
  },
  shareButton: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    backgroundColor: COLORS.green,
  },
  shareButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
});
