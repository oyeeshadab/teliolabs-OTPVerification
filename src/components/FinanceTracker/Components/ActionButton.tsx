import React from 'react';
import { Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { styles } from '../../../screens/Secret/FinanceTracker/Home/styles';

const ActionButton = ({ title, icon }: { title: string; icon: string }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.9))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View style={[styles.actionButton, animatedStyle]}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.actionText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default ActionButton;
