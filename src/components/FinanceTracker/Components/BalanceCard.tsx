import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../../screens/Secret/FinanceTracker/Home/styles';

const BalanceCard = () => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 600 });
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <LinearGradient colors={['#6C63FF', '#3F3DFF']} style={styles.gradient}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balance}>₹ 45,860.00</Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default BalanceCard;
