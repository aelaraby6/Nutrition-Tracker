export const themes = {
  light: {
    background: '#F8FAFC',
    card: '#FFFFFF',
    surface: '#F1F5F9',
    primary: '#0284C7',
    primaryLighter: '#E0F2FE',
    secondary: '#7C3AED',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    alert: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    tabBar: '#FFFFFF',
    cardShadow: {
      shadowColor: '#64748B',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
    },
  },
  dark: {
    background: '#090D16',
    card: '#151E2D',
    surface: '#1E293B',
    primary: '#38BDF8',
    primaryLighter: '#0C4A6E',
    secondary: '#A78BFA',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#1E293B',
    alert: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
    tabBar: '#0B0F19',
    cardShadow: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
  },
};

export type ThemeType = 'light' | 'dark';

export const macroColors = {
  calories: '#FF6B6B',
  protein: '#4ECDC4',
  carbs: '#FFD93D',
  fat: '#6BCB77',
};
