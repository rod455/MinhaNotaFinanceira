import { QuizAnswers, ScoreResult, ScoreZone, DividaOption, SobraOption, ReservaOption } from '../types';

// Each dimension is worth 0–20 points, total = 0–100

function calcSobraMensal(answers: QuizAnswers): number {
  const { renda, gastos, sobra } = answers;

  // If we have renda info, calculate percentage
  if (renda > 0) {
    const sobraMap: Record<SobraOption, number> = {
      'vermelho': 0,
      '0a200': 5,
      '200a500': 10,
      '500a1000': 15,
      'mais1000': 20,
    };
    const base = sobraMap[sobra];

    // Adjust by income-expense ratio if gastos is known
    if (gastos > 0 && renda > 0) {
      const ratio = gastos / renda;
      if (ratio > 0.9) return Math.min(base, 5);
      if (ratio > 0.8) return Math.min(base, 10);
    }
    return base;
  }

  // Fallback purely on sobra answer
  const fallbackMap: Record<SobraOption, number> = {
    'vermelho': 0,
    '0a200': 6,
    '200a500': 11,
    '500a1000': 16,
    'mais1000': 20,
  };
  return fallbackMap[sobra];
}

function calcNivelDivida(answers: QuizAnswers): number {
  const { divida, renda } = answers;

  if (divida === 'nenhuma') return 20;

  // Direct scoring: higher debt bracket = lower score
  const basePenalty: Record<DividaOption, number> = {
    'nenhuma': 20,
    'ate1000': 14,
    '1000a5000': 8,
    '5000a20000': 4,
    'acima20000': 0,
  };

  let score = basePenalty[divida];

  // Additional penalty if debt is high relative to income
  if (renda > 0) {
    const debtMid: Record<DividaOption, number> = {
      'nenhuma': 0,
      'ate1000': 500,
      '1000a5000': 3000,
      '5000a20000': 12500,
      'acima20000': 30000,
    };
    const ratio = debtMid[divida] / Math.max(renda, 1320);
    // If debt exceeds 3x monthly income, extra penalty
    if (ratio > 3) score = Math.max(0, score - 4);
    else if (ratio > 1.5) score = Math.max(0, score - 2);
  }

  return score;
}

function calcAdimplencia(answers: QuizAnswers): number {
  if (answers.divida === 'nenhuma') return 20;
  if (answers.dividaAtrasada) return 2;
  return 18;
}

function calcReservaEmergencia(answers: QuizAnswers): number {
  const map: Record<ReservaOption, number> = {
    'nada': 0,
    'menos1mes': 5,
    '1a3meses': 10,
    '3a6meses': 16,
    'mais6meses': 20,
  };
  return map[answers.reserva];
}

function calcComprometimentoRenda(answers: QuizAnswers): number {
  const { renda, gastos } = answers;

  if (renda <= 0) {
    // Use sobra as proxy
    const sobraMap: Record<SobraOption, number> = {
      'vermelho': 0,
      '0a200': 5,
      '200a500': 10,
      '500a1000': 15,
      'mais1000': 20,
    };
    return sobraMap[answers.sobra];
  }

  const effectiveGastos = gastos > 0 ? gastos : renda * 0.75; // assume 75% if unknown
  const ratio = effectiveGastos / renda;

  if (ratio >= 0.95) return 0;
  if (ratio >= 0.9) return 4;
  if (ratio >= 0.8) return 8;
  if (ratio >= 0.7) return 12;
  if (ratio >= 0.6) return 16;
  return 20;
}

function getZone(score: number): ScoreZone {
  if (score <= 25) return 'critical';
  if (score <= 50) return 'alert';
  if (score <= 70) return 'attention';
  if (score <= 85) return 'good';
  return 'excellent';
}

export function calculateScore(answers: QuizAnswers): ScoreResult {
  const breakdown = {
    sobraMensal: calcSobraMensal(answers),
    nivelDivida: calcNivelDivida(answers),
    adimplencia: calcAdimplencia(answers),
    reservaEmergencia: calcReservaEmergencia(answers),
    comprometimentoRenda: calcComprometimentoRenda(answers),
  };

  const total = Math.round(
    Math.min(100, Math.max(0,
      breakdown.sobraMensal +
      breakdown.nivelDivida +
      breakdown.adimplencia +
      breakdown.reservaEmergencia +
      breakdown.comprometimentoRenda
    ))
  );

  return {
    total,
    breakdown,
    zone: getZone(total),
  };
}

export function getContextualPhrase(score: number): string {
  if (score < 30) {
    return 'Você não está sozinho. 80% das famílias brasileiras estão na mesma situação. O primeiro passo é saber onde você está — e você acabou de dar esse passo.';
  }
  if (score < 50) {
    return 'Situação difícil, mas tem saída. Milhões de brasileiros conseguiram virar o jogo. O importante é começar agora.';
  }
  if (score < 70) {
    return 'Você está melhor que muita gente, mas ainda pode melhorar. Pequenos ajustes podem fazer uma grande diferença.';
  }
  if (score < 85) {
    return 'Parabéns! Você tem uma saúde financeira razoável. Está no caminho certo — continue assim.';
  }
  return 'Impressionante! Você está entre os 20% com melhor saúde financeira do Brasil. Continue mantendo suas finanças em ordem.';
}
