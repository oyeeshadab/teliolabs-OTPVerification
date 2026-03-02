import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TargetList from '../screens/Secret/Target/TargetList';
import { BiometricGate } from '../security/BiometricGate';
import FinanceTracker from '@screens/Secret/FinanceTracker/Home/FinanceTracker';

export type RootStackParamList = {
  Target: undefined;
  FinanceHome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const SecretNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="FinanceHome"
    >
      <Stack.Screen name="FinanceHome" component={FinanceTracker} />
      <Stack.Screen name="Target" component={TargetList} />
    </Stack.Navigator>
  );
};
