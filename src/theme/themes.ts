export type ThemeMode = 'light' | 'dark';

export const lightTheme = {
  mode: 'light',
  colors: {
    background: '#FFFFFF',
    text: '#0F172A',
    border: '#CBD5E1',
    // primary: '#2563EB',
    muted: '#94A3B8',
    error: '#DC2626',
    inputBackground: '#FFFFFF',
    buttonEnabled: '#0F0E0E',
    buttonDisabled: '#B0B0B0',
    backgroundSecondary: '#061E29',
    soft: '#F63049',
    primary: '#D02752',
    accent: '#8A244B',
    dark: '#000000',
    blob2: '#000000',
    price: '#00FF00',
    white: '#FFFFFF',
    black: '#0C0C0C',
    transparent: 'transparent',
    secondaryBlack: '#242424',
    primaryBackground: '#191A1F',
    secondaryBackground: '#CEC0BB',
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    background: '#000000',
    text: '#E5E7EB',
    border: '#1E293B',
    muted: '#64748B',
    error: '#F87171',
    inputBackground: '#020617',
    buttonEnabled: '#F9F8F6',
    buttonDisabled: '#B0B0B0',
    backgroundSecondary: '#061E29',
    soft: '#F63049',
    primary: '#D02752',
    accent: '#8A244B',
    dark: '#000000',
    blob2: '#000000',
    primaryBackground: '#061E29',
    secondaryBackground: '#DFD0B8',
  },
};

export type AppTheme = typeof lightTheme;
