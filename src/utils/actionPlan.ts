import { QuizAnswers, ActionTip, SimulationScenario, ScoreResult } from '../types';
import { calculateScore } from './scoring';

export function generateActionPlan(answers: QuizAnswers, score: ScoreResult): ActionTip[] {
  const tips: ActionTip[] = [];

  // Tip for debt
  if (answers.dividaAtrasada) {
    tips.push({
      icon: '🚨',
      title: 'Renegocie suas dívidas agora',
      description:
        'Mais de 1.000 empresas oferecem até 90% de desconto para quitar dívidas em atraso. Comece pelo Serasa Limpa Nome — é gratuito e online.',
      affiliatePartner: 'serasa',
    });
  } else if (answers.divida !== 'nenhuma') {
    tips.push({
      icon: '💳',
      title: 'Organize suas dívidas',
      description:
        'Liste todas as dívidas e priorize as com maior juros. Considere portabilidade de crédito para trocar dívida cara por uma mais barata.',
      affiliatePartner: 'creditas',
    });
  }

  // Tip for emergency reserve
  if (answers.reserva === 'nada' || answers.reserva === 'menos1mes') {
    tips.push({
      icon: '🏦',
      title: 'Comece sua reserva de emergência',
      description:
        answers.reserva === 'nada'
          ? 'Comece com R$50/mês. Em 12 meses você tem R$600 de colchão. Abra uma conta digital sem tarifas para guardar esse dinheiro separado.'
          : 'Você já começou — ótimo! Tente aumentar para pelo menos 3 meses de despesas. Automatize uma transferência mensal para não esquecer.',
      affiliatePartner: 'banco_digital',
    });
  }

  // Tip for spending
  const comprometimento = answers.gastos > 0 && answers.renda > 0
    ? answers.gastos / answers.renda
    : null;

  if (answers.sobra === 'vermelho' || answers.sobra === '0a200' || (comprometimento && comprometimento > 0.8)) {
    tips.push({
      icon: '📊',
      title: 'Aplique a regra 50/30/20',
      description:
        '50% da renda para necessidades, 30% para desejos e 20% para poupança. Comece anotando todos os gastos por 30 dias — você vai se surpreender.',
      affiliatePartner: 'mobills',
    });
  }

  // Tip for income
  if (answers.renda > 0 && answers.renda < 3000) {
    tips.push({
      icon: '📈',
      title: 'Invista em você',
      description:
        'Cursos gratuitos de qualificação profissional podem aumentar sua renda em até 40%. Existem cursos online gratuitos de finanças que podem transformar sua relação com dinheiro.',
      affiliatePartner: 'hotmart',
    });
  }

  // General tip if score is reasonable
  if (score.total > 50 && tips.length < 3) {
    tips.push({
      icon: '🎯',
      title: 'Pense no longo prazo',
      description:
        'Com sua saúde financeira estável, considere começar a investir. Mesmo R$100/mês em renda fixa já faz diferença em 5 anos.',
    });
  }

  // Always have at least 3 tips
  if (tips.length < 3) {
    if (!tips.find(t => t.icon === '📊')) {
      tips.push({
        icon: '📊',
        title: 'Controle seus gastos',
        description:
          'Use um app de controle financeiro para categorizar cada gasto. Quem anota gasta em média 20% menos.',
        affiliatePartner: 'mobills',
      });
    }
  }

  if (tips.length < 3) {
    tips.push({
      icon: '💡',
      title: 'Educação financeira muda vidas',
      description:
        'Aprenda sobre juros compostos, investimentos básicos e planejamento. Conhecimento é o melhor investimento — e existem ótimos cursos gratuitos.',
      affiliatePartner: 'hotmart',
    });
  }

  return tips.slice(0, 3);
}

export function generateSimulations(answers: QuizAnswers): SimulationScenario[] {
  const scenarios: SimulationScenario[] = [];
  const currentScore = calculateScore(answers).total;

  // Scenario: What if no debts?
  if (answers.divida !== 'nenhuma') {
    const noDebtAnswers = { ...answers, divida: 'nenhuma' as const, dividaAtrasada: false };
    const newScore = calculateScore(noDebtAnswers).total;
    scenarios.push({
      label: 'E se você quitasse todas as dívidas?',
      description: `Sua nota subiria ${newScore - currentScore} pontos. Comece renegociando as dívidas mais caras.`,
      newScore,
      delta: newScore - currentScore,
    });
  }

  // Scenario: What if emergency fund?
  if (answers.reserva === 'nada' || answers.reserva === 'menos1mes') {
    const withReserve = { ...answers, reserva: '3a6meses' as const };
    const newScore = calculateScore(withReserve).total;
    scenarios.push({
      label: 'E se você tivesse 3–6 meses de reserva?',
      description: `Sua nota subiria ${newScore - currentScore} pontos. Com disciplina, é possível construir isso em 12–18 meses.`,
      newScore,
      delta: newScore - currentScore,
    });
  }

  // Scenario: What if earned more?
  if (answers.renda > 0 && answers.renda < 10000) {
    const moreIncome = {
      ...answers,
      renda: answers.renda * 1.3,
      sobra: answers.sobra === 'vermelho' ? '200a500' as const : answers.sobra === '0a200' ? '500a1000' as const : answers.sobra,
    };
    const newScore = calculateScore(moreIncome).total;
    scenarios.push({
      label: `E se ganhasse R$${Math.round(answers.renda * 0.3).toLocaleString('pt-BR')} a mais?`,
      description: `Um aumento de 30% na renda poderia elevar sua nota em ${newScore - currentScore} pontos.`,
      newScore,
      delta: newScore - currentScore,
    });
  }

  // Scenario: What if spending was controlled?
  if (answers.sobra === 'vermelho' || answers.sobra === '0a200') {
    const betterSpending = { ...answers, sobra: '500a1000' as const };
    const newScore = calculateScore(betterSpending).total;
    scenarios.push({
      label: 'E se sobrasse R$500–1.000/mês?',
      description: `Sua nota subiria ${newScore - currentScore} pontos. Reveja seus gastos e encontre onde cortar.`,
      newScore,
      delta: newScore - currentScore,
    });
  }

  return scenarios.slice(0, 3);
}
