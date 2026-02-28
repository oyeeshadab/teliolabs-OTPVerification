import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Login/LoginScreen';
import { OtpVerificationScreen } from '../screens/OtpVerification/OtpVerificationScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import { SecretNavigator } from './SecretNavigator';
export type RootStackParamList = {
  Login: undefined;
  OtpVerification: { email: string };
  Home: undefined;
  Welcome: undefined;
  SecretNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SecretNavigator" component={SecretNavigator} />
    </Stack.Navigator>
  );
};
