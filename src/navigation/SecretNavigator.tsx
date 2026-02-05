import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TargetList from '../screens/Secret/Target/TargetList';

export type RootStackParamList = {
  Target: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const SecretNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Target"
    >
      <Stack.Screen name="Target" component={TargetList} />
    </Stack.Navigator>
  );
};
