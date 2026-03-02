import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SecretNavigator } from './SecretNavigator';
import { AppNavigator } from './AppNavigator';
import { SecretUserRepo } from '../database/repository/secretLogin.repo';
import { AppState, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { BiometricGate } from '../security/BiometricGate';
import BottomTabs from './BottomTabs';

export type RootStackParamList = {
  Login: undefined;
  OtpVerification: { email: string };
  Home: undefined;
  Welcome: undefined;
  SecretNavigator: undefined;
  AppNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [isSecretLoggedIn, setIsSecretLoggedIn] = useState<boolean | null>(
    true,
  );
  SecretUserRepo.getKeepLoggedIn()
    .then(keepLoggedIn => {
      // setIsSecretLoggedIn(keepLoggedIn);
      // setIsSecretLoggedIn(keepLoggedIn);
    })
    .catch(err => {
      console.error('Error fetching secret users:', err);
    });

  if (isSecretLoggedIn === null) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('../assets/JSON/LoaderCat.json')}
          style={styles.LottieIcon}
          autoPlay
          loop
        />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {/* )} */}

      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isSecretLoggedIn ? 'SecretNavigator' : 'AppNavigator'}
      >
        <Stack.Screen name="SecretNavigator">
          {() => (
            <BiometricGate>
              <BottomTabs />
            </BiometricGate>
          )}
        </Stack.Screen>
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E2D4',
  },
  LottieIcon: {
    width: 400,
    height: 400,
  },
});
