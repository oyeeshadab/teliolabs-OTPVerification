import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { requestNotificationPermission } from './src/utils/notification';
import { ToastProvider } from './src/components/Toast/ToastProvider';
import { initDatabase } from './src/database';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const AppContent = () => {
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
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
    initDatabase();
  }, []);

  return (
    <GestureHandlerRootView>
      <PortalProvider>
        <SafeAreaProvider>
          <ThemeProvider>
            <ToastProvider>
              <Provider store={store}>
                <AppContent />
              </Provider>
            </ToastProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
