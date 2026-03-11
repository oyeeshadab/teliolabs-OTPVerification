import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Login/LoginScreen';
import { OtpVerificationScreen } from '../screens/OtpVerification/OtpVerificationScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import AddTransaction from '@screens/Secret/FinanceTracker/Transactions/AddTransactionScreen';
import { Platform } from 'react-native';
import { Transaction } from '@database/types';

export type RootStackParamList = {
  Login: undefined;
  OtpVerification: { email: string };
  Home: undefined;
  Welcome: undefined;
  SecretNavigator: undefined;
  AddTransaction: { item?: Transaction };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransaction} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          presentation: Platform.OS === 'ios' ? 'formSheet' : 'modal',
          animation: 'slide_from_bottom',
          headerShown: false,
          sheetAllowedDetents: [0.45],
        }}
      />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // presentation: Platform.OS === 'ios' ? 'formSheet' : 'modal',
          // animation: 'slide_from_bottom',
          // headerShown: false,
          // sheetAllowedDetents: [0.45],
          orientation: 'portrait_up',
          navigationBarColor: 'red',
          // headerBackButtonMenuEnabled: true,
          // gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
};
