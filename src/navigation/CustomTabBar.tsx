import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@theme/ThemeProvider';
import { useStyle } from './styles';

const { width } = Dimensions.get('window');

const TAB_WIDTH = (width * 0.8) / 4;

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const translateX = useSharedValue(0);

  const { theme } = useTheme();
  const styles = useStyle(theme);

  useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH, {
      damping: 150,
      stiffness: 520,
    });
  }, [state.index]);

  const animatedIndicator = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderIcon = (name: string, focused: boolean) => {
    const size = 22;
    const color = focused ? '#000' : '#fff';

    switch (name) {
      case 'FinanceHome':
        return <Ionicons name="grid-outline" size={size} color={color} />;
      case 'Stats':
        return <Feather name="bar-chart-2" size={size} color={color} />;
      case 'Chat':
        return <Ionicons name="chatbubble-outline" size={size} color={color} />;
      default:
        return <Ionicons name="settings-outline" size={size} color={color} />;
    }
  };
  const INDICATOR_SIZE = 55;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* Animated Active Circle */}
        <Animated.View
          style={[
            styles.indicator,
            {
              left: (TAB_WIDTH - INDICATOR_SIZE) / 2,
            },
            animatedIndicator,
          ]}
        />

        {state.routes.slice(0, 2).map((route, index) => {
          const focused = state.index === index;

          const onPress = () => navigation.navigate(route.name);

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.tab}
            >
              {renderIcon(route.name, focused)}
            </TouchableOpacity>
          );
        })}
        {state.routes.slice(2).map((route, index) => {
          const actualIndex = index + 2;
          const focused = state.index === actualIndex;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
            >
              {renderIcon(route.name, focused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
