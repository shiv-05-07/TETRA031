import { ThemeMode } from '../types';

export interface ThemeTokens {
  bg: string;
  sidebarBg: string;
  cardBg: string;
  cardBgHover: string;
  primaryAccent: string;
  primaryAccentHover: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderHover: string;
  cardShadow: string;
  inputBg: string;
  pillBgCompleted: string;
  pillTextCompleted: string;
  pillBgInProgress: string;
  pillTextInProgress: string;
  pillBgPending: string;
  pillTextPending: string;
  glassSurface: string;
  statIconBg: string;
}

export const getThemeTokens = (theme: ThemeMode): ThemeTokens => {
  const isDark = theme === 'dark';
  return {
    bg: isDark ? '#090909' : '#F5F7FA',
    sidebarBg: isDark ? '#0F0F10' : '#FFFFFF',
    cardBg: isDark ? '#151617' : '#FFFFFF',
    cardBgHover: isDark ? '#1C1D1F' : '#FAFAFA',
    primaryAccent: isDark ? '#5BE16A' : '#22C55E',
    primaryAccentHover: isDark ? '#48D357' : '#16A34A',
    textPrimary: isDark ? '#FFFFFF' : '#111827',
    textSecondary: isDark ? '#A6A6A6' : '#6B7280',
    textMuted: isDark ? '#6E6E6E' : '#9CA3AF',
    border: isDark ? 'rgba(255, 255, 255, 0.08)' : '#E5E7EB',
    borderHover: isDark ? 'rgba(67, 216, 84, 0.3)' : 'rgba(34, 197, 94, 0.4)',
    cardShadow: isDark 
      ? '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.03)' 
      : '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
    inputBg: isDark ? '#1C1D1F' : '#F3F4F6',
    pillBgCompleted: isDark ? 'rgba(67, 216, 84, 0.15)' : 'rgba(34, 197, 94, 0.12)',
    pillTextCompleted: isDark ? '#43D854' : '#15803D',
    pillBgInProgress: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.12)',
    pillTextInProgress: isDark ? '#60A5FA' : '#1D4ED8',
    pillBgPending: isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.12)',
    pillTextPending: isDark ? '#FBBF24' : '#B45309',
    glassSurface: isDark 
      ? 'rgba(21, 22, 23, 0.8)' 
      : 'rgba(255, 255, 255, 0.85)',
    statIconBg: isDark ? 'rgba(67, 216, 84, 0.12)' : 'rgba(34, 197, 94, 0.1)',
  };
};
