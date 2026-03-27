export interface QuizAnswers {
  renda: number;           // 0–20000+
  gastos: number;          // 0–15000+ or -1 for "Não sei"
  divida: DividaOption;
  dividaAtrasada: boolean;
  sobra: SobraOption;
  reserva: ReservaOption;
}

export type DividaOption =
  | 'nenhuma'
  | 'ate1000'
  | '1000a5000'
  | '5000a20000'
  | 'acima20000';

export type SobraOption =
  | 'vermelho'
  | '0a200'
  | '200a500'
  | '500a1000'
  | 'mais1000';

export type ReservaOption =
  | 'nada'
  | 'menos1mes'
  | '1a3meses'
  | '3a6meses'
  | 'mais6meses';

export interface ScoreResult {
  total: number;
  breakdown: {
    sobraMensal: number;
    nivelDivida: number;
    adimplencia: number;
    reservaEmergencia: number;
    comprometimentoRenda: number;
  };
  zone: ScoreZone;
}

export type ScoreZone = 'critical' | 'alert' | 'attention' | 'good' | 'excellent';

export interface ActionTip {
  icon: string;
  title: string;
  description: string;
  affiliateLink?: string;
  affiliatePartner?: string;
}

export interface SimulationScenario {
  label: string;
  description: string;
  newScore: number;
  delta: number;
}
