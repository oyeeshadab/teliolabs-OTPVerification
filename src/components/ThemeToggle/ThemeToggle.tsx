import React, { useEffect, useRef } from 'react';
import { Pressable, Animated, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { showLocalNotification } from '../../utils/notification';

const WIDTH = 60;
const HEIGHT = 32;
const PADDING = 3;
const THUMB_SIZE = HEIGHT - PADDING * 2;

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: theme.mode === 'dark' ? WIDTH - THUMB_SIZE - PADDING * 2 : 0,
      useNativeDriver: true,
    }).start();
  }, [theme.mode, translateX]);

  const onPress = () => {
    console.log('🚀 ~ onPress ~ theme:', theme);
    toggleTheme();
    showLocalNotification(
      'Theme Changed',
      `Switched to ${theme.mode === 'dark' ? 'light' : 'dark'} mode`,
    );
  };

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <View
        style={[
          styles.track,
          { backgroundColor: theme.mode === 'dark' ? '#1E293B' : '#E2E8F0' },
        ]}
      >
        <Text style={styles.iconLeft}>🌞</Text>
        <Text style={styles.iconRight}>🌙</Text>

        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              backgroundColor: theme.mode === 'dark' ? '#020617' : '#FFFFFF',
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    position: 'absolute',
    top: 50,
    right: 10,
  },
  track: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    position: 'absolute',
    left: PADDING,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconLeft: {
    position: 'absolute',
    left: 6,
    fontSize: 14,
  },
  iconRight: {
    position: 'absolute',
    right: 6,
    fontSize: 14,
  },
});
