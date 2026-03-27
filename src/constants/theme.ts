// Minha Nota Financeira — Design System
// Herda a família Quanto Ganha

export const COLORS = {
  navy: '#0B1838',
  navyLight: '#132248',
  navyDark: '#060D1F',
  gold: '#F5A820',
  goldLight: '#FFD073',
  cyan: '#17C8E8',
  red: '#E24B4A',
  redLight: '#FF6B6B',
  green: '#1DBE75',
  greenLight: '#4FD89F',
  orange: '#F57C20',
  yellow: '#F5D020',
  white: '#FFFFFF',
  gray100: '#F5F7FA',
  gray200: '#E4E7EB',
  gray300: '#CBD2D9',
  gray400: '#9AA5B4',
  gray500: '#7B8794',
  gray600: '#616E7C',
  gray700: '#3E4C59',
  gray800: '#1F2933',
  black: '#000000',
};

export const SCORE_ZONES = {
  critical: { min: 0, max: 25, color: COLORS.red, label: 'Crítico', emoji: '🔴' },
  alert: { min: 26, max: 50, color: COLORS.orange, label: 'Alerta', emoji: '🟠' },
  attention: { min: 51, max: 70, color: COLORS.yellow, label: 'Atenção', emoji: '🟡' },
  good: { min: 71, max: 85, color: COLORS.greenLight, label: 'Bom', emoji: '🟢' },
  excellent: { min: 86, max: 100, color: COLORS.green, label: 'Excelente', emoji: '✨' },
};

export const FONTS = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
  mono: 'DMMonoRegular',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

export const NATIONAL_AVERAGE = 42;
