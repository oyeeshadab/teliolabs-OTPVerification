import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, AppTheme, ThemeMode } from './themes';

interface ThemeContextType {
  theme: AppTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: any) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode | null>(null);

  const theme = useMemo(() => {
    const activeMode = mode ?? 'light';
    return activeMode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
