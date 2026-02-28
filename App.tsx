import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import {
  getFcmToken,
  registerForegroundHandler,
  requestNotificationPermission,
} from './src/utils/notification';
import { ToastProvider } from './src/components/Toast/ToastProvider';
import { createTables } from './src/database/migrations';

const AppContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    registerForegroundHandler();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <RootNavigator />
    </>
  );
};

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
    createTables()
      .then(() => console.log('DB ready'))
      .catch(err => console.error(err));
  }, []);
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
