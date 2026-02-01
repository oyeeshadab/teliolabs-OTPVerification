export type ThemeMode = 'light' | 'dark';

export const lightTheme = {
  mode: 'light',
  colors: {
    background: '#FFFFFF',
    text: '#0F172A',
    border: '#CBD5E1',
    primary: '#2563EB',
    muted: '#94A3B8',
    error: '#DC2626',
    inputBackground: '#FFFFFF',
    buttonEnabled: '#0F0E0E',
    buttonDisabled: '#B0B0B0',
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    background: '#000000',
    text: '#E5E7EB',
    border: '#1E293B',
    primary: '#3B82F6',
    muted: '#64748B',
    error: '#F87171',
    inputBackground: '#020617',
    buttonEnabled: '#F9F8F6',
    buttonDisabled: '#B0B0B0',
  },
};

export type AppTheme = typeof lightTheme;
