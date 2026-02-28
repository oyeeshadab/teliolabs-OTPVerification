import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SecretNavigator } from './SecretNavigator';
import { AppNavigator } from './AppNavigator';
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
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
        <Stack.Screen name="SecretNavigator" component={SecretNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
