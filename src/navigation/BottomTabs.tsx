import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, SecretNavigator } from './SecretNavigator';
import { BiometricGate } from '../security/BiometricGate';
import FinanceTracker from '@screens/Secret/FinanceTracker/Home/FinanceTracker';

const Tab = createBottomTabNavigator();

const Screen = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{title}</Text>
  </View>
);
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="FinanceHome" component={FinanceTracker} />

      <Tab.Screen name="Stats">{() => <Screen title="Stats" />}</Tab.Screen>

      <Tab.Screen name="Chat">{() => <Screen title="Chat" />}</Tab.Screen>

      <Tab.Screen name="Settings">
        {() => <Screen title="Settings" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
