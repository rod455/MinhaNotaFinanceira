import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { QuizAnswers, DividaOption, SobraOption, ReservaOption } from '../types';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Questionnaire'>;
};

function formatCurrency(value: number): string {
  if (value >= 20000) return 'R$20.000+';
  return `R$${value.toLocaleString('pt-BR')}`;
}

type OptionItem<T extends string> = { value: T; label: string };

function OptionButton<T extends string>({
  option,
  selected,
  onPress,
}: {
  option: OptionItem<T>;
  selected: boolean;
  onPress: (v: T) => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.optionButton, selected && styles.optionButtonSelected]}
      activeOpacity={0.7}
      onPress={() => onPress(option.value)}
    >
      <Text
        style={[styles.optionText, selected && styles.optionTextSelected]}
      >
        {option.label}
      </Text>
    </TouchableOpacity>
  );
}

const DIVIDA_OPTIONS: OptionItem<DividaOption>[] = [
  { value: 'nenhuma', label: 'Não tenho dívidas' },
  { value: 'ate1000', label: 'Até R$1.000' },
  { value: '1000a5000', label: 'R$1.000 – R$5.000' },
  { value: '5000a20000', label: 'R$5.000 – R$20.000' },
  { value: 'acima20000', label: 'Acima de R$20.000' },
];

const SOBRA_OPTIONS: OptionItem<SobraOption>[] = [
  { value: 'vermelho', label: 'Nada, fico no vermelho 😰' },
  { value: '0a200', label: 'R$0 – R$200' },
  { value: '200a500', label: 'R$200 – R$500' },
  { value: '500a1000', label: 'R$500 – R$1.000' },
  { value: 'mais1000', label: 'Mais de R$1.000' },
];

const RESERVA_OPTIONS: OptionItem<ReservaOption>[] = [
  { value: 'nada', label: 'Não tenho nada guardado' },
  { value: 'menos1mes', label: 'Menos de 1 mês de salário' },
  { value: '1a3meses', label: '1 a 3 meses' },
  { value: '3a6meses', label: '3 a 6 meses' },
  { value: 'mais6meses', label: 'Mais de 6 meses' },
];

