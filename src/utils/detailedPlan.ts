import { QuizAnswers, ScoreResult } from '../types';

export interface MonthlyStep {
  month: string;
  goal: string;
  action: string;
  target: string;
}

export function generateDetailedPlan(answers: QuizAnswers, score: ScoreResult): MonthlyStep[] {
  const steps: MonthlyStep[] = [];

  if (answers.dividaAtrasada) {
    steps.push({
      month: 'Mês 1',
      goal: 'Mapear todas as dívidas',
      action: 'Liste todas as dívidas com valor, juros e situação. Priorize as que estão em atraso.',
      target: 'Ter uma visão clara do tamanho da dívida total',
    });
    steps.push({
      month: 'Mês 2',
      goal: 'Renegociar dívidas em atraso',
      action: 'Acesse o Serasa Limpa Nome e negocie. Muitas empresas oferecem até 90% de desconto.',
      target: 'Pelo menos 1 dívida renegociada',
    });
    steps.push({
      month: 'Mês 3–4',
      goal: 'Quitar dívidas menores',
      action: 'Use a técnica "bola de neve": quite as menores primeiro para ganhar motivação.',
      target: 'Eliminar dívidas abaixo de R$500',
    });
  }

  if (answers.sobra === 'vermelho' || answers.sobra === '0a200') {
    steps.push({
      month: steps.length === 0 ? 'Mês 1' : `Mês ${steps.length + 1}`,
      goal: 'Controlar gastos',
      action: 'Anote TODOS os gastos por 30 dias. Use um app ou caderno.',
      target: 'Identificar pelo menos R$200 em cortes possíveis',
    });
    steps.push({
      month: `Mês ${steps.length + 1}`,
      goal: 'Implementar cortes',
      action: 'Cancele assinaturas não essenciais. Negocie contas (internet, celular). Cozinhe mais em casa.',
      target: 'Reduzir gastos em pelo menos 10%',
    });
  }

  if (answers.reserva === 'nada' || answers.reserva === 'menos1mes') {
    const monthNum = steps.length + 1;
    steps.push({
      month: `Mês ${monthNum}`,
      goal: 'Iniciar reserva de emergência',
      action: 'Abra uma conta separada (pode ser digital, sem tarifas). Automatize depósito de pelo menos R$50/mês.',
      target: 'Ter pelo menos R$200 guardados',
    });
    steps.push({
      month: `Mês ${monthNum + 1}–${monthNum + 6}`,
      goal: 'Construir colchão financeiro',
      action: 'Aumente gradualmente o valor guardado. Meta: 1 mês de despesas.',
      target: `R$${Math.max(1000, Math.round(answers.gastos > 0 ? answers.gastos : answers.renda * 0.7)).toLocaleString('pt-BR')} guardados`,
    });
  }

  if (score.total > 50 && steps.length < 4) {
    steps.push({
      month: `Mês ${steps.length + 1}`,
      goal: 'Começar a investir',
      action: 'Abra conta em uma corretora. Comece com Tesouro Selic (seguro e rende mais que poupança).',
      target: 'Primeiro investimento de pelo menos R$100',
    });
  }

  // Add a final motivational step
  steps.push({
    month: `Mês ${steps.length + 1}`,
    goal: 'Refazer o teste',
    action: 'Volte ao app e refaça o diagnóstico. Compare sua nova nota com a anterior.',
    target: `Nota acima de ${Math.min(100, score.total + 15)}`,
  });

  return steps.slice(0, 6);
}

export function estimateDebtFreeMonths(answers: QuizAnswers): number | null {
  if (answers.divida === 'nenhuma') return 0;

  const debtMid: Record<string, number> = {
    'ate1000': 500,
    '1000a5000': 3000,
    '5000a20000': 12500,
    'acima20000': 30000,
  };

  const debt = debtMid[answers.divida] || 0;
  if (debt === 0) return 0;

  const sobraMap: Record<string, number> = {
    'vermelho': 0,
    '0a200': 100,
    '200a500': 350,
    '500a1000': 750,
    'mais1000': 1500,
  };

  const monthlySurplus = sobraMap[answers.sobra] || 0;
  if (monthlySurplus <= 0) return null; // Can't pay off

  return Math.ceil(debt / monthlySurplus);
}