export default function QuestionnaireScreen({ navigation }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    renda: 3000,
    gastos: 2000,
    divida: 'nenhuma',
    dividaAtrasada: false,
    sobra: '0a200',
    reserva: 'nada',
  });

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const totalSteps = answers.divida !== 'nenhuma' && step === 3 ? 6 : 5;

  const animateTransition = (next: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(next, 150);
  };

  const goNext = () => {
    const nextStep = step + 1;

    // Check if we're at the divida question and need the sub-question
    if (step === 2 && answers.divida !== 'nenhuma') {
      // Show atrasada sub-question
      animateTransition(() => setStep(2.5));
      return;
    }

    // Total questions: renda(0), gastos(1), divida(2), [atrasada(2.5)], sobra(3), reserva(4)
    const maxStep = 4;
    if ((step === 2.5 ? 3 : nextStep) > maxStep) {
      // Done
      navigation.replace('Loading', { answers });
      return;
    }

    animateTransition(() => setStep(step === 2.5 ? 3 : nextStep));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return answers.renda >= 0;
      case 1: return answers.gastos >= 0;
      case 2: return true; // divida always has a selection
      case 2.5: return true;
      case 3: return true;
      case 4: return true;
      default: return true;
    }
  };

  const renderQuestion = () => {
    switch (step) {
      case 0:
        return (
          <View>
            <Text style={styles.questionTitle}>Qual sua renda mensal?</Text>
            <Text style={styles.questionSubtitle}>
              Some todas as fontes de renda (salário, bicos, etc.)
            </Text>
            <Text style={styles.sliderValue}>
              {formatCurrency(answers.renda)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={20000}
              step={100}
              value={answers.renda}
              onValueChange={(v) => setAnswers({ ...answers, renda: v })}
              minimumTrackTintColor={COLORS.gold}
              maximumTrackTintColor={COLORS.navyLight}
              thumbTintColor={COLORS.gold}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>R$0</Text>
              <Text style={styles.sliderLabel}>R$20.000+</Text>
            </View>
          </View>
        );

      case 1:
        return (
          <View>
            <Text style={styles.questionTitle}>
              Quanto gasta por mês com despesas fixas?
            </Text>
            <Text style={styles.questionSubtitle}>
              Aluguel, luz, água, comida, transporte...
            </Text>
            <Text style={styles.sliderValue}>
              {answers.gastos < 0 ? 'Não sei' : formatCurrency(answers.gastos)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={15000}
              step={100}
              value={Math.max(0, answers.gastos)}
              onValueChange={(v) => setAnswers({ ...answers, gastos: v })}
              minimumTrackTintColor={COLORS.cyan}
              maximumTrackTintColor={COLORS.navyLight}
              thumbTintColor={COLORS.cyan}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>R$0</Text>
              <Text style={styles.sliderLabel}>R$15.000+</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.notSureButton,
                answers.gastos < 0 && styles.notSureButtonActive,
              ]}
              onPress={() =>
                setAnswers({ ...answers, gastos: answers.gastos < 0 ? 2000 : -1 })
              }
            >
              <Text
                style={[
                  styles.notSureText,
                  answers.gastos < 0 && styles.notSureTextActive,
                ]}
              >
                Não sei ao certo
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.questionTitle}>Você tem dívidas?</Text>
            <Text style={styles.questionSubtitle}>
              Cartão de crédito, empréstimo, financiamento, etc.
            </Text>
            {DIVIDA_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                option={opt}
                selected={answers.divida === opt.value}
                onPress={(v) => setAnswers({ ...answers, divida: v })}
              />
            ))}
          </View>
        );

      case 2.5:
        return (
          <View>
            <Text style={styles.questionTitle}>
              Sua dívida está em atraso?
            </Text>
            <Text style={styles.questionSubtitle}>
              Parcelas vencidas ou nome negativado
            </Text>
            <OptionButton
              option={{ value: 'sim', label: 'Sim, está em atraso 😟' }}
              selected={answers.dividaAtrasada === true}
              onPress={() => setAnswers({ ...answers, dividaAtrasada: true })}
            />
            <OptionButton
              option={{ value: 'nao', label: 'Não, está tudo em dia ✅' }}
              selected={answers.dividaAtrasada === false}
              onPress={() => setAnswers({ ...answers, dividaAtrasada: false })}
            />
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.questionTitle}>
              Quanto sobra no fim do mês?
            </Text>
            <Text style={styles.questionSubtitle}>
              Depois de pagar todas as contas
            </Text>
            {SOBRA_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                option={opt}
                selected={answers.sobra === opt.value}
                onPress={(v) => setAnswers({ ...answers, sobra: v })}
              />
            ))}
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={styles.questionTitle}>
              Tem reserva de emergência?
            </Text>
            <Text style={styles.questionSubtitle}>
              Dinheiro guardado para imprevistos
            </Text>
            {RESERVA_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                option={opt}
                selected={answers.reserva === opt.value}
                onPress={(v) => setAnswers({ ...answers, reserva: v })}
              />
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  const currentStepNum = step === 2.5 ? 3 : step < 2.5 ? step + 1 : step + 1;
  const displayTotal = answers.divida !== 'nenhuma' ? 6 : 5;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentStepNum / displayTotal) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.ceil(currentStepNum)}/{displayTotal}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {renderQuestion()}
        </Animated.View>
      </ScrollView>

      {/* Next button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
          activeOpacity={0.8}
          onPress={goNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {step === 4 ? 'Ver minha nota' : 'Próximo'}
          </Text>
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl + SPACING.md,
    paddingBottom: SPACING.md,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.navyLight,
    borderRadius: 3,
    marginRight: SPACING.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.gray400,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  questionSubtitle: {
    fontSize: 14,
    color: COLORS.gray400,
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  sliderValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.gold,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  sliderLabel: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  notSureButton: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.gray600,
    alignSelf: 'center',
  },
  notSureButtonActive: {
    borderColor: COLORS.cyan,
    backgroundColor: COLORS.cyan + '20',
  },
  notSureText: {
    fontSize: 14,
    color: COLORS.gray400,
  },
  notSureTextActive: {
    color: COLORS.cyan,
  },
  optionButton: {
    backgroundColor: COLORS.navyLight,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.gold + '15',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.gray300,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: COLORS.gold,
    fontWeight: '600',
  },
  bottomContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
  },
  nextButton: {
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
  nextButtonDisabled: {
    backgroundColor: COLORS.gray600,
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.navy,
  },
});
